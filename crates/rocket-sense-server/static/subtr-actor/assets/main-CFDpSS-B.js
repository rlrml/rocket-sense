const as={ROTATE:0,DOLLY:1,PAN:2},Ja={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hb=0,Dh=1,Vb=2,Pg=1,Gb=2,ci=3,zi=0,an=1,Je=2,Li=0,ss=1,Ni=2,Fh=3,kh=4,$b=5,ca=100,Wb=101,Xb=102,Yb=103,qb=104,Kb=200,jb=201,Zb=202,Jb=203,Vu=204,Gu=205,Qb=206,ex=207,tx=208,nx=209,ix=210,ax=211,sx=212,rx=213,ox=214,$u=0,Wu=1,Xu=2,ys=3,Yu=4,qu=5,Ku=6,ju=7,jl=0,lx=1,cx=2,Ii=0,ux=1,dx=2,fx=3,hx=4,px=5,mx=6,_x=7,Lg=300,bs=301,xs=302,Zu=303,Ju=304,Zl=306,Qu=1e3,fa=1001,ed=1002,Fn=1003,gx=1004,jr=1005,$n=1006,yc=1007,ha=1008,Zn=1009,Ng=1010,Ig=1011,xr=1012,zf=1013,ya=1014,fi=1015,Vr=1016,Hf=1017,Vf=1018,Sr=1020,Dg=35902,Fg=35899,kg=1021,Og=1022,In=1023,wr=1026,Er=1027,Ug=1028,Gf=1029,Bg=1030,$f=1031,Wf=1033,Jo=33776,Qo=33777,el=33778,tl=33779,td=35840,nd=35841,id=35842,ad=35843,sd=36196,rd=37492,od=37496,ld=37808,cd=37809,ud=37810,dd=37811,fd=37812,hd=37813,pd=37814,md=37815,_d=37816,gd=37817,vd=37818,yd=37819,bd=37820,xd=37821,Sd=36492,wd=36494,Ed=36495,Md=36283,Td=36284,Ad=36285,Cd=36286,vx=3200,yx=3201,Xf=0,bx=1,Ri="",Gt="srgb",Ss="srgb-linear",wl="linear",lt="srgb",Ra=7680,Oh=519,xx=512,Sx=513,wx=514,zg=515,Ex=516,Mx=517,Tx=518,Ax=519,Rd=35044,Uh="300 es",Wn=2e3,El=2001;class Ma{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bh=1234567;const or=Math.PI/180,Mr=180/Math.PI;function Xn(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[t&255]+zt[t>>8&255]+zt[t>>16&255]+zt[t>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[n&63|128]+zt[n>>8&255]+"-"+zt[n>>16&255]+zt[n>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function Yf(t,e){return(t%e+e)%e}function Cx(t,e,n,i,a){return i+(t-e)*(a-i)/(n-e)}function Rx(t,e,n){return t!==e?(n-t)/(e-t):0}function lr(t,e,n){return(1-n)*t+n*e}function Px(t,e,n,i){return lr(t,e,1-Math.exp(-n*i))}function Lx(t,e=1){return e-Math.abs(Yf(t,e*2)-e)}function Nx(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function Ix(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function Dx(t,e){return t+Math.floor(Math.random()*(e-t+1))}function Fx(t,e){return t+Math.random()*(e-t)}function kx(t){return t*(.5-Math.random())}function Ox(t){t!==void 0&&(Bh=t);let e=Bh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ux(t){return t*or}function Bx(t){return t*Mr}function zx(t){return(t&t-1)===0&&t!==0}function Hx(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function Vx(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Gx(t,e,n,i,a){const s=Math.cos,r=Math.sin,o=s(n/2),l=r(n/2),c=s((e+i)/2),u=r((e+i)/2),d=s((e-i)/2),f=r((e-i)/2),h=s((i-e)/2),_=r((i-e)/2);switch(a){case"XYX":t.set(o*u,l*d,l*f,o*c);break;case"YZY":t.set(l*f,o*u,l*d,o*c);break;case"ZXZ":t.set(l*d,l*f,o*u,o*c);break;case"XZX":t.set(o*u,l*_,l*h,o*c);break;case"YXY":t.set(l*h,o*u,l*_,o*c);break;case"ZYZ":t.set(l*_,l*h,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Nn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function it(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const ht={DEG2RAD:or,RAD2DEG:Mr,generateUUID:Xn,clamp:Ye,euclideanModulo:Yf,mapLinear:Cx,inverseLerp:Rx,lerp:lr,damp:Px,pingpong:Lx,smoothstep:Nx,smootherstep:Ix,randInt:Dx,randFloat:Fx,randFloatSpread:kx,seededRandom:Ox,degToRad:Ux,radToDeg:Bx,isPowerOfTwo:zx,ceilPowerOfTwo:Hx,floorPowerOfTwo:Vx,setQuaternionFromProperEuler:Gx,normalize:it,denormalize:Nn};class le{constructor(e=0,n=0){le.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jn{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],u=i[a+2],d=i[a+3];const f=s[r+0],h=s[r+1],_=s[r+2],g=s[r+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(o===1){e[n+0]=f,e[n+1]=h,e[n+2]=_,e[n+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-o;const p=l*f+c*h+u*_+d*g,b=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const C=Math.sqrt(w),M=Math.atan2(C,p*b);m=Math.sin(m*M)/C,o=Math.sin(o*M)/C}const y=o*b;if(l=l*m+f*y,c=c*m+h*y,u=u*m+_*y,d=d*m+g*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],d=s[r],f=s[r+1],h=s[r+2],_=s[r+3];return e[n]=o*_+u*d+l*h-c*f,e[n+1]=l*_+u*f+c*d-o*h,e[n+2]=c*_+u*h+o*f-l*d,e[n+3]=u*_-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),d=o(s/2),f=l(i/2),h=l(a/2),_=l(s/2);switch(r){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(r-a)*h}else if(i>o&&i>d){const h=2*Math.sqrt(1+i-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(a+r)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-i-d);this._w=(s-c)/h,this._x=(a+r)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-i-o);this._w=(r-a)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+r*o+a*c-s*l,this._y=a*u+r*l+s*o-i*c,this._z=s*u+r*c+i*l-a*o,this._w=r*u-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,a=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+a*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const h=1-n;return this._w=h*r+n*this._w,this._x=h*i+n*this._x,this._y=h*a+n*this._y,this._z=h*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=r*d+this._w*f,this._x=i*d+this._x*f,this._y=a*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,n=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(zh.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(zh.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),u=2*(o*n-s*a),d=2*(s*i-r*n);return this.x=n+l*c+r*d-o*u,this.y=i+l*u+o*c-s*d,this.z=a+l*d+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return bc.copy(this).projectOnVector(e),this.sub(bc)}reflect(e){return this.sub(bc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bc=new L,zh=new Jn;class $e{constructor(e,n,i,a,s,r,o,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],_=i[8],g=a[0],m=a[3],p=a[6],b=a[1],w=a[4],y=a[7],C=a[2],M=a[5],T=a[8];return s[0]=r*g+o*b+l*C,s[3]=r*m+o*w+l*M,s[6]=r*p+o*y+l*T,s[1]=c*g+u*b+d*C,s[4]=c*m+u*w+d*M,s[7]=c*p+u*y+d*T,s[2]=f*g+h*b+_*C,s[5]=f*m+h*w+_*M,s[8]=f*p+h*y+_*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return n*r*u-n*o*c-i*s*u+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*r-o*c,f=o*l-u*s,h=c*s-r*l,_=n*d+i*f+a*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(a*c-u*i)*g,e[2]=(o*i-a*r)*g,e[3]=f*g,e[4]=(u*n-a*l)*g,e[5]=(a*s-o*n)*g,e[6]=h*g,e[7]=(i*l-c*n)*g,e[8]=(r*n-i*s)*g,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(xc.makeScale(e,n)),this}rotate(e){return this.premultiply(xc.makeRotation(-e)),this}translate(e,n){return this.premultiply(xc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xc=new $e;function Hg(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ml(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function $x(){const t=Ml("canvas");return t.style.display="block",t}const Hh={};function Tr(t){t in Hh||(Hh[t]=!0,console.warn(t))}function Wx(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Vh=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gh=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xx(){const t={enabled:!0,workingColorSpace:Ss,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===lt&&(a.r=pi(a.r),a.g=pi(a.g),a.b=pi(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===lt&&(a.r=rs(a.r),a.g=rs(a.g),a.b=rs(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Ri?wl:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Tr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Tr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ss]:{primaries:e,whitePoint:i,transfer:wl,toXYZ:Vh,fromXYZ:Gh,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:Vh,fromXYZ:Gh,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),t}const et=Xx();function pi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function rs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Pa;class Yx{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Pa===void 0&&(Pa=Ml("canvas")),Pa.width=e.width,Pa.height=e.height;const a=Pa.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=Pa}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ml("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=pi(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(pi(n[i]/255)*255):n[i]=pi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qx=0;class qf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=Xn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(Sc(a[r].image)):s.push(Sc(a[r]))}else s=Sc(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function Sc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Yx.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kx=0;const wc=new L;class Kt extends Ma{constructor(e=Kt.DEFAULT_IMAGE,n=Kt.DEFAULT_MAPPING,i=fa,a=fa,s=$n,r=ha,o=In,l=Zn,c=Kt.DEFAULT_ANISOTROPY,u=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=Xn(),this.name="",this.source=new qf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(wc).x}get height(){return this.source.getSize(wc).y}get depth(){return this.source.getSize(wc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qu:e.x=e.x-Math.floor(e.x);break;case fa:e.x=e.x<0?0:1;break;case ed:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qu:e.y=e.y-Math.floor(e.y);break;case fa:e.y=e.y<0?0:1;break;case ed:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=Lg;Kt.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,n=0,i=0,a=1){Et.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const w=(c+1)/2,y=(h+1)/2,C=(p+1)/2,M=(u+f)/4,T=(d+g)/4,A=(_+m)/4;return w>y&&w>C?w<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(w),a=M/i,s=T/i):y>C?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=M/a,s=A/a):C<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(C),i=T/s,a=A/s),this.set(i,a,s,n),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jx extends Ma{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Et(0,0,e,n),this.scissorTest=!1,this.viewport=new Et(0,0,e,n);const a={width:e,height:n,depth:i.depth},s=new Kt(a);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:$n,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new qf(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ba extends jx{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Vg extends Kt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=fa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zx extends Kt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=fa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr{constructor(e=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Sn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Sn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Sn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Sn):Sn.fromBufferAttribute(s,r),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zr.copy(i.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bs),Jr.subVectors(this.max,Bs),La.subVectors(e.a,Bs),Na.subVectors(e.b,Bs),Ia.subVectors(e.c,Bs),yi.subVectors(Na,La),bi.subVectors(Ia,Na),Zi.subVectors(La,Ia);let n=[0,-yi.z,yi.y,0,-bi.z,bi.y,0,-Zi.z,Zi.y,yi.z,0,-yi.x,bi.z,0,-bi.x,Zi.z,0,-Zi.x,-yi.y,yi.x,0,-bi.y,bi.x,0,-Zi.y,Zi.x,0];return!Ec(n,La,Na,Ia,Jr)||(n=[1,0,0,0,1,0,0,0,1],!Ec(n,La,Na,Ia,Jr))?!1:(Qr.crossVectors(yi,bi),n=[Qr.x,Qr.y,Qr.z],Ec(n,La,Na,Ia,Jr))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ii=[new L,new L,new L,new L,new L,new L,new L,new L],Sn=new L,Zr=new Gr,La=new L,Na=new L,Ia=new L,yi=new L,bi=new L,Zi=new L,Bs=new L,Jr=new L,Qr=new L,Ji=new L;function Ec(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){Ji.fromArray(t,s);const o=a.x*Math.abs(Ji.x)+a.y*Math.abs(Ji.y)+a.z*Math.abs(Ji.z),l=e.dot(Ji),c=n.dot(Ji),u=i.dot(Ji);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Jx=new Gr,zs=new L,Mc=new L;class Jl{constructor(e=new L,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Jx.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const n=zs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(zs,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(Mc)),this.expandByPoint(zs.copy(e.center).sub(Mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ai=new L,Tc=new L,eo=new L,xi=new L,Ac=new L,to=new L,Cc=new L;class Kf{constructor(e=new L,n=new L(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ai.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,n),ai.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Tc.copy(e).add(n).multiplyScalar(.5),eo.copy(n).sub(e).normalize(),xi.copy(this.origin).sub(Tc);const s=e.distanceTo(n)*.5,r=-this.direction.dot(eo),o=xi.dot(this.direction),l=-xi.dot(eo),c=xi.lengthSq(),u=Math.abs(1-r*r);let d,f,h,_;if(u>0)if(d=r*l-o,f=r*o-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+r*f+2*o)+f*(r*d+f+2*l)+c}else f=s,d=Math.max(0,-(r*f+o)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(r*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-r*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(r*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=r>0?-s:s,d=Math.max(0,-(r*f+o)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Tc).addScaledVector(eo,f),h}intersectSphere(e,n){ai.subVectors(e.center,this.origin);const i=ai.dot(this.direction),a=ai.dot(ai)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,a=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,a=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,r=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,r=(e.min.y-f.y)*u),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,n,i,a,s){Ac.subVectors(n,e),to.subVectors(i,e),Cc.crossVectors(Ac,to);let r=this.direction.dot(Cc),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;xi.subVectors(this.origin,e);const l=o*this.direction.dot(to.crossVectors(xi,to));if(l<0)return null;const c=o*this.direction.dot(Ac.cross(xi));if(c<0||l+c>r)return null;const u=-o*xi.dot(Cc);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,n,i,a,s,r,o,l,c,u,d,f,h,_,g,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,u,d,f,h,_,g,m)}set(e,n,i,a,s,r,o,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=n,p[8]=i,p[12]=a,p[1]=s,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,a=1/Da.setFromMatrixColumn(e,0).length(),s=1/Da.setFromMatrixColumn(e,1).length(),r=1/Da.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=r*u,h=r*d,_=o*u,g=o*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=h+_*c,n[5]=f-g*c,n[9]=-o*l,n[2]=g-f*c,n[6]=_+h*c,n[10]=r*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;n[0]=f+g*o,n[4]=_*o-h,n[8]=r*c,n[1]=r*d,n[5]=r*u,n[9]=-o,n[2]=h*o-_,n[6]=g+f*o,n[10]=r*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;n[0]=f-g*o,n[4]=-r*d,n[8]=_+h*o,n[1]=h+_*o,n[5]=r*u,n[9]=g-f*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const f=r*u,h=r*d,_=o*u,g=o*d;n[0]=l*u,n[4]=_*c-h,n[8]=f*c+g,n[1]=l*d,n[5]=g*c+f,n[9]=h*c-_,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const f=r*l,h=r*c,_=o*l,g=o*c;n[0]=l*u,n[4]=g-f*d,n[8]=_*d+h,n[1]=d,n[5]=r*u,n[9]=-o*u,n[2]=-c*u,n[6]=h*d+_,n[10]=f-g*d}else if(e.order==="XZY"){const f=r*l,h=r*c,_=o*l,g=o*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+g,n[5]=r*u,n[9]=h*d-_,n[2]=_*d-h,n[6]=o*u,n[10]=g*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qx,e,eS)}lookAt(e,n,i){const a=this.elements;return on.subVectors(e,n),on.lengthSq()===0&&(on.z=1),on.normalize(),Si.crossVectors(i,on),Si.lengthSq()===0&&(Math.abs(i.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),Si.crossVectors(i,on)),Si.normalize(),no.crossVectors(on,Si),a[0]=Si.x,a[4]=no.x,a[8]=on.x,a[1]=Si.y,a[5]=no.y,a[9]=on.y,a[2]=Si.z,a[6]=no.z,a[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],_=i[2],g=i[6],m=i[10],p=i[14],b=i[3],w=i[7],y=i[11],C=i[15],M=a[0],T=a[4],A=a[8],v=a[12],x=a[1],R=a[5],I=a[9],H=a[13],B=a[2],G=a[6],U=a[10],X=a[14],V=a[3],Q=a[7],fe=a[11],Y=a[15];return s[0]=r*M+o*x+l*B+c*V,s[4]=r*T+o*R+l*G+c*Q,s[8]=r*A+o*I+l*U+c*fe,s[12]=r*v+o*H+l*X+c*Y,s[1]=u*M+d*x+f*B+h*V,s[5]=u*T+d*R+f*G+h*Q,s[9]=u*A+d*I+f*U+h*fe,s[13]=u*v+d*H+f*X+h*Y,s[2]=_*M+g*x+m*B+p*V,s[6]=_*T+g*R+m*G+p*Q,s[10]=_*A+g*I+m*U+p*fe,s[14]=_*v+g*H+m*X+p*Y,s[3]=b*M+w*x+y*B+C*V,s[7]=b*T+w*R+y*G+C*Q,s[11]=b*A+w*I+y*U+C*fe,s[15]=b*v+w*H+y*X+C*Y,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-a*c*d-s*o*f+i*c*f+a*o*h-i*l*h)+g*(+n*l*h-n*c*f+s*r*f-a*r*h+a*c*u-s*l*u)+m*(+n*c*d-n*o*h-s*r*d+i*r*h+s*o*u-i*c*u)+p*(-a*o*u-n*l*d+n*o*f+a*r*d-i*r*f+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],b=d*m*c-g*f*c+g*l*h-o*m*h-d*l*p+o*f*p,w=_*f*c-u*m*c-_*l*h+r*m*h+u*l*p-r*f*p,y=u*g*c-_*d*c+_*o*h-r*g*h-u*o*p+r*d*p,C=_*d*l-u*g*l-_*o*f+r*g*f+u*o*m-r*d*m,M=n*b+i*w+a*y+s*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=b*T,e[1]=(g*f*s-d*m*s-g*a*h+i*m*h+d*a*p-i*f*p)*T,e[2]=(o*m*s-g*l*s+g*a*c-i*m*c-o*a*p+i*l*p)*T,e[3]=(d*l*s-o*f*s-d*a*c+i*f*c+o*a*h-i*l*h)*T,e[4]=w*T,e[5]=(u*m*s-_*f*s+_*a*h-n*m*h-u*a*p+n*f*p)*T,e[6]=(_*l*s-r*m*s-_*a*c+n*m*c+r*a*p-n*l*p)*T,e[7]=(r*f*s-u*l*s+u*a*c-n*f*c-r*a*h+n*l*h)*T,e[8]=y*T,e[9]=(_*d*s-u*g*s-_*i*h+n*g*h+u*i*p-n*d*p)*T,e[10]=(r*g*s-_*o*s+_*i*c-n*g*c-r*i*p+n*o*p)*T,e[11]=(u*o*s-r*d*s-u*i*c+n*d*c+r*i*h-n*o*h)*T,e[12]=C*T,e[13]=(u*g*a-_*d*a+_*i*f-n*g*f-u*i*m+n*d*m)*T,e[14]=(_*o*a-r*g*a-_*i*l+n*g*l+r*i*m-n*o*m)*T,e[15]=(r*d*a-u*o*a+u*i*l-n*d*l-r*i*f+n*o*f)*T,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,u=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*r,0,c*l-a*o,u*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,u=r+r,d=o+o,f=s*c,h=s*u,_=s*d,g=r*u,m=r*d,p=o*d,b=l*c,w=l*u,y=l*d,C=i.x,M=i.y,T=i.z;return a[0]=(1-(g+p))*C,a[1]=(h+y)*C,a[2]=(_-w)*C,a[3]=0,a[4]=(h-y)*M,a[5]=(1-(f+p))*M,a[6]=(m+b)*M,a[7]=0,a[8]=(_+w)*T,a[9]=(m-b)*T,a[10]=(1-(f+g))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;let s=Da.set(a[0],a[1],a[2]).length();const r=Da.set(a[4],a[5],a[6]).length(),o=Da.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],wn.copy(this);const c=1/s,u=1/r,d=1/o;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=u,wn.elements[5]*=u,wn.elements[6]*=u,wn.elements[8]*=d,wn.elements[9]*=d,wn.elements[10]*=d,n.setFromRotationMatrix(wn),i.x=s,i.y=r,i.z=o,this}makePerspective(e,n,i,a,s,r,o=Wn,l=!1){const c=this.elements,u=2*s/(n-e),d=2*s/(i-a),f=(n+e)/(n-e),h=(i+a)/(i-a);let _,g;if(l)_=s/(r-s),g=r*s/(r-s);else if(o===Wn)_=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===El)_=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=Wn,l=!1){const c=this.elements,u=2/(n-e),d=2/(i-a),f=-(n+e)/(n-e),h=-(i+a)/(i-a);let _,g;if(l)_=1/(r-s),g=r/(r-s);else if(o===Wn)_=-2/(r-s),g=-(r+s)/(r-s);else if(o===El)_=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Da=new L,wn=new vt,Qx=new L(0,0,0),eS=new L(1,1,1),Si=new L,no=new L,on=new L,$h=new vt,Wh=new Jn;class On{constructor(e=0,n=0,i=0,a=On.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],u=a[9],d=a[2],f=a[6],h=a[10];switch(n){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return $h.makeRotationFromQuaternion(e),this.setFromRotationMatrix($h,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Wh.setFromEuler(this),this.setFromQuaternion(Wh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}On.DEFAULT_ORDER="XYZ";class Gg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tS=0;const Xh=new L,Fa=new Jn,si=new vt,io=new L,Hs=new L,nS=new L,iS=new Jn,Yh=new L(1,0,0),qh=new L(0,1,0),Kh=new L(0,0,1),jh={type:"added"},aS={type:"removed"},ka={type:"childadded",child:null},Rc={type:"childremoved",child:null};class Pt extends Ma{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tS++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new L,n=new On,i=new Jn,a=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new vt},normalMatrix:{value:new $e}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Fa.setFromAxisAngle(e,n),this.quaternion.multiply(Fa),this}rotateOnWorldAxis(e,n){return Fa.setFromAxisAngle(e,n),this.quaternion.premultiply(Fa),this}rotateX(e){return this.rotateOnAxis(Yh,e)}rotateY(e){return this.rotateOnAxis(qh,e)}rotateZ(e){return this.rotateOnAxis(Kh,e)}translateOnAxis(e,n){return Xh.copy(e).applyQuaternion(this.quaternion),this.position.add(Xh.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Yh,e)}translateY(e){return this.translateOnAxis(qh,e)}translateZ(e){return this.translateOnAxis(Kh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?io.copy(e):io.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(Hs,io,this.up):si.lookAt(io,Hs,this.up),this.quaternion.setFromRotationMatrix(si),a&&(si.extractRotation(a.matrixWorld),Fa.setFromRotationMatrix(si),this.quaternion.premultiply(Fa.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jh),ka.child=e,this.dispatchEvent(ka),ka.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(aS),Rc.child=e,this.dispatchEvent(Rc),Rc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jh),ka.child=e,this.dispatchEvent(ka),ka.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,e,nS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,iS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),d=r(e.shapes),f=r(e.skeletons),h=r(e.animations),_=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),_.length>0&&(i.nodes=_)}return i.object=a,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Pt.DEFAULT_UP=new L(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new L,ri=new L,Pc=new L,oi=new L,Oa=new L,Ua=new L,Zh=new L,Lc=new L,Nc=new L,Ic=new L,Dc=new Et,Fc=new Et,kc=new Et;class bn{constructor(e=new L,n=new L,i=new L){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),En.subVectors(e,n),a.cross(En);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){En.subVectors(a,n),ri.subVectors(i,n),Pc.subVectors(e,n);const r=En.dot(En),o=En.dot(ri),l=En.dot(Pc),c=ri.dot(ri),u=ri.dot(Pc),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,_=(r*u-o*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,oi.x),l.addScaledVector(r,oi.y),l.addScaledVector(o,oi.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return Dc.setScalar(0),Fc.setScalar(0),kc.setScalar(0),Dc.fromBufferAttribute(e,n),Fc.fromBufferAttribute(e,i),kc.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Dc,s.x),r.addScaledVector(Fc,s.y),r.addScaledVector(kc,s.z),r}static isFrontFacing(e,n,i,a){return En.subVectors(i,n),ri.subVectors(e,n),En.cross(ri).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),En.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return bn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return bn.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;Oa.subVectors(a,i),Ua.subVectors(s,i),Lc.subVectors(e,i);const l=Oa.dot(Lc),c=Ua.dot(Lc);if(l<=0&&c<=0)return n.copy(i);Nc.subVectors(e,a);const u=Oa.dot(Nc),d=Ua.dot(Nc);if(u>=0&&d<=u)return n.copy(a);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return r=l/(l-u),n.copy(i).addScaledVector(Oa,r);Ic.subVectors(e,s);const h=Oa.dot(Ic),_=Ua.dot(Ic);if(_>=0&&h<=_)return n.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(Ua,o);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return Zh.subVectors(s,a),o=(d-u)/(d-u+(h-_)),n.copy(a).addScaledVector(Zh,o);const p=1/(m+g+f);return r=g*p,o=f*p,n.copy(i).addScaledVector(Oa,r).addScaledVector(Ua,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $g={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},ao={h:0,s:0,l:0};function Oc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ke{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=et.workingColorSpace){return this.r=e,this.g=n,this.b=i,et.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=et.workingColorSpace){if(e=Yf(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Oc(r,s,e+1/3),this.g=Oc(r,s,e),this.b=Oc(r,s,e-1/3)}return et.colorSpaceToWorking(this,a),this}setStyle(e,n=Gt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Gt){const i=$g[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pi(e.r),this.g=pi(e.g),this.b=pi(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return et.workingToColorSpace(Ht.copy(this),e),Math.round(Ye(Ht.r*255,0,255))*65536+Math.round(Ye(Ht.g*255,0,255))*256+Math.round(Ye(Ht.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=et.workingColorSpace){et.workingToColorSpace(Ht.copy(this),n);const i=Ht.r,a=Ht.g,s=Ht.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=et.workingColorSpace){return et.workingToColorSpace(Ht.copy(this),n),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Gt){et.workingToColorSpace(Ht.copy(this),e);const n=Ht.r,i=Ht.g,a=Ht.b;return e!==Gt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+n,wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(wi),e.getHSL(ao);const i=lr(wi.h,ao.h,n),a=lr(wi.s,ao.s,n),s=lr(wi.l,ao.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ke;Ke.NAMES=$g;let sS=0;class gi extends Ma{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sS++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=ss,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vu,this.blendDst=Gu,this.blendEquation=ca,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ra,this.stencilZFail=Ra,this.stencilZPass=Ra,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(i.blending=this.blending),this.side!==zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Vu&&(i.blendSrc=this.blendSrc),this.blendDst!==Gu&&(i.blendDst=this.blendDst),this.blendEquation!==ca&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ra&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ra&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ra&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class at extends gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new L,so=new le;let rS=0;class kn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rS++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Rd,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)so.fromBufferAttribute(this,n),so.applyMatrix3(e),this.setXY(n,so.x,so.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix3(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix4(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyNormalMatrix(e),this.setXYZ(n,At.x,At.y,At.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.transformDirection(e),this.setXYZ(n,At.x,At.y,At.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=it(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Nn(n,this.array)),n}setX(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Nn(n,this.array)),n}setY(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Nn(n,this.array)),n}setZ(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Nn(n,this.array)),n}setW(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=it(n,this.array),i=it(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=it(n,this.array),i=it(i,this.array),a=it(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=it(n,this.array),i=it(i,this.array),a=it(a,this.array),s=it(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rd&&(e.usage=this.usage),e}}class Wg extends kn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Xg extends kn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class nt extends kn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let oS=0;const _n=new vt,Uc=new Pt,Ba=new L,ln=new Gr,Vs=new Gr,Ft=new L;class Tt extends Ma{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oS++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hg(e)?Xg:Wg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new $e().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,n,i){return _n.makeTranslation(e,n,i),this.applyMatrix4(_n),this}scale(e,n,i){return _n.makeScale(e,n,i),this.applyMatrix4(_n),this}lookAt(e){return Uc.lookAt(e),Uc.updateMatrix(),this.applyMatrix4(Uc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ba).negate(),this.translate(Ba.x,Ba.y,Ba.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new nt(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(ln.min,Vs.min),ln.expandByPoint(Ft),Ft.addVectors(ln.max,Vs.max),ln.expandByPoint(Ft)):(ln.expandByPoint(Vs.min),ln.expandByPoint(Vs.max))}ln.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Ft.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Ft));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ft.fromBufferAttribute(o,c),l&&(Ba.fromBufferAttribute(e,c),Ft.add(Ba)),a=Math.max(a,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,u=new L,d=new L,f=new le,h=new le,_=new le,g=new L,m=new L;function p(A,v,x){c.fromBufferAttribute(i,A),u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,x),f.fromBufferAttribute(s,A),h.fromBufferAttribute(s,v),_.fromBufferAttribute(s,x),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const R=1/(h.x*_.y-_.x*h.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(R),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(R),o[A].add(g),o[v].add(g),o[x].add(g),l[A].add(m),l[v].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let A=0,v=b.length;A<v;++A){const x=b[A],R=x.start,I=x.count;for(let H=R,B=R+I;H<B;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const w=new L,y=new L,C=new L,M=new L;function T(A){C.fromBufferAttribute(a,A),M.copy(C);const v=o[A];w.copy(v),w.sub(C.multiplyScalar(C.dot(v))).normalize(),y.crossVectors(M,v);const R=y.dot(l[A])<0?-1:1;r.setXYZW(A,w.x,w.y,w.z,R)}for(let A=0,v=b.length;A<v;++A){const x=b[A],R=x.start,I=x.count;for(let H=R,B=R+I;H<B;H+=3)T(e.getX(H+0)),T(e.getX(H+1)),T(e.getX(H+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);a.fromBufferAttribute(n,_),s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,m),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=n.count;f<h;f+=3)a.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),r.fromBufferAttribute(n,f+2),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?h=l[g]*o.data.stride+o.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new kn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Tt,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,i);l.push(h)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(a[l]=u,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const u=a[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jh=new vt,Qi=new Kf,ro=new Jl,Qh=new L,oo=new L,lo=new L,co=new L,Bc=new L,uo=new L,ep=new L,fo=new L;class ze extends Pt{constructor(e=new Tt,n=new at){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){uo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Bc.fromBufferAttribute(d,e),r?uo.addScaledVector(Bc,u):uo.addScaledVector(Bc.sub(n),u))}n.add(uo)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ro.copy(i.boundingSphere),ro.applyMatrix4(s),Qi.copy(e.ray).recast(e.near),!(ro.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(ro,Qh)===null||Qi.origin.distanceToSquared(Qh)>(e.far-e.near)**2))&&(Jh.copy(s).invert(),Qi.copy(e.ray).applyMatrix4(Jh),!(i.boundingBox!==null&&Qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Qi)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=r[m.materialIndex],b=Math.max(m.start,h.start),w=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let y=b,C=w;y<C;y+=3){const M=o.getX(y),T=o.getX(y+1),A=o.getX(y+2);a=ho(this,p,e,i,c,u,d,M,T,A),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const _=Math.max(0,h.start),g=Math.min(o.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=o.getX(m),w=o.getX(m+1),y=o.getX(m+2);a=ho(this,r,e,i,c,u,d,b,w,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=r[m.materialIndex],b=Math.max(m.start,h.start),w=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let y=b,C=w;y<C;y+=3){const M=y,T=y+1,A=y+2;a=ho(this,p,e,i,c,u,d,M,T,A),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=m,w=m+1,y=m+2;a=ho(this,r,e,i,c,u,d,b,w,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function lS(t,e,n,i,a,s,r,o){let l;if(e.side===an?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===zi,o),l===null)return null;fo.copy(o),fo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(fo);return c<n.near||c>n.far?null:{distance:c,point:fo.clone(),object:t}}function ho(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,oo),t.getVertexPosition(l,lo),t.getVertexPosition(c,co);const u=lS(t,e,n,i,oo,lo,co,ep);if(u){const d=new L;bn.getBarycoord(ep,oo,lo,co,d),a&&(u.uv=bn.getInterpolatedAttribute(a,o,l,c,d,new le)),s&&(u.uv1=bn.getInterpolatedAttribute(s,o,l,c,d,new le)),r&&(u.normal=bn.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};bn.getNormal(oo,lo,co,f.normal),u.face=f,u.barycoord=d}return u}class Ta extends Tt{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,i,n,e,r,s,0),_("z","y","x",1,-1,i,n,-e,r,s,1),_("x","z","y",1,1,e,i,n,a,r,2),_("x","z","y",1,-1,e,i,-n,a,r,3),_("x","y","z",1,-1,e,n,i,a,s,4),_("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(u,3)),this.setAttribute("uv",new nt(d,2));function _(g,m,p,b,w,y,C,M,T,A,v){const x=y/T,R=C/A,I=y/2,H=C/2,B=M/2,G=T+1,U=A+1;let X=0,V=0;const Q=new L;for(let fe=0;fe<U;fe++){const Y=fe*R-H;for(let ue=0;ue<G;ue++){const Se=ue*x-I;Q[g]=Se*b,Q[m]=Y*w,Q[p]=B,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[m]=0,Q[p]=M>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(ue/T),d.push(1-fe/A),X+=1}}for(let fe=0;fe<A;fe++)for(let Y=0;Y<T;Y++){const ue=f+Y+G*fe,Se=f+Y+G*(fe+1),ye=f+(Y+1)+G*(fe+1),pe=f+(Y+1)+G*fe;l.push(ue,Se,pe),l.push(Se,ye,pe),V+=6}o.addGroup(h,V,v),h+=V,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ws(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone():Array.isArray(a)?e[n][i]=a.slice():e[n][i]=a}}return e}function qt(t){const e={};for(let n=0;n<t.length;n++){const i=ws(t[n]);for(const a in i)e[a]=i[a]}return e}function cS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Yg(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const uS={clone:ws,merge:qt};var dS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hi extends gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dS,this.fragmentShader=fS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ws(e.uniforms),this.uniformsGroups=cS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class qg extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new L,tp=new le,np=new le;class vn extends qg{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Mr*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mr*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z)}getViewSize(e,n){return this.getViewBounds(e,tp,np),n.subVectors(np,tp)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(or*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const za=-90,Ha=1;class hS extends Pt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new vn(za,Ha,e,n);a.layers=this.layers,this.add(a);const s=new vn(za,Ha,e,n);s.layers=this.layers,this.add(s);const r=new vn(za,Ha,e,n);r.layers=this.layers,this.add(r);const o=new vn(za,Ha,e,n);o.layers=this.layers,this.add(o);const l=new vn(za,Ha,e,n);l.layers=this.layers,this.add(l);const c=new vn(za,Ha,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===Wn)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===El)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(n,s),e.setRenderTarget(i,1,a),e.render(n,r),e.setRenderTarget(i,2,a),e.render(n,o),e.setRenderTarget(i,3,a),e.render(n,l),e.setRenderTarget(i,4,a),e.render(n,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,a),e.render(n,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Kg extends Kt{constructor(e=[],n=bs,i,a,s,r,o,l,c,u){super(e,n,i,a,s,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pS extends ba{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Kg(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Ta(5,5,5),s=new Hi({name:"CubemapFromEquirect",uniforms:ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:Li});s.uniforms.tEquirect.value=n;const r=new ze(a,s),o=n.minFilter;return n.minFilter===ha&&(n.minFilter=$n),new hS(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}class mt extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mS={type:"move"};class zc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const g of e.hand.values()){const m=n.getJointPose(g,i),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mS)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new mt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class _S extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class gS{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=Rd,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let a=0,s=this.stride;a<s;a++)this.array[e+a]=n.array[i+a];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new L;class Tl{constructor(e,n,i,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyMatrix4(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyNormalMatrix(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.transformDirection(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=Nn(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=it(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=Nn(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=Nn(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=Nn(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=Nn(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=it(n,this.array),i=it(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(n=it(n,this.array),i=it(i,this.array),a=it(a,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=it(n,this.array),i=it(i,this.array),a=it(a,this.array),s=it(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=a,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[a+s])}return new kn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Tl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jg extends gi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Va;const Gs=new L,Ga=new L,$a=new L,Wa=new le,$s=new le,Zg=new vt,po=new L,Ws=new L,mo=new L,ip=new le,Hc=new le,ap=new le;class Jg extends Pt{constructor(e=new jg){if(super(),this.isSprite=!0,this.type="Sprite",Va===void 0){Va=new Tt;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new gS(n,5);Va.setIndex([0,1,2,0,2,3]),Va.setAttribute("position",new Tl(i,3,0,!1)),Va.setAttribute("uv",new Tl(i,2,3,!1))}this.geometry=Va,this.material=e,this.center=new le(.5,.5),this.count=1}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ga.setFromMatrixScale(this.matrixWorld),Zg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$a.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ga.multiplyScalar(-$a.z);const i=this.material.rotation;let a,s;i!==0&&(s=Math.cos(i),a=Math.sin(i));const r=this.center;_o(po.set(-.5,-.5,0),$a,r,Ga,a,s),_o(Ws.set(.5,-.5,0),$a,r,Ga,a,s),_o(mo.set(.5,.5,0),$a,r,Ga,a,s),ip.set(0,0),Hc.set(1,0),ap.set(1,1);let o=e.ray.intersectTriangle(po,Ws,mo,!1,Gs);if(o===null&&(_o(Ws.set(-.5,.5,0),$a,r,Ga,a,s),Hc.set(0,1),o=e.ray.intersectTriangle(po,mo,Ws,!1,Gs),o===null))return;const l=e.ray.origin.distanceTo(Gs);l<e.near||l>e.far||n.push({distance:l,point:Gs.clone(),uv:bn.getInterpolation(Gs,po,Ws,mo,ip,Hc,ap,new le),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function _o(t,e,n,i,a,s){Wa.subVectors(t,n).addScalar(.5).multiply(i),a!==void 0?($s.x=s*Wa.x-a*Wa.y,$s.y=a*Wa.x+s*Wa.y):$s.copy(Wa),t.copy(e),t.x+=$s.x,t.y+=$s.y,t.applyMatrix4(Zg)}const Vc=new L,vS=new L,yS=new $e;class Ai{constructor(e=new L(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=Vc.subVectors(i,n).cross(vS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Vc),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||yS.getNormalMatrix(e),a=this.coplanarPoint(Vc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ea=new Jl,bS=new le(.5,.5),go=new L;class jf{constructor(e=new Ai,n=new Ai,i=new Ai,a=new Ai,s=new Ai,r=new Ai){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Wn,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],_=s[8],g=s[9],m=s[10],p=s[11],b=s[12],w=s[13],y=s[14],C=s[15];if(a[0].setComponents(c-r,h-u,p-_,C-b).normalize(),a[1].setComponents(c+r,h+u,p+_,C+b).normalize(),a[2].setComponents(c+o,h+d,p+g,C+w).normalize(),a[3].setComponents(c-o,h-d,p-g,C-w).normalize(),i)a[4].setComponents(l,f,m,y).normalize(),a[5].setComponents(c-l,h-f,p-m,C-y).normalize();else if(a[4].setComponents(c-l,h-f,p-m,C-y).normalize(),n===Wn)a[5].setComponents(c+l,h+f,p+m,C+y).normalize();else if(n===El)a[5].setComponents(l,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ea.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ea)}intersectsSprite(e){ea.center.set(0,0,0);const n=bS.distanceTo(e.center);return ea.radius=.7071067811865476+n,ea.applyMatrix4(e.matrixWorld),this.intersectsSphere(ea)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(go.x=a.normal.x>0?e.max.x:e.min.x,go.y=a.normal.y>0?e.max.y:e.min.y,go.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(go)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ql extends gi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Al=new L,Cl=new L,sp=new vt,Xs=new Kf,vo=new Jl,Gc=new L,rp=new L;class Zf extends Pt{constructor(e=new Tt,n=new Ql){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Al.fromBufferAttribute(n,a-1),Cl.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Al.distanceTo(Cl);e.setAttribute("lineDistance",new nt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vo.copy(i.boundingSphere),vo.applyMatrix4(a),vo.radius+=s,e.ray.intersectsSphere(vo)===!1)return;sp.copy(a).invert(),Xs.copy(e.ray).applyMatrix4(sp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),b=u.getX(g+1),w=yo(this,e,Xs,l,p,b,g);w&&n.push(w)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=yo(this,e,Xs,l,g,m,_-1);p&&n.push(p)}}else{const h=Math.max(0,r.start),_=Math.min(f.count,r.start+r.count);for(let g=h,m=_-1;g<m;g+=c){const p=yo(this,e,Xs,l,g,g+1,g);p&&n.push(p)}if(this.isLineLoop){const g=yo(this,e,Xs,l,_-1,h,_-1);g&&n.push(g)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function yo(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(Al.fromBufferAttribute(o,a),Cl.fromBufferAttribute(o,s),n.distanceSqToSegment(Al,Cl,Gc,rp)>i)return;Gc.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Gc);if(!(c<e.near||c>e.far))return{distance:c,point:rp.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}class ec extends Kt{constructor(e,n,i,a,s,r,o,l,c){super(e,n,i,a,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qg extends Kt{constructor(e,n,i=ya,a,s,r,o=Fn,l=Fn,c,u=wr,d=1){if(u!==wr&&u!==Er)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:d};super(f,a,s,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class ev extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qa extends Tt{constructor(e=1,n=32,i=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:a},n=Math.max(3,n);const s=[],r=[],o=[],l=[],c=new L,u=new le;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=n;d++,f+=3){const h=i+d/n*a;c.x=e*Math.cos(h),c.y=e*Math.sin(h),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[f]/e+1)/2,u.y=(r[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=n;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class tc extends Tt{constructor(e=1,n=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),s=Math.floor(s);const u=[],d=[],f=[],h=[];let _=0;const g=[],m=i/2;let p=0;b(),r===!1&&(e>0&&w(!0),n>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(f,3)),this.setAttribute("uv",new nt(h,2));function b(){const y=new L,C=new L;let M=0;const T=(n-e)/i;for(let A=0;A<=s;A++){const v=[],x=A/s,R=x*(n-e)+e;for(let I=0;I<=a;I++){const H=I/a,B=H*l+o,G=Math.sin(B),U=Math.cos(B);C.x=R*G,C.y=-x*i+m,C.z=R*U,d.push(C.x,C.y,C.z),y.set(G,T,U).normalize(),f.push(y.x,y.y,y.z),h.push(H,1-x),v.push(_++)}g.push(v)}for(let A=0;A<a;A++)for(let v=0;v<s;v++){const x=g[v][A],R=g[v+1][A],I=g[v+1][A+1],H=g[v][A+1];(e>0||v!==0)&&(u.push(x,R,H),M+=3),(n>0||v!==s-1)&&(u.push(R,I,H),M+=3)}c.addGroup(p,M,0),p+=M}function w(y){const C=_,M=new le,T=new L;let A=0;const v=y===!0?e:n,x=y===!0?1:-1;for(let I=1;I<=a;I++)d.push(0,m*x,0),f.push(0,x,0),h.push(.5,.5),_++;const R=_;for(let I=0;I<=a;I++){const B=I/a*l+o,G=Math.cos(B),U=Math.sin(B);T.x=v*U,T.y=m*x,T.z=v*G,d.push(T.x,T.y,T.z),f.push(0,x,0),M.x=G*.5+.5,M.y=U*.5*x+.5,h.push(M.x,M.y),_++}for(let I=0;I<a;I++){const H=C+I,B=R+I;y===!0?u.push(B,B+1,H):u.push(B+1,B,H),A+=3}c.addGroup(p,A,y===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ar extends tc{constructor(e=1,n=1,i=32,a=1,s=!1,r=0,o=Math.PI*2){super(0,e,n,i,a,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:a,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Ar(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,a=this.getPoint(0),s=0;n.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),s+=i.distanceTo(a),n.push(s),a=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let a=0;const s=i.length;let r;n?r=n:r=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);const u=i[a],f=i[a+1]-u,h=(r-u)/f;return(a+h)/(s-1)}getTangent(e,n){let a=e-1e-4,s=e+1e-4;a<0&&(a=0),s>1&&(s=1);const r=this.getPoint(a),o=this.getPoint(s),l=n||(r.isVector2?new le:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new L,a=[],s=[],r=[],o=new L,l=new vt;for(let h=0;h<=e;h++){const _=h/e;a[h]=this.getTangentAt(_,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(a[0].x),d=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),r[h]=r[h-1].clone(),o.crossVectors(a[h-1],a[h]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Ye(a[h-1].dot(a[h]),-1,1));s[h].applyMatrix4(l.makeRotationAxis(o,_))}r[h].crossVectors(a[h],s[h])}if(n===!0){let h=Math.acos(Ye(s[0].dot(s[e]),-1,1));h/=e,a[0].dot(o.crossVectors(s[0],s[e]))>0&&(h=-h);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(a[_],h*_)),r[_].crossVectors(a[_],s[_])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Jf extends Qn{constructor(e=0,n=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,n=new le){const i=n,a=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,h=c-this.aY;l=f*u-h*d+this.aX,c=f*d+h*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xS extends Jf{constructor(e,n,i,a,s,r){super(e,n,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Qf(){let t=0,e=0,n=0,i=0;function a(s,r,o,l){t=s,e=o,n=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,u,d){let f=(r-s)/c-(o-s)/(c+u)+(o-r)/u,h=(o-r)/u-(l-r)/(u+d)+(l-o)/d;f*=u,h*=u,a(r,o,f,h)},calc:function(s){const r=s*s,o=r*s;return t+e*s+n*r+i*o}}}const bo=new L,$c=new Qf,Wc=new Qf,Xc=new Qf;class SS extends Qn{constructor(e=[],n=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=a}getPoint(e,n=new L){const i=n,a=this.points,s=a.length,r=(s-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=a[(o-1)%s]:(bo.subVectors(a[0],a[1]).add(a[0]),c=bo);const d=a[o%s],f=a[(o+1)%s];if(this.closed||o+2<s?u=a[(o+2)%s]:(bo.subVectors(a[s-1],a[s-2]).add(a[s-1]),u=bo),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(f),h),m=Math.pow(f.distanceToSquared(u),h);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),$c.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,_,g,m),Wc.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,_,g,m),Xc.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&($c.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Wc.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Xc.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set($c.calc(l),Wc.calc(l),Xc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const a=this.points[n];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(new L().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function op(t,e,n,i,a){const s=(i-e)*.5,r=(a-n)*.5,o=t*t,l=t*o;return(2*n-2*i+s+r)*l+(-3*n+3*i-2*s-r)*o+s*t+n}function wS(t,e){const n=1-t;return n*n*e}function ES(t,e){return 2*(1-t)*t*e}function MS(t,e){return t*t*e}function cr(t,e,n,i){return wS(t,e)+ES(t,n)+MS(t,i)}function TS(t,e){const n=1-t;return n*n*n*e}function AS(t,e){const n=1-t;return 3*n*n*t*e}function CS(t,e){return 3*(1-t)*t*t*e}function RS(t,e){return t*t*t*e}function ur(t,e,n,i,a){return TS(t,e)+AS(t,n)+CS(t,i)+RS(t,a)}class tv extends Qn{constructor(e=new le,n=new le,i=new le,a=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=a}getPoint(e,n=new le){const i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(ur(e,a.x,s.x,r.x,o.x),ur(e,a.y,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class PS extends Qn{constructor(e=new L,n=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=a}getPoint(e,n=new L){const i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(ur(e,a.x,s.x,r.x,o.x),ur(e,a.y,s.y,r.y,o.y),ur(e,a.z,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nv extends Qn{constructor(e=new le,n=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new le){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new le){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class LS extends Qn{constructor(e=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new L){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iv extends Qn{constructor(e=new le,n=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new le){const i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(cr(e,a.x,s.x,r.x),cr(e,a.y,s.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class NS extends Qn{constructor(e=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new L){const i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(cr(e,a.x,s.x,r.x),cr(e,a.y,s.y,r.y),cr(e,a.z,s.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class av extends Qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new le){const i=n,a=this.points,s=(a.length-1)*e,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],u=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(op(o,l.x,c.x,u.x,d.x),op(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const a=this.points[n];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(new le().fromArray(a))}return this}}var lp=Object.freeze({__proto__:null,ArcCurve:xS,CatmullRomCurve3:SS,CubicBezierCurve:tv,CubicBezierCurve3:PS,EllipseCurve:Jf,LineCurve:nv,LineCurve3:LS,QuadraticBezierCurve:iv,QuadraticBezierCurve3:NS,SplineCurve:av});class IS extends Qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new lp[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),a=this.getCurveLengths();let s=0;for(;s<a.length;){if(a[s]>=i){const r=a[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,a=this.curves.length;i<a;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let a=0,s=this.curves;a<s.length;a++){const r=s[a],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const a=e.curves[n];this.curves.push(a.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const a=this.curves[n];e.curves.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const a=e.curves[n];this.curves.push(new lp[a.type]().fromJSON(a))}return this}}class cp extends IS{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new nv(this.currentPoint.clone(),new le(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,a){const s=new iv(this.currentPoint.clone(),new le(e,n),new le(i,a));return this.curves.push(s),this.currentPoint.set(i,a),this}bezierCurveTo(e,n,i,a,s,r){const o=new tv(this.currentPoint.clone(),new le(e,n),new le(i,a),new le(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new av(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,a,s,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,n+l,i,a,s,r),this}absarc(e,n,i,a,s,r){return this.absellipse(e,n,i,i,a,s,r),this}ellipse(e,n,i,a,s,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,n+u,i,a,s,r,o,l),this}absellipse(e,n,i,a,s,r,o,l){const c=new Jf(e,n,i,a,s,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class eh extends cp{constructor(e){super(e),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,a=this.holes.length;i<a;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const a=e.holes[n];this.holes.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const a=this.holes[n];e.holes.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const a=e.holes[n];this.holes.push(new cp().fromJSON(a))}return this}}function DS(t,e,n=2){const i=e&&e.length,a=i?e[0]*n:t.length;let s=sv(t,0,a,n,!0);const r=[];if(!s||s.next===s.prev)return r;let o,l,c;if(i&&(s=BS(t,e,s,n)),t.length>80*n){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let f=n;f<a;f+=n){const h=t[f],_=t[f+1];h<o&&(o=h),_<l&&(l=_),h>u&&(u=h),_>d&&(d=_)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return Cr(s,r,n,o,l,c,0),r}function sv(t,e,n,i,a){let s;if(a===jS(t,e,n,i)>0)for(let r=e;r<n;r+=i)s=up(r/i|0,t[r],t[r+1],s);else for(let r=n-i;r>=e;r-=i)s=up(r/i|0,t[r],t[r+1],s);return s&&Es(s,s.next)&&(Pr(s),s=s.next),s}function xa(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(Es(n,n.next)||xt(n.prev,n,n.next)===0)){if(Pr(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Cr(t,e,n,i,a,s,r){if(!t)return;!r&&s&&$S(t,i,a,s);let o=t;for(;t.prev!==t.next;){const l=t.prev,c=t.next;if(s?kS(t,i,a,s):FS(t)){e.push(l.i,t.i,c.i),Pr(t),t=c.next,o=c.next;continue}if(t=c,t===o){r?r===1?(t=OS(xa(t),e),Cr(t,e,n,i,a,s,2)):r===2&&US(t,e,n,i,a,s):Cr(xa(t),e,n,i,a,s,1);break}}}function FS(t){const e=t.prev,n=t,i=t.next;if(xt(e,n,i)>=0)return!1;const a=e.x,s=n.x,r=i.x,o=e.y,l=n.y,c=i.y,u=Math.min(a,s,r),d=Math.min(o,l,c),f=Math.max(a,s,r),h=Math.max(o,l,c);let _=i.next;for(;_!==e;){if(_.x>=u&&_.x<=f&&_.y>=d&&_.y<=h&&Ks(a,o,s,l,r,c,_.x,_.y)&&xt(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function kS(t,e,n,i){const a=t.prev,s=t,r=t.next;if(xt(a,s,r)>=0)return!1;const o=a.x,l=s.x,c=r.x,u=a.y,d=s.y,f=r.y,h=Math.min(o,l,c),_=Math.min(u,d,f),g=Math.max(o,l,c),m=Math.max(u,d,f),p=Pd(h,_,e,n,i),b=Pd(g,m,e,n,i);let w=t.prevZ,y=t.nextZ;for(;w&&w.z>=p&&y&&y.z<=b;){if(w.x>=h&&w.x<=g&&w.y>=_&&w.y<=m&&w!==a&&w!==r&&Ks(o,u,l,d,c,f,w.x,w.y)&&xt(w.prev,w,w.next)>=0||(w=w.prevZ,y.x>=h&&y.x<=g&&y.y>=_&&y.y<=m&&y!==a&&y!==r&&Ks(o,u,l,d,c,f,y.x,y.y)&&xt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;w&&w.z>=p;){if(w.x>=h&&w.x<=g&&w.y>=_&&w.y<=m&&w!==a&&w!==r&&Ks(o,u,l,d,c,f,w.x,w.y)&&xt(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;y&&y.z<=b;){if(y.x>=h&&y.x<=g&&y.y>=_&&y.y<=m&&y!==a&&y!==r&&Ks(o,u,l,d,c,f,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function OS(t,e){let n=t;do{const i=n.prev,a=n.next.next;!Es(i,a)&&ov(i,n,n.next,a)&&Rr(i,a)&&Rr(a,i)&&(e.push(i.i,n.i,a.i),Pr(n),Pr(n.next),n=t=a),n=n.next}while(n!==t);return xa(n)}function US(t,e,n,i,a,s){let r=t;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&YS(r,o)){let l=lv(r,o);r=xa(r,r.next),l=xa(l,l.next),Cr(r,e,n,i,a,s,0),Cr(l,e,n,i,a,s,0);return}o=o.next}r=r.next}while(r!==t)}function BS(t,e,n,i){const a=[];for(let s=0,r=e.length;s<r;s++){const o=e[s]*i,l=s<r-1?e[s+1]*i:t.length,c=sv(t,o,l,i,!1);c===c.next&&(c.steiner=!0),a.push(XS(c))}a.sort(zS);for(let s=0;s<a.length;s++)n=HS(a[s],n);return n}function zS(t,e){let n=t.x-e.x;if(n===0&&(n=t.y-e.y,n===0)){const i=(t.next.y-t.y)/(t.next.x-t.x),a=(e.next.y-e.y)/(e.next.x-e.x);n=i-a}return n}function HS(t,e){const n=VS(t,e);if(!n)return e;const i=lv(n,t);return xa(i,i.next),xa(n,n.next)}function VS(t,e){let n=e;const i=t.x,a=t.y;let s=-1/0,r;if(Es(t,n))return n;do{if(Es(t,n.next))return n.next;if(a<=n.y&&a>=n.next.y&&n.next.y!==n.y){const d=n.x+(a-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=i&&d>s&&(s=d,r=n.x<n.next.x?n:n.next,d===i))return r}n=n.next}while(n!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0;n=r;do{if(i>=n.x&&n.x>=l&&i!==n.x&&rv(a<c?i:s,a,l,c,a<c?s:i,a,n.x,n.y)){const d=Math.abs(a-n.y)/(i-n.x);Rr(n,t)&&(d<u||d===u&&(n.x>r.x||n.x===r.x&&GS(r,n)))&&(r=n,u=d)}n=n.next}while(n!==o);return r}function GS(t,e){return xt(t.prev,t,e.prev)<0&&xt(e.next,t,t.next)<0}function $S(t,e,n,i){let a=t;do a.z===0&&(a.z=Pd(a.x,a.y,e,n,i)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==t);a.prevZ.nextZ=null,a.prevZ=null,WS(a)}function WS(t){let e,n=1;do{let i=t,a;t=null;let s=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<n&&(o++,r=r.nextZ,!!r);c++);let l=n;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(a=i,i=i.nextZ,o--):(a=r,r=r.nextZ,l--),s?s.nextZ=a:t=a,a.prevZ=s,s=a;i=r}s.nextZ=null,n*=2}while(e>1);return t}function Pd(t,e,n,i,a){return t=(t-n)*a|0,e=(e-i)*a|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function XS(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function rv(t,e,n,i,a,s,r,o){return(a-r)*(e-o)>=(t-r)*(s-o)&&(t-r)*(i-o)>=(n-r)*(e-o)&&(n-r)*(s-o)>=(a-r)*(i-o)}function Ks(t,e,n,i,a,s,r,o){return!(t===r&&e===o)&&rv(t,e,n,i,a,s,r,o)}function YS(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!qS(t,e)&&(Rr(t,e)&&Rr(e,t)&&KS(t,e)&&(xt(t.prev,t,e.prev)||xt(t,e.prev,e))||Es(t,e)&&xt(t.prev,t,t.next)>0&&xt(e.prev,e,e.next)>0)}function xt(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function Es(t,e){return t.x===e.x&&t.y===e.y}function ov(t,e,n,i){const a=So(xt(t,e,n)),s=So(xt(t,e,i)),r=So(xt(n,i,t)),o=So(xt(n,i,e));return!!(a!==s&&r!==o||a===0&&xo(t,n,e)||s===0&&xo(t,i,e)||r===0&&xo(n,t,i)||o===0&&xo(n,e,i))}function xo(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function So(t){return t>0?1:t<0?-1:0}function qS(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&ov(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Rr(t,e){return xt(t.prev,t,t.next)<0?xt(t,e,t.next)>=0&&xt(t,t.prev,e)>=0:xt(t,e,t.prev)<0||xt(t,t.next,e)<0}function KS(t,e){let n=t,i=!1;const a=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&a<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function lv(t,e){const n=Ld(t.i,t.x,t.y),i=Ld(e.i,e.x,e.y),a=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=a,a.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function up(t,e,n,i){const a=Ld(t,e,n);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a}function Pr(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Ld(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function jS(t,e,n,i){let a=0;for(let s=e,r=n-i;s<n;s+=i)a+=(t[r]-t[s])*(t[s+1]+t[r+1]),r=s;return a}class ZS{static triangulate(e,n,i=2){return DS(e,n,i)}}class dr{static area(e){const n=e.length;let i=0;for(let a=n-1,s=0;s<n;a=s++)i+=e[a].x*e[s].y-e[s].x*e[a].y;return i*.5}static isClockWise(e){return dr.area(e)<0}static triangulateShape(e,n){const i=[],a=[],s=[];dp(e),fp(i,e);let r=e.length;n.forEach(dp);for(let l=0;l<n.length;l++)a.push(r),r+=n[l].length,fp(i,n[l]);const o=ZS.triangulate(i,a);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function dp(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function fp(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class tn extends Tt{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,d=e/o,f=n/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const b=p*f-r;for(let w=0;w<c;w++){const y=w*d-s;_.push(y,-b,0),g.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const w=b+c*p,y=b+c*(p+1),C=b+1+c*(p+1),M=b+1+c*p;h.push(w,y,M),h.push(y,C,M)}this.setIndex(h),this.setAttribute("position",new nt(_,3)),this.setAttribute("normal",new nt(g,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Aa extends Tt{constructor(e=.5,n=1,i=32,a=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:a,thetaStart:s,thetaLength:r},i=Math.max(3,i),a=Math.max(1,a);const o=[],l=[],c=[],u=[];let d=e;const f=(n-e)/a,h=new L,_=new le;for(let g=0;g<=a;g++){for(let m=0;m<=i;m++){const p=s+m/i*r;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),_.x=(h.x/n+1)/2,_.y=(h.y/n+1)/2,u.push(_.x,_.y)}d+=f}for(let g=0;g<a;g++){const m=g*(i+1);for(let p=0;p<i;p++){const b=p+m,w=b,y=b+i+1,C=b+i+2,M=b+1;o.push(w,y,M),o.push(y,C,M)}}this.setIndex(o),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(c,3)),this.setAttribute("uv",new nt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class nc extends Tt{constructor(e=new eh([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:n};const i=[],a=[],s=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(s,3)),this.setAttribute("uv",new nt(r,2));function c(u){const d=a.length/3,f=u.extractPoints(n);let h=f.shape;const _=f.holes;dr.isClockWise(h)===!1&&(h=h.reverse());for(let m=0,p=_.length;m<p;m++){const b=_[m];dr.isClockWise(b)===!0&&(_[m]=b.reverse())}const g=dr.triangulateShape(h,_);for(let m=0,p=_.length;m<p;m++){const b=_[m];h=h.concat(b)}for(let m=0,p=h.length;m<p;m++){const b=h[m];a.push(b.x,b.y,0),s.push(0,0,1),r.push(b.x,b.y)}for(let m=0,p=g.length;m<p;m++){const b=g[m],w=b[0]+d,y=b[1]+d,C=b[2]+d;i.push(w,y,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes;return JS(n,e)}static fromJSON(e,n){const i=[];for(let a=0,s=e.shapes.length;a<s;a++){const r=n[e.shapes[a]];i.push(r)}return new nc(i,e.curveSegments)}}function JS(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const a=t[n];e.shapes.push(a.uuid)}else e.shapes.push(t.uuid);return e}class Ms extends Tt{constructor(e=1,n=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],d=new L,f=new L,h=[],_=[],g=[],m=[];for(let p=0;p<=i;p++){const b=[],w=p/i;let y=0;p===0&&r===0?y=.5/n:p===i&&l===Math.PI&&(y=-.5/n);for(let C=0;C<=n;C++){const M=C/n;d.x=-e*Math.cos(a+M*s)*Math.sin(r+w*o),d.y=e*Math.cos(r+w*o),d.z=e*Math.sin(a+M*s)*Math.sin(r+w*o),_.push(d.x,d.y,d.z),f.copy(d).normalize(),g.push(f.x,f.y,f.z),m.push(M+y,1-w),b.push(c++)}u.push(b)}for(let p=0;p<i;p++)for(let b=0;b<n;b++){const w=u[p][b+1],y=u[p][b],C=u[p+1][b],M=u[p+1][b+1];(p!==0||r>0)&&h.push(w,y,M),(p!==i-1||l<Math.PI)&&h.push(y,C,M)}this.setIndex(h),this.setAttribute("position",new nt(_,3)),this.setAttribute("normal",new nt(g,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class th extends Tt{constructor(e=1,n=.4,i=12,a=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:a,arc:s},i=Math.floor(i),a=Math.floor(a);const r=[],o=[],l=[],c=[],u=new L,d=new L,f=new L;for(let h=0;h<=i;h++)for(let _=0;_<=a;_++){const g=_/a*s,m=h/i*Math.PI*2;d.x=(e+n*Math.cos(m))*Math.cos(g),d.y=(e+n*Math.cos(m))*Math.sin(g),d.z=n*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/a),c.push(h/i)}for(let h=1;h<=i;h++)for(let _=1;_<=a;_++){const g=(a+1)*h+_-1,m=(a+1)*(h-1)+_-1,p=(a+1)*(h-1)+_,b=(a+1)*h+_;r.push(g,m,b),r.push(m,p,b)}this.setIndex(r),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new th(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Rl extends gi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ke(16777215),this.specular=new Ke(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xf,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cv extends gi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xf,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=jl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class QS extends gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ew extends gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class uv extends Pt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const Yc=new vt,hp=new L,pp=new L;class tw{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=Zn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jf,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;hp.setFromMatrixPosition(e.matrixWorld),n.position.copy(hp),pp.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(pp),n.updateMatrixWorld(),Yc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yc,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Yc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class dv extends qg{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class nw extends tw{constructor(){super(new dv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mp extends uv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new nw}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class iw extends uv{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class aw extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class _p{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ye(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const gp=new L;let wo,qc;class sw extends Pt{constructor(e=new L(0,0,1),n=new L(0,0,0),i=1,a=16776960,s=i*.2,r=s*.2){super(),this.type="ArrowHelper",wo===void 0&&(wo=new Tt,wo.setAttribute("position",new nt([0,0,0,0,1,0],3)),qc=new Ar(.5,1,5,1),qc.translate(0,-.5,0)),this.position.copy(n),this.line=new Zf(wo,new Ql({color:a,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ze(qc,new at({color:a,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{gp.set(e.z,0,-e.x).normalize();const n=Math.acos(e.y);this.quaternion.setFromAxisAngle(gp,n)}}setLength(e,n=e*.2,i=n*.2){this.line.scale.set(1,Math.max(1e-4,e-n),1),this.line.updateMatrix(),this.cone.scale.set(i,n,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class rw extends Ma{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function vp(t,e,n,i){const a=ow(i);switch(n){case kg:return t*e;case Ug:return t*e/a.components*a.byteLength;case Gf:return t*e/a.components*a.byteLength;case Bg:return t*e*2/a.components*a.byteLength;case $f:return t*e*2/a.components*a.byteLength;case Og:return t*e*3/a.components*a.byteLength;case In:return t*e*4/a.components*a.byteLength;case Wf:return t*e*4/a.components*a.byteLength;case Jo:case Qo:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case el:case tl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case nd:case ad:return Math.max(t,16)*Math.max(e,8)/4;case td:case id:return Math.max(t,8)*Math.max(e,8)/2;case sd:case rd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case od:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ld:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case cd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case ud:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case dd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case fd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case hd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case pd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case md:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case _d:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case gd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case vd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case yd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case bd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case xd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Sd:case wd:case Ed:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Md:case Td:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Ad:case Cd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function ow(t){switch(t){case Zn:case Ng:return{byteLength:1,components:1};case xr:case Ig:case Vr:return{byteLength:2,components:1};case Hf:case Vf:return{byteLength:2,components:4};case ya:case zf:case fi:return{byteLength:4,components:1};case Dg:case Fg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function fv(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function lw(t){const e=new WeakMap;function n(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=t.SHORT;else if(c instanceof Uint32Array)h=t.UNSIGNED_INT;else if(c instanceof Int32Array)h=t.INT;else if(c instanceof Int8Array)h=t.BYTE;else if(c instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(t.bindBuffer(c,o),d.length===0)t.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];t.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var cw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uw=`#ifdef USE_ALPHAHASH
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
#endif`,dw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mw=`#ifdef USE_AOMAP
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
#endif`,_w=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gw=`#ifdef USE_BATCHING
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
#endif`,vw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xw=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sw=`#ifdef USE_IRIDESCENCE
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
#endif`,ww=`#ifdef USE_BUMPMAP
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
#endif`,Ew=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Aw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lw=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Nw=`#define PI 3.141592653589793
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
} // validated`,Iw=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dw=`vec3 transformedNormal = objectNormal;
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
#endif`,Fw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ow=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Uw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bw="gl_FragColor = linearToOutputTexel( gl_FragColor );",zw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hw=`#ifdef USE_ENVMAP
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
#endif`,Vw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gw=`#ifdef USE_ENVMAP
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
#endif`,$w=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ww=`#ifdef USE_ENVMAP
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
#endif`,Xw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jw=`#ifdef USE_GRADIENTMAP
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
}`,Zw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eE=`uniform bool receiveShadow;
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
#endif`,tE=`#ifdef USE_ENVMAP
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
#endif`,nE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rE=`PhysicalMaterial material;
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
#endif`,oE=`struct PhysicalMaterial {
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
}`,lE=`
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
#endif`,cE=`#if defined( RE_IndirectDiffuse )
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
#endif`,uE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_E=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vE=`#if defined( USE_POINTS_UV )
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
#endif`,yE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,SE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,EE=`#ifdef USE_MORPHTARGETS
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
#endif`,ME=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,AE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,CE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,LE=`#ifdef USE_NORMALMAP
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
#endif`,NE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,FE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,OE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,UE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,BE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,HE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,VE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$E=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,WE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,XE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,YE=`float getShadowMask() {
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
}`,qE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,KE=`#ifdef USE_SKINNING
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
#endif`,jE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ZE=`#ifdef USE_SKINNING
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
#endif`,JE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,QE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nM=`#ifdef USE_TRANSMISSION
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
#endif`,iM=`#ifdef USE_TRANSMISSION
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
#endif`,aM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cM=`uniform sampler2D t2D;
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
}`,uM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,fM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pM=`#include <common>
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
}`,mM=`#if DEPTH_PACKING == 3200
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
}`,_M=`#define DISTANCE
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
}`,gM=`#define DISTANCE
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
}`,vM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bM=`uniform float scale;
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
}`,xM=`uniform vec3 diffuse;
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
}`,SM=`#include <common>
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
}`,wM=`uniform vec3 diffuse;
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
}`,EM=`#define LAMBERT
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
}`,MM=`#define LAMBERT
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
}`,TM=`#define MATCAP
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
}`,AM=`#define MATCAP
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
}`,CM=`#define NORMAL
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
}`,RM=`#define NORMAL
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
}`,PM=`#define PHONG
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
}`,LM=`#define PHONG
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
}`,NM=`#define STANDARD
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
}`,IM=`#define STANDARD
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
}`,DM=`#define TOON
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
}`,FM=`#define TOON
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
}`,kM=`uniform float size;
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
}`,OM=`uniform vec3 diffuse;
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
}`,UM=`#include <common>
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
}`,BM=`uniform vec3 color;
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
}`,zM=`uniform float rotation;
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
}`,HM=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:cw,alphahash_pars_fragment:uw,alphamap_fragment:dw,alphamap_pars_fragment:fw,alphatest_fragment:hw,alphatest_pars_fragment:pw,aomap_fragment:mw,aomap_pars_fragment:_w,batching_pars_vertex:gw,batching_vertex:vw,begin_vertex:yw,beginnormal_vertex:bw,bsdfs:xw,iridescence_fragment:Sw,bumpmap_pars_fragment:ww,clipping_planes_fragment:Ew,clipping_planes_pars_fragment:Mw,clipping_planes_pars_vertex:Tw,clipping_planes_vertex:Aw,color_fragment:Cw,color_pars_fragment:Rw,color_pars_vertex:Pw,color_vertex:Lw,common:Nw,cube_uv_reflection_fragment:Iw,defaultnormal_vertex:Dw,displacementmap_pars_vertex:Fw,displacementmap_vertex:kw,emissivemap_fragment:Ow,emissivemap_pars_fragment:Uw,colorspace_fragment:Bw,colorspace_pars_fragment:zw,envmap_fragment:Hw,envmap_common_pars_fragment:Vw,envmap_pars_fragment:Gw,envmap_pars_vertex:$w,envmap_physical_pars_fragment:tE,envmap_vertex:Ww,fog_vertex:Xw,fog_pars_vertex:Yw,fog_fragment:qw,fog_pars_fragment:Kw,gradientmap_pars_fragment:jw,lightmap_pars_fragment:Zw,lights_lambert_fragment:Jw,lights_lambert_pars_fragment:Qw,lights_pars_begin:eE,lights_toon_fragment:nE,lights_toon_pars_fragment:iE,lights_phong_fragment:aE,lights_phong_pars_fragment:sE,lights_physical_fragment:rE,lights_physical_pars_fragment:oE,lights_fragment_begin:lE,lights_fragment_maps:cE,lights_fragment_end:uE,logdepthbuf_fragment:dE,logdepthbuf_pars_fragment:fE,logdepthbuf_pars_vertex:hE,logdepthbuf_vertex:pE,map_fragment:mE,map_pars_fragment:_E,map_particle_fragment:gE,map_particle_pars_fragment:vE,metalnessmap_fragment:yE,metalnessmap_pars_fragment:bE,morphinstance_vertex:xE,morphcolor_vertex:SE,morphnormal_vertex:wE,morphtarget_pars_vertex:EE,morphtarget_vertex:ME,normal_fragment_begin:TE,normal_fragment_maps:AE,normal_pars_fragment:CE,normal_pars_vertex:RE,normal_vertex:PE,normalmap_pars_fragment:LE,clearcoat_normal_fragment_begin:NE,clearcoat_normal_fragment_maps:IE,clearcoat_pars_fragment:DE,iridescence_pars_fragment:FE,opaque_fragment:kE,packing:OE,premultiplied_alpha_fragment:UE,project_vertex:BE,dithering_fragment:zE,dithering_pars_fragment:HE,roughnessmap_fragment:VE,roughnessmap_pars_fragment:GE,shadowmap_pars_fragment:$E,shadowmap_pars_vertex:WE,shadowmap_vertex:XE,shadowmask_pars_fragment:YE,skinbase_vertex:qE,skinning_pars_vertex:KE,skinning_vertex:jE,skinnormal_vertex:ZE,specularmap_fragment:JE,specularmap_pars_fragment:QE,tonemapping_fragment:eM,tonemapping_pars_fragment:tM,transmission_fragment:nM,transmission_pars_fragment:iM,uv_pars_fragment:aM,uv_pars_vertex:sM,uv_vertex:rM,worldpos_vertex:oM,background_vert:lM,background_frag:cM,backgroundCube_vert:uM,backgroundCube_frag:dM,cube_vert:fM,cube_frag:hM,depth_vert:pM,depth_frag:mM,distanceRGBA_vert:_M,distanceRGBA_frag:gM,equirect_vert:vM,equirect_frag:yM,linedashed_vert:bM,linedashed_frag:xM,meshbasic_vert:SM,meshbasic_frag:wM,meshlambert_vert:EM,meshlambert_frag:MM,meshmatcap_vert:TM,meshmatcap_frag:AM,meshnormal_vert:CM,meshnormal_frag:RM,meshphong_vert:PM,meshphong_frag:LM,meshphysical_vert:NM,meshphysical_frag:IM,meshtoon_vert:DM,meshtoon_frag:FM,points_vert:kM,points_frag:OM,shadow_vert:UM,shadow_frag:BM,sprite_vert:zM,sprite_frag:HM},de={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Vn={basic:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:qt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:qt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:qt([de.points,de.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:qt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:qt([de.common,de.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:qt([de.sprite,de.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:qt([de.common,de.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:qt([de.lights,de.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Vn.physical={uniforms:qt([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Eo={r:0,b:0,g:0},ta=new On,VM=new vt;function GM(t,e,n,i,a,s,r){const o=new Ke(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(w){let y=w.isScene===!0?w.background:null;return y&&y.isTexture&&(y=(w.backgroundBlurriness>0?n:e).get(y)),y}function g(w){let y=!1;const C=_(w);C===null?p(o,l):C&&C.isColor&&(p(C,1),y=!0);const M=t.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(t.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(w,y){const C=_(y);C&&(C.isCubeTexture||C.mapping===Zl)?(u===void 0&&(u=new ze(new Ta(1,1,1),new Hi({name:"BackgroundCubeMaterial",uniforms:ws(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),ta.copy(y.backgroundRotation),ta.x*=-1,ta.y*=-1,ta.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ta.y*=-1,ta.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(VM.makeRotationFromEuler(ta)),u.material.toneMapped=et.getTransfer(C.colorSpace)!==lt,(d!==C||f!==C.version||h!==t.toneMapping)&&(u.material.needsUpdate=!0,d=C,f=C.version,h=t.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ze(new tn(2,2),new Hi({name:"BackgroundMaterial",uniforms:ws(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=et.getTransfer(C.colorSpace)!==lt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||f!==C.version||h!==t.toneMapping)&&(c.material.needsUpdate=!0,d=C,f=C.version,h=t.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,y){w.getRGB(Eo,Yg(t)),i.buffers.color.setClear(Eo.r,Eo.g,Eo.b,y,r)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,y=1){o.set(w),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(o,l)},render:g,addToRenderList:m,dispose:b}}function $M(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=f(null);let s=a,r=!1;function o(x,R,I,H,B){let G=!1;const U=d(H,I,R);s!==U&&(s=U,c(s.object)),G=h(x,H,I,B),G&&_(x,H,I,B),B!==null&&e.update(B,t.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,y(x,R,I,H),B!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return t.createVertexArray()}function c(x){return t.bindVertexArray(x)}function u(x){return t.deleteVertexArray(x)}function d(x,R,I){const H=I.wireframe===!0;let B=i[x.id];B===void 0&&(B={},i[x.id]=B);let G=B[R.id];G===void 0&&(G={},B[R.id]=G);let U=G[H];return U===void 0&&(U=f(l()),G[H]=U),U}function f(x){const R=[],I=[],H=[];for(let B=0;B<n;B++)R[B]=0,I[B]=0,H[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:I,attributeDivisors:H,object:x,attributes:{},index:null}}function h(x,R,I,H){const B=s.attributes,G=R.attributes;let U=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){const fe=B[V];let Y=G[V];if(Y===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(Y=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(Y=x.instanceColor)),fe===void 0||fe.attribute!==Y||Y&&fe.data!==Y.data)return!0;U++}return s.attributesNum!==U||s.index!==H}function _(x,R,I,H){const B={},G=R.attributes;let U=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){let fe=G[V];fe===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(fe=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(fe=x.instanceColor));const Y={};Y.attribute=fe,fe&&fe.data&&(Y.data=fe.data),B[V]=Y,U++}s.attributes=B,s.attributesNum=U,s.index=H}function g(){const x=s.newAttributes;for(let R=0,I=x.length;R<I;R++)x[R]=0}function m(x){p(x,0)}function p(x,R){const I=s.newAttributes,H=s.enabledAttributes,B=s.attributeDivisors;I[x]=1,H[x]===0&&(t.enableVertexAttribArray(x),H[x]=1),B[x]!==R&&(t.vertexAttribDivisor(x,R),B[x]=R)}function b(){const x=s.newAttributes,R=s.enabledAttributes;for(let I=0,H=R.length;I<H;I++)R[I]!==x[I]&&(t.disableVertexAttribArray(I),R[I]=0)}function w(x,R,I,H,B,G,U){U===!0?t.vertexAttribIPointer(x,R,I,B,G):t.vertexAttribPointer(x,R,I,H,B,G)}function y(x,R,I,H){g();const B=H.attributes,G=I.getAttributes(),U=R.defaultAttributeValues;for(const X in G){const V=G[X];if(V.location>=0){let Q=B[X];if(Q===void 0&&(X==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),X==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){const fe=Q.normalized,Y=Q.itemSize,ue=e.get(Q);if(ue===void 0)continue;const Se=ue.buffer,ye=ue.type,pe=ue.bytesPerElement,O=ye===t.INT||ye===t.UNSIGNED_INT||Q.gpuType===zf;if(Q.isInterleavedBufferAttribute){const q=Q.data,ne=q.stride,xe=Q.offset;if(q.isInstancedInterleavedBuffer){for(let ve=0;ve<V.locationSize;ve++)p(V.location+ve,q.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ve=0;ve<V.locationSize;ve++)m(V.location+ve);t.bindBuffer(t.ARRAY_BUFFER,Se);for(let ve=0;ve<V.locationSize;ve++)w(V.location+ve,Y/V.locationSize,ye,fe,ne*pe,(xe+Y/V.locationSize*ve)*pe,O)}else{if(Q.isInstancedBufferAttribute){for(let q=0;q<V.locationSize;q++)p(V.location+q,Q.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let q=0;q<V.locationSize;q++)m(V.location+q);t.bindBuffer(t.ARRAY_BUFFER,Se);for(let q=0;q<V.locationSize;q++)w(V.location+q,Y/V.locationSize,ye,fe,Y*pe,Y/V.locationSize*q*pe,O)}}else if(U!==void 0){const fe=U[X];if(fe!==void 0)switch(fe.length){case 2:t.vertexAttrib2fv(V.location,fe);break;case 3:t.vertexAttrib3fv(V.location,fe);break;case 4:t.vertexAttrib4fv(V.location,fe);break;default:t.vertexAttrib1fv(V.location,fe)}}}}b()}function C(){A();for(const x in i){const R=i[x];for(const I in R){const H=R[I];for(const B in H)u(H[B].object),delete H[B];delete R[I]}delete i[x]}}function M(x){if(i[x.id]===void 0)return;const R=i[x.id];for(const I in R){const H=R[I];for(const B in H)u(H[B].object),delete H[B];delete R[I]}delete i[x.id]}function T(x){for(const R in i){const I=i[R];if(I[x.id]===void 0)continue;const H=I[x.id];for(const B in H)u(H[B].object),delete H[B];delete I[x.id]}}function A(){v(),r=!0,s!==a&&(s=a,c(s.object))}function v(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function WM(t,e,n){let i;function a(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function r(c,u,d){d!==0&&(t.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];n.update(h,i,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)r(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];n.update(_,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function XM(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==In&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===Vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Zn&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==fi&&!A)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),b=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),w=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,M=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:y,vertexTextures:C,maxSamples:M}}function YM(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new Ai,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||i!==0||a;return a=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=t.get(d);if(!a||_===null||_.length===0||s&&!m)s?u(null):c();else{const b=s?0:i,w=b*4;let y=p.clippingState||null;l.value=y,y=u(_,f,w,h);for(let C=0;C!==w;++C)y[C]=n[C];p.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,y=h;w!==g;++w,y+=4)r.copy(d[w]).applyMatrix4(b,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function qM(t){let e=new WeakMap;function n(r,o){return o===Zu?r.mapping=bs:o===Ju&&(r.mapping=xs),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===Zu||o===Ju)if(e.has(r)){const l=e.get(r).texture;return n(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new pS(l.height);return c.fromEquirectangularTexture(t,r),e.set(r,c),r.addEventListener("dispose",a),n(c.texture,r.mapping)}else return null}}return r}function a(r){const o=r.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const es=4,yp=[.125,.215,.35,.446,.526,.582],ua=20,Kc=new dv,bp=new Ke;let jc=null,Zc=0,Jc=0,Qc=!1;const oa=(1+Math.sqrt(5))/2,Xa=1/oa,xp=[new L(-oa,Xa,0),new L(oa,Xa,0),new L(-Xa,0,oa),new L(Xa,0,oa),new L(0,oa,-Xa),new L(0,oa,Xa),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],KM=new L;class Sp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=KM}=s;jc=this._renderer.getRenderTarget(),Zc=this._renderer.getActiveCubeFace(),Jc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jc,Zc,Jc),this._renderer.xr.enabled=Qc,e.scissorTest=!1,Mo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===bs||e.mapping===xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jc=this._renderer.getRenderTarget(),Zc=this._renderer.getActiveCubeFace(),Jc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:Vr,format:In,colorSpace:Ss,depthBuffer:!1},a=wp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jM(s)),this._blurMaterial=ZM(s,e,n)}return a}_compileMaterial(e){const n=new ze(this._lodPlanes[0],e);this._renderer.compile(n,Kc)}_sceneToCubeUV(e,n,i,a,s){const l=new vn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(bp),d.toneMapping=Ii,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));const g=new at({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),m=new ze(new Ta,g);let p=!1;const b=e.background;b?b.isColor&&(g.color.copy(b),e.background=null,p=!0):(g.color.copy(bp),p=!0);for(let w=0;w<6;w++){const y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));const C=this._cubeSize;Mo(a,y*C,w>2?C:0,C,C),d.setRenderTarget(a),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===bs||e.mapping===xs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ep());const s=a?this._cubemapMaterial:this._equirectMaterial,r=new ze(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Mo(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Kc)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=xp[(a-s-1)%xp.length];this._blur(e,s-1,s,r,o)}n.autoClear=i}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ze(this._lodPlanes[a],c),f=c.uniforms,h=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*ua-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):ua;m>ua&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ua}`);const p=[];let b=0;for(let T=0;T<ua;++T){const A=T/g,v=Math.exp(-A*A/2);p.push(v),T===0?b+=v:T<m&&(b+=2*v)}for(let T=0;T<p.length;T++)p[T]=p[T]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=_,f.mipInt.value=w-i;const y=this._sizeLods[a],C=3*y*(a>w-es?a-w+es:0),M=4*(this._cubeSize-y);Mo(n,C,M,3*y,2*y),l.setRenderTarget(n),l.render(d,Kc)}}function jM(t){const e=[],n=[],i=[];let a=t;const s=t-es+1+yp.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);n.push(o);let l=1/o;r>t-es?l=yp[r-t+es-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,b=new Float32Array(g*_*h),w=new Float32Array(m*_*h),y=new Float32Array(p*_*h);for(let M=0;M<h;M++){const T=M%3*2/3-1,A=M>2?0:-1,v=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];b.set(v,g*_*M),w.set(f,m*_*M);const x=[M,M,M,M,M,M];y.set(x,p*_*M)}const C=new Tt;C.setAttribute("position",new kn(b,g)),C.setAttribute("uv",new kn(w,m)),C.setAttribute("faceIndex",new kn(y,p)),e.push(C),a>es&&a--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function wp(t,e,n){const i=new ba(t,e,n);return i.texture.mapping=Zl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mo(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function ZM(t,e,n){const i=new Float32Array(ua),a=new L(0,1,0);return new Hi({name:"SphericalGaussianBlur",defines:{n:ua,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:nh(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Ep(){return new Hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nh(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Mp(){return new Hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function nh(){return`

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
	`}function JM(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Zu||l===Ju,u=l===bs||l===xs;if(c||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new Sp(t)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const h=o.image;return c&&h&&h.height>0||u&&h&&a(h)?(n===null&&(n=new Sp(t)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function QM(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=t.getExtension(i)}return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&Tr("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function eT(t,e,n,i){const a={},s=new WeakMap;function r(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",r),delete a[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",r),a[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],t.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const b=h.array;g=h.version;for(let w=0,y=b.length;w<y;w+=3){const C=b[w+0],M=b[w+1],T=b[w+2];f.push(C,M,M,T,T,C)}}else if(_!==void 0){const b=_.array;g=_.version;for(let w=0,y=b.length/3-1;w<y;w+=3){const C=w+0,M=w+1,T=w+2;f.push(C,M,M,T,T,C)}}else return;const m=new(Hg(f)?Xg:Wg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function tT(t,e,n){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,h){t.drawElements(i,h,s,f*r),n.update(h,i,1)}function c(f,h,_){_!==0&&(t.drawElementsInstanced(i,h,s,f*r,_),n.update(h,i,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];n.update(m,i,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/r,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,g,0,_);let p=0;for(let b=0;b<_;b++)p+=h[b]*g[b];n.update(p,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function nT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function iT(t,e,n){const i=new WeakMap,a=new Et;function s(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let v=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",v)};f!==void 0&&f.texture.dispose();const h=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let w=0;h===!0&&(w=1),_===!0&&(w=2),g===!0&&(w=3);let y=o.attributes.position.count*w,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*C*4*d),T=new Vg(M,y,C,d);T.type=fi,T.needsUpdate=!0;const A=w*4;for(let x=0;x<d;x++){const R=m[x],I=p[x],H=b[x],B=y*C*4*x;for(let G=0;G<R.count;G++){const U=G*A;h===!0&&(a.fromBufferAttribute(R,G),M[B+U+0]=a.x,M[B+U+1]=a.y,M[B+U+2]=a.z,M[B+U+3]=0),_===!0&&(a.fromBufferAttribute(I,G),M[B+U+4]=a.x,M[B+U+5]=a.y,M[B+U+6]=a.z,M[B+U+7]=0),g===!0&&(a.fromBufferAttribute(H,G),M[B+U+8]=a.x,M[B+U+9]=a.y,M[B+U+10]=a.z,M[B+U+11]=H.itemSize===4?a.w:1)}}f={count:d,texture:T,size:new le(y,C)},i.set(o,f),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let h=0;for(let g=0;g<c.length;g++)h+=c[g];const _=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function aT(t,e,n,i){let a=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(a.get(d)!==c&&(e.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function r(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:r}}const hv=new Kt,Tp=new Qg(1,1),pv=new Vg,mv=new Zx,_v=new Kg,Ap=[],Cp=[],Rp=new Float32Array(16),Pp=new Float32Array(9),Lp=new Float32Array(4);function Ns(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=Ap[a];if(s===void 0&&(s=new Float32Array(a),Ap[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function Nt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function It(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function ic(t,e){let n=Cp[e];n===void 0&&(n=new Int32Array(e),Cp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function sT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function rT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2fv(this.addr,e),It(n,e)}}function oT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Nt(n,e))return;t.uniform3fv(this.addr,e),It(n,e)}}function lT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4fv(this.addr,e),It(n,e)}}function cT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),It(n,e)}else{if(Nt(n,i))return;Lp.set(i),t.uniformMatrix2fv(this.addr,!1,Lp),It(n,i)}}function uT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),It(n,e)}else{if(Nt(n,i))return;Pp.set(i),t.uniformMatrix3fv(this.addr,!1,Pp),It(n,i)}}function dT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Nt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),It(n,e)}else{if(Nt(n,i))return;Rp.set(i),t.uniformMatrix4fv(this.addr,!1,Rp),It(n,i)}}function fT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function hT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2iv(this.addr,e),It(n,e)}}function pT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;t.uniform3iv(this.addr,e),It(n,e)}}function mT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4iv(this.addr,e),It(n,e)}}function _T(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function gT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Nt(n,e))return;t.uniform2uiv(this.addr,e),It(n,e)}}function vT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Nt(n,e))return;t.uniform3uiv(this.addr,e),It(n,e)}}function yT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Nt(n,e))return;t.uniform4uiv(this.addr,e),It(n,e)}}function bT(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Tp.compareFunction=zg,s=Tp):s=hv,n.setTexture2D(e||s,a)}function xT(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||mv,a)}function ST(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||_v,a)}function wT(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||pv,a)}function ET(t){switch(t){case 5126:return sT;case 35664:return rT;case 35665:return oT;case 35666:return lT;case 35674:return cT;case 35675:return uT;case 35676:return dT;case 5124:case 35670:return fT;case 35667:case 35671:return hT;case 35668:case 35672:return pT;case 35669:case 35673:return mT;case 5125:return _T;case 36294:return gT;case 36295:return vT;case 36296:return yT;case 35678:case 36198:case 36298:case 36306:case 35682:return bT;case 35679:case 36299:case 36307:return xT;case 35680:case 36300:case 36308:case 36293:return ST;case 36289:case 36303:case 36311:case 36292:return wT}}function MT(t,e){t.uniform1fv(this.addr,e)}function TT(t,e){const n=Ns(e,this.size,2);t.uniform2fv(this.addr,n)}function AT(t,e){const n=Ns(e,this.size,3);t.uniform3fv(this.addr,n)}function CT(t,e){const n=Ns(e,this.size,4);t.uniform4fv(this.addr,n)}function RT(t,e){const n=Ns(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function PT(t,e){const n=Ns(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function LT(t,e){const n=Ns(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function NT(t,e){t.uniform1iv(this.addr,e)}function IT(t,e){t.uniform2iv(this.addr,e)}function DT(t,e){t.uniform3iv(this.addr,e)}function FT(t,e){t.uniform4iv(this.addr,e)}function kT(t,e){t.uniform1uiv(this.addr,e)}function OT(t,e){t.uniform2uiv(this.addr,e)}function UT(t,e){t.uniform3uiv(this.addr,e)}function BT(t,e){t.uniform4uiv(this.addr,e)}function zT(t,e,n){const i=this.cache,a=e.length,s=ic(n,a);Nt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let r=0;r!==a;++r)n.setTexture2D(e[r]||hv,s[r])}function HT(t,e,n){const i=this.cache,a=e.length,s=ic(n,a);Nt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||mv,s[r])}function VT(t,e,n){const i=this.cache,a=e.length,s=ic(n,a);Nt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||_v,s[r])}function GT(t,e,n){const i=this.cache,a=e.length,s=ic(n,a);Nt(i,s)||(t.uniform1iv(this.addr,s),It(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||pv,s[r])}function $T(t){switch(t){case 5126:return MT;case 35664:return TT;case 35665:return AT;case 35666:return CT;case 35674:return RT;case 35675:return PT;case 35676:return LT;case 5124:case 35670:return NT;case 35667:case 35671:return IT;case 35668:case 35672:return DT;case 35669:case 35673:return FT;case 5125:return kT;case 36294:return OT;case 36295:return UT;case 36296:return BT;case 35678:case 36198:case 36298:case 36306:case 35682:return zT;case 35679:case 36299:case 36307:return HT;case 35680:case 36300:case 36308:case 36293:return VT;case 36289:case 36303:case 36311:case 36292:return GT}}class WT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=ET(n.type)}}class XT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=$T(n.type)}}class YT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const eu=/(\w+)(\])?(\[|\.)?/g;function Np(t,e){t.seq.push(e),t.map[e.id]=e}function qT(t,e,n){const i=t.name,a=i.length;for(eu.lastIndex=0;;){const s=eu.exec(i),r=eu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Np(n,c===void 0?new WT(o,t,e):new XT(o,t,e));break}else{let d=n.map[o];d===void 0&&(d=new YT(o),Np(n,d)),n=d}}}class nl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=e.getActiveUniform(n,a),r=e.getUniformLocation(n,s.name);qT(s,r,this)}}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Ip(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const KT=37297;let jT=0;function ZT(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Dp=new $e;function JT(t){et._getMatrix(Dp,et.workingColorSpace,t);const e=`mat3( ${Dp.elements.map(n=>n.toFixed(4))} )`;switch(et.getTransfer(t)){case wl:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Fp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+ZT(t.getShaderSource(e),o)}else return s}function QT(t,e){const n=JT(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function e1(t,e){let n;switch(e){case ux:n="Linear";break;case dx:n="Reinhard";break;case fx:n="Cineon";break;case hx:n="ACESFilmic";break;case mx:n="AgX";break;case _x:n="Neutral";break;case px:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const To=new L;function t1(){et.getLuminanceCoefficients(To);const t=To.x.toFixed(4),e=To.y.toFixed(4),n=To.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n1(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function i1(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function a1(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function js(t){return t!==""}function kp(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Op(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const s1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nd(t){return t.replace(s1,o1)}const r1=new Map;function o1(t,e){let n=Xe[e];if(n===void 0){const i=r1.get(e);if(i!==void 0)n=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Nd(n)}const l1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Up(t){return t.replace(l1,c1)}function c1(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Bp(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}function u1(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Pg?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Gb?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function d1(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case bs:case xs:e="ENVMAP_TYPE_CUBE";break;case Zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function f1(t){let e="ENVMAP_MODE_REFLECTION";return t.envMap&&t.envMapMode===xs&&(e="ENVMAP_MODE_REFRACTION"),e}function h1(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case jl:e="ENVMAP_BLENDING_MULTIPLY";break;case lx:e="ENVMAP_BLENDING_MIX";break;case cx:e="ENVMAP_BLENDING_ADD";break}return e}function p1(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function m1(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=u1(n),c=d1(n),u=f1(n),d=h1(n),f=p1(n),h=n1(n),_=i1(s),g=a.createProgram();let m,p,b=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(js).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(js).join(`
`),p.length>0&&(p+=`
`)):(m=[Bp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),p=[Bp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ii?"#define TONE_MAPPING":"",n.toneMapping!==Ii?Xe.tonemapping_pars_fragment:"",n.toneMapping!==Ii?e1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,QT("linearToOutputTexel",n.outputColorSpace),t1(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(js).join(`
`)),r=Nd(r),r=kp(r,n),r=Op(r,n),o=Nd(o),o=kp(o,n),o=Op(o,n),r=Up(r),o=Up(o),n.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===Uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=b+m+r,y=b+p+o,C=Ip(a,a.VERTEX_SHADER,w),M=Ip(a,a.FRAGMENT_SHADER,y);a.attachShader(g,C),a.attachShader(g,M),n.index0AttributeName!==void 0?a.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g);function T(R){if(t.debug.checkShaderErrors){const I=a.getProgramInfoLog(g)||"",H=a.getShaderInfoLog(C)||"",B=a.getShaderInfoLog(M)||"",G=I.trim(),U=H.trim(),X=B.trim();let V=!0,Q=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(V=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,g,C,M);else{const fe=Fp(a,C,"vertex"),Y=Fp(a,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+fe+`
`+Y)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(U===""||X==="")&&(Q=!1);Q&&(R.diagnostics={runnable:V,programLog:G,vertexShader:{log:U,prefix:m},fragmentShader:{log:X,prefix:p}})}a.deleteShader(C),a.deleteShader(M),A=new nl(a,g),v=a1(a,g)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=a.getProgramParameter(g,KT)),x},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jT++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=M,this}let _1=0;class g1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new v1(e),n.set(e,i)),i}}class v1{constructor(e){this.id=_1++,this.code=e,this.usedTimes=0}}function y1(t,e,n,i,a,s,r){const o=new Gg,l=new g1,c=new Set,u=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures;let h=a.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,x,R,I,H){const B=I.fog,G=H.geometry,U=v.isMeshStandardMaterial?I.environment:null,X=(v.isMeshStandardMaterial?n:e).get(v.envMap||U),V=X&&X.mapping===Zl?X.image.height:null,Q=_[v.type];v.precision!==null&&(h=a.getMaxPrecision(v.precision),h!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const fe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Y=fe!==void 0?fe.length:0;let ue=0;G.morphAttributes.position!==void 0&&(ue=1),G.morphAttributes.normal!==void 0&&(ue=2),G.morphAttributes.color!==void 0&&(ue=3);let Se,ye,pe,O;if(Q){const tt=Vn[Q];Se=tt.vertexShader,ye=tt.fragmentShader}else Se=v.vertexShader,ye=v.fragmentShader,l.update(v),pe=l.getVertexShaderID(v),O=l.getFragmentShaderID(v);const q=t.getRenderTarget(),ne=t.state.buffers.depth.getReversed(),xe=H.isInstancedMesh===!0,ve=H.isBatchedMesh===!0,Fe=!!v.map,st=!!v.matcap,N=!!X,rt=!!v.aoMap,Ve=!!v.lightMap,Ue=!!v.bumpMap,Te=!!v.normalMap,_t=!!v.displacementMap,Ae=!!v.emissiveMap,We=!!v.metalnessMap,Dt=!!v.roughnessMap,Mt=v.anisotropy>0,P=v.clearcoat>0,S=v.dispersion>0,z=v.iridescence>0,j=v.sheen>0,J=v.transmission>0,K=Mt&&!!v.anisotropyMap,Le=P&&!!v.clearcoatMap,oe=P&&!!v.clearcoatNormalMap,Ce=P&&!!v.clearcoatRoughnessMap,Re=z&&!!v.iridescenceMap,se=z&&!!v.iridescenceThicknessMap,_e=j&&!!v.sheenColorMap,ke=j&&!!v.sheenRoughnessMap,Pe=!!v.specularMap,he=!!v.specularColorMap,Ge=!!v.specularIntensityMap,D=J&&!!v.transmissionMap,re=J&&!!v.thicknessMap,ce=!!v.gradientMap,we=!!v.alphaMap,ie=v.alphaTest>0,Z=!!v.alphaHash,Me=!!v.extensions;let He=Ii;v.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(He=t.toneMapping);const dt={shaderID:Q,shaderType:v.type,shaderName:v.name,vertexShader:Se,fragmentShader:ye,defines:v.defines,customVertexShaderID:pe,customFragmentShaderID:O,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:ve,batchingColor:ve&&H._colorsTexture!==null,instancing:xe,instancingColor:xe&&H.instanceColor!==null,instancingMorph:xe&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:q===null?t.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ss,alphaToCoverage:!!v.alphaToCoverage,map:Fe,matcap:st,envMap:N,envMapMode:N&&X.mapping,envMapCubeUVHeight:V,aoMap:rt,lightMap:Ve,bumpMap:Ue,normalMap:Te,displacementMap:f&&_t,emissiveMap:Ae,normalMapObjectSpace:Te&&v.normalMapType===bx,normalMapTangentSpace:Te&&v.normalMapType===Xf,metalnessMap:We,roughnessMap:Dt,anisotropy:Mt,anisotropyMap:K,clearcoat:P,clearcoatMap:Le,clearcoatNormalMap:oe,clearcoatRoughnessMap:Ce,dispersion:S,iridescence:z,iridescenceMap:Re,iridescenceThicknessMap:se,sheen:j,sheenColorMap:_e,sheenRoughnessMap:ke,specularMap:Pe,specularColorMap:he,specularIntensityMap:Ge,transmission:J,transmissionMap:D,thicknessMap:re,gradientMap:ce,opaque:v.transparent===!1&&v.blending===ss&&v.alphaToCoverage===!1,alphaMap:we,alphaTest:ie,alphaHash:Z,combine:v.combine,mapUv:Fe&&g(v.map.channel),aoMapUv:rt&&g(v.aoMap.channel),lightMapUv:Ve&&g(v.lightMap.channel),bumpMapUv:Ue&&g(v.bumpMap.channel),normalMapUv:Te&&g(v.normalMap.channel),displacementMapUv:_t&&g(v.displacementMap.channel),emissiveMapUv:Ae&&g(v.emissiveMap.channel),metalnessMapUv:We&&g(v.metalnessMap.channel),roughnessMapUv:Dt&&g(v.roughnessMap.channel),anisotropyMapUv:K&&g(v.anisotropyMap.channel),clearcoatMapUv:Le&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ke&&g(v.sheenRoughnessMap.channel),specularMapUv:Pe&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:Ge&&g(v.specularIntensityMap.channel),transmissionMapUv:D&&g(v.transmissionMap.channel),thicknessMapUv:re&&g(v.thicknessMap.channel),alphaMapUv:we&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Te||Mt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!G.attributes.uv&&(Fe||we),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:H.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ue,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:He,decodeVideoTexture:Fe&&v.map.isVideoTexture===!0&&et.getTransfer(v.map.colorSpace)===lt,decodeVideoTextureEmissive:Ae&&v.emissiveMap.isVideoTexture===!0&&et.getTransfer(v.emissiveMap.colorSpace)===lt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Je,flipSided:v.side===an,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Me&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&v.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function p(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)x.push(R),x.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(b(x,v),w(x,v),x.push(t.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function b(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function w(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const x=_[v.type];let R;if(x){const I=Vn[x];R=uS.clone(I.uniforms)}else R=v.uniforms;return R}function C(v,x){let R;for(let I=0,H=u.length;I<H;I++){const B=u[I];if(B.cacheKey===x){R=B,++R.usedTimes;break}}return R===void 0&&(R=new m1(t,x,v,s),u.push(R)),R}function M(v){if(--v.usedTimes===0){const x=u.indexOf(v);u[x]=u[u.length-1],u.pop(),v.destroy()}}function T(v){l.remove(v)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:A}}function b1(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function x1(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function zp(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Hp(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(d,f,h,_,g,m){let p=t[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},t[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function o(d,f,h,_,g,m){const p=r(d,f,h,_,g,m);h.transmission>0?i.push(p):h.transparent===!0?a.push(p):n.push(p)}function l(d,f,h,_,g,m){const p=r(d,f,h,_,g,m);h.transmission>0?i.unshift(p):h.transparent===!0?a.unshift(p):n.unshift(p)}function c(d,f){n.length>1&&n.sort(d||x1),i.length>1&&i.sort(f||zp),a.length>1&&a.sort(f||zp)}function u(){for(let d=e,f=t.length;d<f;d++){const h=t[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:u,sort:c}}function S1(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new Hp,t.set(i,[r])):a>=s.length?(r=new Hp,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function w1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new L,color:new Ke};break;case"SpotLight":n={position:new L,direction:new L,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":n={color:new Ke,position:new L,halfWidth:new L,halfHeight:new L};break}return t[e.id]=n,n}}}function E1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let M1=0;function T1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function A1(t){const e=new w1,n=E1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const a=new L,s=new vt,r=new vt;function o(c){let u=0,d=0,f=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,b=0,w=0,y=0,C=0,M=0,T=0;c.sort(T1);for(let v=0,x=c.length;v<x;v++){const R=c[v],I=R.color,H=R.intensity,B=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=I.r*H,d+=I.g*H,f+=I.b*H;else if(R.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(R.sh.coefficients[U],H);T++}else if(R.isDirectionalLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,V=n.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.directionalShadow[h]=V,i.directionalShadowMap[h]=G,i.directionalShadowMatrix[h]=R.shadow.matrix,b++}i.directional[h]=U,h++}else if(R.isSpotLight){const U=e.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(I).multiplyScalar(H),U.distance=B,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,i.spot[g]=U;const X=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,X.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[g]=X.matrix,R.castShadow){const V=n.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=G,y++}g++}else if(R.isRectAreaLight){const U=e.get(R);U.color.copy(I).multiplyScalar(H),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=U,m++}else if(R.isPointLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){const X=R.shadow,V=n.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=G,i.pointShadowMatrix[_]=R.shadow.matrix,w++}i.point[_]=U,_++}else if(R.isHemisphereLight){const U=e.get(R);U.skyColor.copy(R.color).multiplyScalar(H),U.groundColor.copy(R.groundColor).multiplyScalar(H),i.hemi[p]=U,p++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const A=i.hash;(A.directionalLength!==h||A.pointLength!==_||A.spotLength!==g||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==b||A.numPointShadows!==w||A.numSpotShadows!==y||A.numSpotMaps!==C||A.numLightProbes!==T)&&(i.directional.length=h,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=y+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,A.directionalLength=h,A.pointLength=_,A.spotLength=g,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=b,A.numPointShadows=w,A.numSpotShadows=y,A.numSpotMaps=C,A.numLightProbes=T,i.version=M1++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const w=c[p];if(w.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(w.matrixWorld),a.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),d++}else if(w.isSpotLight){const y=i.spot[h];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(w.matrixWorld),a.setFromMatrixPosition(w.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),h++}else if(w.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(w.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(w.width*.5,0,0),y.halfHeight.set(0,w.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(w.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(w.matrixWorld),y.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(w.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function Vp(t){const e=new A1(t),n=[],i=[];function a(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function r(u){i.push(u)}function o(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function C1(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Vp(t),e.set(a,[o])):s>=r.length?(o=new Vp(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const R1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P1=`uniform sampler2D shadow_pass;
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
}`;function L1(t,e,n){let i=new jf;const a=new le,s=new le,r=new Et,o=new QS({depthPacking:yx}),l=new ew,c={},u=n.maxTextureSize,d={[zi]:an,[an]:zi,[Je]:Je},f=new Hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:R1,fragmentShader:P1}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Tt;_.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ze(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pg;let p=this.type;this.render=function(M,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=t.getRenderTarget(),x=t.getActiveCubeFace(),R=t.getActiveMipmapLevel(),I=t.state;I.setBlending(Li),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const H=p!==ci&&this.type===ci,B=p===ci&&this.type!==ci;for(let G=0,U=M.length;G<U;G++){const X=M[G],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const Q=V.getFrameExtents();if(a.multiply(Q),s.copy(V.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(s.x=Math.floor(u/Q.x),a.x=s.x*Q.x,V.mapSize.x=s.x),a.y>u&&(s.y=Math.floor(u/Q.y),a.y=s.y*Q.y,V.mapSize.y=s.y)),V.map===null||H===!0||B===!0){const Y=this.type!==ci?{minFilter:Fn,magFilter:Fn}:{};V.map!==null&&V.map.dispose(),V.map=new ba(a.x,a.y,Y),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}t.setRenderTarget(V.map),t.clear();const fe=V.getViewportCount();for(let Y=0;Y<fe;Y++){const ue=V.getViewport(Y);r.set(s.x*ue.x,s.y*ue.y,s.x*ue.z,s.y*ue.w),I.viewport(r),V.updateMatrices(X,Y),i=V.getFrustum(),y(T,A,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===ci&&b(V,A),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,t.setRenderTarget(v,x,R)};function b(M,T){const A=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,h.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new ba(a.x,a.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,t.setRenderTarget(M.mapPass),t.clear(),t.renderBufferDirect(T,null,A,f,g,null),h.uniforms.shadow_pass.value=M.mapPass.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,t.setRenderTarget(M.map),t.clear(),t.renderBufferDirect(T,null,A,h,g,null)}function w(M,T,A,v){let x=null;const R=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)x=R;else if(x=A.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=x.uuid,H=T.uuid;let B=c[I];B===void 0&&(B={},c[I]=B);let G=B[H];G===void 0&&(G=x.clone(),B[H]=G,T.addEventListener("dispose",C)),x=G}if(x.visible=T.visible,x.wireframe=T.wireframe,v===ci?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const I=t.properties.get(x);I.light=A}return x}function y(M,T,A,v,x){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&x===ci)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const H=e.update(M),B=M.material;if(Array.isArray(B)){const G=H.groups;for(let U=0,X=G.length;U<X;U++){const V=G[U],Q=B[V.materialIndex];if(Q&&Q.visible){const fe=w(M,Q,v,x);M.onBeforeShadow(t,M,T,A,H,fe,V),t.renderBufferDirect(A,null,H,fe,M,V),M.onAfterShadow(t,M,T,A,H,fe,V)}}}else if(B.visible){const G=w(M,B,v,x);M.onBeforeShadow(t,M,T,A,H,G,null),t.renderBufferDirect(A,null,H,G,M,null),M.onAfterShadow(t,M,T,A,H,G,null)}}const I=M.children;for(let H=0,B=I.length;H<B;H++)y(I[H],T,A,v,x)}function C(M){M.target.removeEventListener("dispose",C);for(const A in c){const v=c[A],x=M.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const N1={[$u]:Wu,[Xu]:Ku,[Yu]:ju,[ys]:qu,[Wu]:$u,[Ku]:Xu,[ju]:Yu,[qu]:ys};function I1(t,e){function n(){let D=!1;const re=new Et;let ce=null;const we=new Et(0,0,0,0);return{setMask:function(ie){ce!==ie&&!D&&(t.colorMask(ie,ie,ie,ie),ce=ie)},setLocked:function(ie){D=ie},setClear:function(ie,Z,Me,He,dt){dt===!0&&(ie*=He,Z*=He,Me*=He),re.set(ie,Z,Me,He),we.equals(re)===!1&&(t.clearColor(ie,Z,Me,He),we.copy(re))},reset:function(){D=!1,ce=null,we.set(-1,0,0,0)}}}function i(){let D=!1,re=!1,ce=null,we=null,ie=null;return{setReversed:function(Z){if(re!==Z){const Me=e.get("EXT_clip_control");Z?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),re=Z;const He=ie;ie=null,this.setClear(He)}},getReversed:function(){return re},setTest:function(Z){Z?q(t.DEPTH_TEST):ne(t.DEPTH_TEST)},setMask:function(Z){ce!==Z&&!D&&(t.depthMask(Z),ce=Z)},setFunc:function(Z){if(re&&(Z=N1[Z]),we!==Z){switch(Z){case $u:t.depthFunc(t.NEVER);break;case Wu:t.depthFunc(t.ALWAYS);break;case Xu:t.depthFunc(t.LESS);break;case ys:t.depthFunc(t.LEQUAL);break;case Yu:t.depthFunc(t.EQUAL);break;case qu:t.depthFunc(t.GEQUAL);break;case Ku:t.depthFunc(t.GREATER);break;case ju:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}we=Z}},setLocked:function(Z){D=Z},setClear:function(Z){ie!==Z&&(re&&(Z=1-Z),t.clearDepth(Z),ie=Z)},reset:function(){D=!1,ce=null,we=null,ie=null,re=!1}}}function a(){let D=!1,re=null,ce=null,we=null,ie=null,Z=null,Me=null,He=null,dt=null;return{setTest:function(tt){D||(tt?q(t.STENCIL_TEST):ne(t.STENCIL_TEST))},setMask:function(tt){re!==tt&&!D&&(t.stencilMask(tt),re=tt)},setFunc:function(tt,ni,Un){(ce!==tt||we!==ni||ie!==Un)&&(t.stencilFunc(tt,ni,Un),ce=tt,we=ni,ie=Un)},setOp:function(tt,ni,Un){(Z!==tt||Me!==ni||He!==Un)&&(t.stencilOp(tt,ni,Un),Z=tt,Me=ni,He=Un)},setLocked:function(tt){D=tt},setClear:function(tt){dt!==tt&&(t.clearStencil(tt),dt=tt)},reset:function(){D=!1,re=null,ce=null,we=null,ie=null,Z=null,Me=null,He=null,dt=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,w=null,y=null,C=null,M=null,T=new Ke(0,0,0),A=0,v=!1,x=null,R=null,I=null,H=null,B=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,X=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),U=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),U=X>=2);let Q=null,fe={};const Y=t.getParameter(t.SCISSOR_BOX),ue=t.getParameter(t.VIEWPORT),Se=new Et().fromArray(Y),ye=new Et().fromArray(ue);function pe(D,re,ce,we){const ie=new Uint8Array(4),Z=t.createTexture();t.bindTexture(D,Z),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Me=0;Me<ce;Me++)D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY?t.texImage3D(re,0,t.RGBA,1,1,we,0,t.RGBA,t.UNSIGNED_BYTE,ie):t.texImage2D(re+Me,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ie);return Z}const O={};O[t.TEXTURE_2D]=pe(t.TEXTURE_2D,t.TEXTURE_2D,1),O[t.TEXTURE_CUBE_MAP]=pe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[t.TEXTURE_2D_ARRAY]=pe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),O[t.TEXTURE_3D]=pe(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),q(t.DEPTH_TEST),r.setFunc(ys),Ue(!1),Te(Dh),q(t.CULL_FACE),rt(Li);function q(D){u[D]!==!0&&(t.enable(D),u[D]=!0)}function ne(D){u[D]!==!1&&(t.disable(D),u[D]=!1)}function xe(D,re){return d[D]!==re?(t.bindFramebuffer(D,re),d[D]=re,D===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=re),D===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=re),!0):!1}function ve(D,re){let ce=h,we=!1;if(D){ce=f.get(re),ce===void 0&&(ce=[],f.set(re,ce));const ie=D.textures;if(ce.length!==ie.length||ce[0]!==t.COLOR_ATTACHMENT0){for(let Z=0,Me=ie.length;Z<Me;Z++)ce[Z]=t.COLOR_ATTACHMENT0+Z;ce.length=ie.length,we=!0}}else ce[0]!==t.BACK&&(ce[0]=t.BACK,we=!0);we&&t.drawBuffers(ce)}function Fe(D){return _!==D?(t.useProgram(D),_=D,!0):!1}const st={[ca]:t.FUNC_ADD,[Wb]:t.FUNC_SUBTRACT,[Xb]:t.FUNC_REVERSE_SUBTRACT};st[Yb]=t.MIN,st[qb]=t.MAX;const N={[Kb]:t.ZERO,[jb]:t.ONE,[Zb]:t.SRC_COLOR,[Vu]:t.SRC_ALPHA,[ix]:t.SRC_ALPHA_SATURATE,[tx]:t.DST_COLOR,[Qb]:t.DST_ALPHA,[Jb]:t.ONE_MINUS_SRC_COLOR,[Gu]:t.ONE_MINUS_SRC_ALPHA,[nx]:t.ONE_MINUS_DST_COLOR,[ex]:t.ONE_MINUS_DST_ALPHA,[ax]:t.CONSTANT_COLOR,[sx]:t.ONE_MINUS_CONSTANT_COLOR,[rx]:t.CONSTANT_ALPHA,[ox]:t.ONE_MINUS_CONSTANT_ALPHA};function rt(D,re,ce,we,ie,Z,Me,He,dt,tt){if(D===Li){g===!0&&(ne(t.BLEND),g=!1);return}if(g===!1&&(q(t.BLEND),g=!0),D!==$b){if(D!==m||tt!==v){if((p!==ca||y!==ca)&&(t.blendEquation(t.FUNC_ADD),p=ca,y=ca),tt)switch(D){case ss:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ni:t.blendFunc(t.ONE,t.ONE);break;case Fh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case kh:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ss:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ni:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Fh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,w=null,C=null,M=null,T.set(0,0,0),A=0,m=D,v=tt}return}ie=ie||re,Z=Z||ce,Me=Me||we,(re!==p||ie!==y)&&(t.blendEquationSeparate(st[re],st[ie]),p=re,y=ie),(ce!==b||we!==w||Z!==C||Me!==M)&&(t.blendFuncSeparate(N[ce],N[we],N[Z],N[Me]),b=ce,w=we,C=Z,M=Me),(He.equals(T)===!1||dt!==A)&&(t.blendColor(He.r,He.g,He.b,dt),T.copy(He),A=dt),m=D,v=!1}function Ve(D,re){D.side===Je?ne(t.CULL_FACE):q(t.CULL_FACE);let ce=D.side===an;re&&(ce=!ce),Ue(ce),D.blending===ss&&D.transparent===!1?rt(Li):rt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const we=D.stencilWrite;o.setTest(we),we&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ae(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?q(t.SAMPLE_ALPHA_TO_COVERAGE):ne(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(D){x!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),x=D)}function Te(D){D!==Hb?(q(t.CULL_FACE),D!==R&&(D===Dh?t.cullFace(t.BACK):D===Vb?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ne(t.CULL_FACE),R=D}function _t(D){D!==I&&(U&&t.lineWidth(D),I=D)}function Ae(D,re,ce){D?(q(t.POLYGON_OFFSET_FILL),(H!==re||B!==ce)&&(t.polygonOffset(re,ce),H=re,B=ce)):ne(t.POLYGON_OFFSET_FILL)}function We(D){D?q(t.SCISSOR_TEST):ne(t.SCISSOR_TEST)}function Dt(D){D===void 0&&(D=t.TEXTURE0+G-1),Q!==D&&(t.activeTexture(D),Q=D)}function Mt(D,re,ce){ce===void 0&&(Q===null?ce=t.TEXTURE0+G-1:ce=Q);let we=fe[ce];we===void 0&&(we={type:void 0,texture:void 0},fe[ce]=we),(we.type!==D||we.texture!==re)&&(Q!==ce&&(t.activeTexture(ce),Q=ce),t.bindTexture(D,re||O[D]),we.type=D,we.texture=re)}function P(){const D=fe[Q];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function S(){try{t.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{t.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{t.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{t.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{t.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(){try{t.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{t.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{t.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{t.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{t.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _e(D){Se.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),Se.copy(D))}function ke(D){ye.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),ye.copy(D))}function Pe(D,re){let ce=c.get(re);ce===void 0&&(ce=new WeakMap,c.set(re,ce));let we=ce.get(D);we===void 0&&(we=t.getUniformBlockIndex(re,D.name),ce.set(D,we))}function he(D,re){const we=c.get(re).get(D);l.get(re)!==we&&(t.uniformBlockBinding(re,we,D.__bindingPointIndex),l.set(re,we))}function Ge(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},Q=null,fe={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,w=null,y=null,C=null,M=null,T=new Ke(0,0,0),A=0,v=!1,x=null,R=null,I=null,H=null,B=null,Se.set(0,0,t.canvas.width,t.canvas.height),ye.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:q,disable:ne,bindFramebuffer:xe,drawBuffers:ve,useProgram:Fe,setBlending:rt,setMaterial:Ve,setFlipSided:Ue,setCullFace:Te,setLineWidth:_t,setPolygonOffset:Ae,setScissorTest:We,activeTexture:Dt,bindTexture:Mt,unbindTexture:P,compressedTexImage2D:S,compressedTexImage3D:z,texImage2D:Re,texImage3D:se,updateUBOMapping:Pe,uniformBlockBinding:he,texStorage2D:oe,texStorage3D:Ce,texSubImage2D:j,texSubImage3D:J,compressedTexSubImage2D:K,compressedTexSubImage3D:Le,scissor:_e,viewport:ke,reset:Ge}}function D1(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,S){return h?new OffscreenCanvas(P,S):Ml("canvas")}function g(P,S,z){let j=1;const J=Mt(P);if((J.width>z||J.height>z)&&(j=z/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(j*J.width),Le=Math.floor(j*J.height);d===void 0&&(d=_(K,Le));const oe=S?_(K,Le):d;return oe.width=K,oe.height=Le,oe.getContext("2d").drawImage(P,0,0,K,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+K+"x"+Le+")."),oe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){t.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function w(P,S,z,j,J=!1){if(P!==null){if(t[P]!==void 0)return t[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=S;if(S===t.RED&&(z===t.FLOAT&&(K=t.R32F),z===t.HALF_FLOAT&&(K=t.R16F),z===t.UNSIGNED_BYTE&&(K=t.R8)),S===t.RED_INTEGER&&(z===t.UNSIGNED_BYTE&&(K=t.R8UI),z===t.UNSIGNED_SHORT&&(K=t.R16UI),z===t.UNSIGNED_INT&&(K=t.R32UI),z===t.BYTE&&(K=t.R8I),z===t.SHORT&&(K=t.R16I),z===t.INT&&(K=t.R32I)),S===t.RG&&(z===t.FLOAT&&(K=t.RG32F),z===t.HALF_FLOAT&&(K=t.RG16F),z===t.UNSIGNED_BYTE&&(K=t.RG8)),S===t.RG_INTEGER&&(z===t.UNSIGNED_BYTE&&(K=t.RG8UI),z===t.UNSIGNED_SHORT&&(K=t.RG16UI),z===t.UNSIGNED_INT&&(K=t.RG32UI),z===t.BYTE&&(K=t.RG8I),z===t.SHORT&&(K=t.RG16I),z===t.INT&&(K=t.RG32I)),S===t.RGB_INTEGER&&(z===t.UNSIGNED_BYTE&&(K=t.RGB8UI),z===t.UNSIGNED_SHORT&&(K=t.RGB16UI),z===t.UNSIGNED_INT&&(K=t.RGB32UI),z===t.BYTE&&(K=t.RGB8I),z===t.SHORT&&(K=t.RGB16I),z===t.INT&&(K=t.RGB32I)),S===t.RGBA_INTEGER&&(z===t.UNSIGNED_BYTE&&(K=t.RGBA8UI),z===t.UNSIGNED_SHORT&&(K=t.RGBA16UI),z===t.UNSIGNED_INT&&(K=t.RGBA32UI),z===t.BYTE&&(K=t.RGBA8I),z===t.SHORT&&(K=t.RGBA16I),z===t.INT&&(K=t.RGBA32I)),S===t.RGB&&(z===t.UNSIGNED_INT_5_9_9_9_REV&&(K=t.RGB9_E5),z===t.UNSIGNED_INT_10F_11F_11F_REV&&(K=t.R11F_G11F_B10F)),S===t.RGBA){const Le=J?wl:et.getTransfer(j);z===t.FLOAT&&(K=t.RGBA32F),z===t.HALF_FLOAT&&(K=t.RGBA16F),z===t.UNSIGNED_BYTE&&(K=Le===lt?t.SRGB8_ALPHA8:t.RGBA8),z===t.UNSIGNED_SHORT_4_4_4_4&&(K=t.RGBA4),z===t.UNSIGNED_SHORT_5_5_5_1&&(K=t.RGB5_A1)}return(K===t.R16F||K===t.R32F||K===t.RG16F||K===t.RG32F||K===t.RGBA16F||K===t.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function y(P,S){let z;return P?S===null||S===ya||S===Sr?z=t.DEPTH24_STENCIL8:S===fi?z=t.DEPTH32F_STENCIL8:S===xr&&(z=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ya||S===Sr?z=t.DEPTH_COMPONENT24:S===fi?z=t.DEPTH_COMPONENT32F:S===xr&&(z=t.DEPTH_COMPONENT16),z}function C(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Fn&&P.minFilter!==$n?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function M(P){const S=P.target;S.removeEventListener("dispose",M),A(S),S.isVideoTexture&&u.delete(S)}function T(P){const S=P.target;S.removeEventListener("dispose",T),x(S)}function A(P){const S=i.get(P);if(S.__webglInit===void 0)return;const z=P.source,j=f.get(z);if(j){const J=j[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(P),Object.keys(j).length===0&&f.delete(z)}i.remove(P)}function v(P){const S=i.get(P);t.deleteTexture(S.__webglTexture);const z=P.source,j=f.get(z);delete j[S.__cacheKey],r.memory.textures--}function x(P){const S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let J=0;J<S.__webglFramebuffer[j].length;J++)t.deleteFramebuffer(S.__webglFramebuffer[j][J]);else t.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)t.deleteFramebuffer(S.__webglFramebuffer[j]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=P.textures;for(let j=0,J=z.length;j<J;j++){const K=i.get(z[j]);K.__webglTexture&&(t.deleteTexture(K.__webglTexture),r.memory.textures--),i.remove(z[j])}i.remove(P)}let R=0;function I(){R=0}function H(){const P=R;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),R+=1,P}function B(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function G(P,S){const z=i.get(P);if(P.isVideoTexture&&We(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(z,P,S);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,z.__webglTexture,t.TEXTURE0+S)}function U(P,S){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){O(z,P,S);return}n.bindTexture(t.TEXTURE_2D_ARRAY,z.__webglTexture,t.TEXTURE0+S)}function X(P,S){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){O(z,P,S);return}n.bindTexture(t.TEXTURE_3D,z.__webglTexture,t.TEXTURE0+S)}function V(P,S){const z=i.get(P);if(P.version>0&&z.__version!==P.version){q(z,P,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,z.__webglTexture,t.TEXTURE0+S)}const Q={[Qu]:t.REPEAT,[fa]:t.CLAMP_TO_EDGE,[ed]:t.MIRRORED_REPEAT},fe={[Fn]:t.NEAREST,[gx]:t.NEAREST_MIPMAP_NEAREST,[jr]:t.NEAREST_MIPMAP_LINEAR,[$n]:t.LINEAR,[yc]:t.LINEAR_MIPMAP_NEAREST,[ha]:t.LINEAR_MIPMAP_LINEAR},Y={[xx]:t.NEVER,[Ax]:t.ALWAYS,[Sx]:t.LESS,[zg]:t.LEQUAL,[wx]:t.EQUAL,[Tx]:t.GEQUAL,[Ex]:t.GREATER,[Mx]:t.NOTEQUAL};function ue(P,S){if(S.type===fi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===$n||S.magFilter===yc||S.magFilter===jr||S.magFilter===ha||S.minFilter===$n||S.minFilter===yc||S.minFilter===jr||S.minFilter===ha)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,Q[S.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,Q[S.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,Q[S.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,fe[S.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,fe[S.minFilter]),S.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,Y[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Fn||S.minFilter!==jr&&S.minFilter!==ha||S.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,a.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Se(P,S){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",M));const j=S.source;let J=f.get(j);J===void 0&&(J={},f.set(j,J));const K=B(S);if(K!==P.__cacheKey){J[K]===void 0&&(J[K]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,z=!0),J[K].usedTimes++;const Le=J[P.__cacheKey];Le!==void 0&&(J[P.__cacheKey].usedTimes--,Le.usedTimes===0&&v(S)),P.__cacheKey=K,P.__webglTexture=J[K].texture}return z}function ye(P,S,z){return Math.floor(Math.floor(P/z)/S)}function pe(P,S,z,j){const K=P.updateRanges;if(K.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,z,j,S.data);else{K.sort((se,_e)=>se.start-_e.start);let Le=0;for(let se=1;se<K.length;se++){const _e=K[Le],ke=K[se],Pe=_e.start+_e.count,he=ye(ke.start,S.width,4),Ge=ye(_e.start,S.width,4);ke.start<=Pe+1&&he===Ge&&ye(ke.start+ke.count-1,S.width,4)===he?_e.count=Math.max(_e.count,ke.start+ke.count-_e.start):(++Le,K[Le]=ke)}K.length=Le+1;const oe=t.getParameter(t.UNPACK_ROW_LENGTH),Ce=t.getParameter(t.UNPACK_SKIP_PIXELS),Re=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let se=0,_e=K.length;se<_e;se++){const ke=K[se],Pe=Math.floor(ke.start/4),he=Math.ceil(ke.count/4),Ge=Pe%S.width,D=Math.floor(Pe/S.width),re=he,ce=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(t.UNPACK_SKIP_ROWS,D),n.texSubImage2D(t.TEXTURE_2D,0,Ge,D,re,ce,z,j,S.data)}P.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,oe),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),t.pixelStorei(t.UNPACK_SKIP_ROWS,Re)}}function O(P,S,z){let j=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=t.TEXTURE_3D);const J=Se(P,S),K=S.source;n.bindTexture(j,P.__webglTexture,t.TEXTURE0+z);const Le=i.get(K);if(K.version!==Le.__version||J===!0){n.activeTexture(t.TEXTURE0+z);const oe=et.getPrimaries(et.workingColorSpace),Ce=S.colorSpace===Ri?null:et.getPrimaries(S.colorSpace),Re=S.colorSpace===Ri||oe===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let se=g(S.image,!1,a.maxTextureSize);se=Dt(S,se);const _e=s.convert(S.format,S.colorSpace),ke=s.convert(S.type);let Pe=w(S.internalFormat,_e,ke,S.colorSpace,S.isVideoTexture);ue(j,S);let he;const Ge=S.mipmaps,D=S.isVideoTexture!==!0,re=Le.__version===void 0||J===!0,ce=K.dataReady,we=C(S,se);if(S.isDepthTexture)Pe=y(S.format===Er,S.type),re&&(D?n.texStorage2D(t.TEXTURE_2D,1,Pe,se.width,se.height):n.texImage2D(t.TEXTURE_2D,0,Pe,se.width,se.height,0,_e,ke,null));else if(S.isDataTexture)if(Ge.length>0){D&&re&&n.texStorage2D(t.TEXTURE_2D,we,Pe,Ge[0].width,Ge[0].height);for(let ie=0,Z=Ge.length;ie<Z;ie++)he=Ge[ie],D?ce&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,he.width,he.height,_e,ke,he.data):n.texImage2D(t.TEXTURE_2D,ie,Pe,he.width,he.height,0,_e,ke,he.data);S.generateMipmaps=!1}else D?(re&&n.texStorage2D(t.TEXTURE_2D,we,Pe,se.width,se.height),ce&&pe(S,se,_e,ke)):n.texImage2D(t.TEXTURE_2D,0,Pe,se.width,se.height,0,_e,ke,se.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){D&&re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,we,Pe,Ge[0].width,Ge[0].height,se.depth);for(let ie=0,Z=Ge.length;ie<Z;ie++)if(he=Ge[ie],S.format!==In)if(_e!==null)if(D){if(ce)if(S.layerUpdates.size>0){const Me=vp(he.width,he.height,S.format,S.type);for(const He of S.layerUpdates){const dt=he.data.subarray(He*Me/he.data.BYTES_PER_ELEMENT,(He+1)*Me/he.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,He,he.width,he.height,1,_e,dt)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,se.depth,_e,he.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ie,Pe,he.width,he.height,se.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ce&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,se.depth,_e,ke,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ie,Pe,he.width,he.height,se.depth,0,_e,ke,he.data)}else{D&&re&&n.texStorage2D(t.TEXTURE_2D,we,Pe,Ge[0].width,Ge[0].height);for(let ie=0,Z=Ge.length;ie<Z;ie++)he=Ge[ie],S.format!==In?_e!==null?D?ce&&n.compressedTexSubImage2D(t.TEXTURE_2D,ie,0,0,he.width,he.height,_e,he.data):n.compressedTexImage2D(t.TEXTURE_2D,ie,Pe,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ce&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,he.width,he.height,_e,ke,he.data):n.texImage2D(t.TEXTURE_2D,ie,Pe,he.width,he.height,0,_e,ke,he.data)}else if(S.isDataArrayTexture)if(D){if(re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,we,Pe,se.width,se.height,se.depth),ce)if(S.layerUpdates.size>0){const ie=vp(se.width,se.height,S.format,S.type);for(const Z of S.layerUpdates){const Me=se.data.subarray(Z*ie/se.data.BYTES_PER_ELEMENT,(Z+1)*ie/se.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Z,se.width,se.height,1,_e,ke,Me)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,_e,ke,se.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pe,se.width,se.height,se.depth,0,_e,ke,se.data);else if(S.isData3DTexture)D?(re&&n.texStorage3D(t.TEXTURE_3D,we,Pe,se.width,se.height,se.depth),ce&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,_e,ke,se.data)):n.texImage3D(t.TEXTURE_3D,0,Pe,se.width,se.height,se.depth,0,_e,ke,se.data);else if(S.isFramebufferTexture){if(re)if(D)n.texStorage2D(t.TEXTURE_2D,we,Pe,se.width,se.height);else{let ie=se.width,Z=se.height;for(let Me=0;Me<we;Me++)n.texImage2D(t.TEXTURE_2D,Me,Pe,ie,Z,0,_e,ke,null),ie>>=1,Z>>=1}}else if(Ge.length>0){if(D&&re){const ie=Mt(Ge[0]);n.texStorage2D(t.TEXTURE_2D,we,Pe,ie.width,ie.height)}for(let ie=0,Z=Ge.length;ie<Z;ie++)he=Ge[ie],D?ce&&n.texSubImage2D(t.TEXTURE_2D,ie,0,0,_e,ke,he):n.texImage2D(t.TEXTURE_2D,ie,Pe,_e,ke,he);S.generateMipmaps=!1}else if(D){if(re){const ie=Mt(se);n.texStorage2D(t.TEXTURE_2D,we,Pe,ie.width,ie.height)}ce&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,_e,ke,se)}else n.texImage2D(t.TEXTURE_2D,0,Pe,_e,ke,se);m(S)&&p(j),Le.__version=K.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function q(P,S,z){if(S.image.length!==6)return;const j=Se(P,S),J=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+z);const K=i.get(J);if(J.version!==K.__version||j===!0){n.activeTexture(t.TEXTURE0+z);const Le=et.getPrimaries(et.workingColorSpace),oe=S.colorSpace===Ri?null:et.getPrimaries(S.colorSpace),Ce=S.colorSpace===Ri||Le===oe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Re=S.isCompressedTexture||S.image[0].isCompressedTexture,se=S.image[0]&&S.image[0].isDataTexture,_e=[];for(let Z=0;Z<6;Z++)!Re&&!se?_e[Z]=g(S.image[Z],!0,a.maxCubemapSize):_e[Z]=se?S.image[Z].image:S.image[Z],_e[Z]=Dt(S,_e[Z]);const ke=_e[0],Pe=s.convert(S.format,S.colorSpace),he=s.convert(S.type),Ge=w(S.internalFormat,Pe,he,S.colorSpace),D=S.isVideoTexture!==!0,re=K.__version===void 0||j===!0,ce=J.dataReady;let we=C(S,ke);ue(t.TEXTURE_CUBE_MAP,S);let ie;if(Re){D&&re&&n.texStorage2D(t.TEXTURE_CUBE_MAP,we,Ge,ke.width,ke.height);for(let Z=0;Z<6;Z++){ie=_e[Z].mipmaps;for(let Me=0;Me<ie.length;Me++){const He=ie[Me];S.format!==In?Pe!==null?D?ce&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,0,0,He.width,He.height,Pe,He.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,Ge,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ce&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,0,0,He.width,He.height,Pe,he,He.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me,Ge,He.width,He.height,0,Pe,he,He.data)}}}else{if(ie=S.mipmaps,D&&re){ie.length>0&&we++;const Z=Mt(_e[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,we,Ge,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(se){D?ce&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_e[Z].width,_e[Z].height,Pe,he,_e[Z].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,_e[Z].width,_e[Z].height,0,Pe,he,_e[Z].data);for(let Me=0;Me<ie.length;Me++){const dt=ie[Me].image[Z].image;D?ce&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,0,0,dt.width,dt.height,Pe,he,dt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,Ge,dt.width,dt.height,0,Pe,he,dt.data)}}else{D?ce&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pe,he,_e[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,Pe,he,_e[Z]);for(let Me=0;Me<ie.length;Me++){const He=ie[Me];D?ce&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,0,0,Pe,he,He.image[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Me+1,Ge,Pe,he,He.image[Z])}}}m(S)&&p(t.TEXTURE_CUBE_MAP),K.__version=J.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ne(P,S,z,j,J,K){const Le=s.convert(z.format,z.colorSpace),oe=s.convert(z.type),Ce=w(z.internalFormat,Le,oe,z.colorSpace),Re=i.get(S),se=i.get(z);if(se.__renderTarget=S,!Re.__hasExternalTextures){const _e=Math.max(1,S.width>>K),ke=Math.max(1,S.height>>K);J===t.TEXTURE_3D||J===t.TEXTURE_2D_ARRAY?n.texImage3D(J,K,Ce,_e,ke,S.depth,0,Le,oe,null):n.texImage2D(J,K,Ce,_e,ke,0,Le,oe,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Ae(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,J,se.__webglTexture,0,_t(S)):(J===t.TEXTURE_2D||J>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,j,J,se.__webglTexture,K),n.bindFramebuffer(t.FRAMEBUFFER,null)}function xe(P,S,z){if(t.bindRenderbuffer(t.RENDERBUFFER,P),S.depthBuffer){const j=S.depthTexture,J=j&&j.isDepthTexture?j.type:null,K=y(S.stencilBuffer,J),Le=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=_t(S);Ae(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,oe,K,S.width,S.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,oe,K,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,K,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Le,t.RENDERBUFFER,P)}else{const j=S.textures;for(let J=0;J<j.length;J++){const K=j[J],Le=s.convert(K.format,K.colorSpace),oe=s.convert(K.type),Ce=w(K.internalFormat,Le,oe,K.colorSpace),Re=_t(S);z&&Ae(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Re,Ce,S.width,S.height):Ae(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Re,Ce,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Ce,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ve(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);const J=j.__webglTexture,K=_t(S);if(S.depthTexture.format===wr)Ae(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,J,0,K):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,J,0);else if(S.depthTexture.format===Er)Ae(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,J,0,K):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Fe(P){const S=i.get(P),z=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=j}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const j=P.texture.mipmaps;j&&j.length>0?ve(S.__webglFramebuffer[0],P):ve(S.__webglFramebuffer,P)}else if(z){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=t.createRenderbuffer(),xe(S.__webglDepthbuffer[j],P,!1);else{const J=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[j];t.bindRenderbuffer(t.RENDERBUFFER,K),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,K)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),xe(S.__webglDepthbuffer,P,!1);else{const J=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,K),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,K)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function st(P,S,z){const j=i.get(P);S!==void 0&&ne(j.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),z!==void 0&&Fe(P)}function N(P){const S=P.texture,z=i.get(P),j=i.get(S);P.addEventListener("dispose",T);const J=P.textures,K=P.isWebGLCubeRenderTarget===!0,Le=J.length>1;if(Le||(j.__webglTexture===void 0&&(j.__webglTexture=t.createTexture()),j.__version=S.version,r.memory.textures++),K){z.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[oe]=[];for(let Ce=0;Ce<S.mipmaps.length;Ce++)z.__webglFramebuffer[oe][Ce]=t.createFramebuffer()}else z.__webglFramebuffer[oe]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let oe=0;oe<S.mipmaps.length;oe++)z.__webglFramebuffer[oe]=t.createFramebuffer()}else z.__webglFramebuffer=t.createFramebuffer();if(Le)for(let oe=0,Ce=J.length;oe<Ce;oe++){const Re=i.get(J[oe]);Re.__webglTexture===void 0&&(Re.__webglTexture=t.createTexture(),r.memory.textures++)}if(P.samples>0&&Ae(P)===!1){z.__webglMultisampledFramebuffer=t.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let oe=0;oe<J.length;oe++){const Ce=J[oe];z.__webglColorRenderbuffer[oe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,z.__webglColorRenderbuffer[oe]);const Re=s.convert(Ce.format,Ce.colorSpace),se=s.convert(Ce.type),_e=w(Ce.internalFormat,Re,se,Ce.colorSpace,P.isXRRenderTarget===!0),ke=_t(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,ke,_e,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.RENDERBUFFER,z.__webglColorRenderbuffer[oe])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=t.createRenderbuffer(),xe(z.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(K){n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),ue(t.TEXTURE_CUBE_MAP,S);for(let oe=0;oe<6;oe++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)ne(z.__webglFramebuffer[oe][Ce],P,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ce);else ne(z.__webglFramebuffer[oe],P,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(S)&&p(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Le){for(let oe=0,Ce=J.length;oe<Ce;oe++){const Re=J[oe],se=i.get(Re);let _e=t.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_e=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(_e,se.__webglTexture),ue(_e,Re),ne(z.__webglFramebuffer,P,Re,t.COLOR_ATTACHMENT0+oe,_e,0),m(Re)&&p(_e)}n.unbindTexture()}else{let oe=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(oe=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(oe,j.__webglTexture),ue(oe,S),S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)ne(z.__webglFramebuffer[Ce],P,S,t.COLOR_ATTACHMENT0,oe,Ce);else ne(z.__webglFramebuffer,P,S,t.COLOR_ATTACHMENT0,oe,0);m(S)&&p(oe),n.unbindTexture()}P.depthBuffer&&Fe(P)}function rt(P){const S=P.textures;for(let z=0,j=S.length;z<j;z++){const J=S[z];if(m(J)){const K=b(P),Le=i.get(J).__webglTexture;n.bindTexture(K,Le),p(K),n.unbindTexture()}}}const Ve=[],Ue=[];function Te(P){if(P.samples>0){if(Ae(P)===!1){const S=P.textures,z=P.width,j=P.height;let J=t.COLOR_BUFFER_BIT;const K=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Le=i.get(P),oe=S.length>1;if(oe)for(let Re=0;Re<S.length;Re++)n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const Ce=P.texture.mipmaps;Ce&&Ce.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Re=0;Re<S.length;Re++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(J|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(J|=t.STENCIL_BUFFER_BIT)),oe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Le.__webglColorRenderbuffer[Re]);const se=i.get(S[Re]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,se,0)}t.blitFramebuffer(0,0,z,j,0,0,z,j,J,t.NEAREST),l===!0&&(Ve.length=0,Ue.length=0,Ve.push(t.COLOR_ATTACHMENT0+Re),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ve.push(K),Ue.push(K),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ue)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ve))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),oe)for(let Re=0;Re<S.length;Re++){n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.RENDERBUFFER,Le.__webglColorRenderbuffer[Re]);const se=i.get(S[Re]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Le.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.TEXTURE_2D,se,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const S=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function _t(P){return Math.min(a.maxSamples,P.samples)}function Ae(P){const S=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function We(P){const S=r.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function Dt(P,S){const z=P.colorSpace,j=P.format,J=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==Ss&&z!==Ri&&(et.getTransfer(z)===lt?(j!==In||J!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function Mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=I,this.setTexture2D=G,this.setTexture2DArray=U,this.setTexture3D=X,this.setTextureCube=V,this.rebindTextures=st,this.setupRenderTarget=N,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=Ae}function F1(t,e){function n(i,a=Ri){let s;const r=et.getTransfer(a);if(i===Zn)return t.UNSIGNED_BYTE;if(i===Hf)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Vf)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Dg)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Fg)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ng)return t.BYTE;if(i===Ig)return t.SHORT;if(i===xr)return t.UNSIGNED_SHORT;if(i===zf)return t.INT;if(i===ya)return t.UNSIGNED_INT;if(i===fi)return t.FLOAT;if(i===Vr)return t.HALF_FLOAT;if(i===kg)return t.ALPHA;if(i===Og)return t.RGB;if(i===In)return t.RGBA;if(i===wr)return t.DEPTH_COMPONENT;if(i===Er)return t.DEPTH_STENCIL;if(i===Ug)return t.RED;if(i===Gf)return t.RED_INTEGER;if(i===Bg)return t.RG;if(i===$f)return t.RG_INTEGER;if(i===Wf)return t.RGBA_INTEGER;if(i===Jo||i===Qo||i===el||i===tl)if(r===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Jo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===el)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===tl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Jo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===el)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===tl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===td||i===nd||i===id||i===ad)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===td)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===id)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ad)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===sd||i===rd||i===od)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===sd||i===rd)return r===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===od)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ld||i===cd||i===ud||i===dd||i===fd||i===hd||i===pd||i===md||i===_d||i===gd||i===vd||i===yd||i===bd||i===xd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ld)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ud)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===dd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===md)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_d)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xd)return r===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sd||i===wd||i===Ed)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Sd)return r===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ed)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Md||i===Td||i===Ad||i===Cd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Md)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Td)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ad)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Cd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Sr?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const k1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O1=`
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

}`;class U1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new ev(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Hi({vertexShader:k1,fragmentShader:O1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ze(new tn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class B1 extends Ma{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=typeof XRWebGLBinding<"u",m=new U1,p={},b=n.getContextAttributes();let w=null,y=null;const C=[],M=[],T=new le;let A=null;const v=new vn;v.viewport=new Et;const x=new vn;x.viewport=new Et;const R=[v,x],I=new aw;let H=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let q=C[O];return q===void 0&&(q=new zc,C[O]=q),q.getTargetRaySpace()},this.getControllerGrip=function(O){let q=C[O];return q===void 0&&(q=new zc,C[O]=q),q.getGripSpace()},this.getHand=function(O){let q=C[O];return q===void 0&&(q=new zc,C[O]=q),q.getHandSpace()};function G(O){const q=M.indexOf(O.inputSource);if(q===-1)return;const ne=C[q];ne!==void 0&&(ne.update(O.inputSource,O.frame,c||r),ne.dispatchEvent({type:O.type,data:O.inputSource}))}function U(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",U),a.removeEventListener("inputsourceschange",X);for(let O=0;O<C.length;O++){const q=M[O];q!==null&&(M[O]=null,C[O].disconnect(q))}H=null,B=null,m.reset();for(const O in p)delete p[O];e.setRenderTarget(w),h=null,f=null,d=null,a=null,y=null,pe.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(a,n)),d},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(O){if(a=O,a!==null){if(w=e.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",U),a.addEventListener("inputsourceschange",X),b.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ne=null,xe=null,ve=null;b.depth&&(ve=b.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ne=b.stencil?Er:wr,xe=b.stencil?Sr:ya);const Fe={colorFormat:n.RGBA8,depthFormat:ve,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Fe),a.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new ba(f.textureWidth,f.textureHeight,{format:In,type:Zn,depthTexture:new Qg(f.textureWidth,f.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ne={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(a,n,ne),a.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new ba(h.framebufferWidth,h.framebufferHeight,{format:In,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),pe.setContext(a),pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(O){for(let q=0;q<O.removed.length;q++){const ne=O.removed[q],xe=M.indexOf(ne);xe>=0&&(M[xe]=null,C[xe].disconnect(ne))}for(let q=0;q<O.added.length;q++){const ne=O.added[q];let xe=M.indexOf(ne);if(xe===-1){for(let Fe=0;Fe<C.length;Fe++)if(Fe>=M.length){M.push(ne),xe=Fe;break}else if(M[Fe]===null){M[Fe]=ne,xe=Fe;break}if(xe===-1)break}const ve=C[xe];ve&&ve.connect(ne)}}const V=new L,Q=new L;function fe(O,q,ne){V.setFromMatrixPosition(q.matrixWorld),Q.setFromMatrixPosition(ne.matrixWorld);const xe=V.distanceTo(Q),ve=q.projectionMatrix.elements,Fe=ne.projectionMatrix.elements,st=ve[14]/(ve[10]-1),N=ve[14]/(ve[10]+1),rt=(ve[9]+1)/ve[5],Ve=(ve[9]-1)/ve[5],Ue=(ve[8]-1)/ve[0],Te=(Fe[8]+1)/Fe[0],_t=st*Ue,Ae=st*Te,We=xe/(-Ue+Te),Dt=We*-Ue;if(q.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Dt),O.translateZ(We),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),ve[10]===-1)O.projectionMatrix.copy(q.projectionMatrix),O.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const Mt=st+We,P=N+We,S=_t-Dt,z=Ae+(xe-Dt),j=rt*N/P*Mt,J=Ve*N/P*Mt;O.projectionMatrix.makePerspective(S,z,j,J,Mt,P),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function Y(O,q){q===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(q.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(a===null)return;let q=O.near,ne=O.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(ne=m.depthFar)),I.near=x.near=v.near=q,I.far=x.far=v.far=ne,(H!==I.near||B!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),H=I.near,B=I.far),I.layers.mask=O.layers.mask|6,v.layers.mask=I.layers.mask&3,x.layers.mask=I.layers.mask&5;const xe=O.parent,ve=I.cameras;Y(I,xe);for(let Fe=0;Fe<ve.length;Fe++)Y(ve[Fe],xe);ve.length===2?fe(I,v,x):I.projectionMatrix.copy(v.projectionMatrix),ue(O,I,xe)};function ue(O,q,ne){ne===null?O.matrix.copy(q.matrixWorld):(O.matrix.copy(ne.matrixWorld),O.matrix.invert(),O.matrix.multiply(q.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(q.projectionMatrix),O.projectionMatrixInverse.copy(q.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Mr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(O){l=O,f!==null&&(f.fixedFoveation=O),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(O){return p[O]};let Se=null;function ye(O,q){if(u=q.getViewerPose(c||r),_=q,u!==null){const ne=u.views;h!==null&&(e.setRenderTargetFramebuffer(y,h.framebuffer),e.setRenderTarget(y));let xe=!1;ne.length!==I.cameras.length&&(I.cameras.length=0,xe=!0);for(let N=0;N<ne.length;N++){const rt=ne[N];let Ve=null;if(h!==null)Ve=h.getViewport(rt);else{const Te=d.getViewSubImage(f,rt);Ve=Te.viewport,N===0&&(e.setRenderTargetTextures(y,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(y))}let Ue=R[N];Ue===void 0&&(Ue=new vn,Ue.layers.enable(N),Ue.viewport=new Et,R[N]=Ue),Ue.matrix.fromArray(rt.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(rt.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),N===0&&(I.matrix.copy(Ue.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),xe===!0&&I.cameras.push(Ue)}const ve=a.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&g){d=i.getBinding();const N=d.getDepthInformation(ne[0]);N&&N.isValid&&N.texture&&m.init(N,a.renderState)}if(ve&&ve.includes("camera-access")&&g){e.state.unbindTexture(),d=i.getBinding();for(let N=0;N<ne.length;N++){const rt=ne[N].camera;if(rt){let Ve=p[rt];Ve||(Ve=new ev,p[rt]=Ve);const Ue=d.getCameraImage(rt);Ve.sourceTexture=Ue}}}}for(let ne=0;ne<C.length;ne++){const xe=M[ne],ve=C[ne];xe!==null&&ve!==void 0&&ve.update(xe,q,c||r)}Se&&Se(O,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),_=null}const pe=new fv;pe.setAnimationLoop(ye),this.setAnimationLoop=function(O){Se=O},this.dispose=function(){}}}const na=new On,z1=new vt;function H1(t,e){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Yg(t)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function a(m,p,b,w,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),w=b.envMap,y=b.envMapRotation;w&&(m.envMap.value=w,na.copy(y),na.x*=-1,na.y*=-1,na.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(na.y*=-1,na.z*=-1),m.envMapRotation.value.setFromMatrix4(z1.makeRotationFromEuler(na)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function V1(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const y=w.program;i.uniformBlockBinding(b,y)}function c(b,w){let y=a[b.id];y===void 0&&(_(b),y=u(b),a[b.id]=y,b.addEventListener("dispose",m));const C=w.program;i.updateUBOMapping(b,C);const M=e.render.frame;s[b.id]!==M&&(f(b),s[b.id]=M)}function u(b){const w=d();b.__bindingPointIndex=w;const y=t.createBuffer(),C=b.__size,M=b.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,M),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,y),y}function d(){for(let b=0;b<o;b++)if(r.indexOf(b)===-1)return r.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const w=a[b.id],y=b.uniforms,C=b.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let M=0,T=y.length;M<T;M++){const A=Array.isArray(y[M])?y[M]:[y[M]];for(let v=0,x=A.length;v<x;v++){const R=A[v];if(h(R,M,v,C)===!0){const I=R.__offset,H=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let G=0;G<H.length;G++){const U=H[G],X=g(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,t.bufferSubData(t.UNIFORM_BUFFER,I+B,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,B),B+=X.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,I,R.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(b,w,y,C){const M=b.value,T=w+"_"+y;if(C[T]===void 0)return typeof M=="number"||typeof M=="boolean"?C[T]=M:C[T]=M.clone(),!0;{const A=C[T];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return C[T]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function _(b){const w=b.uniforms;let y=0;const C=16;for(let T=0,A=w.length;T<A;T++){const v=Array.isArray(w[T])?w[T]:[w[T]];for(let x=0,R=v.length;x<R;x++){const I=v[x],H=Array.isArray(I.value)?I.value:[I.value];for(let B=0,G=H.length;B<G;B++){const U=H[B],X=g(U),V=y%C,Q=V%X.boundary,fe=V+Q;y+=Q,fe!==0&&C-fe<X.storage&&(y+=C-fe),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=X.storage}}}const M=y%C;return M>0&&(y+=C-M),b.__size=y,b.__cache={},this}function g(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function m(b){const w=b.target;w.removeEventListener("dispose",m);const y=r.indexOf(w.__bindingPointIndex);r.splice(y,1),t.deleteBuffer(a[w.id]),delete a[w.id],delete s[w.id]}function p(){for(const b in a)t.deleteBuffer(a[b]);r=[],a={},s={}}return{bind:l,update:c,dispose:p}}class G1{constructor(e={}){const{canvas:n=$x(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=r;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const b=[],w=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=Gt;let M=0,T=0,A=null,v=-1,x=null;const R=new Et,I=new Et;let H=null;const B=new Ke(0);let G=0,U=n.width,X=n.height,V=1,Q=null,fe=null;const Y=new Et(0,0,U,X),ue=new Et(0,0,U,X);let Se=!1;const ye=new jf;let pe=!1,O=!1;const q=new vt,ne=new L,xe=new Et,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function st(){return A===null?V:1}let N=i;function rt(E,F){return n.getContext(E,F)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine","three.js r180"),n.addEventListener("webglcontextlost",ce,!1),n.addEventListener("webglcontextrestored",we,!1),n.addEventListener("webglcontextcreationerror",ie,!1),N===null){const F="webgl2";if(N=rt(F,E),N===null)throw rt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ve,Ue,Te,_t,Ae,We,Dt,Mt,P,S,z,j,J,K,Le,oe,Ce,Re,se,_e,ke,Pe,he,Ge;function D(){Ve=new QM(N),Ve.init(),Pe=new F1(N,Ve),Ue=new XM(N,Ve,e,Pe),Te=new I1(N,Ve),Ue.reversedDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),_t=new nT(N),Ae=new b1,We=new D1(N,Ve,Te,Ae,Ue,Pe,_t),Dt=new qM(y),Mt=new JM(y),P=new lw(N),he=new $M(N,P),S=new eT(N,P,_t,he),z=new aT(N,S,P,_t),se=new iT(N,Ue,We),oe=new YM(Ae),j=new y1(y,Dt,Mt,Ve,Ue,he,oe),J=new H1(y,Ae),K=new S1,Le=new C1(Ve),Re=new GM(y,Dt,Mt,Te,z,h,l),Ce=new L1(y,z,Ue),Ge=new V1(N,_t,Ue,Te),_e=new WM(N,Ve,_t),ke=new tT(N,Ve,_t),_t.programs=j.programs,y.capabilities=Ue,y.extensions=Ve,y.properties=Ae,y.renderLists=K,y.shadowMap=Ce,y.state=Te,y.info=_t}D();const re=new B1(y,N);this.xr=re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(E){E!==void 0&&(V=E,this.setSize(U,X,!1))},this.getSize=function(E){return E.set(U,X)},this.setSize=function(E,F,$=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=E,X=F,n.width=Math.floor(E*V),n.height=Math.floor(F*V),$===!0&&(n.style.width=E+"px",n.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(U*V,X*V).floor()},this.setDrawingBufferSize=function(E,F,$){U=E,X=F,V=$,n.width=Math.floor(E*$),n.height=Math.floor(F*$),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,F,$,W){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,F,$,W),Te.viewport(R.copy(Y).multiplyScalar(V).round())},this.getScissor=function(E){return E.copy(ue)},this.setScissor=function(E,F,$,W){E.isVector4?ue.set(E.x,E.y,E.z,E.w):ue.set(E,F,$,W),Te.scissor(I.copy(ue).multiplyScalar(V).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(E){Te.setScissorTest(Se=E)},this.setOpaqueSort=function(E){Q=E},this.setTransparentSort=function(E){fe=E},this.getClearColor=function(E){return E.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,$=!0){let W=0;if(E){let k=!1;if(A!==null){const ae=A.texture.format;k=ae===Wf||ae===$f||ae===Gf}if(k){const ae=A.texture.type,me=ae===Zn||ae===ya||ae===xr||ae===Sr||ae===Hf||ae===Vf,Ee=Re.getClearColor(),be=Re.getClearAlpha(),De=Ee.r,Be=Ee.g,Ne=Ee.b;me?(_[0]=De,_[1]=Be,_[2]=Ne,_[3]=be,N.clearBufferuiv(N.COLOR,0,_)):(g[0]=De,g[1]=Be,g[2]=Ne,g[3]=be,N.clearBufferiv(N.COLOR,0,g))}else W|=N.COLOR_BUFFER_BIT}F&&(W|=N.DEPTH_BUFFER_BIT),$&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ce,!1),n.removeEventListener("webglcontextrestored",we,!1),n.removeEventListener("webglcontextcreationerror",ie,!1),Re.dispose(),K.dispose(),Le.dispose(),Ae.dispose(),Dt.dispose(),Mt.dispose(),z.dispose(),he.dispose(),Ge.dispose(),j.dispose(),re.dispose(),re.removeEventListener("sessionstart",Un),re.removeEventListener("sessionend",Ch),Ki.stop()};function ce(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=_t.autoReset,F=Ce.enabled,$=Ce.autoUpdate,W=Ce.needsUpdate,k=Ce.type;D(),_t.autoReset=E,Ce.enabled=F,Ce.autoUpdate=$,Ce.needsUpdate=W,Ce.type=k}function ie(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Z(E){const F=E.target;F.removeEventListener("dispose",Z),Me(F)}function Me(E){He(E),Ae.remove(E)}function He(E){const F=Ae.get(E).programs;F!==void 0&&(F.forEach(function($){j.releaseProgram($)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,$,W,k,ae){F===null&&(F=ve);const me=k.isMesh&&k.matrixWorld.determinant()<0,Ee=Fb(E,F,$,W,k);Te.setMaterial(W,me);let be=$.index,De=1;if(W.wireframe===!0){if(be=S.getWireframeAttribute($),be===void 0)return;De=2}const Be=$.drawRange,Ne=$.attributes.position;let Ze=Be.start*De,ot=(Be.start+Be.count)*De;ae!==null&&(Ze=Math.max(Ze,ae.start*De),ot=Math.min(ot,(ae.start+ae.count)*De)),be!==null?(Ze=Math.max(Ze,0),ot=Math.min(ot,be.count)):Ne!=null&&(Ze=Math.max(Ze,0),ot=Math.min(ot,Ne.count));const wt=ot-Ze;if(wt<0||wt===1/0)return;he.setup(k,W,Ee,$,be);let ft,ut=_e;if(be!==null&&(ft=P.get(be),ut=ke,ut.setIndex(ft)),k.isMesh)W.wireframe===!0?(Te.setLineWidth(W.wireframeLinewidth*st()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(k.isLine){let Ie=W.linewidth;Ie===void 0&&(Ie=1),Te.setLineWidth(Ie*st()),k.isLineSegments?ut.setMode(N.LINES):k.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else k.isPoints?ut.setMode(N.POINTS):k.isSprite&&ut.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Tr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))ut.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ie=k._multiDrawStarts,yt=k._multiDrawCounts,Qe=k._multiDrawCount,sn=be?P.get(be).bytesPerElement:1,Ca=Ae.get(W).currentProgram.getUniforms();for(let rn=0;rn<Qe;rn++)Ca.setValue(N,"_gl_DrawID",rn),ut.render(Ie[rn]/sn,yt[rn])}else if(k.isInstancedMesh)ut.renderInstances(Ze,wt,k.count);else if($.isInstancedBufferGeometry){const Ie=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,yt=Math.min($.instanceCount,Ie);ut.renderInstances(Ze,wt,yt)}else ut.render(Ze,wt)};function dt(E,F,$){E.transparent===!0&&E.side===Je&&E.forceSinglePass===!1?(E.side=an,E.needsUpdate=!0,Kr(E,F,$),E.side=zi,E.needsUpdate=!0,Kr(E,F,$),E.side=Je):Kr(E,F,$)}this.compile=function(E,F,$=null){$===null&&($=E),p=Le.get($),p.init(F),w.push(p),$.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),E!==$&&E.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const W=new Set;return E.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ae=k.material;if(ae)if(Array.isArray(ae))for(let me=0;me<ae.length;me++){const Ee=ae[me];dt(Ee,$,k),W.add(Ee)}else dt(ae,$,k),W.add(ae)}),p=w.pop(),W},this.compileAsync=function(E,F,$=null){const W=this.compile(E,F,$);return new Promise(k=>{function ae(){if(W.forEach(function(me){Ae.get(me).currentProgram.isReady()&&W.delete(me)}),W.size===0){k(E);return}setTimeout(ae,10)}Ve.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let tt=null;function ni(E){tt&&tt(E)}function Un(){Ki.stop()}function Ch(){Ki.start()}const Ki=new fv;Ki.setAnimationLoop(ni),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(E){tt=E,re.setAnimationLoop(E),E===null?Ki.stop():Ki.start()},re.addEventListener("sessionstart",Un),re.addEventListener("sessionend",Ch),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(F),F=re.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,F,A),p=Le.get(E,w.length),p.init(F),w.push(p),q.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ye.setFromProjectionMatrix(q,Wn,F.reversedDepth),O=this.localClippingEnabled,pe=oe.init(this.clippingPlanes,O),m=K.get(E,b.length),m.init(),b.push(m),re.enabled===!0&&re.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&gc(ae,F,-1/0,y.sortObjects)}gc(E,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Q,fe),Fe=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Fe&&Re.addToRenderList(m,E),this.info.render.frame++,pe===!0&&oe.beginShadows();const $=p.state.shadowsArray;Ce.render($,E,F),pe===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,k=m.transmissive;if(p.setupLights(),F.isArrayCamera){const ae=F.cameras;if(k.length>0)for(let me=0,Ee=ae.length;me<Ee;me++){const be=ae[me];Ph(W,k,E,be)}Fe&&Re.render(E);for(let me=0,Ee=ae.length;me<Ee;me++){const be=ae[me];Rh(m,E,be,be.viewport)}}else k.length>0&&Ph(W,k,E,F),Fe&&Re.render(E),Rh(m,E,F);A!==null&&T===0&&(We.updateMultisampleRenderTarget(A),We.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(y,E,F),he.resetDefaultState(),v=-1,x=null,w.pop(),w.length>0?(p=w[w.length-1],pe===!0&&oe.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function gc(E,F,$,W){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ye.intersectsSprite(E)){W&&xe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(q);const me=z.update(E),Ee=E.material;Ee.visible&&m.push(E,me,Ee,$,xe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ye.intersectsObject(E))){const me=z.update(E),Ee=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),xe.copy(E.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),xe.copy(me.boundingSphere.center)),xe.applyMatrix4(E.matrixWorld).applyMatrix4(q)),Array.isArray(Ee)){const be=me.groups;for(let De=0,Be=be.length;De<Be;De++){const Ne=be[De],Ze=Ee[Ne.materialIndex];Ze&&Ze.visible&&m.push(E,me,Ze,$,xe.z,Ne)}}else Ee.visible&&m.push(E,me,Ee,$,xe.z,null)}}const ae=E.children;for(let me=0,Ee=ae.length;me<Ee;me++)gc(ae[me],F,$,W)}function Rh(E,F,$,W){const k=E.opaque,ae=E.transmissive,me=E.transparent;p.setupLightsView($),pe===!0&&oe.setGlobalState(y.clippingPlanes,$),W&&Te.viewport(R.copy(W)),k.length>0&&qr(k,F,$),ae.length>0&&qr(ae,F,$),me.length>0&&qr(me,F,$),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function Ph(E,F,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new ba(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Vr:Zn,minFilter:ha,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const ae=p.state.transmissionRenderTarget[W.id],me=W.viewport||R;ae.setSize(me.z*y.transmissionResolutionScale,me.w*y.transmissionResolutionScale);const Ee=y.getRenderTarget(),be=y.getActiveCubeFace(),De=y.getActiveMipmapLevel();y.setRenderTarget(ae),y.getClearColor(B),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),Fe&&Re.render($);const Be=y.toneMapping;y.toneMapping=Ii;const Ne=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),pe===!0&&oe.setGlobalState(y.clippingPlanes,W),qr(E,$,W),We.updateMultisampleRenderTarget(ae),We.updateRenderTargetMipmap(ae),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let ot=0,wt=F.length;ot<wt;ot++){const ft=F[ot],ut=ft.object,Ie=ft.geometry,yt=ft.material,Qe=ft.group;if(yt.side===Je&&ut.layers.test(W.layers)){const sn=yt.side;yt.side=an,yt.needsUpdate=!0,Lh(ut,$,W,Ie,yt,Qe),yt.side=sn,yt.needsUpdate=!0,Ze=!0}}Ze===!0&&(We.updateMultisampleRenderTarget(ae),We.updateRenderTargetMipmap(ae))}y.setRenderTarget(Ee,be,De),y.setClearColor(B,G),Ne!==void 0&&(W.viewport=Ne),y.toneMapping=Be}function qr(E,F,$){const W=F.isScene===!0?F.overrideMaterial:null;for(let k=0,ae=E.length;k<ae;k++){const me=E[k],Ee=me.object,be=me.geometry,De=me.group;let Be=me.material;Be.allowOverride===!0&&W!==null&&(Be=W),Ee.layers.test($.layers)&&Lh(Ee,F,$,be,Be,De)}}function Lh(E,F,$,W,k,ae){E.onBeforeRender(y,F,$,W,k,ae),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(y,F,$,W,E,ae),k.transparent===!0&&k.side===Je&&k.forceSinglePass===!1?(k.side=an,k.needsUpdate=!0,y.renderBufferDirect($,F,W,k,E,ae),k.side=zi,k.needsUpdate=!0,y.renderBufferDirect($,F,W,k,E,ae),k.side=Je):y.renderBufferDirect($,F,W,k,E,ae),E.onAfterRender(y,F,$,W,k,ae)}function Kr(E,F,$){F.isScene!==!0&&(F=ve);const W=Ae.get(E),k=p.state.lights,ae=p.state.shadowsArray,me=k.state.version,Ee=j.getParameters(E,k.state,ae,F,$),be=j.getProgramCacheKey(Ee);let De=W.programs;W.environment=E.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(E.isMeshStandardMaterial?Mt:Dt).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,De===void 0&&(E.addEventListener("dispose",Z),De=new Map,W.programs=De);let Be=De.get(be);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===me)return Ih(E,Ee),Be}else Ee.uniforms=j.getUniforms(E),E.onBeforeCompile(Ee,y),Be=j.acquireProgram(Ee,be),De.set(be,Be),W.uniforms=Ee.uniforms;const Ne=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ne.clippingPlanes=oe.uniform),Ih(E,Ee),W.needsLights=Ob(E),W.lightsStateVersion=me,W.needsLights&&(Ne.ambientLightColor.value=k.state.ambient,Ne.lightProbe.value=k.state.probe,Ne.directionalLights.value=k.state.directional,Ne.directionalLightShadows.value=k.state.directionalShadow,Ne.spotLights.value=k.state.spot,Ne.spotLightShadows.value=k.state.spotShadow,Ne.rectAreaLights.value=k.state.rectArea,Ne.ltc_1.value=k.state.rectAreaLTC1,Ne.ltc_2.value=k.state.rectAreaLTC2,Ne.pointLights.value=k.state.point,Ne.pointLightShadows.value=k.state.pointShadow,Ne.hemisphereLights.value=k.state.hemi,Ne.directionalShadowMap.value=k.state.directionalShadowMap,Ne.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ne.spotShadowMap.value=k.state.spotShadowMap,Ne.spotLightMatrix.value=k.state.spotLightMatrix,Ne.spotLightMap.value=k.state.spotLightMap,Ne.pointShadowMap.value=k.state.pointShadowMap,Ne.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function Nh(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=nl.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Ih(E,F){const $=Ae.get(E);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function Fb(E,F,$,W,k){F.isScene!==!0&&(F=ve),We.resetTextureUnits();const ae=F.fog,me=W.isMeshStandardMaterial?F.environment:null,Ee=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ss,be=(W.isMeshStandardMaterial?Mt:Dt).get(W.envMap||me),De=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Be=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ne=!!$.morphAttributes.position,Ze=!!$.morphAttributes.normal,ot=!!$.morphAttributes.color;let wt=Ii;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(wt=y.toneMapping);const ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ut=ft!==void 0?ft.length:0,Ie=Ae.get(W),yt=p.state.lights;if(pe===!0&&(O===!0||E!==x)){const Xt=E===x&&W.id===v;oe.setState(W,E,Xt)}let Qe=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==yt.state.version||Ie.outputColorSpace!==Ee||k.isBatchedMesh&&Ie.batching===!1||!k.isBatchedMesh&&Ie.batching===!0||k.isBatchedMesh&&Ie.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ie.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ie.instancing===!1||!k.isInstancedMesh&&Ie.instancing===!0||k.isSkinnedMesh&&Ie.skinning===!1||!k.isSkinnedMesh&&Ie.skinning===!0||k.isInstancedMesh&&Ie.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ie.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ie.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ie.instancingMorph===!1&&k.morphTexture!==null||Ie.envMap!==be||W.fog===!0&&Ie.fog!==ae||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==oe.numPlanes||Ie.numIntersection!==oe.numIntersection)||Ie.vertexAlphas!==De||Ie.vertexTangents!==Be||Ie.morphTargets!==Ne||Ie.morphNormals!==Ze||Ie.morphColors!==ot||Ie.toneMapping!==wt||Ie.morphTargetsCount!==ut)&&(Qe=!0):(Qe=!0,Ie.__version=W.version);let sn=Ie.currentProgram;Qe===!0&&(sn=Kr(W,F,k));let Ca=!1,rn=!1,Us=!1;const bt=sn.getUniforms(),pn=Ie.uniforms;if(Te.useProgram(sn.program)&&(Ca=!0,rn=!0,Us=!0),W.id!==v&&(v=W.id,rn=!0),Ca||x!==E){Te.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),bt.setValue(N,"projectionMatrix",E.projectionMatrix),bt.setValue(N,"viewMatrix",E.matrixWorldInverse);const Zt=bt.map.cameraPosition;Zt!==void 0&&Zt.setValue(N,ne.setFromMatrixPosition(E.matrixWorld)),Ue.logarithmicDepthBuffer&&bt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&bt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,rn=!0,Us=!0)}if(k.isSkinnedMesh){bt.setOptional(N,k,"bindMatrix"),bt.setOptional(N,k,"bindMatrixInverse");const Xt=k.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),bt.setValue(N,"boneTexture",Xt.boneTexture,We))}k.isBatchedMesh&&(bt.setOptional(N,k,"batchingTexture"),bt.setValue(N,"batchingTexture",k._matricesTexture,We),bt.setOptional(N,k,"batchingIdTexture"),bt.setValue(N,"batchingIdTexture",k._indirectTexture,We),bt.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&bt.setValue(N,"batchingColorTexture",k._colorsTexture,We));const mn=$.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&se.update(k,$,sn),(rn||Ie.receiveShadow!==k.receiveShadow)&&(Ie.receiveShadow=k.receiveShadow,bt.setValue(N,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(pn.envMap.value=be,pn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(pn.envMapIntensity.value=F.environmentIntensity),rn&&(bt.setValue(N,"toneMappingExposure",y.toneMappingExposure),Ie.needsLights&&kb(pn,Us),ae&&W.fog===!0&&J.refreshFogUniforms(pn,ae),J.refreshMaterialUniforms(pn,W,V,X,p.state.transmissionRenderTarget[E.id]),nl.upload(N,Nh(Ie),pn,We)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(nl.upload(N,Nh(Ie),pn,We),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&bt.setValue(N,"center",k.center),bt.setValue(N,"modelViewMatrix",k.modelViewMatrix),bt.setValue(N,"normalMatrix",k.normalMatrix),bt.setValue(N,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Xt=W.uniformsGroups;for(let Zt=0,vc=Xt.length;Zt<vc;Zt++){const ji=Xt[Zt];Ge.update(ji,sn),Ge.bind(ji,sn)}}return sn}function kb(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function Ob(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,F,$){const W=Ae.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ae.get(E.texture).__webglTexture=F,Ae.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){const $=Ae.get(E);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0};const Ub=N.createFramebuffer();this.setRenderTarget=function(E,F=0,$=0){A=E,M=F,T=$;let W=!0,k=null,ae=!1,me=!1;if(E){const be=Ae.get(E);if(be.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(be.__webglFramebuffer===void 0)We.setupRenderTarget(E);else if(be.__hasExternalTextures)We.rebindTextures(E,Ae.get(E.texture).__webglTexture,Ae.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ne=E.depthTexture;if(be.__boundDepthTexture!==Ne){if(Ne!==null&&Ae.has(Ne)&&(E.width!==Ne.image.width||E.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(me=!0);const Be=Ae.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Be[F])?k=Be[F][$]:k=Be[F],ae=!0):E.samples>0&&We.useMultisampledRTT(E)===!1?k=Ae.get(E).__webglMultisampledFramebuffer:Array.isArray(Be)?k=Be[$]:k=Be,R.copy(E.viewport),I.copy(E.scissor),H=E.scissorTest}else R.copy(Y).multiplyScalar(V).floor(),I.copy(ue).multiplyScalar(V).floor(),H=Se;if($!==0&&(k=Ub),Te.bindFramebuffer(N.FRAMEBUFFER,k)&&W&&Te.drawBuffers(E,k),Te.viewport(R),Te.scissor(I),Te.setScissorTest(H),ae){const be=Ae.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,be.__webglTexture,$)}else if(me){const be=F;for(let De=0;De<E.textures.length;De++){const Be=Ae.get(E.textures[De]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+De,Be.__webglTexture,$,be)}}else if(E!==null&&$!==0){const be=Ae.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,be.__webglTexture,$)}v=-1},this.readRenderTargetPixels=function(E,F,$,W,k,ae,me,Ee=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ae.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be){Te.bindFramebuffer(N.FRAMEBUFFER,be);try{const De=E.textures[Ee],Be=De.format,Ne=De.type;if(!Ue.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-W&&$>=0&&$<=E.height-k&&(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ee),N.readPixels(F,$,W,k,Pe.convert(Be),Pe.convert(Ne),ae))}finally{const De=A!==null?Ae.get(A).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(E,F,$,W,k,ae,me,Ee=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ae.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be)if(F>=0&&F<=E.width-W&&$>=0&&$<=E.height-k){Te.bindFramebuffer(N.FRAMEBUFFER,be);const De=E.textures[Ee],Be=De.format,Ne=De.type;if(!Ue.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ze),N.bufferData(N.PIXEL_PACK_BUFFER,ae.byteLength,N.STREAM_READ),E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ee),N.readPixels(F,$,W,k,Pe.convert(Be),Pe.convert(Ne),0);const ot=A!==null?Ae.get(A).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,ot);const wt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Wx(N,wt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ze),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ae),N.deleteBuffer(Ze),N.deleteSync(wt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,$=0){const W=Math.pow(2,-$),k=Math.floor(E.image.width*W),ae=Math.floor(E.image.height*W),me=F!==null?F.x:0,Ee=F!==null?F.y:0;We.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,me,Ee,k,ae),Te.unbindTexture()};const Bb=N.createFramebuffer(),zb=N.createFramebuffer();this.copyTextureToTexture=function(E,F,$=null,W=null,k=0,ae=null){ae===null&&(k!==0?(Tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=k,k=0):ae=0);let me,Ee,be,De,Be,Ne,Ze,ot,wt;const ft=E.isCompressedTexture?E.mipmaps[ae]:E.image;if($!==null)me=$.max.x-$.min.x,Ee=$.max.y-$.min.y,be=$.isBox3?$.max.z-$.min.z:1,De=$.min.x,Be=$.min.y,Ne=$.isBox3?$.min.z:0;else{const mn=Math.pow(2,-k);me=Math.floor(ft.width*mn),Ee=Math.floor(ft.height*mn),E.isDataArrayTexture?be=ft.depth:E.isData3DTexture?be=Math.floor(ft.depth*mn):be=1,De=0,Be=0,Ne=0}W!==null?(Ze=W.x,ot=W.y,wt=W.z):(Ze=0,ot=0,wt=0);const ut=Pe.convert(F.format),Ie=Pe.convert(F.type);let yt;F.isData3DTexture?(We.setTexture3D(F,0),yt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(We.setTexture2DArray(F,0),yt=N.TEXTURE_2D_ARRAY):(We.setTexture2D(F,0),yt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const Qe=N.getParameter(N.UNPACK_ROW_LENGTH),sn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ca=N.getParameter(N.UNPACK_SKIP_PIXELS),rn=N.getParameter(N.UNPACK_SKIP_ROWS),Us=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ft.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ft.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,De),N.pixelStorei(N.UNPACK_SKIP_ROWS,Be),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ne);const bt=E.isDataArrayTexture||E.isData3DTexture,pn=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){const mn=Ae.get(E),Xt=Ae.get(F),Zt=Ae.get(mn.__renderTarget),vc=Ae.get(Xt.__renderTarget);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Zt.__webglFramebuffer),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,vc.__webglFramebuffer);for(let ji=0;ji<be;ji++)bt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(E).__webglTexture,k,Ne+ji),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(F).__webglTexture,ae,wt+ji)),N.blitFramebuffer(De,Be,me,Ee,Ze,ot,me,Ee,N.DEPTH_BUFFER_BIT,N.NEAREST);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||E.isRenderTargetTexture||Ae.has(E)){const mn=Ae.get(E),Xt=Ae.get(F);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Bb),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,zb);for(let Zt=0;Zt<be;Zt++)bt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,mn.__webglTexture,k,Ne+Zt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,mn.__webglTexture,k),pn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Xt.__webglTexture,ae,wt+Zt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Xt.__webglTexture,ae),k!==0?N.blitFramebuffer(De,Be,me,Ee,Ze,ot,me,Ee,N.COLOR_BUFFER_BIT,N.NEAREST):pn?N.copyTexSubImage3D(yt,ae,Ze,ot,wt+Zt,De,Be,me,Ee):N.copyTexSubImage2D(yt,ae,Ze,ot,De,Be,me,Ee);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else pn?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(yt,ae,Ze,ot,wt,me,Ee,be,ut,Ie,ft.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(yt,ae,Ze,ot,wt,me,Ee,be,ut,ft.data):N.texSubImage3D(yt,ae,Ze,ot,wt,me,Ee,be,ut,Ie,ft):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ae,Ze,ot,me,Ee,ut,Ie,ft.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ae,Ze,ot,ft.width,ft.height,ut,ft.data):N.texSubImage2D(N.TEXTURE_2D,ae,Ze,ot,me,Ee,ut,Ie,ft);N.pixelStorei(N.UNPACK_ROW_LENGTH,Qe),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,sn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ca),N.pixelStorei(N.UNPACK_SKIP_ROWS,rn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Us),ae===0&&F.generateMipmaps&&N.generateMipmap(yt),Te.unbindTexture()},this.initRenderTarget=function(E){Ae.get(E).__webglFramebuffer===void 0&&We.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?We.setTextureCube(E,0):E.isData3DTexture?We.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?We.setTexture2DArray(E,0):We.setTexture2D(E,0),Te.unbindTexture()},this.resetState=function(){M=0,T=0,A=null,Te.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),n.unpackColorSpace=et._getUnpackColorSpace()}}const Gp={type:"change"},ih={type:"start"},gv={type:"end"},Ao=new Kf,$p=new Ai,$1=Math.cos(70*ht.DEG2RAD),Ct=new L,Jt=2*Math.PI,ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},tu=1e-6;class W1 extends rw{constructor(e,n=null){super(e,n),this.state=ct.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:as.ROTATE,MIDDLE:as.DOLLY,RIGHT:as.PAN},this.touches={ONE:Ja.ROTATE,TWO:Ja.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Jn,this._lastTargetPosition=new L,this._quat=new Jn().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _p,this._sphericalDelta=new _p,this._scale=1,this._panOffset=new L,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new L,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Y1.bind(this),this._onPointerDown=X1.bind(this),this._onPointerUp=q1.bind(this),this._onContextMenu=tA.bind(this),this._onMouseWheel=Z1.bind(this),this._onKeyDown=J1.bind(this),this._onTouchStart=Q1.bind(this),this._onTouchMove=eA.bind(this),this._onMouseDown=K1.bind(this),this._onMouseMove=j1.bind(this),this._interceptControlDown=nA.bind(this),this._interceptControlUp=iA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Gp),this.update(),this.state=ct.NONE}update(e=null){const n=this.object.position;Ct.copy(n).sub(this.target),Ct.applyQuaternion(this._quat),this._spherical.setFromVector3(Ct),this.autoRotate&&this.state===ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=Jt:i>Math.PI&&(i-=Jt),a<-Math.PI?a+=Jt:a>Math.PI&&(a-=Jt),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Ct.setFromSpherical(this._spherical),Ct.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ct),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Ct.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Ct.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Ao.origin.copy(this.object.position),Ao.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ao.direction))<$1?this.object.lookAt(this.target):($p.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ao.intersectPlane($p,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>tu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>tu||this._lastTargetPosition.distanceToSquared(this.target)>tu?(this.dispatchEvent(Gp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Jt/60*this.autoRotateSpeed*e:Jt/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Ct.setFromMatrixColumn(n,0),Ct.multiplyScalar(-e),this._panOffset.add(Ct)}_panUp(e,n){this.screenSpacePanning===!0?Ct.setFromMatrixColumn(n,1):(Ct.setFromMatrixColumn(n,0),Ct.crossVectors(this.object.up,Ct)),Ct.multiplyScalar(e),this._panOffset.add(Ct)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;Ct.copy(a).sub(this.target);let s=Ct.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=e-i.left,s=n-i.top,r=i.width,o=i.height;this._mouse.x=a/r*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panStart.set(i,a)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,a=e.pageY-n.y,s=Math.sqrt(i*i+a*a);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),a=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(a,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,a=e.pageY-n.y,s=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new le,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function X1(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function Y1(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function q1(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(gv),this.state=ct.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function K1(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case as.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=ct.DOLLY;break;case as.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ct.ROTATE}break;case as.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ct.PAN}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(ih)}function j1(t){switch(this.state){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function Z1(t){this.enabled===!1||this.enableZoom===!1||this.state!==ct.NONE||(t.preventDefault(),this.dispatchEvent(ih),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(gv))}function J1(t){this.enabled!==!1&&this._handleKeyDown(t)}function Q1(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Ja.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=ct.TOUCH_ROTATE;break;case Ja.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=ct.TOUCH_PAN;break;default:this.state=ct.NONE}break;case 2:switch(this.touches.TWO){case Ja.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=ct.TOUCH_DOLLY_PAN;break;case Ja.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=ct.TOUCH_DOLLY_ROTATE;break;default:this.state=ct.NONE}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(ih)}function eA(t){switch(this._trackPointer(t),this.state){case ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=ct.NONE}}function tA(t){this.enabled!==!1&&t.preventDefault()}function nA(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function iA(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ah=1,il=.32,Wp=1024,aA=16,sA=1.5;function Xp(t){const e=new at({color:t,transparent:!0,opacity:ah,side:Je});return e.forceSinglePass=!0,e}function rA(t){return new cv({color:t,side:Je,transparent:!0,opacity:ah})}function Ya(t,e,n,i){return new ze(new Ta(t,n,e,6,1,6),i)}function nu(t,e,n,i,a,s,r,o){t.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,u=i*n+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*4+s*.5)*a*.35;l===0?t.moveTo(l,u):t.lineTo(l,u)}t.lineWidth=r,t.strokeStyle=o,t.stroke()}function iu(t,e,n,i,a,s,r,o){t.beginPath();for(let l=0;l<=n;l+=8){const c=l/n,u=i*e+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*6+s*.3)*a*.18;l===0?t.moveTo(u,l):t.lineTo(u,l)}t.lineWidth=r,t.strokeStyle=o,t.stroke()}function au(t,e,n,i,a,s){t.beginPath(),t.arc(e,n,i,0,Math.PI*2),t.fillStyle=a,t.fill(),t.lineWidth=Math.max(6,i*.15),t.strokeStyle=s,t.stroke()}function oA(t){const e=document.createElement("canvas");e.width=Wp,e.height=Wp;const n=e.getContext("2d");if(!n)throw new Error("Unable to create ball texture canvas");const{width:i,height:a}=e,s=n.createLinearGradient(0,0,i,a);s.addColorStop(0,"#faf7ee"),s.addColorStop(.55,"#e7e1d0"),s.addColorStop(1,"#d5cfbe"),n.fillStyle=s,n.fillRect(0,0,i,a),n.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*a;n.fillStyle=l%2===0?"#ffffff":"#d3cbb6",n.fillRect(0,c,i,a/54)}n.globalAlpha=1;const r="#2d313b";n.lineCap="round",nu(n,i,a,.24,22,.35,18,r),nu(n,i,a,.5,14,1.1,20,r),nu(n,i,a,.77,20,2.35,18,r),iu(n,i,a,.2,24,.2,18,r),iu(n,i,a,.48,18,1.6,18,r),iu(n,i,a,.76,26,2.7,18,r),n.globalAlpha=.92,au(n,i*.28,a*.32,88,"#f1a63a","#fff4d7"),au(n,i*.68,a*.6,72,"#4db0ff","#eef8ff"),au(n,i*.76,a*.2,54,"#1f232c","#f0ece1"),n.globalAlpha=1,n.beginPath(),n.moveTo(i*.08,a*.86),n.quadraticCurveTo(i*.28,a*.72,i*.42,a*.8),n.quadraticCurveTo(i*.58,a*.9,i*.82,a*.78),n.lineWidth=24,n.strokeStyle="rgba(255, 246, 220, 0.9)",n.stroke();const o=new ec(e);return o.colorSpace=Gt,o.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),o}function lA(t,e,n,i){return new ze(new Ta(t,e,n,6,6,1),i)}function cA(t){const e=10280*t,n=8240*t,i=1960*t,a=1e3*t,s=1900*t,r=800*t,o=900*t,l=Math.max(1,t),c=[],u=[1,-1];function d(g,m,p=null){const b=g.material.clone();return g.material=b,c.push({mesh:g,material:b,outwardLocal:m.clone().normalize(),fixedOpacity:p}),g}function f(g){const m=new mt,p=Xp(g),b=n/2-a-s/2,w=Math.sqrt(2*Math.pow(a,2));for(const C of u){const M=d(Ya(b,i,l,p),new L(0,1,0));M.position.set(C*(b/2+s/2),0,i/2),m.add(M);const T=d(Ya(w,i,l,p),new L(0,1,0));T.position.set(C*(n/2-a/2),-a/2,i/2),T.rotateZ(-C*Math.PI/4),m.add(T)}const y=d(Ya(s,i-r,l,p),new L(0,1,0));return y.position.set(0,0,i/2+r/2),m.add(y),m}function h(g,m){const p=new mt,b=[[n/2,0],[-n/2,0],[-n/2,e/2-a],[-n/2+a,e/2],[-s/2,e/2],[-s/2,e/2+o],[s/2,e/2+o],[s/2,e/2],[n/2-a,e/2],[n/2,e/2-a],[n/2,0]],w=new eh;b.forEach(([x,R],I)=>{I===0?w.moveTo(x,R):w.lineTo(x,R)});const y=rA(g),C=Xp(g),M=d(new ze(new nc(w),y),new L(0,0,-1));M.receiveShadow=!0,p.add(M);for(const x of u){const R=d(Ya(o,r,l,C),new L(0,-x,0),il);R.position.set(x*s/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),p.add(R)}const T=d(lA(s,o,l,C),new L(0,0,1),il);T.position.set(0,e/2+o/2,r),p.add(T);const A=d(Ya(s,r,l,C),new L(0,1,0),il);A.position.set(0,e/2+o,r/2),p.add(A);const v=f(g);v.position.y=e/2,p.add(v);for(const x of u){const R=d(Ya(e/2-a,i,l,C),new L(0,-x,0));R.position.set(x*n/2,(e/2-a)/2,i/2),R.rotateZ(Math.PI/2),p.add(R)}return m&&p.rotateZ(Math.PI),p}const _=new mt;return _.add(h(16771251,!1)),_.add(h(8381439,!0)),{stadium:_,wallPanels:c}}function uA(t){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],n=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new Tt;i.setAttribute("position",new nt(e.flat(),3)),i.setIndex(n.flat()),i.computeVertexNormals();const a=new mt,s=new mt,r=new ze(i,new cv({color:t}));r.castShadow=!0,s.add(r);const o=new Rl({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],u=new Tt;u.setAttribute("position",new nt(l.flat(),3)),u.setIndex(c.flat()),u.computeVertexNormals();const d=new ze(u,o);d.position.z=1,s.add(d);const f=new at({color:8968191,transparent:!0,opacity:.34,side:Je}),h=new Tt;h.setAttribute("position",new nt([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),h.setIndex([0,2,3,0,3,1]),h.computeVertexNormals();const _=new ze(h,f);_.position.z=2,s.add(_);const g=new Rl({color:2236962,shininess:48}),m=(p,b,w,y)=>{const C=new ze(new tc(70,70,y,10),g);return C.rotateZ(Math.PI/2),C.position.set(p,b,w),C.castShadow=!0,C};return s.add(m(120,-300,-60,50)),s.add(m(-120,-300,-60,50)),s.add(m(120,150,-60,70)),s.add(m(-120,150,-60,70)),s.position.set(0,0,50),s.rotateZ(Math.PI/2),s.scale.set(.35,.35,.35),a.add(s),a}function dA(){const t=new mt;t.visible=!1,t.position.set(-124,0,8);const e=new Ar(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const n=new Ar(17,150,12,1,!0);n.rotateZ(Math.PI/2),n.translate(-75,0,0);const i=new Ms(21,12,12),a=[-38,38];for(const s of a){const r=new mt;r.position.set(0,s,0);const o=new at({color:"#ff9b2f",transparent:!0,opacity:.42,blending:Ni,depthWrite:!1,side:Je});o.forceSinglePass=!0;const l=new ze(e,o);l.name="outer-flame",r.add(l);const c=new at({color:"#fff2ba",transparent:!0,opacity:.9,blending:Ni,depthWrite:!1,side:Je});c.forceSinglePass=!0;const u=new ze(n,c);u.name="inner-flame",r.add(u);const d=new at({color:"#fff8db",transparent:!0,opacity:.62,blending:Ni,depthWrite:!1});d.forceSinglePass=!0;const f=new ze(i,d);f.name="glow",f.position.x=-10,r.add(f),t.add(r)}return t}function fA(){const t=new mt;t.visible=!1,t.position.set(0,0,235);const e=240,n=82,i=188,a=20,s=new tn(e,n),r=new at({color:463645,transparent:!0,opacity:.78,side:Je,depthWrite:!1}),o=new ze(s,r);o.position.z=-1,t.add(o);const l=new tn(i,a),c=new at({color:1385521,transparent:!0,opacity:.92,side:Je,depthWrite:!1}),u=new ze(l,c);u.position.y=-18,t.add(u);const d=new tn(i,a),f=new at({color:16761415,transparent:!0,opacity:.98,side:Je,depthWrite:!1}),h=new ze(d,f);h.position.y=-18,t.add(h);const _=document.createElement("canvas");_.width=512,_.height=160;const g=_.getContext("2d");if(!g)throw new Error("Unable to create boost meter label context");const m=new ec(_);m.colorSpace=Gt,m.needsUpdate=!0;const p=new tn(190,48),b=new at({map:m,transparent:!0,depthWrite:!1,side:Je}),w=new ze(p,b);return w.position.set(0,15,0),t.add(w),{group:t,fillMesh:h,fillMaterial:f,labelTexture:m,labelContext:g,labelCanvas:_,lastPercent:null}}function hA(){const t=new mt;t.visible=!1;const e=new at({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),n=new ze(new th(170,8,8,48),e);n.position.z=16,t.add(n);const i=document.createElement("canvas");i.width=512,i.height=192;const a=i.getContext("2d");if(!a)throw new Error("Unable to create demo indicator label context");a.textAlign="center",a.textBaseline="middle",a.lineJoin="round",a.font="800 86px sans-serif",a.lineWidth=20,a.strokeStyle="rgba(7, 19, 29, 0.94)",a.strokeText("DEMO",i.width/2,88),a.fillStyle="#fff0b8",a.fillText("DEMO",i.width/2,88),a.font="700 34px sans-serif",a.lineWidth=10,a.strokeText("RESPAWNING",i.width/2,150),a.fillStyle="#ffbd4a",a.fillText("RESPAWNING",i.width/2,150);const s=new ec(i);s.colorSpace=Gt;const r=new at({map:s,transparent:!0,depthWrite:!1,side:Je}),o=new ze(new tn(310,116),r);return o.position.z=300,t.add(o),{group:t,ring:n,label:o}}function pA(t,e,n,i){t.fillMesh.scale.x=Math.max(.001,e);const a=94;t.fillMesh.position.x=-(1-e)*a,t.fillMesh.position.y=-18;const s=Math.max(0,Math.min(100,Math.round(n/255*100)));if(t.lastPercent!==s){const{labelContext:r,labelCanvas:o,labelTexture:l}=t;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${s}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${s}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,t.lastPercent=s}t.group.quaternion.copy(i.quaternion)}function mA(t){t.add(new iw("#d8ecff",1.6));const e=new mp("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),t.add(e);const n=new mp("#97d7ff",1.2);n.position.set(-5e3,4e3,3e3),t.add(n)}function _A(t){const e=oA(t),n=new Rl({color:16777215,map:e,shininess:42,specular:new Ke("#f7f2e3")});return{mesh:new ze(new Ms(93,24,24),n),texture:e}}function gA(t,e,n){const i=new _S;i.background=new Ke("#081119");const a=new vn(48,1,10*n,5e5*n);a.up.set(0,0,1),a.position.set(0,-9e3*n,5e3*n),a.lookAt(0,0,0);const s=new G1({antialias:!1,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,sA)),s.domElement.style.display="block",s.domElement.style.width="100%",s.domElement.style.height="100%",s.domElement.tabIndex=0,s.domElement.setAttribute("aria-label","Replay player viewport"),t.replaceChildren(s.domElement);const r=new W1(a,s.domElement);r.enableDamping=!0,r.maxDistance=16e4*n,r.keyPanSpeed=aA,r.target.set(0,0,600*n),r.listenToKeyEvents(s.domElement),r.update();const o=()=>{s.domElement.focus()};s.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=cA(n);i.add(l),mA(i);const u=new mt;u.scale.set(-n,n,n),i.add(u);const{mesh:d,texture:f}=_A(s);u.add(d);const h=new Map,_=new Map,g=new Map,m=new Map;for(const A of e.players){const v=uA(A.isTeamZero?"#57a8ff":"#ff9c40"),x=dA();v.add(x);const R=fA();v.add(R.group);const I=hA();u.add(v),u.add(I.group),h.set(A.id,v),_.set(A.id,x),g.set(A.id,R),m.set(A.id,I)}const p=()=>{const A=t.clientWidth||1,v=t.clientHeight||1;a.aspect=A/v,a.updateProjectionMatrix(),s.setSize(A,v,!1)};p();const b=new L,w=new L,y=new Jn,C=new L;return{scene:i,replayRoot:u,camera:a,renderer:s,controls:r,resize:p,dispose:()=>{s.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),f.dispose(),s.dispose(),t.replaceChildren()},ballMesh:d,playerMeshes:h,playerBoostTrails:_,playerBoostMeters:g,playerDemoIndicators:m,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const A of c){if(A.fixedOpacity!==null){A.material.transparent=!0,A.material.opacity=A.fixedOpacity,A.material.depthWrite=!1;continue}A.mesh.getWorldPosition(b),A.mesh.getWorldQuaternion(y),w.copy(A.outwardLocal).applyQuaternion(y).normalize(),C.copy(a.position).sub(b);const v=w.dot(C)>0;A.material.transparent=!0,A.material.opacity=v?il:ah,A.material.depthWrite=!v}}}}function Zs(t,e){if(t.frames.length===0)return 0;let n=0,i=t.frames.length-1;for(;n<=i;){const a=Math.floor((n+i)/2),s=t.frames[a]?.time??0;if(s<e)n=a+1;else if(s>e)i=a-1;else return a}return Math.max(0,n-1)}function vA(t,e){return t.frames.length===0?0:ht.clamp(Math.round(e),0,t.frames.length-1)}function yA(t){if(t.frames.length===0)return null;const e=new Map;for(const a of t.frames)e.set(a.gameState,(e.get(a.gameState)??0)+1);let n=null,i=-1;for(const[a,s]of e.entries())s<=i||(n=a,i=s);return n}function bA(t,e){if(e===null)return null;for(const n of t.frames){if(n.gameState===e)break;return n.gameState}return null}function vv(t,e){return e===null?t.kickoffCountdown<=0:t.gameState===e}function sh(t,e){return t.kickoffCountdown>0?!0:e!==null&&t.gameState===e}function xA(t,e){return t.ballFrames[e]?.position?!0:t.players.some(n=>n.frames[e]?.position)}function SA(t,e,n,i){return sh(e,i)&&xA(t,n)}function al(t,e,n,i,a){return!vv(e,i)&&!SA(t,e,n,a)}function Yp(t,e,n,i,a,s,r){return i&&al(t,e,n,s,r)||a&&sh(e,r)}function wA(t,e,n,i,a){const s=[],{frames:r}=t;if(r.length===0||!e&&!n)return s;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Yp(t,l,o,e,n,i,a)){o+=1;continue}const c=l.time;let u=o+1;for(;u<r.length&&Yp(t,r[u],u,e,n,i,a);)u+=1;const d=r[u]?.time??t.duration;if(d>c){const f=s.at(-1);f&&f.endTime>=c?f.endTime=Math.max(f.endTime,d):s.push({startTime:c,endTime:d})}o=u}return s}function EA(t,e,n){const i=ht.clamp(n,0,t);let a=0;for(const s of e){if(i<s.startTime)break;if(i<s.endTime)return{replayTime:i,timelineTime:s.startTime-a,seekTime:s.startTime,hiddenBySkip:!0};a+=s.endTime-s.startTime}return{replayTime:i,timelineTime:i-a,seekTime:i,hiddenBySkip:!1}}function MA(t,e,n,i){const a=ht.clamp(i,0,e);let s=0;for(const r of n){const o=r.startTime-s;if(a<=o)return a+s;s+=r.endTime-r.startTime}return ht.clamp(a+s,0,t)}function TA(t,e){const n=e.at(-1);return!n||n.endTime<t?t:ht.clamp(n.startTime,0,t)}function AA(t,e,n){const i=t.frames[e];if(!i||i.kickoffCountdown<=0)return null;let a=e;for(;a>0&&(t.frames[a-1]?.kickoffCountdown??0)>0;)a-=1;let s=e+1;for(;s<t.frames.length&&t.frames[s].kickoffCountdown>0;)s+=1;let r=0;for(let c=a;c<s;c+=1)r=Math.max(r,t.frames[c].kickoffCountdown);const o=t.frames[s]?.time??t.duration,l=Math.max(0,o-n);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function CA(t,e){const n=Zs(t,e),i=Math.min(n+1,t.frames.length-1);if(i===n)return{frameIndex:n,nextFrameIndex:i,alpha:0};const a=t.frames[n]?.time??0,s=t.frames[i]?.time??a;return s<=a?{frameIndex:n,nextFrameIndex:i,alpha:0}:{frameIndex:n,nextFrameIndex:i,alpha:ht.clamp((e-a)/(s-a),0,1)}}const RA=1.4,qa=.18,Co=.14,PA=120,qp=90,LA=40,NA=45,IA=.58,Kp=.82,DA=132,yv=new L(-1,0,0),da=new L(0,0,1),FA=new L(-1,0,0),kA=new L(0,0,18800),OA=new L(0,0,700),UA=new L(-9600,-12600,6400),BA=new L(0,0,900),Pl=48,zA=16,HA=16,VA=.003,GA=.05;function jp(t,e,n){return t?!e||n<=0?t:{x:ht.lerp(t.x,e.x,n),y:ht.lerp(t.y,e.y,n),z:ht.lerp(t.z,e.z,n)}:e}function Zp(t,e,n){const i=t??e;if(!i)return null;const a=new Jn(i.x,i.y,i.z,i.w);return!e||n<=0||t===null?a:a.slerp(new Jn(e.x,e.y,e.z,e.w),n)}function su(t){return new L(t.x,t.y,t.z)}function bv(t,e){return new L(-t.x*e,t.y*e,t.z*e)}function ru(t){return new L(-t.x,t.y,t.z).normalize()}function $A(t,e){switch(t){case"overhead":return{position:kA.clone().multiplyScalar(e),target:OA.clone().multiplyScalar(e),up:FA.clone(),fov:Pl};case"side":return{position:UA.clone().multiplyScalar(e),target:BA.clone().multiplyScalar(e),up:da.clone(),fov:Pl}}}function WA(t){const{fov:e,position:n,sceneState:i,target:a,up:s}=t,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(n,Co),o.target.lerp(a,Co),r.up.lerp(s,Co).normalize(),r.fov=ht.lerp(r.fov,e,Co),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(n)<=zA,c=o.target.distanceToSquared(a)<=HA,u=r.up.angleTo(s)<=VA,d=Math.abs(r.fov-e)<=GA;return!l||!c||!u||!d?!1:(r.position.copy(n),o.target.copy(a),r.up.copy(s).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(a),o.enabled=!0,!0)}function XA(t){const e=t.linearVelocity?ru(t.linearVelocity):null,n=t.forward?ru(t.forward):null,i=t.up?ru(t.up):null;if((t.position?.z??1/0)<PA){const l=(n??e??yv.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(da,l).normalize(),u=new L().crossVectors(l,c).normalize();return{forward:l,up:u,right:c}}if(!n||!i)return null;const s=n.clone().normalize(),r=new L().crossVectors(i,s).normalize(),o=new L().crossVectors(s,r).normalize();return{forward:s,up:o,right:r}}function YA(t){const{cameraViewMode:e,attachedPlayerId:n,ballCamEnabled:i,ballPosition:a,cameraDistanceScale:s,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,attachedPlayerUnavailable:c=!1,fieldScale:u,frameIndex:d,replay:f,sceneState:h}=t,_=h.controls;if(e==="free"){_.enabled=!0,h.camera.fov=ht.lerp(h.camera.fov,Pl,qa),h.camera.updateProjectionMatrix();return}if(!n){_.enabled=!0,h.camera.fov=ht.lerp(h.camera.fov,Pl,qa),h.camera.updateProjectionMatrix();return}const g=f.players.find(B=>B.id===n),m=g?.frames[d];if(!g||c||!m?.position||m.isPresent===!1){_.enabled=!0;return}_.enabled=!1;const p=bv(m.position,u),b=XA(m),w=b?.forward??yv.clone(),y=b?.right??new L(0,1,0),C={...g.cameraSettings,...r??{}},M=(C.distance??270)*u*s,T=(C.height??100)*u*RA,A=ht.degToRad(C.pitch??-4),v=w.clone().applyAxisAngle(y,A).normalize(),x=p.clone().addScaledVector(da,T),R=w.clone().multiplyScalar(-M).addScaledVector(da,T).applyAxisAngle(y,A),I=p.clone().addScaledVector(da,LA*u);let H=C.fov??110;if(i&&a){const B=a.clone().addScaledVector(da,NA*u),G=B.clone().sub(I),U=(G.lengthSq()>1e-4?G.normalize():v.clone()).multiplyScalar(Kp).addScaledVector(v,1-Kp).normalize();l.copy(I).lerp(B,IA),o.copy(x).addScaledVector(U,-M),o.z=Math.max(qp*u,o.z);const X=I.clone().sub(o),V=B.clone().sub(o);if(X.lengthSq()>1e-4&&V.lengthSq()>1e-4){const Q=X.angleTo(V);H=Math.min(DA,Math.max(H,ht.radToDeg(Q)*1.7))}}else o.copy(I).add(R),o.z=Math.max(qp*u,o.z),l.copy(I);h.camera.position.lerp(o,qa),h.camera.up.lerp(da,qa).normalize(),_.target.lerp(l,qa),h.camera.fov=ht.lerp(h.camera.fov,H,qa),h.camera.updateProjectionMatrix(),h.camera.lookAt(_.target)}const qA=1,KA=2.25,Ro="free",Jp=3.2;function ia(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}function ou(t){if(!t)return null;const e={},n=ia(t.fov),i=ia(t.height),a=ia(t.pitch),s=ia(t.distance),r=ia(t.stiffness),o=ia(t.swivelSpeed),l=ia(t.transitionSpeed);return n!==void 0&&(e.fov=n),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function jA(t){return!!t?.position&&t?.isPresent!==!1}class ZA extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,n,i={}){super(),this.container=e,this.replay=n,this.options=i,this.fieldScale=i.fieldScale??qA,this.sceneState=gA(e,n,this.fieldScale),this.liveGameState=yA(n),this.kickoffGameState=bA(n,this.liveGameState),this.speed=Math.max(.1,i.initialPlaybackRate??1),this.cameraDistanceScale=Math.max(.25,i.initialCameraDistanceScale??KA),this.customCameraSettings=ou(i.initialCustomCameraSettings),this.attachedPlayerId=i.initialAttachedPlayerId??null,this.cameraViewMode=i.initialCameraViewMode??(this.attachedPlayerId?"follow":Ro),this.ballCamEnabled=i.initialBallCamEnabled??!1,this.boostMeterEnabled=i.initialBoostMeterEnabled??!1,this.boostPickupAnimationEnabled=i.initialBoostPickupAnimationEnabled??!0,this.skipPostGoalTransitionsEnabled=i.initialSkipPostGoalTransitionsEnabled??!0,this.skipKickoffsEnabled=i.initialSkipKickoffsEnabled??!1,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const a of i.plugins??[])this.installPlugin(a,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=ou(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":Ro,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:n,position:i,target:a,up:s}=$A(e,this.fieldScale);this.cameraViewMode=Ro,this.freeCameraTransition={position:i,target:a,up:s,fov:n},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const n of this.sceneState.playerBoostMeters.values())n.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=this.clampReplayTime(e),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const n=vA(this.replay,e),i=this.replay.frames[n]?.time??0,a=this.playing,s=this.currentTime!==i||a;this.playing=!1,this.currentTime=i,this.render(),s&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const n=Zs(this.replay,this.currentTime);this.setFrameIndex(n+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const n=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(n),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=ou(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":Ro)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=this.clampReplayTime(e.currentTime)),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(n),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(n),this.skipPostGoalTransitionIfNeeded(n),this.skipPastKickoffIfNeeded(n),this.render(),this.emitChange()}getState(){const e=Zs(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((n,i)=>n+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return EA(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return MA(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}clampReplayTime(e){return ht.clamp(e,0,this.replay.duration)}getPlaybackEndTime(){return TA(this.replay.duration,this.getTimelineSegments())}subscribe(e){const n=i=>{e(i.detail)};return this.addEventListener("change",n),e(this.getState()),()=>{this.removeEventListener("change",n)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const n=this.beforeRenderCallbacks.indexOf(e);n>=0&&this.beforeRenderCallbacks.splice(n,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const n=this.plugins.findIndex(a=>a.plugin.id===e);if(n<0)return!1;const[i]=this.plugins.splice(n,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const n=(e-this.playbackStartedAt)/1e3,i=ht.clamp(this.playbackStartedTime+n*this.speed,0,this.getPlaybackEndTime()),a=i!==this.currentTime;return this.currentTime=i,a}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let n=!1;this.playing&&(n=this.syncPlaybackClock(e),n=this.skipPostGoalTransitionIfNeeded(e)||n,n=this.skipPastKickoffIfNeeded(e)||n,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,n=!0)),this.render(),n&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=CA(this.replay,this.currentTime),n=e.frameIndex,i=this.replay.ballFrames[n]??null,a=this.replay.ballFrames[e.nextFrameIndex]??i,s=jp(i?.position??null,a?.position??null,e.alpha),r=s?bv(s,this.fieldScale):null,o=[];if(s){this.sceneState.ballMesh.visible=!0,this.sceneState.ballMesh.position.copy(su(s));const u=Zp(i?.rotation??null,a?.rotation??null,e.alpha);u?this.sceneState.ballMesh.quaternion.copy(u):this.sceneState.ballMesh.quaternion.identity()}else this.sceneState.ballMesh.visible=!1;for(const[u,d]of this.replay.players.entries()){const f=this.sceneState.playerMeshes.get(d.id),h=this.sceneState.playerBoostTrails.get(d.id),_=this.sceneState.playerBoostMeters.get(d.id),g=this.sceneState.playerDemoIndicators.get(d.id),m=d.frames[n]??null,p=d.frames[e.nextFrameIndex]??m;let b=null,w=null,y=0;if(!f){g&&(g.group.visible=!1),o.push({track:d,mesh:null,boostTrail:h??null,frame:m,nextFrame:p,interpolatedPosition:w,boostFraction:y});continue}b=jp(m?.position??null,p?.position??null,e.alpha);const C=this.getActiveDemoEvent(d.id,this.currentTime);if(!b){f.visible=!1,h&&(h.visible=!1),_&&(_.group.visible=!1),this.updateDemoIndicator(d.id,g??null,null,C),o.push({track:d,mesh:f,boostTrail:h??null,frame:m,nextFrame:p,interpolatedPosition:w,boostFraction:y});continue}if(C){f.visible=!1,h&&(h.visible=!1),_&&(_.group.visible=!1),this.updateDemoIndicator(d.id,g??null,b,C),o.push({track:d,mesh:f,boostTrail:h??null,frame:m,nextFrame:p,interpolatedPosition:w,boostFraction:y});continue}if(!jA(m)){f.visible=!1,h&&(h.visible=!1),_&&(_.group.visible=!1),this.updateDemoIndicator(d.id,g??null,b),o.push({track:d,mesh:f,boostTrail:h??null,frame:m,nextFrame:p,interpolatedPosition:w,boostFraction:y});continue}f.visible=!0,g&&(g.group.visible=!1),w=b,f.position.copy(su(b));const T=Zp(m?.rotation??null,p?.rotation??null,e.alpha);T?f.quaternion.copy(T):f.quaternion.identity();const A=m?.boostFraction??0,v=p?.boostFraction??A;if(y=ht.lerp(A,v,e.alpha),h){const x=(e.alpha>=.5?p?.boostActive:m?.boostActive)??m?.boostActive??p?.boostActive??!1;this.updateBoostTrail(h,x,y,this.currentTime,u)}_&&(this.boostMeterEnabled?(_.group.visible=!0,pA(_,y,ht.lerp(m?.boostAmount??0,p?.boostAmount??m?.boostAmount??0,e.alpha),this.sceneState.camera)):_.group.visible=!1),o.push({track:d,mesh:f,boostTrail:h??null,frame:m,nextFrame:p,interpolatedPosition:w,boostFraction:y})}YA({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:n,attachedPlayerUnavailable:this.attachedPlayerId!==null&&this.getActiveDemoEvent(this.attachedPlayerId,this.currentTime)!==null,ballPosition:r,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&WA({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const l={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const u of this.beforeRenderCallbacks)u(l);const c=this.createRenderContext(l,i,a,r,o);for(const u of this.plugins)u.plugin.beforeRender?.(c);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const n=Zs(this.replay,this.currentTime),i=this.replay.frames[n];if(!i||!sh(i,this.kickoffGameState))return!1;const a=this.replay.frames.find((s,r)=>r>n&&vv(s,this.liveGameState));return!a||a.time===this.currentTime?!1:(this.currentTime=a.time,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const n=Zs(this.replay,this.currentTime),i=this.replay.frames[n];if(!i||!al(this.replay,i,n,this.liveGameState,this.kickoffGameState))return!1;const a=this.replay.frames.find((s,r)=>r>n&&!al(this.replay,s,r,this.liveGameState,this.kickoffGameState));if(!a){let s=n;for(;s>0&&al(this.replay,this.replay.frames[s-1],s-1,this.liveGameState,this.kickoffGameState);)s-=1;const r=this.replay.frames[s]?.time;return r===void 0||r===this.currentTime?!1:(this.currentTime=r,this.playing&&this.reanchorPlaybackClock(e),!0)}return a.time===this.currentTime?!1:(this.currentTime=a.time,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,n){return AA(this.replay,e,n)}computeTimelineSegments(){return wA(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,n){const i=typeof e=="function"?e():e;if(this.plugins.some(s=>s.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const a={definition:e,plugin:i};return this.plugins.push(a),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),n&&this.render(),()=>{const s=this.plugins.indexOf(a);s<0||(this.plugins.splice(s,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,n,i,a,s){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:n,nextBallFrame:i,ballPosition:a,players:s}}emitChange(){const e=this.getState(),n=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(n);this.dispatchEvent(new CustomEvent("change",{detail:e}))}getActiveDemoEvent(e,n){for(let i=this.replay.timelineEvents.length-1;i>=0;i-=1){const a=this.replay.timelineEvents[i],s=n-a.time;if(!(s<0)){if(s>Jp)break;if(a.kind==="demo"&&a.secondaryPlayerId===e)return a}}return null}updateDemoIndicator(e,n,i,a=this.getActiveDemoEvent(e,this.currentTime)){if(!n)return;const s=a?.location??i;if(!a||!s){n.group.visible=!1;return}const r=Math.max(0,this.currentTime-a.time),o=this.currentTime*8,l=1+.08*Math.sin(o);n.group.visible=!0,n.group.position.copy(su(s)),n.ring.rotation.z=o*.15,n.ring.scale.setScalar(l),n.label.quaternion.copy(this.sceneState.camera.quaternion),n.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=ht.clamp(1-r/Jp,.28,1);for(const u of[n.ring,n.label]){const d=u.material;d instanceof gi&&(d.opacity=c)}}updateBoostTrail(e,n,i,a,s){if(!n){e.visible=!1;return}e.visible=!0;const r=a*36+s*1.7,o=.86+.14*Math.sin(r),l=ht.clamp(.62+i*.88,.62,1.5),c=l*(1.02+o*.52),u=1.02+l*.28;e.scale.set(c,u,u);for(const[d,f]of e.children.entries()){const h=f,_=.92+.14*Math.sin(r+d*.85);h.scale.setScalar(_),h.traverse(g=>{if(!(g instanceof ze))return;const m=g.material;if(m instanceof at)switch(g.name){case"outer-flame":m.opacity=.24+l*.24;break;case"inner-flame":m.opacity=.58+l*.3;break;case"glow":m.opacity=.4+l*.26;break}})}}}const JA="https://ballchasing.com",QA=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function eC(t,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${t.replace(/^\/+/,"")}`)}function Qp(t){return QA.test(t.trim())}function rh(t){const e=t.trim();if(Qp(e))return e.toLowerCase();let n;try{n=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${t}`)}if(!/(^|\.)ballchasing\.com$/i.test(n.hostname))throw new Error(`Invalid Ballchasing replay URL: ${t}`);const i=n.pathname.split("/").filter(Boolean),a=i.findIndex(o=>o==="replay"),s=i.findIndex(o=>o==="replays"),r=a>=0?i[a+1]:s>=0?i[s+1]:void 0;if(!r||!Qp(r))throw new Error(`Invalid Ballchasing replay URL: ${t}`);return r.toLowerCase()}function tC(t){return`ballchasing-${rh(t)}.replay`}function nC(t,e=JA){const n=rh(t);return eC(`dl/replay/${encodeURIComponent(n)}`,e)}const em="subtr-actor-ballchasing-overlay-styles",iC="#3b82f6",aC="#f59e0b";function sC(){if(document.getElementById(em))return;const t=document.createElement("style");t.id=em,t.textContent=`
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
      border-bottom: 2px solid ${iC};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${aC};
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
  `,document.head.append(t)}function rC(t,e){const n=t.players[e],i=n.frame?.boostAmount??0,a=n.nextFrame?.boostAmount??i;return ht.lerp(i,a,t.alpha)}function tm(t,e,n,i){if(!t||!e)return;const a=Math.max(0,Math.min(100,Math.round(n/255*100)));t.style.width=`${a}%`,e.textContent=`${a} ${i}`}function nm(t,e,n,i){if(!t)return;const a=()=>{e.player.setAttachedPlayer(n)};t.classList.add("sap-bc-player-selectable"),t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",`Follow ${i}`),t.title=`Follow ${i}`,t.addEventListener("click",a),t.addEventListener("keydown",s=>{s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),a())})}function oC(t,e,n,i,a){if(t.getWorldPosition(a),a.add(e),a.project(n),a.z<-1||a.z>1)return!1;const s=i.clientWidth||1,r=i.clientHeight||1;return a.x=(a.x+1)*s/2,a.y=(1-a.y)*r/2,!(a.x<-80||a.x>s+80||a.y<-80||a.y>r+80)}function lC(t={}){const e=t.showFloatingNames??!0,n=t.showFloatingBoostBars??!0,i=t.showTeamBoostHud??!0;let a=null,s=null,r=null,o=null,l=!1,c="";const u=new Map,d=new L,f=new L(0,0,255);function h(g){for(const[m,p]of u.entries()){const b=m===g;p.floatingRoot?.classList.toggle("sap-bc-player-following",b),p.teamHudEntry?.classList.toggle("sap-bc-player-following",b),p.floatingRoot?.setAttribute("aria-pressed",b?"true":"false"),p.teamHudEntry?.setAttribute("aria-pressed",b?"true":"false")}}function _(g,m){sC(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),a=document.createElement("div"),a.className="sap-bc-overlay-root",e||n?(s=document.createElement("div"),s.className="sap-bc-floating-layer",a.append(s)):s=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",a.append(r,o)):(r=null,o=null);for(const p of g.replay.players){let b=null,w=null,y=null,C=null;s&&(b=document.createElement("div"),b.className="sap-bc-floating-track",b.hidden=!0,(e||n)&&(w=document.createElement("div"),w.className=`sap-bc-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,y=document.createElement("div"),y.className=`sap-bc-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-boost-text",w.append(y,C),b.append(w)),nm(b,g,p.id,p.name),s.append(b));let M=null,T=null,A=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const v=document.createElement("div");v.className=`sap-bc-hud-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",v.append(T,A),M.append(v),nm(M,g,p.id,p.name),(p.isTeamZero?r:o)?.append(M)}u.set(p.id,{floatingRoot:b,floatingBoostFill:y,floatingBoostText:C,teamHudEntry:M,teamHudFill:T,teamHudText:A})}f.set(0,0,255*(g.options.fieldScale??1)),m.append(a),h(g.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(g){_(g,g.container)},onStateChange(g){h(g.state.attachedPlayerId)},teardown(g){a?.remove(),a=null,s=null,r=null,o=null,u.clear(),l&&(g.container.style.position=c,l=!1)},beforeRender(g){if(a)for(const[m,p]of g.players.entries()){const b=u.get(p.track.id);if(!b)continue;const w=rC(g,m);tm(b.floatingBoostFill,b.floatingBoostText,w,p.track.name),tm(b.teamHudFill,b.teamHudText,w,p.track.name);const y=p.mesh,C=y!==null&&p.interpolatedPosition!==null;if(b.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!C),!!b.floatingRoot){if(!C||!oC(y,f,g.scene.camera,g.container,d)){b.floatingRoot.hidden=!0;continue}b.floatingRoot.hidden=!1,b.floatingRoot.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function lu(t){t.depthTest=!1,t.depthWrite=!1,t.transparent=!0,t.polygonOffset=!0,t.polygonOffsetFactor=-2,t.polygonOffsetUnits=-2,t.forceSinglePass=!0}const os=6,cC=.6;function $r(t){return t*cC}function uC(t){return $r(t.size==="big"?150:92)}function xv(t){return $r(t.size==="big"?155:46)}function dC(t){return $r(t.size==="big"?34:14)}function Sv(t){return os+dC(t)+xv(t)}function wv(t){return t.size==="big"?Sv(t):os+$r(1.2)}function Ev(t){return t.size==="big"?Sv(t):os+$r(.8)}function fC(t){return t.size==="big"?16096779:16436245}function hC(t){const e=uC(t),n=fC(t),i=xv(t),a=t.size==="big",s=new mt;s.position.set(t.position.x,t.position.y,t.position.z),s.renderOrder=20,s.frustumCulled=!1;const r=new ze(new Aa(e*.72,e,24),new at({color:n,transparent:!0,opacity:.92,side:Je,depthWrite:!1}));lu(r.material),r.position.z=os,r.renderOrder=20,r.frustumCulled=!1,s.add(r);const o=new ze(new Qa(e*.58,24),new at({color:n,transparent:!0,opacity:.3,side:Je,depthWrite:!1}));lu(o.material),o.position.z=os+.5,o.renderOrder=21,o.frustumCulled=!1,s.add(o);const l=new ze(new Qa(e*.42,20),new at({color:16777215,transparent:!0,opacity:.22,side:Je,depthWrite:!1}));lu(l.material),l.position.z=os+1,l.renderOrder=22,l.frustumCulled=!1,s.add(l);const c=new ze(a?new Ms(i,32,18):new Qa(i*.9,24),a?new Rl({color:n,emissive:new Ke(n),emissiveIntensity:.6,shininess:88,specular:new Ke(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new at({color:n,transparent:!0,opacity:.88,side:Je,blending:Ni,depthWrite:!1}));c.position.z=wv(t),c.renderOrder=23,c.frustumCulled=!1,s.add(c);const u=new ze(a?new Ms(i*1.36,32,14):new Qa(i*1.35,28),new at({color:n,transparent:!0,opacity:a?.2:.16,side:Je,blending:Ni,depthWrite:!1}));return u.position.z=Ev(t),u.renderOrder=24,u.frustumCulled=!1,s.add(u),{group:s,ring:r,core:o,cooldown:l,orb:c,glow:u}}function pC(t,e){let n=-1;for(let s=0;s<t.events.length&&!(t.events[s].time>e);s+=1)n=s;if(n<0)return{available:!0,progress:1};const i=t.events[n];if(i.available)return{available:!0,progress:1};const a=t.events.slice(n+1).find(s=>s.available);return!a||a.time<=i.time?{available:!1,progress:0}:{available:!1,progress:ht.clamp((e-i.time)/(a.time-i.time),0,1)}}function mC(t,e,n,i){const{available:a,progress:s}=pC(e,n),r=e.size==="big",o=.92+.08*Math.sin(n*6+e.index*.45),l=.96+.04*Math.sin(n*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(n*2.2+e.index*.61)*18:0,u=wv(e)+c,d=Ev(e)+c;if(t.orb.position.z=u,t.glow.position.z=d,t.orb.rotation.z=n*(r?.9:1.25),t.glow.rotation.z=-n*.45,a){t.group.visible=!0,t.ring.material.opacity=.95,t.core.material.opacity=r?.56:.5,t.cooldown.visible=!1,t.ring.scale.setScalar(o),t.core.scale.setScalar(1),t.orb.visible=!0,t.glow.visible=!0,t.orb.material.opacity=r?.96:.9,t.glow.material.opacity=(r?.2:.16)+(l-.96),t.orb.scale.setScalar(l),t.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(t.group.visible=!0,t.ring.material.opacity=.18,t.core.material.opacity=.07,t.ring.scale.setScalar(1),t.core.scale.setScalar(1),t.orb.visible=!1,t.glow.visible=!1,t.cooldown.visible=i,i){const f=.3+s*.7;t.cooldown.scale.setScalar(f),t.cooldown.material.opacity=.16+s*.2}}function _C(t={}){const e=t.showCooldownProgress??!0;let n=null;const i=new Map;function a(r){n=new mt,n.name="boost-pad-overlay",n.renderOrder=20,n.frustumCulled=!1;for(const o of r.replay.boostPads){const l=hC(o);n.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(n)}function s(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&mC(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){a(r),s({...r,state:r.player.getState()})},onStateChange(r){s(r)},teardown(){n?.removeFromParent(),n=null,i.clear()}}}const gC=1.35,vC="#57a8ff",yC="#ff9c40",bC=256,xC=160,SC=360,wC=225,EC=260,MC=430,Mv=18,im=120;function TC(t){return t?vC:yC}function AC(t){return t.events.filter(e=>!e.available&&e.playerId)}function Tv(t,e){const n=document.createElement("canvas");n.width=bC,n.height=xC;const i=n.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,n.width,n.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${t}`,n.width/2,n.height/2),i.fillStyle=e,i.fillText(`${t}`,n.width/2,n.height/2);const a=new ec(n);return a.colorSpace=Gt,a.needsUpdate=!0,a}function CC(t){t?.dispose()}function RC(t){const e=new mt;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const n=Tv(1,t),i=new jg({map:n,transparent:!0,depthTest:!1,depthWrite:!1}),a=new Jg(i);a.scale.set(SC,wC,1),a.renderOrder=62,a.frustumCulled=!1,e.add(a);const s=new at({color:t,transparent:!0,opacity:0,side:Je,depthTest:!1,depthWrite:!1,blending:Ni}),r=new ze(new Aa(im*.72,im,36),s);return r.position.z=Mv,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:s}}function PC(t,e){t.currentCount!==e&&(CC(t.textMaterial.map),t.textMaterial.map=Tv(e,t.color),t.textMaterial.needsUpdate=!0,t.currentCount=e)}function LC(t){const e=new Map;for(const a of t.replay.players)e.set(a.id,a);const n=[];for(const a of t.replay.boostPads)for(const s of AC(a))n.push({pad:a,event:s});n.sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:a.event.frame!==s.event.frame?a.event.frame-s.event.frame:a.pad.index-s.pad.index);const i=[];for(const{pad:a,event:s}of n){if(!s.playerId)continue;const r=e.get(s.playerId);if(!r)continue;const o=TC(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:u}=RC(o);l.position.copy(a.position),t.scene.replayRoot.add(l),i.push({time:s.time,pad:a,event:s,player:r,color:o,currentCount:1,position:new L(a.position.x,a.position.y,a.position.z),size:a.size,group:l,textMaterial:c,ringMaterial:u})}return i}function NC(t,e,n){const i=ht.clamp(e/n,0,1),a=1-Math.pow(1-i,3),s=i*i,r=t.size==="big"?MC:EC,o=t.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;t.group.visible=!0,t.group.position.set(t.position.x,t.position.y,t.position.z+r+a*o),t.group.scale.setScalar(l),t.textMaterial.opacity=Math.max(0,1-s),t.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=t.group.children[1];if(c){const u=.75+a*(t.size==="big"?2.8:1.85);c.scale.setScalar(u),c.position.z=Mv-r-a*o}}function IC(t={}){const e=Math.max(.1,t.durationSeconds??gC);let n=[];function i(s){return t.includePickup?.({pad:s.pad,event:s.event,player:s.player})??!0}function a(){for(const s of n)s.group.visible=!1}return{id:"boost-pickup-animation",setup(s){n=LC(s)},beforeRender(s){if(!s.state.boostPickupAnimationEnabled){a();return}const r=s.currentTime-e,o=new Map;for(const l of n){if(l.time>s.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}PC(l,c),NC(l,s.currentTime-l.time,e)}},teardown(){for(const s of n)s.group.removeFromParent(),s.group.traverse(r=>{(r instanceof ze||r instanceof Jg)&&r.geometry?.dispose()}),s.textMaterial.map?.dispose(),s.textMaterial.dispose(),s.ringMaterial.dispose();n=[]}}}const DC=60,FC=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function kC(t){if(t&&MediaRecorder.isTypeSupported(t))return t;for(const e of FC)if(MediaRecorder.isTypeSupported(e))return e;return""}function OC(t){return t instanceof Error?t.message:String(t)}function UC(t={}){let e=null,n=null,i=[],a=null,s=0,r=0,o="",l=0,c=null,u=null,d=null,f=null,h=!1,_=null;const g=new Set;function m(){return{state:n?n.state==="recording"?"recording":"stopping":c?"error":a?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function p(){const M=m();t.onStatusChange?.(M);for(const T of g)T(M)}function b(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function w(M){n=null,f=null,h=!1,a=M,l=M?.size??0,_&&e&&e.player.setState({currentTime:_.currentTime,speed:_.speed,playing:_.playing}),_=null,M&&t.onComplete?.(M),p(),d?.(M),d=null,u=null}function y(M){c=OC(M),n=null,f=null,h=!1,_=null,p(),d?.(null),d=null,u=null}const C={id:"canvas-recorder",setup(M){e=M},beforeRender(M){n?.state==="recording"&&(r=(performance.now()-s)/1e3,p()),n?.state==="recording"&&f!==null&&M.currentTime>=f&&C.stop()},onStateChange(M){h&&n?.state==="recording"&&!M.state.playing&&r>0&&C.stop()},teardown(){n?.state==="recording"&&n.stop(),e=null,n=null,f=null,h=!1,_=null,d?.(null),d=null,u=null,g.clear()},start(M={}){const T=b();if(n?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=T.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,a=null,i=[],l=0,r=0,s=performance.now(),o=kC(M.mimeType??t.mimeType);const v=Math.max(1,M.fps??t.fps??DC),x=A.captureStream(v);n=new MediaRecorder(x,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??t.videoBitsPerSecond}),u=new Promise(R=>{d=R}),n.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,p())}),n.addEventListener("stop",()=>{x.getTracks().forEach(R=>R.stop()),w(new Blob(i,{type:o||"video/webm"}))},{once:!0}),n.addEventListener("error",R=>{x.getTracks().forEach(I=>I.stop()),y(R.error??R)},{once:!0}),n.start(1e3),p()},stop(){if(!n)return Promise.resolve(a);if(n.state==="inactive")return u??Promise.resolve(a);const M=u??new Promise(T=>{d=T});return n.stop(),p(),M},clear(){if(n?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");a=null,i=[],l=0,r=0,c=null,p()},getRecording(){return a},getStatus(){return m()},subscribe(M){return g.add(M),M(m()),()=>{g.delete(M)}},recordRange(M={}){const T=b(),A=T.player.getState();(M.restorePlaybackState??!0)&&(_=A);const v=M.playbackRate??A.speed,x=M.startTime??A.currentTime;f=M.endTime??A.duration,h=!0,T.player.setState({currentTime:x,speed:v,playing:!1}),C.start(M);const R=u;return T.player.play(),(R??Promise.resolve(null)).then(I=>{if(!I)throw new Error("Recording stopped without producing a video");return I})},recordFullReplay(M={}){return C.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??b().replay.duration})}};return C}const am="subtr-actor-timeline-overlay-styles",BC=new Set(["goal","save"]),zC=.2,HC=2,VC=4,GC=.01,sm=.01;function $C(){if(document.getElementById(am))return;const t=document.createElement("style");t.id=am,t.textContent=`
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
  `,document.head.append(t)}function Id(t){if(!Number.isFinite(t))return"--:--.--";const e=Math.max(0,t),n=Math.floor(e/60),i=Math.floor(e%60),a=Math.floor((e-Math.floor(e))*100);return`${n}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}function rm(t){switch(t.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":return 1;default:return 0}}function WC(t){switch(t.kind){case"goal":case"goal-context":case"goal-tag":return VC;default:return HC}}function oh(t){return t.seekTime!==void 0&&Number.isFinite(t.seekTime)?Math.max(0,t.seekTime):Number.isFinite(t.time)?Math.max(0,t.time-WC(t)):0}function XC(t){if(t.color)return t.color;if(t.isTeamZero===!0)return"#3b82f6";if(t.isTeamZero===!1)return"#f59e0b";switch(t.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";default:return"#d1d9e0"}}function YC(t){if(t.events.length>1)return`${t.events.length}`;const e=t.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function qC(t){return t.events.map(e=>`${Id(e.time)} ${e.label??e.kind}`).join(`
`)}function Av(t){const e=new Map;for(const n of t){const i=n.frame!==void 0?`frame:${n.frame}`:`time:${n.time.toFixed(2)}`,a=e.get(i);if(a){a.events.push(n);continue}e.set(i,{key:i,time:n.time,events:[n]})}return[...e.values()].map(n=>({...n,events:[...n.events].sort((i,a)=>{const s=rm(a)-rm(i);return s!==0?s:i.time-a.time})})).sort((n,i)=>n.time-i.time)}function Cv(t,e){return t?typeof t=="function"?t(e):t:[]}function KC(t,e){const n=[];for(const i of t){const a=Cv(i.source,e);a.length!==0&&n.push({key:i.key,label:i.label,buckets:Av(a)})}return n}function jC(t,e){return t?typeof t=="function"?t(e):t:[]}function ZC(t,e){const n=new Set,i=[];for(const a of t)for(const s of jC(a,e)){const r=s.id;if(r!==void 0){if(n.has(r))continue;n.add(r)}i.push(s)}return i}function JC(t){const e=new Map;for(const n of t){const i=n.lane??"default",a=n.laneLabel??n.lane??"",s=e.get(i);if(s){s.ranges.push(n);continue}e.set(i,{key:i,label:a,ranges:[n]})}return[...e.values()].map(n=>({...n,ranges:[...n.ranges].sort((i,a)=>i.startTime-a.startTime)}))}function QC(t){return t.color?t.color:t.isTeamZero===!0?"#3b82f6":t.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function eR(t,e){if(t.replayEvents)return Cv(t.replayEvents,e);if(t.includeReplayEvents===!1)return[];const n=new Set(t.replayEventKinds??BC);return e.replay.timelineEvents.filter(i=>n.has(i.kind))}function tR(t,e){const n=e.player.projectReplayTimeToTimeline(oh(t));if(!n.hiddenBySkip)return n.seekTime;const i=Math.min(e.player.getTimelineDuration(),n.timelineTime+GC);return e.player.projectTimelineTimeToReplay(i)}function Po(t,e){return`${t/Math.max(e,1e-4)*100}%`}function nR(t,e,n){let i=t.timelineTime,a=e.timelineTime;return a<=i&&(t.hiddenBySkip||e.hiddenBySkip)&&(i>=n?(i=Math.max(0,n-sm),a=n):a=Math.min(n,i+sm)),{startTimelineTime:i,endTimelineTime:a}}function iR(t={}){const e=t.pauseWhileScrubbing??!0;let n=0;const i=t.events?[{key:"events:initial",label:t.eventsLabel??"Events",source:t.events}]:[],a=t.ranges?[t.ranges]:[];let s=null,r=null,o=null,l=null,c=null,u=null,d=null,f=null,h=null,_=null,g=null,m=null,p=!1,b="",w=!1,y=!1,C=null,M=[],T=[],A=null;const v=new Map,x=[],R=[],I=[];function H(){C&&(X(C),G({...C,state:C.player.getState()}))}function B(){C&&(V(C),G({...C,state:C.player.getState()}))}function G(Y){if(!l||!c||!u||!d||!f||!h||!r)return;const ue=Y.player.getTimelineCurrentTime(),Se=Y.player.getTimelineDuration(),ye=[Se.toFixed(4),Y.state.skipKickoffsEnabled?"1":"0",Y.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");A!==ye&&(X(Y),V(Y),A=ye),l.min="0",l.max=`${Se}`,l.step="0.01",l.value=`${Math.min(ue,Se)}`,c.dataset.playing=Y.state.playing?"true":"false",c.setAttribute("aria-label",Y.state.playing?"Pause replay":"Play replay"),c.title=Y.state.playing?"Pause replay":"Play replay",u.textContent=Y.state.playing?"||":">",d.textContent=Y.state.playing?"Pause":"Play",f.textContent=Id(ue),h.textContent=`-${Id(Se-ue)}`,r.dataset.scrubbing=w?"true":"false";for(const O of v.values()){const q=ue-O.timelineTime,ne=q>=0&&q<=zC;O.element.dataset.active=ne?"true":"false",O.element.dataset.passed=O.timelineTime<=ue?"true":"false"}for(const O of x){const q=Math.max(0,O.startTimelineTime),ne=Math.min(Se,O.endTimelineTime);if(Math.max(0,ne-q)<=1e-4){O.element.hidden=!0;continue}O.element.hidden=!1,O.element.dataset.active=ue>=q&&ue<=ne?"true":"false"}const pe=Po(Math.min(ue,Se),Se);for(const O of I)O.element.style.left=pe;for(const O of R)O.element.style.left=pe}function U(Y,ue,Se){const ye=Y.events[0];if(!ye)return null;const pe=ue.player.projectReplayTimeToTimeline(Y.time),O=document.createElement("button");return O.type="button",O.className="sap-tl-marker",O.style.left=Po(pe.timelineTime,Se),O.style.color=XC(ye),O.title=qC(Y),O.textContent=YC(Y),O.addEventListener("click",()=>{ue.player.seek(tR(ye,ue))}),O.dataset.active="false",O.dataset.passed="false",v.set(Y.key,{element:O,timelineTime:pe.timelineTime}),O}function X(Y){if(!g||!_)return;g.replaceChildren(),_.replaceChildren(),v.clear(),I.splice(0,I.length);const ue=eR(t,Y);M=[],ue.length>0&&M.push({key:"replay",label:t.replayEventsLabel??"Replay",buckets:Av(ue)}),M.push(...KC(i,Y));const Se=Math.max(Y.player.getTimelineDuration(),1e-4),ye=M[0];if(ye?.key==="replay")for(const O of ye.buckets){const q=U({...O,key:`${ye.key}:${O.key}`},Y,Se);q&&g.append(q)}const pe=M.filter(O=>O.key!=="replay");_.hidden=pe.length===0;for(const O of pe){const q=document.createElement("div");q.className="sap-tl-event-lane",q.dataset.label=O.label;const ne=document.createElement("span");ne.className="sap-tl-event-lane-label",ne.textContent=O.label,ne.setAttribute("aria-label",O.label),q.append(ne);const xe=document.createElement("div");xe.className="sap-tl-event-lane-track";const ve=document.createElement("div");ve.className="sap-tl-markers";for(const st of O.buckets){const N=U({...st,key:`${O.key}:${st.key}`},Y,Se);N&&ve.append(N)}const Fe=document.createElement("div");Fe.className="sap-tl-event-playhead",xe.append(ve,Fe),I.push({element:Fe}),q.append(xe),_.append(q)}}function V(Y){if(!o)return;o.replaceChildren(),x.splice(0,x.length),R.splice(0,R.length);const ue=ZC(a,Y).filter(ye=>Number.isFinite(ye.startTime)&&Number.isFinite(ye.endTime)&&ye.endTime>ye.startTime);T=JC(ue);const Se=Math.max(Y.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const ye of T){const pe=document.createElement("div");pe.className="sap-tl-range-lane";const O=document.createElement("div");if(O.className="sap-tl-range-lane-track",ye.label){pe.dataset.label=ye.label;const ne=document.createElement("span");ne.className="sap-tl-range-lane-label",ne.textContent=ye.label,ne.setAttribute("aria-label",ye.label),pe.append(ne)}for(const ne of ye.ranges){const xe=Y.player.projectReplayTimeToTimeline(ne.startTime),ve=Y.player.projectReplayTimeToTimeline(ne.endTime),{startTimelineTime:Fe,endTimelineTime:st}=nR(xe,ve,Se),N=document.createElement("div");N.className="sap-tl-range-segment",ne.className&&N.classList.add(ne.className),N.style.background=QC(ne),N.title=ne.label??ye.label,N.dataset.active="false",N.style.left=Po(Fe,Se),N.style.width=Po(Math.max(0,st-Fe),Se),O.append(N),x.push({range:ne,element:N,startTimelineTime:Fe,endTimelineTime:st})}const q=document.createElement("div");q.className="sap-tl-range-playhead",O.append(q),R.push({element:q}),pe.append(O),o.append(pe)}}function Q(){w&&(w=!1,r?.setAttribute("data-scrubbing","false"),y&&C?.player.play(),y=!1)}function fe(){if(w||(w=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const Y=C?.player;Y&&(y=Y.getState().playing,y&&Y.pause())}return{id:"timeline-overlay",addEventSource(Y,ue={}){return i.push({key:ue.id??`events:${n++}`,label:ue.label??"Events",source:Y}),H(),()=>{this.removeEventSource(Y)}},removeEventSource(Y){const ue=i.findIndex(Se=>Se.source===Y);return ue<0?!1:(i.splice(ue,1),H(),!0)},refreshEvents(){H()},addRangeSource(Y){return a.push(Y),B(),()=>{this.removeRangeSource(Y)}},removeRangeSource(Y){const ue=a.indexOf(Y);return ue<0?!1:(a.splice(ue,1),B(),!0)},refreshRanges(){B()},setup(Y){C=Y,$C(),getComputedStyle(Y.container).position==="static"&&(p=!0,b=Y.container.style.position,Y.container.style.position="relative"),s=document.createElement("div"),s.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const ue=document.createElement("div");ue.className="sap-tl-topline";const Se=document.createElement("div");Se.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",u=document.createElement("span"),u.className="sap-tl-toggle-icon",u.setAttribute("aria-hidden","true"),u.textContent=">",d=document.createElement("span"),d.className="sap-tl-toggle-label",d.textContent="Play",c.append(u,d),c.addEventListener("click",()=>{Y.player.togglePlayback()}),f=document.createElement("span"),f.className="sap-tl-current",f.textContent="0:00.00",h=document.createElement("span"),h.className="sap-tl-remaining",h.textContent="-0:00.00",Se.append(f),ue.append(Se,h);const ye=document.createElement("div");ye.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,_=document.createElement("div"),_.className="sap-tl-event-lanes",_.hidden=!0;const pe=document.createElement("div");pe.className="sap-tl-track-rail";const O=document.createElement("div");O.className="sap-tl-main-rail",g=document.createElement("div"),g.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${Y.replay.duration}`,l.step="0.01",l.value="0";const q=()=>{fe()},ne=()=>{l&&Y.player.seek(Y.player.projectTimelineTimeToReplay(Number(l.value)))},xe=()=>{Q()};l.addEventListener("pointerdown",q),l.addEventListener("input",ne),l.addEventListener("change",xe),window.addEventListener("pointerup",xe),window.addEventListener("pointercancel",xe),m=()=>{l?.removeEventListener("pointerdown",q),l?.removeEventListener("input",ne),l?.removeEventListener("change",xe),window.removeEventListener("pointerup",xe),window.removeEventListener("pointercancel",xe)},pe.append(O,g,l),ye.append(o,_,c,pe),r.append(ue,ye),s.append(r),Y.container.append(s),X(Y),V(Y),G({...Y,state:Y.player.getState()})},onStateChange(Y){C=Y,G(Y)},teardown(Y){m?.(),m=null,Q(),s?.remove(),s=null,r=null,o=null,_=null,l=null,c=null,u=null,d=null,f=null,h=null,g=null,C=null,M=[],T=[],A=null,v.clear(),x.splice(0,x.length),R.splice(0,R.length),I.splice(0,I.length),p&&(Y.container.style.position=b,p=!1)}}}function aR(t){return`
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
`}const lh=["timeline","core_player","core_team","possession","pressure","territorial_pressure","movement","positioning","rotation_player","rotation_team","mechanics","goal_context","backboard","ceiling_shot","wall_aerial","wall_aerial_shot","center","flick","musty_flick","dodge_reset","double_tap","fifty_fifty","one_timer","pass","pass_last_completed","ball_carry","goal_tags","rush","speed_flip","half_flip","half_volley","wavedash","whiff","powerslide","touch","touch_ball_movement","touch_last_touch","boost_pickups","boost_ledger","boost_state","bump"],Rv=["air_dribble","ball_carry","ceiling_shot","center","double_tap","flick","flip_reset","half_flip","half_volley","musty_flick","one_timer","pass","speed_flip","wall_aerial","wall_aerial_shot","wavedash"],Pv=[...new Set([...lh,...Rv])],sR=new Set(lh),rR=new Set(Rv);function ls(){return Object.fromEntries(Pv.map(t=>[t,0]))}function cu(t){return{...t??ls()}}function Lo(t,e){t[e]+=1}function oR(t){return Pv.includes(t)}function Lv(t){if(t==null)return null;if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Dd(t){return Lv(t.player??t.player_id??t.scorer)}function lR(t){const e=t.is_team_0??t.scoring_team_is_team_0;return typeof e=="boolean"?e:null}function cR(t){const e=t.kind;return typeof e!="string"||!rR.has(e)||sR.has(e)||!oR(e)?null:e}function Fd(t){const e=t.timing,n=t.resolved_frame??t.frame??(e&&typeof e=="object"&&"frame"in e?e.frame:void 0)??(e&&typeof e=="object"&&"end_frame"in e?e.end_frame:void 0);return typeof n=="number"&&Number.isFinite(n)?n:null}function kd(t){const e=t.timing,n=t.resolved_time??t.time??(e&&typeof e=="object"&&"time"in e?e.time:void 0)??(e&&typeof e=="object"&&"end_time"in e?e.end_time:void 0);return typeof n=="number"&&Number.isFinite(n)?n:null}function uR(t,e){const n=Fd(t);if(n!==null)return n<=e.frame_number;const i=kd(t);return i!==null&&i<=e.time}function dR(t){return[...t].filter(e=>!!e&&typeof e=="object").sort((e,n)=>{const i=Fd(e),a=Fd(n);if(i!==a)return(i??Number.POSITIVE_INFINITY)-(a??Number.POSITIVE_INFINITY);const s=kd(e),r=kd(n);return s!==r?(s??Number.POSITIVE_INFINITY)-(r??Number.POSITIVE_INFINITY):(Dd(e)??"").localeCompare(Dd(n)??"")})}function Nv(t){const e=Iv(t);for(const n of t.frames)e.applyFrame(n);return t}function Iv(t){const e=lh.map(a=>({eventType:a,events:dR(t.events[a]??[]),index:0})),n=new Map,i={teamZero:ls(),teamOne:ls()};return{applyFrame(a){for(const s of e)for(;s.index<s.events.length&&uR(s.events[s.index],a);){const r=s.events[s.index],o=Dd(r),l=s.eventType==="mechanics"?cR(r):null;if(o!==null){const u=n.get(o)??ls();n.set(o,u),Lo(u,s.eventType),l!==null&&Lo(u,l)}const c=lR(r);if(c!==null){const u=c?i.teamZero:i.teamOne;Lo(u,s.eventType),l!==null&&Lo(u,l)}s.index+=1}for(const s of a.players){const r=Lv(s.player_id);s.event_counts=cu(r===null?void 0:n.get(r))}a.team_zero.event_counts=cu(i.teamZero),a.team_one.event_counts=cu(i.teamOne)}}}function om(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Dv(){return{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null}}function fR(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function hR(t,e,n,i){t.is_last_backboard=i,t.time_since_last_backboard=t.last_backboard_time==null?null:Math.max(0,n-t.last_backboard_time),t.frames_since_last_backboard=t.last_backboard_frame==null?null:Math.max(0,e-t.last_backboard_frame)}function pR(t,e,n,i){t.count+=1,t.last_backboard_time=e.time,t.last_backboard_frame=e.frame,t.time_since_last_backboard=Math.max(0,i-e.time),t.frames_since_last_backboard=Math.max(0,n-e.frame)}function mR(t,e){Object.assign(t,e??Dv())}function lm(t,e){t.count=e}function _R(t){const e=Fv(t);for(const n of t.frames)e.applyFrame(n);return t}function Fv(t){const e=fR(t.events.backboard??[]);let n=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)hR(u,o.frame_number,o.time,c===s);let l=!1;for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=om(c.player),d=r.get(u)??Dv();r.set(u,d),pR(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,n+=1}if(l)for(const c of r.values())c.is_last_backboard=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_backboard=!0)}lm(o.team_zero.backboard,i),lm(o.team_one.backboard,a);for(const c of o.players)mR(c.backboard,r.get(om(c.player_id)))}}}function cm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function sl(){return{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function rl(){return{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function gR(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.end_frame!==n.event.end_frame?e.event.end_frame-n.event.end_frame:e.event.end_time!==n.event.end_time?e.event.end_time-n.event.end_time:e.index-n.index).map(({event:e})=>e)}function Od(t){return`${t.key}\0${t.value}`}function No(t){return t.map(Od).join("")}function kv(t,e){e.sort((a,s)=>Od(a).localeCompare(Od(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>No(a.labels)===No(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>No(a.labels).localeCompare(No(s.labels))))}function um(t,e){return t.labeled_event_counts?.entries.filter(n=>n.labels.some(i=>i.key==="origin"&&i.value===e)).reduce((n,i)=>n+i.count,0)??0}function Ov(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function Uv(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function dm(t,e){kv(t,[{key:"kind",value:"carry"}]),t.carry_count=Ov(t),t.total_carry_time+=e.duration,t.total_straight_line_distance+=e.straight_line_distance,t.total_path_distance+=e.path_distance,t.longest_carry_time=Math.max(t.longest_carry_time,e.duration),t.furthest_carry_distance=Math.max(t.furthest_carry_distance,e.straight_line_distance),t.fastest_carry_speed=Math.max(t.fastest_carry_speed,e.average_speed),t.carry_speed_sum+=e.average_speed,t.average_horizontal_gap_sum+=e.average_horizontal_gap,t.average_vertical_gap_sum+=e.average_vertical_gap}function fm(t,e){e.air_dribble_origin!=null&&kv(t,[{key:"origin",value:e.air_dribble_origin}]),t.count=Ov(t),t.ground_to_air_count=um(t,"ground_to_air"),t.wall_to_air_count=um(t,"wall_to_air"),t.total_time+=e.duration,t.total_straight_line_distance+=e.straight_line_distance,t.total_path_distance+=e.path_distance,t.longest_time=Math.max(t.longest_time,e.duration),t.furthest_distance=Math.max(t.furthest_distance,e.straight_line_distance),t.fastest_speed=Math.max(t.fastest_speed,e.average_speed),t.speed_sum+=e.average_speed,t.average_horizontal_gap_sum+=e.average_horizontal_gap,t.average_vertical_gap_sum+=e.average_vertical_gap,t.total_touch_count+=e.touch_count,t.max_touch_count=Math.max(t.max_touch_count,e.touch_count)}function uu(t,e){Object.assign(t,e??sl()),e?.labeled_event_counts?t.labeled_event_counts=Uv(e.labeled_event_counts):delete t.labeled_event_counts}function du(t,e){Object.assign(t,e??rl()),e?.labeled_event_counts?t.labeled_event_counts=Uv(e.labeled_event_counts):delete t.labeled_event_counts}function vR(t){const e=Bv(t);for(const n of t.frames)e.applyFrame(n);return t}function Bv(t){const e=gR(t.events.ball_carry??[]);let n=0;const i=new Map,a=new Map,s=sl(),r=sl(),o=rl(),l=rl();return{applyFrame(c){for(;n<e.length&&e[n].end_frame<c.frame_number;){const u=e[n],d=cm(u.player_id);if(u.kind==="carry"){const f=i.get(d)??sl();i.set(d,f),dm(f,u),dm(u.is_team_0?s:r,u)}else{const f=a.get(d)??rl();a.set(d,f),fm(f,u),fm(u.is_team_0?o:l,u)}n+=1}uu(c.team_zero.ball_carry,s),uu(c.team_one.ball_carry,r),du(c.team_zero.air_dribble,o),du(c.team_one.air_dribble,l);for(const u of c.players){const d=cm(u.player_id);uu(u.ball_carry,i.get(d)),du(u.air_dribble,a.get(d))}}}}function fu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Ud(){return{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}}function hm(){return{bumps_inflicted:0,team_bumps_inflicted:0}}function yR(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function bR(t,e){t.bumps_inflicted+=1,e.is_team_bump&&(t.team_bumps_inflicted+=1),t.last_bump_time=e.time,t.last_bump_frame=e.frame,t.last_bump_strength=e.strength,t.max_bump_strength=Math.max(t.max_bump_strength,e.strength),t.cumulative_bump_strength+=e.strength}function xR(t,e){t.bumps_taken+=1,e.is_team_bump&&(t.team_bumps_taken+=1)}function SR(t,e){t.bumps_inflicted+=1,e.is_team_bump&&(t.team_bumps_inflicted+=1)}function wR(t,e){Object.assign(t,e??Ud())}function pm(t,e){Object.assign(t,e)}function ER(t){const e=zv(t);for(const n of t.frames)e.applyFrame(n);return t}function zv(t){const e=yR(t.events.bump??[]);let n=0;const i=new Map,a=hm(),s=hm();return{applyFrame(r){for(;n<e.length&&e[n].frame<=r.frame_number;){const o=e[n],l=fu(o.initiator),c=i.get(l)??Ud();i.set(l,c),bR(c,o);const u=fu(o.victim),d=i.get(u)??Ud();i.set(u,d),xR(d,o),SR(o.initiator_is_team_0?a:s,o),n+=1}pm(r.team_zero.bump,a),pm(r.team_one.bump,s);for(const o of r.players)wR(o.bump,i.get(fu(o.player_id)))}}}const Ll=255,MR=1,TR=Ll-1,AR=11920928955078125e-23,CR=["tracked_time","boost_integral","time_zero_boost","time_hundred_boost","time_boost_0_25","time_boost_25_50","time_boost_50_75","time_boost_75_100"],RR=["amount_collected","amount_collected_inactive","big_pads_collected_inactive","small_pads_collected_inactive","amount_stolen","big_pads_collected","small_pads_collected","big_pads_stolen","small_pads_stolen","amount_collected_big","amount_stolen_big","amount_collected_small","amount_stolen_small","amount_respawned","overfill_total","overfill_from_stolen","amount_used","amount_used_while_grounded","amount_used_while_airborne","amount_used_while_supersonic"],PR=[...CR,...RR];function Lt(t){return Math.fround(t)}function gt(t,e){return Lt(Lt(t)+Lt(e))}function Io(t,e){return Lt(Lt(t)-Lt(e))}function ui(t,e){return Lt(Lt(t)*Lt(e))}function Bd(t,e){return Lt(Lt(t)/Lt(e))}function Hv(){return{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0}}const LR=Hv();function Do(){return{stats:Hv(),countedPickupKeys:new Set,currentBoostAmount:null,currentBoostBefore:null,currentBoostFrame:null,previousBoostAmount:null,labeledAmountsVersion:0,labeledAmountsSnapshot:void 0,labeledAmountsSnapshotVersion:-1,labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function Di(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function di(t,e){return t.labels?.find(n=>n.key===e)?.value??null}function Vv(t){return[...t??[]].sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function Nl(t){return JSON.stringify(Vv(t))}function Gv(t){return Vv(t).map(e=>({...e}))}function NR(t,e){const n=Lt(e.amount);if(n<=0)return!1;const i=(t.labeled_amounts??={entries:[]}).entries,a=Nl(e.labels),s=i.find(r=>Nl(r.labels)===a);return s?(s.value=gt(s.value,n),!0):(i.push({labels:Gv(e.labels),value:n}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function IR(t,e,n){if(n<=0)return!1;const i=(t.labeled_counts??={entries:[]}).entries,a=Nl(e.labels),s=i.find(r=>Nl(r.labels)===a);return s?(s.count+=n,!0):(i.push({labels:Gv(e.labels),count:n}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function Ka(t){return Bd(ui(t,Ll),100)}function ja(t,e,n,i){const a=Io(e,t);if(Math.abs(a)<=AR)return t>=n&&t<i?1:0;const s=Bd(Io(n,t),a),r=Bd(Io(i,t),a),o=Math.max(Math.min(s,r),0),l=Math.min(Math.max(s,r),1);return Math.max(Io(l,o),0)}function DR(t,e){t.currentBoostAmount=Lt(e.boost_amount),t.currentBoostBefore=e.boost_before==null?null:Lt(e.boost_before),t.currentBoostFrame=e.frame}function $v(t,e,n,i){const a=Lt(e),s=Lt(n),r=Lt(i),o=ui(gt(a,s),.5);t.tracked_time=gt(t.tracked_time,r),t.boost_integral=gt(t.boost_integral,ui(o,r)),t.time_zero_boost=gt(t.time_zero_boost,ui(r,ja(a,s,0,MR))),t.time_hundred_boost=gt(t.time_hundred_boost,ui(r,ja(a,s,TR,Ll+1))),t.time_boost_0_25=gt(t.time_boost_0_25,ui(r,ja(a,s,0,Ka(25)))),t.time_boost_25_50=gt(t.time_boost_25_50,ui(r,ja(a,s,Ka(25),Ka(50)))),t.time_boost_50_75=gt(t.time_boost_50_75,ui(r,ja(a,s,Ka(50),Ka(75)))),t.time_boost_75_100=gt(t.time_boost_75_100,ui(r,ja(a,s,Ka(75),Ll+1)))}function FR(t,e,n){if(t.currentBoostFrame!==n)return null;const i=t.currentBoostAmount;if(i==null)return null;const a=t.currentBoostBefore??i;return $v(t.stats,a,i,e),t.previousBoostAmount=i,[a,i]}function mm(t,e){if(e.count<=0)return;const n=di(e,"pad_size");if(n!=="big"&&n!=="small")return;const i=di(e,"activity")??"unknown",a=di(e,"field_half")??"unknown",s=`${e.frame}:${Di(e.player_id)}:${n}:${i}:${a}`;if(!t.countedPickupKeys.has(s)){if(t.countedPickupKeys.add(s),i==="inactive"){n==="big"?t.stats.big_pads_collected_inactive+=1:t.stats.small_pads_collected_inactive+=1;return}n==="big"?t.stats.big_pads_collected+=1:t.stats.small_pads_collected+=1}}function _m(t,e){const n=Lt(Number.isFinite(e.amount)?e.amount:0);e.transaction!=="used"&&NR(t.stats,e)&&(t.labeledAmountsVersion+=1),e.transaction==="collected"&&IR(t.stats,e,Math.max(e.count,1))&&(t.labeledCountsVersion+=1);const i=di(e,"pad_size"),a=di(e,"activity")??"active",s=di(e,"field_half");switch(e.transaction){case"collected":if(mm(t,e),a==="inactive"){t.stats.amount_collected_inactive=gt(t.stats.amount_collected_inactive,n);break}t.stats.amount_collected=gt(t.stats.amount_collected,n),i==="big"?t.stats.amount_collected_big=gt(t.stats.amount_collected_big,n):i==="small"&&(t.stats.amount_collected_small=gt(t.stats.amount_collected_small,n));break;case"stolen":t.stats.amount_stolen=gt(t.stats.amount_stolen,n),i==="big"?(t.stats.big_pads_stolen+=1,t.stats.amount_stolen_big=gt(t.stats.amount_stolen_big,n)):i==="small"&&(t.stats.small_pads_stolen+=1,t.stats.amount_stolen_small=gt(t.stats.amount_stolen_small,n));break;case"overfill":t.stats.overfill_total=gt(t.stats.overfill_total,n),s==="opponent"&&(t.stats.overfill_from_stolen=gt(t.stats.overfill_from_stolen,n)),mm(t,e);break;case"respawn":t.stats.amount_respawned=gt(t.stats.amount_respawned,n);break;case"used":t.stats.amount_used=gt(t.stats.amount_used,n);break;case"used_allocation":di(e,"vertical_state")==="grounded"?t.stats.amount_used_while_grounded=gt(t.stats.amount_used_while_grounded,n):di(e,"vertical_state")==="aerial"&&(t.stats.amount_used_while_airborne=gt(t.stats.amount_used_while_airborne,n)),di(e,"supersonic")==="true"&&(t.stats.amount_used_while_supersonic=gt(t.stats.amount_used_while_supersonic,n));break}}function kR(t){return t.labeledAmountsSnapshotVersion!==t.labeledAmountsVersion&&(t.labeledAmountsSnapshot=t.stats.labeled_amounts&&t.stats.labeled_amounts.entries.length>0?{entries:t.stats.labeled_amounts.entries.map(e=>({labels:e.labels.map(n=>({...n})),value:e.value}))}:void 0,t.labeledAmountsSnapshotVersion=t.labeledAmountsVersion),t.labeledAmountsSnapshot}function OR(t){return t.labeledCountsSnapshotVersion!==t.labeledCountsVersion&&(t.labeledCountsSnapshot=t.stats.labeled_counts&&t.stats.labeled_counts.entries.length>0?{entries:t.stats.labeled_counts.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}:void 0,t.labeledCountsSnapshotVersion=t.labeledCountsVersion),t.labeledCountsSnapshot}function hu(t,e){const n=e?.stats??LR;for(const s of PR)t[s]=n[s];const i=e?kR(e):void 0;i?t.labeled_amounts=i:delete t.labeled_amounts;const a=e?OR(e):void 0;a?t.labeled_counts=a:delete t.labeled_counts}function UR(t){return[...t.events.boost_ledger??[]].sort((e,n)=>e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:Di(e.player_id).localeCompare(Di(n.player_id)))}function BR(t){return[...t.events.boost_state??[]].sort((e,n)=>e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:Di(e.player_id).localeCompare(Di(n.player_id)))}function zR(t){const e=Wv(t);for(const n of t.frames)e.applyFrame(n);return t}function Wv(t){const e=UR(t),n=BR(t);let i=0,a=0;const s=new Map,r=Do(),o=Do();return{applyFrame(l){const c=[];for(;a<n.length&&n[a].frame<=l.frame_number;){const u=n[a],d=Di(u.player_id);let f=s.get(d);f||(f=Do(),s.set(d,f)),DR(f,u),u.frame===l.frame_number&&c.push({key:d,isTeamZero:u.is_team_0}),a+=1}for(;i<e.length&&e[i].frame<=l.frame_number;){const u=e[i],d=Di(u.player_id);let f=s.get(d);f||(f=Do(),s.set(d,f)),_m(f,u),_m(u.is_team_0?r:o,u),i+=1}for(const u of c){const d=s.get(u.key);if(!d)continue;const f=FR(d,l.dt,l.frame_number);f&&$v(u.isTeamZero?r.stats:o.stats,f[0],f[1],l.dt)}hu(l.team_zero.boost,r),hu(l.team_one.boost,o);for(const u of l.players){const d=s.get(Di(u.player_id));hu(u.boost,d)}}}}const HR=.78;function cs(t){return Math.fround(t)}function VR(t,e){return cs(cs(t)+cs(e))}function Xv(t,e){return cs(cs(t)-cs(e))}function gm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Yv(){return{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function GR(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function zd(t){return`${t.key}\0${t.value}`}function Fo(t){return t.map(zd).join("")}function $R(t,e){e.sort((a,s)=>zd(a).localeCompare(zd(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>Fo(a.labels)===Fo(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>Fo(a.labels).localeCompare(Fo(s.labels))))}function WR(t,e){return t.labeled_event_counts?.entries.filter(n=>n.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((n,i)=>n+i.count,0)??0}function XR(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function YR(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function qR(t,e,n,i){t.is_last_ceiling_shot=i,t.time_since_last_ceiling_shot=t.last_ceiling_shot_time==null?null:Math.max(0,Xv(n,t.last_ceiling_shot_time)),t.frames_since_last_ceiling_shot=t.last_ceiling_shot_frame==null?null:Math.max(0,e-t.last_ceiling_shot_frame)}function KR(t,e,n,i){$R(t,[{key:"confidence_band",value:e.confidence>=HR?"high":"standard"}]),t.count=XR(t),t.high_confidence_count=WR(t,"high"),t.is_last_ceiling_shot=!0,t.last_ceiling_shot_time=e.time,t.last_ceiling_shot_frame=e.frame,t.time_since_last_ceiling_shot=Math.max(0,Xv(i,e.time)),t.frames_since_last_ceiling_shot=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=VR(t.cumulative_confidence,e.confidence)}function jR(t,e){Object.assign(t,e??Yv()),e?.labeled_event_counts?t.labeled_event_counts=YR(e.labeled_event_counts):delete t.labeled_event_counts}function ZR(t){const e=qv(t);for(const n of t.frames)e.applyFrame(n);return t}function qv(t){const e=GR(t.events.ceiling_shot??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)qR(o,s.frame_number,s.time,i===r);for(;n<e.length&&e[n].frame<=s.frame_number;){const r=e[n],o=gm(r.player),l=a.get(o)??Yv();a.set(o,l),KR(l,r,s.frame_number,s.time),i=o,n+=1}}else i=null;for(const r of s.players)jR(r.ceiling_shot,a.get(gm(r.player_id)))}}}function vm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Bn(t,e){return Math.fround(Math.fround(t)+Math.fround(e))}function Hd(){return{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null}}function Kv(){return{...Hd(),goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null}}function ym(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function JR(t,e){Object.assign(t,e??Kv())}function bm(t,e){Object.assign(t,e)}function xm(t,e){return e==null?t:{...e}}function Vd(t,e){t.score+=e.score,t.goals+=e.goals,t.assists+=e.assists,t.saves+=e.saves,t.shots+=e.shots,t.kickoff_goal_count+=e.kickoff_goal_count,t.short_goal_count+=e.short_goal_count,t.medium_goal_count+=e.medium_goal_count,t.long_goal_count+=e.long_goal_count,t.counter_attack_goal_count+=e.counter_attack_goal_count,t.sustained_pressure_goal_count+=e.sustained_pressure_goal_count,t.other_buildup_goal_count+=e.other_buildup_goal_count,t.goal_ball_air_time_sample_count+=e.goal_ball_air_time_sample_count,t.cumulative_goal_ball_air_time=Bn(t.cumulative_goal_ball_air_time,e.cumulative_goal_ball_air_time),e.last_goal_ball_air_time!=null&&(t.last_goal_ball_air_time=e.last_goal_ball_air_time)}function QR(t,e){Vd(t,e),t.goals_conceded_while_last_defender+=e.goals_conceded_while_last_defender,t.goals_for_while_most_back+=e.goals_for_while_most_back,t.goals_against_while_most_back+=e.goals_against_while_most_back,t.goal_against_boost_sample_count+=e.goal_against_boost_sample_count,t.cumulative_boost_on_goals_against=Bn(t.cumulative_boost_on_goals_against,e.cumulative_boost_on_goals_against),e.last_boost_on_goal_against!=null&&(t.last_boost_on_goal_against=e.last_boost_on_goal_against),t.goal_against_boost_leadup_sample_count+=e.goal_against_boost_leadup_sample_count,t.cumulative_average_boost_in_goal_against_leadup=Bn(t.cumulative_average_boost_in_goal_against_leadup,e.cumulative_average_boost_in_goal_against_leadup),t.cumulative_min_boost_in_goal_against_leadup=Bn(t.cumulative_min_boost_in_goal_against_leadup,e.cumulative_min_boost_in_goal_against_leadup),e.last_average_boost_in_goal_against_leadup!=null&&(t.last_average_boost_in_goal_against_leadup=e.last_average_boost_in_goal_against_leadup),e.last_min_boost_in_goal_against_leadup!=null&&(t.last_min_boost_in_goal_against_leadup=e.last_min_boost_in_goal_against_leadup),t.goal_against_position_sample_count+=e.goal_against_position_sample_count,t.cumulative_goal_against_position_x=Bn(t.cumulative_goal_against_position_x,e.cumulative_goal_against_position_x),t.cumulative_goal_against_position_y=Bn(t.cumulative_goal_against_position_y,e.cumulative_goal_against_position_y),t.cumulative_goal_against_position_z=Bn(t.cumulative_goal_against_position_z,e.cumulative_goal_against_position_z),t.last_goal_against_position=xm(t.last_goal_against_position,e.last_goal_against_position),t.scoring_goal_last_touch_position_sample_count+=e.scoring_goal_last_touch_position_sample_count,t.cumulative_scoring_goal_last_touch_position_x=Bn(t.cumulative_scoring_goal_last_touch_position_x,e.cumulative_scoring_goal_last_touch_position_x),t.cumulative_scoring_goal_last_touch_position_y=Bn(t.cumulative_scoring_goal_last_touch_position_y,e.cumulative_scoring_goal_last_touch_position_y),t.cumulative_scoring_goal_last_touch_position_z=Bn(t.cumulative_scoring_goal_last_touch_position_z,e.cumulative_scoring_goal_last_touch_position_z),t.last_scoring_goal_last_touch_position=xm(t.last_scoring_goal_last_touch_position,e.last_scoring_goal_last_touch_position)}function eP(t){const e=jv(t);for(const n of t.frames)e.applyFrame(n);return t}function jv(t){const e=ym(t.events.core_player??[]),n=ym(t.events.core_team??[]);let i=0,a=0;const s=new Map,r=Hd(),o=Hd();return{applyFrame(l){for(;i<e.length&&e[i].frame<=l.frame_number;){const c=e[i],u=vm(c.player),d=s.get(u)??Kv();s.set(u,d),QR(d,c.delta),i+=1}for(;a<n.length&&n[a].frame<=l.frame_number;){const c=n[a];c.is_team_0?Vd(r,c.delta):Vd(o,c.delta),a+=1}bm(l.team_zero.core,r),bm(l.team_one.core,o);for(const c of l.players)JR(c.core,s.get(vm(c.player_id)))}}}function Sm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Zv(){return{count:0,on_ball_count:0}}function tP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function nP(t,e){t.count+=1,e.on_ball&&(t.on_ball_count+=1)}function iP(t,e){Object.assign(t,e??Zv())}function aP(t){const e=Jv(t);for(const n of t.frames)e.applyFrame(n);return t}function Jv(t){const e=tP(t.events.dodge_reset??[]);let n=0;const i=new Map;return{applyFrame(a){for(;n<e.length&&e[n].frame<=a.frame_number;){const s=e[n],r=Sm(s.player),o=i.get(r)??Zv();i.set(r,o),nP(o,s),n+=1}for(const s of a.players)iP(s.dodge_reset,i.get(Sm(s.player_id)))}}}function wm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Qv(){return{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null}}function sP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function rP(t,e,n,i){t.is_last_double_tap=i,t.time_since_last_double_tap=t.last_double_tap_time==null?null:Math.max(0,n-t.last_double_tap_time),t.frames_since_last_double_tap=t.last_double_tap_frame==null?null:Math.max(0,e-t.last_double_tap_frame)}function oP(t,e,n,i){t.count+=1,t.last_double_tap_time=e.time,t.last_double_tap_frame=e.frame,t.time_since_last_double_tap=Math.max(0,i-e.time),t.frames_since_last_double_tap=Math.max(0,n-e.frame)}function lP(t,e){Object.assign(t,e??Qv())}function Em(t,e){t.count=e}function cP(t){const e=e0(t);for(const n of t.frames)e.applyFrame(n);return t}function e0(t){const e=sP(t.events.double_tap??[]);let n=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)rP(u,o.frame_number,o.time,c===s);let l=!1;for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=wm(c.player),d=r.get(u)??Qv();r.set(u,d),oP(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,n+=1}if(l)for(const c of r.values())c.is_last_double_tap=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_double_tap=!0)}Em(o.team_zero.double_tap,i),Em(o.team_one.double_tap,a);for(const c of o.players)lP(c.double_tap,r.get(wm(c.player_id)))}}}function Mm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function t0(){return{demos_inflicted:0,demos_taken:0}}function Tm(){return{demos_inflicted:0}}function uP(t){return t.filter(e=>e.kind==="Kill"||e.kind==="Death").map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function dP(t,e){Object.assign(t,e??t0())}function Am(t,e){Object.assign(t,e)}function fP(t){const e=n0(t);for(const n of t.frames)e.applyFrame(n);return t}function n0(t){const e=uP(t.events.timeline??[]);let n=0;const i=new Map,a=Tm(),s=Tm();return{applyFrame(r){for(;n<e.length&&e[n].time<=r.time;){const o=e[n];if(o.player_id!=null){const l=Mm(o.player_id),c=i.get(l)??t0();i.set(l,c),o.kind==="Kill"?(c.demos_inflicted+=1,o.is_team_0===!0?a.demos_inflicted+=1:o.is_team_0===!1&&(s.demos_inflicted+=1)):o.kind==="Death"&&(c.demos_taken+=1)}n+=1}Am(r.team_zero.demo,a),Am(r.team_one.demo,s);for(const o of r.players)dP(o.demo,i.get(Mm(o.player_id)))}}}function pu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Cm(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0}}function Gd(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0}}function hP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.resolve_frame!==n.event.resolve_frame?e.event.resolve_frame-n.event.resolve_frame:e.event.resolve_time!==n.event.resolve_time?e.event.resolve_time-n.event.resolve_time:e.index-n.index).map(({event:e})=>e)}function pP(t){return{key:"phase",value:t?"kickoff":"open_play"}}function mP(t,e){return e==null?{key:"outcome",value:"neutral"}:{key:"outcome",value:e===t?"win":"loss"}}function _P(t,e){return e==null?{key:"possession_after",value:"neutral"}:{key:"possession_after",value:e===t?"self":"opponent"}}function gP(t,e){return{key:"dodge_state",value:(t?e.team_zero_dodge_contact:e.team_one_dodge_contact)?"dodge":"no_dodge"}}function $d(t){return`${t.key}\0${t.value}`}function ko(t){return t.map($d).join("")}function vP(t,e){e.sort((a,s)=>$d(a).localeCompare($d(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>ko(a.labels)===ko(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>ko(a.labels).localeCompare(ko(s.labels))))}function yP(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function Rm(t,e,n){t.count+=1,n.winning_team_is_team_0==null?t.neutral_outcomes+=1:n.winning_team_is_team_0===e?t.wins+=1:t.losses+=1,n.possession_team_is_team_0==null?t.neutral_possession_after_count+=1:n.possession_team_is_team_0===e?t.possession_after_count+=1:t.opponent_possession_after_count+=1,n.is_kickoff&&(t.kickoff_count+=1,n.winning_team_is_team_0==null?t.kickoff_neutral_outcomes+=1:n.winning_team_is_team_0===e?t.kickoff_wins+=1:t.kickoff_losses+=1,n.possession_team_is_team_0==null?t.kickoff_neutral_possession_after_count+=1:n.possession_team_is_team_0===e?t.kickoff_possession_after_count+=1:t.kickoff_opponent_possession_after_count+=1)}function Pm(t,e,n){vP(t,[pP(n.is_kickoff),mP(e,n.winning_team_is_team_0),_P(e,n.possession_team_is_team_0),gP(e,n)]),t.count+=1,n.winning_team_is_team_0==null?t.neutral_outcomes+=1:n.winning_team_is_team_0===e?t.wins+=1:t.losses+=1,n.possession_team_is_team_0===e&&(t.possession_after_count+=1),n.is_kickoff&&(t.kickoff_count+=1,n.winning_team_is_team_0==null?t.kickoff_neutral_outcomes+=1:n.winning_team_is_team_0===e?t.kickoff_wins+=1:t.kickoff_losses+=1,n.possession_team_is_team_0===e&&(t.kickoff_possession_after_count+=1))}function bP(t,e){Object.assign(t,e??Gd()),e?.labeled_event_counts?t.labeled_event_counts=yP(e.labeled_event_counts):delete t.labeled_event_counts}function Lm(t,e){Object.assign(t,e)}function xP(t){const e=i0(t);for(const n of t.frames)e.applyFrame(n);return t}function i0(t){const e=hP(t.events.fifty_fifty??[]);let n=0;const i=Cm(),a=Cm(),s=new Map;return{applyFrame(r){for(;n<e.length&&e[n].resolve_frame<=r.frame_number;){const o=e[n];if(Rm(i,!0,o),Rm(a,!1,o),o.team_zero_player!=null){const l=pu(o.team_zero_player),c=s.get(l)??Gd();s.set(l,c),Pm(c,!0,o)}if(o.team_one_player!=null){const l=pu(o.team_one_player),c=s.get(l)??Gd();s.set(l,c),Pm(c,!1,o)}n+=1}Lm(r.team_zero.fifty_fifty,i),Lm(r.team_one.fifty_fifty,a);for(const o of r.players)bP(o.fifty_fifty,s.get(pu(o.player_id)))}}}const SP=.8;function us(t){return Math.fround(t)}function mu(t,e){return us(us(t)+us(e))}function a0(t,e){return us(us(t)-us(e))}function Nm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function s0(){return{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0}}function wP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function Wd(t){return`${t.key}\0${t.value}`}function Oo(t){return t.map(Wd).join("")}function EP(t,e){e.sort((a,s)=>Wd(a).localeCompare(Wd(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>Oo(a.labels)===Oo(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>Oo(a.labels).localeCompare(Oo(s.labels))))}function MP(t,e){return t.labeled_event_counts?.entries.filter(n=>n.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((n,i)=>n+i.count,0)??0}function TP(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function AP(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function CP(t,e,n,i){t.is_last_flick=i,t.time_since_last_flick=t.last_flick_time==null?null:Math.max(0,a0(n,t.last_flick_time)),t.frames_since_last_flick=t.last_flick_frame==null?null:Math.max(0,e-t.last_flick_frame)}function RP(t,e,n,i){EP(t,[{key:"confidence_band",value:e.confidence>=SP?"high":"standard"}]),t.count=TP(t),t.high_confidence_count=MP(t,"high"),t.is_last_flick=!0,t.last_flick_time=e.time,t.last_flick_frame=e.frame,t.time_since_last_flick=Math.max(0,a0(i,e.time)),t.frames_since_last_flick=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=mu(t.cumulative_confidence,e.confidence),t.cumulative_setup_duration=mu(t.cumulative_setup_duration,e.setup_duration),t.cumulative_ball_speed_change=mu(t.cumulative_ball_speed_change,e.ball_speed_change)}function PP(t,e){Object.assign(t,e??s0()),e?.labeled_event_counts?t.labeled_event_counts=AP(e.labeled_event_counts):delete t.labeled_event_counts}function LP(t){const e=r0(t);for(const n of t.frames)e.applyFrame(n);return t}function r0(t){const e=wP(t.events.flick??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)CP(o,s.frame_number,s.time,r===i);for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=s.frame_number;){const r=e[n],o=Nm(r.player),l=a.get(o)??s0();a.set(o,l),RP(l,r,s.frame_number,s.time),i=o,n+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_flick=!0)}}else i=null;for(const r of s.players)PP(r.flick,a.get(Nm(r.player_id)))}}}function ds(t){return Math.fround(t)}function o0(t,e){return ds(ds(t)+ds(e))}function l0(t,e){return ds(ds(t)-ds(e))}function Im(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function c0(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null}}function NP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function IP(t,e,n,i){t.is_last_half_volley=i,t.time_since_last_half_volley=t.last_half_volley_time==null?null:Math.max(0,l0(n,t.last_half_volley_time)),t.frames_since_last_half_volley=t.last_half_volley_frame==null?null:Math.max(0,e-t.last_half_volley_frame)}function DP(t,e,n,i){t.count+=1,t.total_ball_speed=o0(t.total_ball_speed,e.ball_speed),t.fastest_ball_speed=Math.max(t.fastest_ball_speed,e.ball_speed),t.last_half_volley_time=e.time,t.last_half_volley_frame=e.frame,t.time_since_last_half_volley=Math.max(0,l0(i,e.time)),t.frames_since_last_half_volley=Math.max(0,n-e.frame)}function FP(t,e){Object.assign(t,e??c0())}function Dm(t,e){Object.assign(t,e)}function kP(t){const e=u0(t);for(const n of t.frames)e.applyFrame(n);return t}function u0(t){const e=NP(t.events.half_volley??[]);let n=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)IP(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=o.frame_number;){const c=e[n],u=Im(c.player),d=a.get(u)??c0();a.set(u,d),DP(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed=o0(f.total_ball_speed,c.ball_speed),f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,n+=1}if(l)for(const c of a.values())c.is_last_half_volley=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_half_volley=!0)}}Dm(o.team_zero.half_volley,s),Dm(o.team_one.half_volley,r);for(const l of o.players)FP(l.half_volley,a.get(Im(l.player_id)))}}}const OP=.75,UP=.78,BP=.75;function Rn(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Fm(t){return[...t].sort((e,n)=>e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:Rn(e.player).localeCompare(Rn(n.player)))}function zP(t){return[...t].sort((e,n)=>e.resolved_frame!==n.resolved_frame?e.resolved_frame-n.resolved_frame:e.resolved_time!==n.resolved_time?e.resolved_time-n.resolved_time:e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:Rn(e.player).localeCompare(Rn(n.player)))}function _u(){return{count:0,highConfidenceCount:0,lastTime:null,lastFrame:null,lastResolvedTime:null,lastResolvedFrame:null,lastQuality:null,bestQuality:0,cumulativeQuality:0,labeledCounts:{entries:[]}}}function fs(t){return Math.fround(t)}function HP(t,e){return fs(fs(t)+fs(e))}function VP(t,e){return{key:"confidence_band",value:t>=e?"high":"standard"}}function GP(t,e){const n=e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key)),i=t.entries.find(a=>a.labels.length===n.length&&a.labels.every((s,r)=>s.key===n[r]?.key&&s.value===n[r]?.value));if(i){i.count+=1;return}t.entries.push({labels:n,count:1}),t.entries.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels)))}function Is(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function gu(t,e,n,i,a){t.count+=1,e.confidence>=a&&(t.highConfidenceCount+=1),GP(t.labeledCounts,[VP(e.confidence,a)]),t.lastTime=e.time,t.lastFrame=e.frame,t.lastResolvedTime=i,t.lastResolvedFrame=n,t.lastQuality=e.confidence,t.bestQuality=Math.max(t.bestQuality,e.confidence),t.cumulativeQuality=HP(t.cumulativeQuality,e.confidence)}function ch(t,e){return t?.lastTime==null?null:t.lastResolvedFrame===e.frame_number?0:Math.max(0,fs(fs(e.time)-fs(t.lastTime)))}function uh(t,e){return t?.lastFrame==null?null:t.lastResolvedFrame===e.frame_number?0:Math.max(0,e.frame_number-t.lastFrame)}function d0(t,e,n,i){t.count=e?.count??0,t.high_confidence_count=e?.highConfidenceCount??0,t.is_last_speed_flip=i,t.last_speed_flip_time=e?.lastTime??null,t.last_speed_flip_frame=e?.lastFrame??null,t.time_since_last_speed_flip=ch(e,n),t.frames_since_last_speed_flip=uh(e,n),t.last_quality=e?.lastQuality??null,t.best_quality=e?.bestQuality??0,t.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?t.labeled_event_counts=Is(e.labeledCounts):delete t.labeled_event_counts}function f0(t,e,n,i){t.count=e?.count??0,t.high_confidence_count=e?.highConfidenceCount??0,t.is_last_half_flip=i,t.last_half_flip_time=e?.lastTime??null,t.last_half_flip_frame=e?.lastFrame??null,t.time_since_last_half_flip=ch(e,n),t.frames_since_last_half_flip=uh(e,n),t.last_quality=e?.lastQuality??null,t.best_quality=e?.bestQuality??0,t.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?t.labeled_event_counts=Is(e.labeledCounts):delete t.labeled_event_counts}function h0(t,e,n,i){t.count=e?.count??0,t.high_confidence_count=e?.highConfidenceCount??0,t.is_last_wavedash=i,t.last_wavedash_time=e?.lastTime??null,t.last_wavedash_frame=e?.lastFrame??null,t.time_since_last_wavedash=ch(e,n),t.frames_since_last_wavedash=uh(e,n),t.last_quality=e?.lastQuality??null,t.best_quality=e?.bestQuality??0,t.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?t.labeled_event_counts=Is(e.labeledCounts):delete t.labeled_event_counts}function $P(t){const e={...t};return t.labeled_event_counts?e.labeled_event_counts=Is(t.labeled_event_counts):delete e.labeled_event_counts,e}function WP(t){const e={...t};return t.labeled_event_counts?e.labeled_event_counts=Is(t.labeled_event_counts):delete e.labeled_event_counts,e}function XP(t){const e={...t};return t.labeled_event_counts?e.labeled_event_counts=Is(t.labeled_event_counts):delete e.labeled_event_counts,e}function YP(t,e){if(e){Object.assign(t,e);return}d0(t,void 0,{frame_number:0,time:0},!1)}function qP(t,e){if(e){Object.assign(t,e);return}f0(t,void 0,{frame_number:0,time:0},!1)}function KP(t,e){if(e){Object.assign(t,e);return}h0(t,void 0,{frame_number:0,time:0},!1)}function jP(t){return t.is_live_play||t.ball_has_been_hit===!1}function ZP(t){const e=p0(t);for(const n of t.frames)e.applyFrame(n);return t}function p0(t){const e=zP(t.events.speed_flip??[]),n=Fm(t.events.half_flip??[]),i=Fm(t.events.wavedash??[]);let a=0,s=0,r=0,o=null,l=null,c=null;const u=new Map,d=new Map,f=new Map,h=new Map,_=new Map,g=new Map;return{applyFrame(m){if(jP(m)){for(;a<e.length&&e[a].resolved_frame<=m.frame_number;){const p=e[a],b=Rn(p.player),w=u.get(b)??_u();u.set(b,w),gu(w,p,p.resolved_frame,p.resolved_time,OP),o=b,a+=1}for(const p of m.players){const b=Rn(p.player_id);d0(p.speed_flip,u.get(b),m,b===o),h.set(b,$P(p.speed_flip))}}else for(const p of m.players){const b=Rn(p.player_id);YP(p.speed_flip,h.get(b))}if(m.is_live_play){for(;s<n.length&&n[s].frame<=m.frame_number;){const p=n[s],b=Rn(p.player),w=d.get(b)??_u();d.set(b,w),gu(w,p,p.frame,p.time,UP),l=b,s+=1}for(;r<i.length&&i[r].frame<=m.frame_number;){const p=i[r],b=Rn(p.player),w=f.get(b)??_u();f.set(b,w),gu(w,p,p.frame,p.time,BP),c=b,r+=1}for(const p of m.players){const b=Rn(p.player_id);f0(p.half_flip,d.get(b),m,b===l),_.set(b,WP(p.half_flip)),h0(p.wavedash,f.get(b),m,b===c),g.set(b,XP(p.wavedash))}}else{for(const p of m.players){const b=Rn(p.player_id);qP(p.half_flip,_.get(b)),KP(p.wavedash,g.get(b))}l=null,c=null}}}}const JP=["boost","slow","supersonic"],QP=["ground","high_air","low_air"];function Fi(t){return Math.fround(t)}function zn(t,e){return Fi(Fi(t)+Fi(e))}function e2(t,e){return Fi(Fi(t)*Fi(e))}function km(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function t2(){return{entries:QP.flatMap(t=>JP.map(e=>({labels:[{key:"height_band",value:t},{key:"speed_band",value:e}],value:0}))).sort((t,e)=>JSON.stringify(t.labels).localeCompare(JSON.stringify(e.labels)))}}function ol(t=!1){return{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:t?t2():{entries:[]}}}function n2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function i2(t){return t.sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function a2(t,e,n){const i=i2(e),a=t.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=zn(a.value,n):(t.entries.push({labels:i,value:Fi(n)}),t.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function s2(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),value:e.value}))}}function Om(t,e){const n=Fi(e.dt);t.tracked_time=zn(t.tracked_time,n),t.total_distance=zn(t.total_distance,e.distance),t.speed_integral=zn(t.speed_integral,e2(e.speed,n)),e.speed_band==="slow"?t.time_slow_speed=zn(t.time_slow_speed,n):e.speed_band==="boost"?t.time_boost_speed=zn(t.time_boost_speed,n):e.speed_band==="supersonic"&&(t.time_supersonic_speed=zn(t.time_supersonic_speed,n)),e.height_band==="ground"?t.time_on_ground=zn(t.time_on_ground,n):e.height_band==="low_air"?t.time_low_air=zn(t.time_low_air,n):e.height_band==="high_air"&&(t.time_high_air=zn(t.time_high_air,n));const i=t.labeled_tracked_time??{entries:[]};t.labeled_tracked_time=i,a2(i,[{key:"speed_band",value:e.speed_band},{key:"height_band",value:e.height_band}],n)}function vu(t,e){const n=e??ol(!0),i=n.labeled_tracked_time;Object.assign(t,n,{labeled_tracked_time:i?s2(i):void 0}),i?.entries.length||delete t.labeled_tracked_time}function r2(t){const e=m0(t);for(const n of t.frames)e.applyFrame(n);return t}function m0(t){const e=n2(t.events.movement??[]);let n=0;const i=new Map,a=ol(),s=ol();return{applyFrame(r){for(;n<e.length&&e[n].frame<=r.frame_number;){const o=e[n],l=km(o.player),c=i.get(l)??ol(!0);i.set(l,c),Om(c,o),Om(o.is_team_0?a:s,o),n+=1}vu(r.team_zero.movement,a),vu(r.team_one.movement,s);for(const o of r.players)vu(o.movement,i.get(km(o.player_id)))}}}const o2=.8;function hs(t){return Math.fround(t)}function l2(t,e){return hs(hs(t)+hs(e))}function _0(t,e){return hs(hs(t)-hs(e))}function Um(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function g0(){return{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function c2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.index-n.index}).map(({event:e})=>e)}function Xd(t){return`${t.key}\0${t.value}`}function Uo(t){return t.map(Xd).join("")}function u2(t,e){e.sort((a,s)=>Xd(a).localeCompare(Xd(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>Uo(a.labels)===Uo(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>Uo(a.labels).localeCompare(Uo(s.labels))))}function Bm(t,e,n){return t.labeled_event_counts?.entries.filter(i=>i.labels.some(a=>a.key===e&&a.value===n)).reduce((i,a)=>i+a.count,0)??0}function d2(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function f2(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function h2(t,e,n,i){t.is_last_musty=i,t.time_since_last_musty=t.last_musty_time==null?null:Math.max(0,_0(n,t.last_musty_time)),t.frames_since_last_musty=t.last_musty_frame==null?null:Math.max(0,e-t.last_musty_frame)}function p2(t,e,n,i){u2(t,[{key:"vertical_state",value:e.aerial?"aerial":"grounded"},{key:"confidence_band",value:e.confidence>=o2?"high":"standard"}]),t.count=d2(t),t.aerial_count=Bm(t,"vertical_state","aerial"),t.high_confidence_count=Bm(t,"confidence_band","high"),t.is_last_musty=!0,t.last_musty_time=e.time,t.last_musty_frame=e.frame,t.time_since_last_musty=Math.max(0,_0(i,e.time)),t.frames_since_last_musty=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=l2(t.cumulative_confidence,e.confidence)}function m2(t,e){Object.assign(t,e??g0()),e?.labeled_event_counts?t.labeled_event_counts=f2(e.labeled_event_counts):delete t.labeled_event_counts}function _2(t){const e=v0(t);for(const n of t.frames)e.applyFrame(n);return t}function v0(t){const e=c2(t.events.musty_flick??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[o,l]of a)h2(l,s.frame_number,s.time,i===o);let r=!1;for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=s.frame_number;){const o=e[n],l=Um(o.player),c=a.get(l)??g0();a.set(l,c),p2(c,o,s.frame_number,s.time),i=l,n+=1,r=!0}if(r)for(const o of a.values())o.is_last_musty=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_musty=!0)}}else i=null;for(const r of s.players)m2(r.musty_flick,a.get(Um(r.player_id)))}}}function zm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function y0(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null}}function g2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function v2(t,e,n,i){t.is_last_one_timer=i,t.time_since_last_one_timer=t.last_one_timer_time==null?null:Math.max(0,n-t.last_one_timer_time),t.frames_since_last_one_timer=t.last_one_timer_frame==null?null:Math.max(0,e-t.last_one_timer_frame)}function y2(t,e,n,i){t.count+=1,t.total_ball_speed+=e.ball_speed,t.fastest_ball_speed=Math.max(t.fastest_ball_speed,e.ball_speed),t.total_pass_distance+=e.pass_travel_distance,t.last_one_timer_time=e.time,t.last_one_timer_frame=e.frame,t.time_since_last_one_timer=Math.max(0,i-e.time),t.frames_since_last_one_timer=Math.max(0,n-e.frame)}function b2(t,e){Object.assign(t,e??y0())}function Hm(t,e){Object.assign(t,e)}function x2(t){const e=b0(t);for(const n of t.frames)e.applyFrame(n);return t}function b0(t){const e=g2(t.events.one_timer??[]);let n=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)v2(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=zm(c.player),d=a.get(u)??y0();a.set(u,d),y2(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed+=c.ball_speed,f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,n+=1}if(l)for(const c of a.values())c.is_last_one_timer=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_one_timer=!0)}}Hm(o.team_zero.one_timer,s),Hm(o.team_one.one_timer,r);for(const l of o.players)b2(l.one_timer,a.get(zm(l.player_id)))}}}function Bo(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Yd(){return{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null}}function S2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.index-n.index}).map(({event:e})=>e)}function w2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function E2(t,e,n,i){t.is_last_completed_pass=i,t.time_since_last_completed_pass=t.last_completed_pass_time==null?null:Math.max(0,n-t.last_completed_pass_time),t.frames_since_last_completed_pass=t.last_completed_pass_frame==null?null:Math.max(0,e-t.last_completed_pass_frame)}function M2(t,e,n,i){t.completed_pass_count+=1,t.total_pass_distance+=e.ball_travel_distance,t.total_pass_advance+=e.ball_advance_distance,t.longest_pass_distance=Math.max(t.longest_pass_distance,e.ball_travel_distance),t.last_completed_pass_time=e.time,t.last_completed_pass_frame=e.frame,t.time_since_last_completed_pass=Math.max(0,i-e.time),t.frames_since_last_completed_pass=Math.max(0,n-e.frame)}function T2(t,e){Object.assign(t,e??Yd())}function Vm(t,e){Object.assign(t,e)}function A2(t){const e=x0(t);for(const n of t.frames)e.applyFrame(n);return t}function x0(t){const e=S2(t.events.pass??[]),n=w2(t.events.pass_last_completed??[]),i=n.length>0;let a=0,s=0,r=null;const o=new Map,l={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},c={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0};return{applyFrame(u){for(const[f,h]of o)E2(h,u.frame_number,u.time,u.is_live_play&&f===r);if(!u.is_live_play)r=null;else{let f=!1;for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=u.frame_number;){const h=e[a],_=Bo(h.passer),g=o.get(_)??Yd();o.set(_,g),M2(g,h,u.frame_number,u.time);const m=Bo(h.receiver),p=o.get(m)??Yd();o.set(m,p),p.received_pass_count+=1;const b=h.is_team_0?l:c;b.completed_pass_count+=1,b.total_pass_distance+=h.ball_travel_distance,b.total_pass_advance+=h.ball_advance_distance,b.longest_pass_distance=Math.max(b.longest_pass_distance,h.ball_travel_distance),r=_,f=!0,a+=1}if(!i&&f)for(const h of o.values())h.is_last_completed_pass=!1;if(!i&&r!=null){const h=o.get(r);h&&(h.is_last_completed_pass=!0)}}let d=!1;for(;s<n.length&&n[s].frame<=u.frame_number;){const f=n[s];r=f.player==null?null:Bo(f.player),s+=1,d=!0}if(d){for(const f of o.values())f.is_last_completed_pass=!1;if(r!=null){const f=o.get(r);f&&(f.is_last_completed_pass=!0)}}Vm(u.team_zero.pass,l),Vm(u.team_one.pass,c);for(const f of u.players)T2(f.pass,o.get(Bo(f.player_id)))}}}function fr(t){return Math.fround(t)}function Js(t,e){return fr(fr(t)+fr(e))}function C2(){return{tracked_time:0,team_zero_time:0,team_one_time:0,neutral_time:0,labeled_time:{entries:[]}}}function R2(){return{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}}}function P2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function L2(t){return t.sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function S0(t,e,n){const i=L2(e),a=t.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=Js(a.value,n):(t.entries.push({labels:i,value:fr(n)}),t.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function N2(t,e){return t.key==="possession_state"&&t.value==="team_zero"?{key:"possession_state",value:e?"own":"opponent"}:t.key==="possession_state"&&t.value==="team_one"?{key:"possession_state",value:e?"opponent":"own"}:t.key==="field_third"&&t.value==="team_zero_third"?{key:"field_third",value:e?"defensive_third":"offensive_third"}:t.key==="field_third"&&t.value==="team_one_third"?{key:"field_third",value:e?"offensive_third":"defensive_third"}:{...t}}function Gm(t,e){const n={entries:[]};for(const i of t.labeled_time.entries)S0(n,i.labels.map(a=>N2(a,e)),i.value);return{tracked_time:t.tracked_time,possession_time:e?t.team_zero_time:t.team_one_time,opponent_possession_time:e?t.team_one_time:t.team_zero_time,neutral_time:t.neutral_time,labeled_time:n}}function I2(t,e){t.active=e.active,t.possessionState=e.possession_state,t.fieldThird=e.field_third??null}function D2(t,e,n){if(!e.active)return;const i=fr(n.dt);t.tracked_time=Js(t.tracked_time,i),e.possessionState==="team_zero"?t.team_zero_time=Js(t.team_zero_time,i):e.possessionState==="team_one"?t.team_one_time=Js(t.team_one_time,i):t.neutral_time=Js(t.neutral_time,i);const a=[{key:"possession_state",value:e.possessionState}];e.fieldThird!=null&&a.push({key:"field_third",value:e.fieldThird}),S0(t.labeled_time,a,i)}function $m(t,e){Object.assign(t,e??R2())}function F2(t){const e=w0(t);for(const n of t.frames)e.applyFrame(n);return t}function w0(t){const e=P2(t.events.possession??[]);let n=0;const i=C2(),a={active:!1,possessionState:"neutral",fieldThird:null};return{applyFrame(s){for(;n<e.length&&e[n].frame<=s.frame_number;)I2(a,e[n]),n+=1;D2(i,a,s),$m(s.team_zero.possession,Gm(i,!0)),$m(s.team_one.possession,Gm(i,!1))}}}const k2=["active_game_time","tracked_time","sum_distance_to_teammates","sum_distance_to_ball","sum_distance_to_ball_has_possession","time_has_possession","sum_distance_to_ball_no_possession","time_no_possession","time_demolished","time_no_teammates","time_most_back","time_most_forward","time_mid_role","time_other_role","time_defensive_third","time_neutral_third","time_offensive_third","time_defensive_half","time_offensive_half","time_closest_to_ball","time_farthest_from_ball","time_behind_ball","time_level_with_ball","time_in_front_of_ball"];function O2(t,e){return Math.fround(Math.fround(t)+Math.fround(e))}function Wm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function E0(){return{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0}}function U2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function B2(t,e){for(const n of k2)t[n]=O2(t[n],e[n]);t.times_caught_ahead_of_play_on_conceded_goals+=e.times_caught_ahead_of_play_on_conceded_goals}function z2(t,e){Object.assign(t,e??E0())}function H2(t){const e=M0(t);for(const n of t.frames)e.applyFrame(n);return t}function M0(t){const e=U2(t.events.positioning??[]);let n=0;const i=new Map;return{applyFrame(a){for(;n<e.length&&e[n].frame<=a.frame_number;){const s=e[n],r=Wm(s.player),o=i.get(r)??E0();i.set(r,o),B2(o,s),n+=1}for(const s of a.players)z2(s.positioning,i.get(Wm(s.player_id)))}}}function yu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Qs(){return{total_duration:0,press_count:0}}function V2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function G2(t){return t.gameplay_phase==="active_play"||t.gameplay_phase==="kickoff_waiting_for_touch"}function bu(t,e){Object.assign(t,e??Qs())}function $2(t){const e=T0(t);for(const n of t.frames)e.applyFrame(n);return t}function T0(t){const e=V2(t.events.powerslide??[]);let n=0;const i=new Map,a=new Map,s=Qs(),r=Qs();return{applyFrame(o){const l=G2(o);for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=yu(c.player),d=i.get(u)?.active??!1;if(i.set(u,{active:c.active,isTeamZero:c.is_team_0}),l&&c.active&&!d){const f=a.get(u)??Qs();a.set(u,f),f.press_count+=1;const h=c.is_team_0?s:r;h.press_count+=1}n+=1}if(l)for(const c of o.players){const u=yu(c.player_id);if(!i.get(u)?.active)continue;const f=a.get(u)??Qs();a.set(u,f),f.total_duration+=o.dt;const h=c.is_team_0?s:r;h.total_duration+=o.dt}bu(o.team_zero.powerslide,s),bu(o.team_one.powerslide,r);for(const c of o.players)bu(c.powerslide,a.get(yu(c.player_id)))}}}function hr(t){return Math.fround(t)}function er(t,e){return hr(hr(t)+hr(e))}function W2(){return{tracked_time:0,team_zero_side_time:0,team_one_side_time:0,neutral_time:0,labeled_time:{entries:[]}}}function X2(){return{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}}}function Y2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function q2(t){return t.sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function A0(t,e,n){const i=q2(e),a=t.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=er(a.value,n):(t.entries.push({labels:i,value:hr(n)}),t.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function K2(t,e){return t.key==="field_half"&&t.value==="team_zero_side"?{key:"field_half",value:e?"defensive_half":"offensive_half"}:t.key==="field_half"&&t.value==="team_one_side"?{key:"field_half",value:e?"offensive_half":"defensive_half"}:{...t}}function Xm(t,e){const n={entries:[]};for(const i of t.labeled_time.entries)A0(n,i.labels.map(a=>K2(a,e)),i.value);return{tracked_time:t.tracked_time,defensive_half_time:e?t.team_zero_side_time:t.team_one_side_time,offensive_half_time:e?t.team_one_side_time:t.team_zero_side_time,neutral_time:t.neutral_time,labeled_time:n}}function j2(t,e){t.active=e.active,t.fieldHalf=e.field_half}function Z2(t,e,n){if(!e.active)return;const i=hr(n.dt);t.tracked_time=er(t.tracked_time,i),e.fieldHalf==="team_zero_side"?t.team_zero_side_time=er(t.team_zero_side_time,i):e.fieldHalf==="team_one_side"?t.team_one_side_time=er(t.team_one_side_time,i):t.neutral_time=er(t.neutral_time,i),A0(t.labeled_time,[{key:"field_half",value:e.fieldHalf}],i)}function Ym(t,e){Object.assign(t,e??X2())}function J2(t){const e=C0(t);for(const n of t.frames)e.applyFrame(n);return t}function C0(t){const e=Y2(t.events.pressure??[]);let n=0;const i=W2(),a={active:!1,fieldHalf:"neutral"};return{applyFrame(s){for(;n<e.length&&e[n].frame<=s.frame_number;)j2(a,e[n]),n+=1;Z2(i,a,s),Ym(s.team_zero.pressure,Xm(i,!0)),Ym(s.team_one.pressure,Xm(i,!1))}}}function ll(t){return Math.fround(t)}function zo(t,e){return ll(ll(t)+ll(e))}function qm(){return{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0}}function Q2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.end_frame!==n.event.end_frame?e.event.end_frame-n.event.end_frame:e.event.end_time!==n.event.end_time?e.event.end_time-n.event.end_time:e.index-n.index).map(({event:e})=>e)}function eL(t,e,n){t.session_count+=1,t.session_time=zo(t.session_time,n.duration),t.offensive_half_time=zo(t.offensive_half_time,n.offensive_half_time),t.offensive_third_time=zo(t.offensive_third_time,n.offensive_third_time),t.longest_session_time=Math.max(t.longest_session_time,n.duration),t.average_session_time=t.session_count===0?0:ll(t.session_time/t.session_count),e.opponent_session_count+=1,e.opponent_session_time=zo(e.opponent_session_time,n.duration),e.opponent_longest_session_time=Math.max(e.opponent_longest_session_time,n.duration)}function Km(t,e){Object.assign(t,e)}function tL(t){const e=R0(t);for(const n of t.frames)e.applyFrame(n);return t}function R0(t){const e=Q2(t.events.territorial_pressure??[]);let n=0;const i=qm(),a=qm();return{applyFrame(s){for(;n<e.length&&s.frame_number>=e[n].end_frame;){const r=e[n];eL(r.team_is_team_0?i:a,r.team_is_team_0?a:i,r),n+=1}Km(s.team_zero.territorial_pressure,i),Km(s.team_one.territorial_pressure,a)}}}function An(t,e){return Math.fround(Math.fround(t)+Math.fround(e))}function jm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function P0(){return{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"}}function Zm(){return{first_man_changes_for_team:0,rotation_count:0}}function Jm(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function nL(t,e){t.active=e.active,e.active||(t.firstManStintActive=!1,t.currentFirstManStintTime=0,t.nonFirstManSeconds=0);const n=t.stats;n.became_first_man_count+=e.became_first_man_count,n.lost_first_man_count+=e.lost_first_man_count,n.current_role_state=e.current_role_state,n.current_depth_state=e.current_depth_state}function iL(t,e,n){if(!t.active)return;const i=t.stats;switch(i.active_game_time=An(i.active_game_time,e.dt),i.tracked_time=An(i.tracked_time,e.dt),i.current_role_state){case"first_man":t.firstManStintActive||(t.firstManStintActive=!0,t.currentFirstManStintTime=0,i.first_man_stint_count+=1),t.currentFirstManStintTime=An(t.currentFirstManStintTime,e.dt),i.longest_first_man_stint_time=Math.max(i.longest_first_man_stint_time,t.currentFirstManStintTime),t.nonFirstManSeconds=0,i.time_first_man=An(i.time_first_man,e.dt);break;case"second_man":Ho(t,e,n),i.time_second_man=An(i.time_second_man,e.dt);break;case"third_man":Ho(t,e,n),i.time_third_man=An(i.time_third_man,e.dt);break;case"ambiguous":Ho(t,e,n),i.time_ambiguous_role=An(i.time_ambiguous_role,e.dt);break;default:Ho(t,e,n);break}switch(i.current_depth_state){case"behind_play":i.time_behind_play=An(i.time_behind_play,e.dt);break;case"level_with_play":i.time_level_with_play=An(i.time_level_with_play,e.dt);break;case"ahead_of_play":i.time_ahead_of_play=An(i.time_ahead_of_play,e.dt);break}}function Ho(t,e,n){t.firstManStintActive&&(t.nonFirstManSeconds=An(t.nonFirstManSeconds,e.dt),t.nonFirstManSeconds>n&&(t.firstManStintActive=!1,t.currentFirstManStintTime=0,t.nonFirstManSeconds=0))}function aL(t,e){t.first_man_changes_for_team+=e.first_man_changes_for_team,t.rotation_count+=e.rotation_count}function sL(t,e){Object.assign(t,e??P0())}function Qm(t,e){Object.assign(t,e)}function rL(t){const e=L0(t);for(const n of t.frames)e.applyFrame(n);return t}function L0(t){const e=Jm(t.events.rotation_player??[]),n=Jm(t.events.rotation_team??[]),i=t.config.rotation_first_man_debounce_seconds;let a=0,s=0;const r=new Map,o=Zm(),l=Zm();return{applyFrame(c){for(;a<e.length&&e[a].frame<=c.frame_number;){const u=e[a],d=jm(u.player),f=r.get(d)??{active:!1,firstManStintActive:!1,currentFirstManStintTime:0,nonFirstManSeconds:0,stats:P0()};r.set(d,f),nL(f,u),a+=1}for(;s<n.length&&n[s].frame<=c.frame_number;){const u=n[s];aL(u.is_team_0?o:l,u),s+=1}Qm(c.team_zero.rotation,o),Qm(c.team_one.rotation,l);for(const u of c.players){const d=r.get(jm(u.player_id));d&&iL(d,c,i),sL(u.rotation,d?.stats)}}}}function e_(){return{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0}}function oL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.start_frame!==n.event.start_frame?e.event.start_frame-n.event.start_frame:e.event.start_time!==n.event.start_time?e.event.start_time-n.event.start_time:e.event.end_frame!==n.event.end_frame?e.event.end_frame-n.event.end_frame:e.index-n.index).map(({event:e})=>e)}function lL(t,e){t.count+=1,e.attackers===2&&e.defenders===1?t.two_v_one_count+=1:e.attackers===2&&e.defenders===2?t.two_v_two_count+=1:e.attackers===2&&e.defenders===3?t.two_v_three_count+=1:e.attackers===3&&e.defenders===1?t.three_v_one_count+=1:e.attackers===3&&e.defenders===2?t.three_v_two_count+=1:e.attackers===3&&e.defenders===3&&(t.three_v_three_count+=1)}function t_(t,e){Object.assign(t,e)}function cL(t){const e=N0(t);for(const n of t.frames)e.applyFrame(n);return t}function N0(t){const e=oL(t.events.rush??[]);let n=0;const i=e_(),a=e_(),s=t.config.rush_min_possession_retained_seconds;return{applyFrame(r){for(;n<e.length&&r.frame_number>=e[n].start_frame&&r.time-e[n].start_time>=s;){const o=e[n];lL(o.is_team_0?i:a,o),n+=1}t_(r.team_zero.rush,i),t_(r.team_one.rush,a)}}}const uL=["control","hard_hit","medium_hit"],dL=["ground","high_air","low_air"],fL=["air","ground","wall"],hL=["dodge","no_dodge"];function ps(t){return Math.fround(t)}function cl(t,e){return ps(ps(t)+ps(e))}function I0(t,e){return ps(ps(t)-ps(e))}function Vo(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function pL(){return{entries:hL.flatMap(t=>dL.flatMap(e=>uL.flatMap(n=>fL.map(i=>({labels:[{key:"dodge_state",value:t},{key:"height_band",value:e},{key:"kind",value:n},{key:"surface",value:i}],count:0}))))).sort((t,e)=>JSON.stringify(t.labels).localeCompare(JSON.stringify(e.labels)))}}function D0(){return{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:pL()}}const mL=D0();function n_(){return{stats:D0(),labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function i_(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function _L(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function gL(t,e){e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key));const n=t.labeled_touch_counts?.entries??[];t.labeled_touch_counts={entries:n};const i=n.find(a=>a.labels.length===e.length&&a.labels.every((s,r)=>s.key===e[r]?.key&&s.value===e[r]?.value));i?i.count+=1:(n.push({labels:e,count:1}),n.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels))))}function vL(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function yL(t,e,n){const i=t.stats;i.touch_count+=1,e.kind==="control"?i.control_touch_count+=1:e.kind==="medium_hit"?i.medium_hit_count+=1:e.kind==="hard_hit"&&(i.hard_hit_count+=1),e.height_band==="low_air"?i.aerial_touch_count+=1:e.height_band==="high_air"&&(i.aerial_touch_count+=1,i.high_aerial_touch_count+=1),e.surface==="wall"&&(i.wall_touch_count+=1),gL(i,[{key:"kind",value:e.kind},{key:"height_band",value:e.height_band},{key:"surface",value:e.surface},{key:"dodge_state",value:e.dodge_state}]),t.labeledCountsVersion+=1,i.last_touch_time=e.time,i.last_touch_frame=e.frame,i.time_since_last_touch=Math.max(0,I0(n.time,e.time)),i.frames_since_last_touch=Math.max(0,n.frame_number-e.frame),i.last_ball_speed_change=e.ball_speed_change,i.max_ball_speed_change=Math.max(i.max_ball_speed_change,e.ball_speed_change),i.cumulative_ball_speed_change=cl(i.cumulative_ball_speed_change,e.ball_speed_change)}function bL(t){return t.labeledCountsSnapshotVersion!==t.labeledCountsVersion&&(t.labeledCountsSnapshot=t.stats.labeled_touch_counts?vL(t.stats.labeled_touch_counts):void 0,t.labeledCountsSnapshotVersion=t.labeledCountsVersion),t.labeledCountsSnapshot}function xL(t,e){if(!e){Object.assign(t,mL);return}Object.assign(t,e.stats,{labeled_touch_counts:bL(e)})}function SL(t){const e=F0(t);for(const n of t.frames)e.applyFrame(n);return t}function F0(t){const e=i_(t.events.touch??[]),n=i_(t.events.touch_last_touch??[]),i=_L(t.events.touch_ball_movement??[]);let a=0,s=0,r=0,o=null;const l=new Map;return{applyFrame(c){if(!c.is_live_play)o=null;else{for(const u of l.values()){const d=u.stats;d.is_last_touch=!1,d.last_touch_time!=null&&(d.time_since_last_touch=Math.max(0,I0(c.time,d.last_touch_time))),d.last_touch_frame!=null&&(d.frames_since_last_touch=Math.max(0,c.frame_number-d.last_touch_frame))}for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=c.frame_number;){const u=e[a],d=Vo(u.player),f=l.get(d)??n_();l.set(d,f),yL(f,u,c),a+=1}for(;s<n.length&&(n[s].sample_frame??n[s].frame)<=c.frame_number;){const u=n[s];o=u.player==null?null:Vo(u.player),s+=1}if(o!=null){const u=l.get(o);u&&(u.stats.is_last_touch=!0)}}for(;r<i.length&&i[r].frame<=c.frame_number;){const u=i[r],d=Vo(u.player),f=l.get(d)??n_();l.set(d,f);const h=f.stats;h.total_ball_travel_distance=cl(h.total_ball_travel_distance,u.travel_distance),h.total_ball_advance_distance=cl(h.total_ball_advance_distance,u.advance_distance),h.total_ball_retreat_distance=cl(h.total_ball_retreat_distance,u.retreat_distance),r+=1}for(const u of c.players)xL(u.touch,l.get(Vo(u.player_id)))}}}function xu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function qd(){return{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0}}function wL(t){return{...t}}function EL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.resolved_frame!==n.event.resolved_frame?e.event.resolved_frame-n.event.resolved_frame:e.event.resolved_time!==n.event.resolved_time?e.event.resolved_time-n.event.resolved_time:e.index-n.index).map(({event:e})=>e)}function ML(t,e,n){t.is_last_whiff=!1,t.time_since_last_whiff=t.last_whiff_time==null?null:Math.max(0,n-t.last_whiff_time),t.frames_since_last_whiff=t.last_whiff_frame==null?null:Math.max(0,e-t.last_whiff_frame)}function TL(t,e,n,i){if((e.kind??"whiff")==="beaten_to_ball"){t.beaten_to_ball_count+=1;return}t.whiff_count+=1,e.aerial?t.aerial_whiff_count+=1:t.grounded_whiff_count+=1,e.dodge_active&&(t.dodge_whiff_count+=1),t.is_last_whiff=!0,t.last_whiff_time=e.time,t.last_whiff_frame=e.frame,t.time_since_last_whiff=Math.max(0,i-e.time),t.frames_since_last_whiff=Math.max(0,n-e.frame),t.last_closest_approach_distance=e.closest_approach_distance,t.best_closest_approach_distance=t.best_closest_approach_distance==null?e.closest_approach_distance:Math.min(t.best_closest_approach_distance,e.closest_approach_distance),t.cumulative_closest_approach_distance+=e.closest_approach_distance}function a_(t,e){Object.assign(t,e??qd())}function AL(t){const e=k0(t);for(const n of t.frames)e.applyFrame(n);return t}function k0(t){const e=EL(t.events.whiff??[]);let n=0,i=null;const a=new Map,s=new Map;return{applyFrame(r){if(r.is_live_play){for(const o of a.values())ML(o,r.frame_number,r.time);for(;n<e.length&&e[n].resolved_frame<=r.frame_number;){const o=e[n],l=xu(o.player),c=a.get(l)??qd();a.set(l,c),TL(c,o,r.frame_number,r.time),(o.kind??"whiff")==="whiff"&&(i=l),n+=1}if(i!=null){const o=a.get(i);o&&(o.is_last_whiff=!0)}for(const o of r.players){const l=xu(o.player_id),c=a.get(l);a_(o.whiff,c),s.set(l,wL(c??qd()))}}else{for(const o of r.players){const l=xu(o.player_id);a_(o.whiff,s.get(l))}i=null}}}}const CL=.78;function ms(t){return Math.fround(t)}function Go(t,e){return ms(ms(t)+ms(e))}function O0(t,e){return ms(ms(t)-ms(e))}function s_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function U0(){return{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0}}function RL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function PL(t,e,n,i){t.is_last_wall_aerial=i,t.time_since_last_wall_aerial=t.last_wall_aerial_time==null?null:Math.max(0,O0(n,t.last_wall_aerial_time)),t.frames_since_last_wall_aerial=t.last_wall_aerial_frame==null?null:Math.max(0,e-t.last_wall_aerial_frame)}function LL(t,e,n,i){t.count+=1,e.confidence>=CL&&(t.high_confidence_count+=1),t.is_last_wall_aerial=!0,t.last_wall_aerial_time=e.time,t.last_wall_aerial_frame=e.frame,t.time_since_last_wall_aerial=Math.max(0,O0(i,e.time)),t.frames_since_last_wall_aerial=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=Go(t.cumulative_confidence,e.confidence),t.cumulative_setup_duration=Go(t.cumulative_setup_duration,e.setup_duration),t.cumulative_takeoff_to_touch_time=Go(t.cumulative_takeoff_to_touch_time,e.time_since_takeoff),t.cumulative_touch_height=Go(t.cumulative_touch_height,e.player_position[2]??0)}function NL(t,e){Object.assign(t,e??U0())}function IL(t){const e=B0(t);for(const n of t.frames)e.applyFrame(n);return t}function B0(t){const e=RL(t.events.wall_aerial??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)PL(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=s.frame_number;){const r=e[n],o=s_(r.player),l=a.get(o)??U0();a.set(o,l),LL(l,r,s.frame_number,s.time),i=o,n+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_wall_aerial=!0)}}for(const r of s.players)NL(r.wall_aerial,a.get(s_(r.player_id)))}}}const DL=.78;function _s(t){return Math.fround(t)}function Su(t,e){return _s(_s(t)+_s(e))}function z0(t,e){return _s(_s(t)-_s(e))}function r_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function H0(){return{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0}}function FL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function kL(t,e,n,i){t.is_last_wall_aerial_shot=i,t.time_since_last_wall_aerial_shot=t.last_wall_aerial_shot_time==null?null:Math.max(0,z0(n,t.last_wall_aerial_shot_time)),t.frames_since_last_wall_aerial_shot=t.last_wall_aerial_shot_frame==null?null:Math.max(0,e-t.last_wall_aerial_shot_frame)}function OL(t,e,n,i){t.count+=1,e.confidence>=DL&&(t.high_confidence_count+=1),t.is_last_wall_aerial_shot=!0,t.last_wall_aerial_shot_time=e.time,t.last_wall_aerial_shot_frame=e.frame,t.time_since_last_wall_aerial_shot=Math.max(0,z0(i,e.time)),t.frames_since_last_wall_aerial_shot=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=Su(t.cumulative_confidence,e.confidence),t.cumulative_takeoff_to_shot_time=Su(t.cumulative_takeoff_to_shot_time,e.time_since_takeoff),t.cumulative_shot_height=Su(t.cumulative_shot_height,e.player_position[2]??0)}function UL(t,e){Object.assign(t,e??H0())}function BL(t){const e=V0(t);for(const n of t.frames)e.applyFrame(n);return t}function V0(t){const e=FL(t.events.wall_aerial_shot??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)kL(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{let r=!1;for(;n<e.length&&e[n].frame<=s.frame_number;){const o=e[n],l=r_(o.player),c=a.get(l)??H0();a.set(l,c),OL(c,o,s.frame_number,s.time),i=l,r=!0,n+=1}if(r)for(const o of a.values())o.is_last_wall_aerial_shot=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_wall_aerial_shot=!0)}}for(const r of s.players)UL(r.wall_aerial_shot,a.get(r_(r.player_id)))}}}function dh(t,e){if(!e)return t;const n={...t};for(const[i,a]of Object.entries(e)){if(i==="player_id"){n[i]=a;continue}if(Array.isArray(a)){n[i]=a;continue}const s=n[i];if(a&&typeof a=="object"&&s&&typeof s=="object"&&!Array.isArray(s)){n[i]=dh(s,a);continue}n[i]=a}return n}function Lr(t){return dh({event_counts:ls(),fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},territorial_pressure:{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}},t)}function G0(t){return dh({event_counts:ls(),player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},wall_aerial:{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0},wall_aerial_shot:{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:Lr().boost,movement:Lr().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}},t)}const zL=300,HL=1200,VL=2,GL=[{id:"event-counts",playerModules:["event_counts"],teamModules:["event_counts"],apply:Nv,createFrameAccumulator:Iv},{id:"boost-ledger",playerModules:["boost"],teamModules:["boost"],apply:zR,createFrameAccumulator:Wv},{id:"core",playerModules:["core"],teamModules:["core"],apply:eP,createFrameAccumulator:jv},{id:"possession",playerModules:[],teamModules:["possession"],apply:F2,createFrameAccumulator:w0},{id:"pressure",playerModules:[],teamModules:["pressure"],apply:J2,createFrameAccumulator:C0},{id:"territorial-pressure",playerModules:[],teamModules:["territorial_pressure"],apply:tL,createFrameAccumulator:R0},{id:"movement",playerModules:["movement"],teamModules:["movement"],apply:r2,createFrameAccumulator:m0},{id:"positioning",playerModules:["positioning"],teamModules:[],apply:H2,createFrameAccumulator:M0},{id:"rotation",playerModules:["rotation"],teamModules:["rotation"],apply:rL,createFrameAccumulator:L0},{id:"mechanics",playerModules:["speed_flip","half_flip","wavedash"],teamModules:[],apply:ZP,createFrameAccumulator:p0},{id:"whiff",playerModules:["whiff"],teamModules:[],apply:AL,createFrameAccumulator:k0},{id:"backboard",playerModules:["backboard"],teamModules:["backboard"],apply:_R,createFrameAccumulator:Fv},{id:"double-tap",playerModules:["double_tap"],teamModules:["double_tap"],apply:cP,createFrameAccumulator:e0},{id:"demo",playerModules:["demo"],teamModules:["demo"],apply:fP,createFrameAccumulator:n0},{id:"fifty-fifty",playerModules:["fifty_fifty"],teamModules:["fifty_fifty"],apply:xP,createFrameAccumulator:i0},{id:"bump",playerModules:["bump"],teamModules:["bump"],apply:ER,createFrameAccumulator:zv},{id:"rush",playerModules:[],teamModules:["rush"],apply:cL,createFrameAccumulator:N0},{id:"pass",playerModules:["pass"],teamModules:["pass"],apply:A2,createFrameAccumulator:x0},{id:"one-timer",playerModules:["one_timer"],teamModules:["one_timer"],apply:x2,createFrameAccumulator:b0},{id:"ball-carry",playerModules:["ball_carry","air_dribble"],teamModules:["ball_carry","air_dribble"],apply:vR,createFrameAccumulator:Bv},{id:"wall-aerial",playerModules:["wall_aerial"],teamModules:[],apply:IL,createFrameAccumulator:B0},{id:"wall-aerial-shot",playerModules:["wall_aerial_shot"],teamModules:[],apply:BL,createFrameAccumulator:V0},{id:"flick",playerModules:["flick"],teamModules:[],apply:LP,createFrameAccumulator:r0},{id:"ceiling-shot",playerModules:["ceiling_shot"],teamModules:[],apply:ZR,createFrameAccumulator:qv},{id:"musty-flick",playerModules:["musty_flick"],teamModules:[],apply:_2,createFrameAccumulator:v0},{id:"dodge-reset",playerModules:["dodge_reset"],teamModules:[],apply:aP,createFrameAccumulator:Jv},{id:"powerslide",playerModules:["powerslide"],teamModules:["powerslide"],apply:$2,createFrameAccumulator:T0},{id:"touch",playerModules:["touch"],teamModules:[],apply:SL,createFrameAccumulator:F0},{id:"half-volley",playerModules:["half_volley"],teamModules:["half_volley"],apply:kP,createFrameAccumulator:u0}];function $L(t,e,n={}){const i=t.frames,a=new Map(i.map((h,_)=>[h.frame_number,_])),s=new Map,r={...t,frames:[]},o=GL.flatMap(h=>h.createFrameAccumulator?[h.createFrameAccumulator(r)]:[]),l=Math.max(1,n.materializationChunkSize??zL),c=Math.max(l,n.maxMaterializationChunkSize??HL);let u=-1,d=l;const f=h=>{if(h<=u)return;const _=Math.min(i.length-1,Math.max(h,u+d));for(let g=u+1;g<=_;g+=1){const m=i[g],p=m?YL(XL(m)):void 0;if(p){for(const b of o)b.applyFrame(p);s.set(p.frame_number,p)}}u=_,d=Math.min(c,i.length,d*VL)};return{get(h){const _=a.get(h);if(_!==void 0)return f(_),s.get(h)}}}function WL(t){return!t||typeof t!="object"?t:{...t}}function XL(t){return{...t,team_zero:{...t.team_zero},team_one:{...t.team_one},players:t.players.map(e=>({...e,player_id:WL(e.player_id)}))}}function YL(t){return{...t,team_zero:Lr(t.team_zero??{}),team_one:Lr(t.team_one??{}),players:t.players.map(n=>G0(n))}}const qL=new Set(["is_team_0","name","player_id"]);function o_(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&Object.keys(t).length===0}function KL(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Object.keys(t).every(e=>qL.has(e))}function jL(t){return o_(t.team_zero)&&o_(t.team_one)&&t.players.every(e=>KL(e))}function ZL(t){return new Map(Nv(t).frames.map(e=>[e.frame_number,e]))}function JL(t,e,n){const i=t.frames.filter(a=>jL(a)).length;if(i===t.frames.length)return $L(t,e,n);if(i>0)throw new Error("stats timeline frames must be either all compact scaffolds or all materialized snapshots");return ZL(t)}function St(t,e){return t.get(e)??null}const fh=[{stage:"validating",index:1,total:9,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:9,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:9,label:"Build stats events",start:.62,end:.7},{stage:"serializing-replay",index:4,total:9,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:9,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:9,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:9,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:9,label:"Decode stats chunks",start:.94,end:.96},{stage:"deriving-stats",index:9,total:9,label:"Derive stats snapshots",start:.96,end:1}];function $0(t){return Math.max(0,Math.min(1,t))}function wu(t,e,n){if(t!==void 0)return $0((t-e)/(n-e))}function hh(t){if(t.stage!=="stats-timeline")return t;const e=t.progress;return e===void 0?{...t,stage:"building-stats"}:e<.35?{...t,stage:"building-stats",progress:wu(e,0,.35)}:e<.55?{...t,stage:"serializing-replay",progress:wu(e,.35,.55)}:{...t,stage:"serializing-stats",progress:wu(e,.55,.92)}}function W0(t){const e=hh(t);return fh.find(n=>n.stage===e.stage)}function QL(){return fh.map(({stage:t,index:e,total:n,label:i})=>({stage:t,index:e,total:n,label:i}))}function eN(t){const e=W0(t);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function tN(t){const e=hh(t),n=W0(e);return fh.map(({stage:i,index:a,total:s,label:r})=>{if(a<n.index)return{stage:i,index:a,total:s,label:r,state:"complete",completion:1,indeterminate:!1};if(a>n.index)return{stage:i,index:a,total:s,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:a,total:s,label:r,state:"active",completion:o?$0(e.progress??0):1,indeterminate:!o}})}function ac(t){const e=hh(t),n=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return n!==null&&e.totalFrames!==void 0?`Processing replay frames... ${n}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return n!==null?e.totalFrames!==void 0?`Building stats events... ${n}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats events... ${n}%`:"Building stats events...";case"serializing-replay":return n!==null?`Serializing replay data... ${n}%`:"Serializing replay data...";case"serializing-stats":return n!==null?`Serializing stats timeline... ${n}%`:"Serializing stats timeline...";case"decoding-replay":return n!==null?`Decoding replay data... ${n}%`:"Decoding replay data...";case"decoding-stats":return n!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${n}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${n}%`:"Decoding stats chunks...";case"deriving-stats":return n!==null?`Deriving stats snapshots... ${n}%`:"Deriving stats snapshots...";case"normalizing":return n!==null?`Normalizing replay model... ${n}%`:"Normalizing replay model...";default:return"Loading replay..."}}function tr(t,e){return JSON.parse(t.decode(new Uint8Array(e)))}async function nN(t,e,n){n?.({stage:"decoding-stats",progress:0});const i=tr(t,e.configBuffer);n?.({stage:"decoding-stats",progress:.05}),await ts();const a=tr(t,e.replayMetaBuffer);n?.({stage:"decoding-stats",progress:.1}),await ts();const s=tr(t,e.eventsBuffer);n?.({stage:"decoding-stats",progress:.15}),await ts();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...tr(t,c)),n?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await ts()}return o===0&&n?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:a,events:s,frames:r}}function ts(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(t=>requestAnimationFrame(()=>t()))}async function X0(t,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const n=new Worker(new URL(""+new URL("replayLoader.worker-4Lxy11fY.js",import.meta.url).href,import.meta.url),{type:"module"}),i=t.slice(),a=e.reportEveryNFrames??100;return new Promise((s,r)=>{const o=()=>{n.terminate()};n.onmessage=async c=>{const u=c.data;if(u.type==="progress"){e.onProgress?.(u.progress);return}if(u.type==="error"){o(),r(new Error(u.error));return}o();const d=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await ts();const f=tr(d,u.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await ts();const h=await nN(d,u.statsTimelineParts,e.onProgress),_=JL(h);s({replay:f,statsTimeline:h,statsFrameLookup:_})},n.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:a};n.postMessage(l,[i.buffer])})}function iN(t){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const n=document.createElement("div");n.className="replay-load-modal__dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const a=document.createElement("h2");a.id="replay-load-modal-title",a.className="replay-load-modal__title",a.textContent="Preparing replay pipeline";const s=document.createElement("p");s.className="replay-load-modal__status",s.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const h of QL()){const _=document.createElement("div");_.className="replay-load-modal__phase-row",_.dataset.state="pending";const g=document.createElement("p");g.className="replay-load-modal__phase-label",g.textContent=`${h.index}. ${h.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const p=document.createElement("div");p.className="replay-load-modal__phase-fill",p.dataset.indeterminate="false",m.append(p),_.append(g,m),r.append(_),o.set(h.stage,{row:_,fill:p})}const l=document.createElement("p");l.className="replay-load-modal__meta",n.append(i,a,s,r,l),e.append(n),t.append(e);let c="";const u=()=>{for(const{row:h,fill:_}of o.values())h.dataset.state="pending",_.style.width="0%",_.dataset.indeterminate="false"},d=h=>{for(const _ of tN(h)){const g=o.get(_.stage);g&&(g.row.dataset.state=_.state,g.fill.dataset.indeterminate=_.indeterminate?"true":"false",g.fill.style.width=`${Math.round(_.completion*100)}%`)}},f=h=>{e.hidden=!h};return{show(h,_="Preparing replay..."){c=h,f(!0),u(),a.textContent="Preparing replay pipeline",s.textContent=_,l.textContent=`Loading ${h}`},update(h){f(!0);const _=eN(h);if(d(h),a.textContent=`Phase ${_.index} of ${_.total}: ${_.label}`,s.textContent=ac(h),h.stage==="processing"&&h.totalFrames!==void 0){l.textContent=`${h.processedFrames??0}/${h.totalFrames} frames`;return}if(h.stage==="decoding-stats"&&h.totalChunks!==void 0){l.textContent=`${h.processedChunks??0}/${h.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){f(!1)},destroy(){e.remove()}}}const aN=236,Nr=4120,sN=2300,rN=16185075,oN=.18,lN=1118481,ul=5882879,dl=16761180,cN=.55,Eu=.12,l_=.28,uN=3,dN=4,c_=5,u_=2,fN=6,hN=856343,pN=.42,mN=18,_N=.24,gN=10,d_=220,vN=200,Y0=140,yN=220,bN=100,xN=120;function SN(t){const e=vN/2;if(t){const a=-Nr+d_,s=-e;return{minX:a,maxX:s,centerX:(a+s)/2,width:s-a}}const n=e,i=Nr-d_;return{minX:n,maxX:i,centerX:(n+i)/2,width:i-n}}function wN(t,e,n){if(t.length<2)return[];const i=Math.min(...t),a=Math.max(...t),s=a-i,r=e?-1:1,o=-r;return s<=n?[{kind:"other",centerY:(i+a)/2,halfDepth:Math.max(n-s/2,n*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:a,halfDepth:n,directions:[r]},{kind:"forward",centerY:e?a:i,halfDepth:n,directions:[o]}]}function EN(t,e){const n=new eh;return n.moveTo(0,e/2),n.lineTo(t/2,-e/2),n.lineTo(-t/2,-e/2),n.closePath(),new nc(n)}function f_(t){const e=bN*t,n=new at({color:lN,transparent:!0,opacity:.9,side:Je,depthWrite:!1,depthTest:!1}),i=new mt;i.visible=!1;const a=new tn(Y0*.55*t,1),s=new ze(a,n);s.position.z=c_,s.renderOrder=22,i.add(s);const r=EN(xN*t,e),o=new ze(r,n);return o.position.z=c_,o.renderOrder=23,i.add(o),{group:i,shaftGeom:a,shaftMesh:s,headGeom:r,headMesh:o,material:n,headLength:e}}function Mu(t,e,n,i){const a=Math.max(n-t.headLength,t.headLength*.2);t.group.position.x=e,t.group.rotation.z=i>0?0:Math.PI,t.shaftMesh.scale.y=a,t.shaftMesh.position.y=-t.headLength/2,t.headMesh.position.y=n/2-t.headLength/2,t.group.visible=!0}function Il(t){t.group.visible=!1}function Za(t,e){const n=new mt;n.visible=!1;const i=new at({color:rN,transparent:!0,opacity:oN,side:Je,depthWrite:!1,depthTest:!1}),a=new tn(1,1),s=new ze(a,i);s.position.z=uN,s.renderOrder=20,n.add(s);const r=new at({color:e,transparent:!0,opacity:cN,side:Je,depthWrite:!1,depthTest:!1}),o=new tn(1,1),l=new ze(o,r);l.position.z=dN,l.renderOrder=21,n.add(l);const c=f_(t),u=f_(t);return n.add(c.group),n.add(u.group),{group:n,floorGeom:a,floorMesh:s,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:u}}function MN(t){t.group.visible=!1,Il(t.primaryMarker),Il(t.secondaryMarker)}function TN(t,e,n,i){const a=e.halfDepth*2*i,s=Nr*2*i,r=n.width*i,o=n.centerX*i,l=Y0*i,c=Math.max(a-32*i,t.primaryMarker.headLength*1.15),u=Math.min(c,Math.max(yN*i,a*.6));if(t.group.position.y=e.centerY*i,t.floorMesh.position.x=0,t.floorMesh.scale.set(s,a,1),t.stripeMesh.position.x=o,t.stripeMesh.scale.set(l,a,1),Il(t.primaryMarker),Il(t.secondaryMarker),e.directions.length===1)Mu(t.primaryMarker,o,u,e.directions[0]);else{const d=r*.18;Mu(t.primaryMarker,o-d,u,e.directions[0]),Mu(t.secondaryMarker,o+d,u,e.directions[1])}t.group.visible=!0}function h_(t){t.group.removeFromParent(),t.shaftGeom.dispose(),t.headGeom.dispose(),t.material.dispose()}class AN{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,n,i){this.replay=n,this.blueBack=Za(i,ul),this.blueForward=Za(i,ul),this.blueOther=Za(i,ul),this.orangeBack=Za(i,dl),this.orangeForward=Za(i,dl),this.orangeOther=Za(i,dl);for(const a of this.getZones())e.add(a.group)}update(e,n){const{frameIndex:i}=e,a=aN;for(const s of[!0,!1]){const r=this.replay.players.filter(d=>d.isTeamZero===s).length,o=[];for(const d of this.replay.players){if(d.isTeamZero!==s)continue;const f=d.frames[i];f?.position&&o.push(f.position.y)}const l=SN(s),c=this.getTeamZones(s);for(const d of c.values())MN(d);if(r<2||o.length!==r)continue;const u=wN(o,s,a);for(const d of u){const f=c.get(d.kind);f&&TN(f,d,l,n)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),h_(e.primaryMarker),h_(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function CN(t){return t==null||Number.isNaN(t)?null:t<0?"team-zero":"team-one"}class RN{group;teamZeroSide;teamOneSide;constructor(e,n){this.group=new mt,this.teamZeroSide=this.createHalfFieldSide(ul),this.teamOneSide=this.createHalfFieldSide(dl);const i=Nr*n,a=5120*n;this.teamZeroSide.mesh.position.set(0,-a/2,u_),this.teamZeroSide.mesh.scale.set(i*2,a,1),this.teamOneSide.mesh.position.set(0,a/2,u_),this.teamOneSide.mesh.scale.set(i*2,a,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const n=CN(e);this.teamZeroSide.material.opacity=n==="team-zero"?l_:Eu,this.teamOneSide.material.opacity=n==="team-one"?l_:Eu}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const n=new tn(1,1),i=new at({color:e,transparent:!0,opacity:Eu,side:Je,depthWrite:!1,depthTest:!1}),a=new ze(n,i);return a.renderOrder=18,{mesh:a,material:i}}}function PN(t,e){const n=new mt,i=Nr*2*e,a=(s,r,o)=>{const l=new tn(i,r*e),c=new at({color:hN,transparent:!0,opacity:o,side:Je,depthWrite:!1,depthTest:!1}),u=new ze(l,c);return u.position.set(0,s,fN),u.renderOrder=24,u};for(const s of[-1,1]){const r=s*sN*e;n.add(a(r,mN,pN))}return n.add(a(0,gN,_N)),t.add(n),n}function Rt(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function Kd(t,e,n=1){return t===void 0||e===void 0||Number.isNaN(t)||Number.isNaN(e)||e<=0?"?":`${(t*100/e).toFixed(n)}%`}function Mn(t,e){return`<div class="stat-row"><span class="label">${t}</span><span class="value">${e}</span></div>`}function LN(t,e){return`
      ${Mn("50s",Rt(t?.count))}
      ${Mn("Blue wins",`${Rt(t?.wins)} (${Kd(t?.wins,t?.count)})`)}
      ${Mn("Orange wins",`${Rt(t?.losses)} (${Kd(t?.losses,t?.count)})`)}
      ${Mn("Neutral",Rt(t?.neutral_outcomes))}
      ${Mn("Blue poss after",Rt(t?.possession_after_count))}
      ${Mn("Orange poss after",Rt(t?.opponent_possession_after_count))}
      ${Mn("Kickoff 50s",Rt(t?.kickoff_count))}
      ${Mn("Blue kickoff wins",Rt(t?.kickoff_wins))}
      ${Mn("Orange kickoff wins",Rt(t?.kickoff_losses))}
      ${Mn("Blue kickoff poss",Rt(t?.kickoff_possession_after_count))}
      ${Mn("Orange kickoff poss",Rt(t?.kickoff_opponent_possession_after_count))}
    `}function p_(t){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Rt(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Rt(t?.wins)} (${Kd(t?.wins,t?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Rt(t?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Rt(t?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Rt(t?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Rt(t?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Rt(t?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Rt(t?.kickoff_possession_after_count)}</span></div>
  `}function NN(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function IN(t,e,n=1){return t===void 0||e===void 0||Number.isNaN(t)||Number.isNaN(e)||e<=0?"?":`${(t*100/e).toFixed(n)}%`}function m_(t,e,n=1){if(t===void 0||Number.isNaN(t))return"?";const i=IN(t,e,n);return i==="?"?`${t.toFixed(n)}s`:`${t.toFixed(n)}s (${i})`}function __(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function jd(t,e){return`<div class="stat-row"><span class="label">${__(t)}</span><span class="value">${__(e)}</span></div>`}function DN(t){const e=new Set,n=[];for(const i of t??[])e.has(i)||(e.add(i),n.push(i));return n}function q0(t,e){return t==="neutral"?"Neutral":e.kind==="shared"?t==="own"?"Blue control":"Orange control":t==="own"?"Team control":"Opp control"}function Zd(t){return t.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function FN(t,e){return t==="neutral_third"?"Neutral third":e.kind==="shared"?t==="defensive_third"?"Blue third":"Orange third":t==="defensive_third"?"Own third":"Opp third"}function kN(t){return t.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function ON(t,e,n,i){for(const a of n){const s=a==="possession_state"?Zd(i):kN(i),r=s.indexOf(t[a]),o=s.indexOf(e[a]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function UN(t,e,n){const i=(a,s)=>a==="possession_state"?q0(s,n):FN(s,n);if(e.length===1){const a=e[0];return i(a,t[a])}return e.map(a=>i(a,t[a])).join(" / ")}function BN(t,e,n,i){if(e.length===0)return"";const a=new Map;if(t?.labeled_time?.entries?.length)for(const s of t.labeled_time.entries){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=a.get(c);u?u.total+=s.value:a.set(c,{values:o,total:s.value})}if(a.size===0&&e.length===1&&e[0]==="possession_state"){const s=new Map;return t&&(s.set("own",t.possession_time),s.set("neutral",t.neutral_time??0),s.set("opponent",t.opponent_possession_time)),Zd(i).some(r=>(s.get(r)??0)>0)?Zd(i).filter(r=>s.has(r)).map(r=>jd(q0(r,i),m_(s.get(r),n))).join(""):""}return[...a.values()].sort((s,r)=>ON(s.values,r.values,e,i)).map(s=>jd(UN(s.values,e,i),m_(s.total,n))).join("")}function g_(t,e){const n=t?.tracked_time,i=DN(e.breakdownClasses),a=BN(t,i,n,e.labelPerspective);return`
    ${jd("Tracked",NN(n,1,"s"))}
    ${a}
  `}function zN(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function HN(t,e,n=1){return t===void 0||e===void 0||Number.isNaN(t)||Number.isNaN(e)||e<=0?"?":`${(t*100/e).toFixed(n)}%`}function VN(t,e,n=1){if(t===void 0||Number.isNaN(t))return"?";const i=HN(t,e,n);return i==="?"?`${t.toFixed(n)}s`:`${t.toFixed(n)}s (${i})`}function v_(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function K0(t,e){return`<div class="stat-row"><span class="label">${v_(t)}</span><span class="value">${v_(e)}</span></div>`}function GN(t,e){return t==="neutral"?"Neutral zone":e.kind==="shared"?t==="defensive_half"?"Blue side":"Orange side":t==="defensive_half"?"Own half":"Opp half"}function $N(t,e,n){const i=new Map;if(t&&(i.set("defensive_half",t.defensive_half_time),i.set("neutral",t.neutral_time??0),i.set("offensive_half",t.offensive_half_time)),t?.labeled_time?.entries?.length){i.clear();for(const s of t.labeled_time.entries){const r=s.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+s.value)}}const a=["defensive_half","neutral","offensive_half"];return a.some(s=>(i.get(s)??0)>0)?a.filter(s=>i.has(s)).map(s=>K0(GN(s,n),VN(i.get(s),e))).join(""):""}function y_(t,e){const n=t?.tracked_time,i=$N(t,n,e.labelPerspective);return`
    ${i.length===0?K0("Tracked",zN(n,1,"s")):""}
    ${i}
  `}function aa(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function sa(t,e){return`<div class="stat-row"><span class="label">${t}</span><span class="value">${e}</span></div>`}function Tu(t){return`
    ${sa("Rushes",aa(t?.count))}
    ${sa("2v1",aa(t?.two_v_one_count))}
    ${sa("2v2",aa(t?.two_v_two_count))}
    ${sa("2v3",aa(t?.two_v_three_count))}
    ${sa("3v1",aa(t?.three_v_one_count))}
    ${sa("3v2",aa(t?.three_v_two_count))}
    ${sa("3v3",aa(t?.three_v_three_count))}
  `}const b_="subtr-actor-fifty-fifty-overlay-styles",WN=5882879,XN=16761180,YN=15988472,qN=180,KN=4;function Jd(t){if(!t)return null;const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function x_(t,e){const n=Jd(e);return n?t.players.find(i=>i.id===n)?.name??n:"Unknown"}function jN(t,e){const n=x_(e,t.team_zero_player),i=x_(e,t.team_one_player),a=t.is_kickoff?"Kickoff 50/50":"50/50",s=t.winning_team_is_team_0===void 0?null:t.winning_team_is_team_0,r=t.possession_team_is_team_0===void 0?null:t.possession_team_is_team_0,o=s===null?"neutral":s?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=s===null?"sap-fifty-fifty-overlay-label-neutral":s?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${a}: ${n} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:s}}function j0(t,e){return t.events.fifty_fifty.map(n=>{const i=jN(n,e),a=new L(...n.team_zero_position),s=new L(...n.team_one_position),r=new L(...n.midpoint),o=e.frames[n.start_frame]?.time??n.start_time;return{id:`fifty-fifty:${n.start_frame}:${Jd(n.team_zero_player)}:${Jd(n.team_one_player)}`,time:o,frame:n.start_frame,label:i.text,labelClassName:i.className,axisStart:a,axisEnd:s,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function ZN(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function JN(){if(document.getElementById(b_))return;const t=document.createElement("style");t.id=b_,t.textContent=`
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
  `,document.head.append(t)}function QN(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class eI{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,qN);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=KN;constructor(e,n,i,a){JN(),this.scene=e,this.container=n,this.markers=j0(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const n=ZN(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.line.removeFromParent(),s.line.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,a.axisStart.x,a.axisStart.y,a.axisStart.z+24),c.setXYZ(1,a.axisEnd.x,a.axisEnd.y,a.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(a.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),QN(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=new Tt().setFromPoints([e.axisStart,e.axisEnd]),a=new Ql({color:e.winnerIsTeamZero===null?YN:e.winnerIsTeamZero?WN:XN,transparent:!0,opacity:.9}),s=new Zf(i,a);s.renderOrder=3,this.group.add(s);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:s,material:a,label:r};return this.views.set(e.id,o),o}}const S_="subtr-actor-ceiling-shot-overlay-styles",tI=5882879,nI=16761180,iI=16185075,aI=140,sI=215,rI=220,oI=4.5;function Z0(t){if(!t)return null;const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function lI(t,e){const n=Z0(e);return n?t.players.find(i=>i.id===n)?.name??n:"Unknown"}function cI(t,e){return t.events.ceiling_shot.map(n=>{const i=lI(e,n.player),a=Z0(n.player),s=e.frames[n.frame]?.time??n.time,r=n.confidence;return{id:`ceiling-shot:${n.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:n.frame,isTeamZero:n.is_team_0,playerId:a,playerName:i,ceilingContactPosition:{x:n.ceiling_contact_position[0],y:n.ceiling_contact_position[1],z:n.ceiling_contact_position[2]},touchPosition:{x:n.touch_position[0],y:n.touch_position[1],z:n.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function uI(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function dI(){if(document.getElementById(S_))return;const t=document.createElement("style");t.id=S_,t.textContent=`
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
  `,document.head.append(t)}function fI(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class hI{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,rI);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=oI;constructor(e,n,i,a){dI(),this.scene=e,this.container=n,this.markers=cI(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const n=uI(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.ringMaterial.dispose(),s.beam.removeFromParent(),s.beamGeometry.dispose(),s.beamMaterial.dispose(),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z+12),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z).add(this.labelOffset);const u=fI(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=e.quality>=.8?iI:e.isTeamZero?tI:nI,a=new at({color:i,transparent:!0,opacity:.8,side:Je,depthWrite:!1,depthTest:!1}),s=new Aa(aI,sI,48),r=new ze(s,a);r.renderOrder=30,this.group.add(r);const o=new Tt().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new Ql({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new Zf(o,l);c.renderOrder=29,this.group.add(c);const u=document.createElement("div");u.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,u.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(u);const d={marker:e,ring:r,ringMaterial:a,beam:c,beamGeometry:o,beamMaterial:l,label:u};return this.views.set(e.id,d),d}}const w_="subtr-actor-touch-overlay-styles",E_=5882879,M_=16761180,pI=120,mI=196,Au=24,T_=210,A_=5,_I=.1,gI=48;function Wt(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function Cu(t,e){return Math.max(0,t-e)}function vI(t,e){if(e==="markers")return t.playerName;const n=Math.round(t.totalBallAdvanceDistance),i=Math.round(t.totalBallRetreatDistance);return n>0&&i>0?`${t.playerName} +${n} / -${i} uu`:i>0?`${t.playerName} -${i} uu`:`${t.playerName} +${n} uu`}function J0(t,e){const n=new Map,i=[],a=[...(t.events?.touch??[]).map((s,r)=>({kind:"touch",frame:s.frame,time:s.time,index:r,event:s})),...(t.events?.touch_ball_movement??[]).map((s,r)=>({kind:"movement",frame:s.frame,time:s.time,index:r,event:s}))].sort((s,r)=>s.frame!==r.frame?s.frame-r.frame:s.time!==r.time?s.time-r.time:s.kind!==r.kind?s.kind==="touch"?-1:1:s.index-r.index);for(const s of a){if(s.kind==="touch"){const d=s.event,f=Wt(d.player),h=e.ballFrames[d.frame]?.position;if(!h)continue;const _=i.length;i.push({id:`touch-stat:${d.frame}:${f}:${_+1}`,time:e.frames[d.frame]?.time??d.time,frame:d.frame,isTeamZero:d.is_team_0,playerId:f,playerName:e.players.find(g=>g.id===f)?.name??f,position:{x:h.x,y:h.y,z:h.z},endPosition:{x:h.x,y:h.y,z:h.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),n.set(f,_);continue}const r=s.event,o=Wt(r.player),l=n.get(o),c=e.ballFrames[r.frame]?.position;if(l===void 0||!c)continue;const u=i[l];u&&(u.totalBallTravelDistance+=Cu(r.travel_distance,0),u.totalBallAdvanceDistance+=Cu(r.advance_distance,0),u.totalBallRetreatDistance+=Cu(r.retreat_distance,0),u.endPosition={x:c.x,y:c.y,z:c.z})}return i}function yI(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function bI(){if(document.getElementById(w_))return;const t=document.createElement("style");t.id=w_,t.textContent=`
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
  `,document.head.append(t)}function xI(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}function Q0(t){return[t.line.material,t.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function C_(t,e){for(const n of Q0(t))n.transparent=!0,n.opacity=e,n.depthWrite=!1,n.depthTest=!1}function R_(t){t.removeFromParent(),t.line.geometry.dispose(),t.cone.geometry.dispose();for(const e of Q0(t))e.dispose()}class SI{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,T_);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=A_;mode="markers";constructor(e,n,i,a,s){bI(),this.scene=e,this.container=n,this.decaySeconds=Math.max(.1,s?.decaySeconds??A_),this.mode=s?.mode??"markers",this.labelOffset.set(0,0,T_),this.markers=J0(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const n=yI(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),R_(s.arrow),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+Au),o.ring.scale.setScalar(c),o.label.textContent=vI(a,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,a,l),this.worldPosition.set(a.position.x,a.position.y,a.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),xI(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),R_(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=new at({color:e.isTeamZero?E_:M_,transparent:!0,opacity:.7,side:Je,depthWrite:!1,depthTest:!1}),a=new ze(new Aa(pI,mI,48),i);a.rotation.x=-Math.PI/2,a.renderOrder=40,this.group.add(a);const s=new sw(new L(0,1,0),new L,1,e.isTeamZero?E_:M_,1,1);s.visible=!1,s.renderOrder=45,s.line.renderOrder=45,s.cone.renderOrder=45,C_(s,.7),this.group.add(s);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,arrow:s,label:r};return this.views.set(e.id,o),o}updateArrow(e,n,i){if(this.mode!=="advancement"||n.totalBallTravelDistance<=_I){e.arrow.visible=!1;return}this.arrowStart.set(n.position.x,n.position.y,n.position.z+Au*2),this.arrowEnd.set(n.endPosition.x,n.endPosition.y,n.endPosition.z+Au*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const a=this.arrowDirection.length();if(a<gI){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(a,Math.min(140,Math.max(42,a*.18)),Math.min(86,Math.max(24,a*.1))),C_(e.arrow,Math.min(.86,i+.12))}}const ei="#3b82f6",ti="#f59e0b",wI="#d1d9e0",EI={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wall_aerial:"WA",wall_aerial_shot:"WS",wavedash:"WD"},MI=new Set(["wavedash"]);function TI(t,e){return t.players.find(n=>n.id===e)?.name??e}function qi(t,e,n){return t.frames[e??-1]?.time??n}function Vi(t){return t.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function ey(t){return EI[t]??(t.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function ty(t){return[...new Set((t?.events.mechanics??[]).filter(e=>sc(e.kind)).map(e=>e.kind))].sort((e,n)=>Vi(e).localeCompare(Vi(n)))}function sc(t){return!MI.has(t)}function AI(t){return t.replaceAll("_","-")}function CI(t,e,n){const i=n?new Set(n):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(t.events.mechanics??[]).filter(s=>sc(s.kind)&&s.timing.type==="moment"&&(!i||i.has(s.kind))).map(s=>{const r=Wt(s.player_id),o=a.get(r)??r,l=Vi(s.kind);if(s.timing.type!=="moment")throw new Error("unreachable non-moment mechanic event");return{id:s.id,time:qi(e,s.timing.frame,s.timing.time),frame:s.timing.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:ey(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?ei:ti}})}function RI(t,e,n){const i=n?new Set(n):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(t.events.mechanics??[]).filter(s=>sc(s.kind)&&(!i||i.has(s.kind))).map(s=>{const r=Wt(s.player_id),o=a.get(r)??r,l=Vi(s.kind),c=s.timing.type==="moment"?{frame:s.timing.frame,time:s.timing.time}:{frame:s.timing.end_frame,time:s.timing.end_time};return{id:`${s.id}:playlist`,time:qi(e,c.frame,c.time),frame:c.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:ey(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?ei:ti}})}function PI(t){const e=new Set(t),n=new Set(["goal"]);return e.has("core")&&(n.add("save"),n.add("shot"),n.add("assist")),e.has("demo")&&n.add("demo"),[...n]}function LI(t,e){const n=new Set(PI(e));return t.timelineEvents.filter(i=>n.has(i.kind))}function NI(t,e){return j0(t,e).map(n=>({id:n.id,time:n.time,frame:n.frame,kind:"fifty-fifty",label:n.label,shortLabel:n.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:n.winnerIsTeamZero,color:n.winnerIsTeamZero===null?wI:n.winnerIsTeamZero?ei:ti}))}function II(t,e){return J0(t,e).map(n=>({id:n.id,time:n.time,frame:n.frame,kind:"touch",label:`${n.playerName} touch`,shortLabel:"T",playerId:n.playerId,playerName:n.playerName,isTeamZero:n.isTeamZero,color:n.isTeamZero?ei:ti}))}function DI(t,e){return t.events.backboard.map((n,i)=>{const a=Wt(n.player),s=e.players.find(r=>r.id===a)?.name??a;return{id:`backboard:${n.frame}:${a}:${i}`,time:qi(e,n.frame,n.time),frame:n.frame,kind:"backboard",label:`${s} backboard`,shortLabel:"BB",playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?ei:ti}})}function FI(t,e){return t.events.rush.map((n,i)=>{const a=qi(e,n.end_frame,n.end_time),s=`${n.attackers}v${n.defenders}`,r=n.is_team_0?"Blue":"Orange";return{id:`rush:${n.start_frame}:${n.end_frame}:${i}`,time:a,frame:n.end_frame,kind:"rush",label:`${r} rush ${s}`,shortLabel:"R",playerId:null,playerName:null,isTeamZero:n.is_team_0,color:n.is_team_0?ei:ti}})}function kI(t,e){return(t.events?.powerslide??[]).filter(n=>n.active).map((n,i)=>{const a=Wt(n.player),s=TI(e,a);return{id:`powerslide:${n.frame}:${a}:${i+1}`,time:qi(e,n.frame,n.time),frame:n.frame,kind:"powerslide",label:`${s} powerslide`,shortLabel:"PS",playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?ei:ti}})}function OI(t,e){return t.events.wavedash.map((n,i)=>{const a=Wt(n.player),s=e.players.find(c=>c.id===a)?.name??a,r=qi(e,n.frame,n.time),o=Math.round(n.confidence*100),l=Math.round(n.horizontal_speed_gain);return{id:`wavedash:${n.frame}:${a}:${i}`,time:r,frame:n.frame,kind:"wavedash",label:`${s} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?ei:ti}})}function UI(t,e){return t.events.bump.map((n,i)=>{const a=Wt(n.initiator),s=Wt(n.victim),r=e.players.find(u=>u.id===a)?.name??a,o=e.players.find(u=>u.id===s)?.name??s,l=qi(e,n.frame,n.time),c=Math.round(n.confidence*100);return{id:`bump:${n.frame}:${a}:${s}:${i}`,time:l,frame:n.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:a,playerName:r,isTeamZero:n.initiator_is_team_0,color:n.initiator_is_team_0?ei:ti}})}function BI(t){return t.kind==="beaten_to_ball"?"BT":t.dodge_active?"DW":t.aerial?"AW":"W"}function zI(t){const e=[t.aerial?"aerial":"grounded"];return t.dodge_active&&e.push("dodge"),e.join(" ")}function HI(t){return t.kind==="beaten_to_ball"?"beaten to ball":"whiff"}function VI(t,e){return t.events.whiff.map((n,i)=>{const a=Wt(n.player),s=e.players.find(c=>c.id===a)?.name??a,r=qi(e,n.frame,n.time),o=Math.round(n.closest_approach_distance),l=Math.round(n.approach_speed);return{id:`whiff:${n.frame}:${a}:${i}`,time:r,frame:n.frame,kind:"whiff",label:`${s} ${zI(n)} ${HI(n)} | ${o}uu closest, ${l}uu/s`,shortLabel:BI(n),playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?ei:ti}})}const ny=.02,cn=1e-4,GI=200,iy=.08,$I="#3b82f6",WI="#f59e0b",Qd={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},P_={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},XI={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function YI(t){const e=t.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):GI}function Dl(t,e,n){return t?.frames?.[e??-1]?.time??n}function ph(t){return t===!0?$I:t===!1?WI:null}function qI(t){return XI[t]??(t.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function KI(t,e,n){const i=n?new Set(n):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(t.events.mechanics??[]).filter(s=>sc(s.kind)&&s.timing.type==="span"&&(!i||i.has(s.kind))).map(s=>{if(s.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=ef(s.player_id),o=a.get(r)??r,l=Vi(s.kind),c=Dl(e,s.timing.start_frame,s.timing.start_time),u=Math.max(c,Dl(e,s.timing.end_frame,s.timing.end_time));return{id:s.id,startTime:c,endTime:u,lane:`mechanic:${s.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:qI(s.kind),isTeamZero:s.is_team_0,color:ph(s.is_team_0)??void 0}}).sort((s,r)=>s.startTime!==r.startTime?s.startTime-r.startTime:(s.id??"").localeCompare(r.id??""))}function jI(t,e,n,i,a,s){const r=e?.ballFrames[t]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=n+cn||s>cn?"neutral":i>a+cn?"team_zero_side":a>i+cn?"team_one_side":null}function ay(t,e,n){if(t==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:n,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=t==="team_zero_side";return{id:`half-control:${t}:${e.toFixed(3)}`,startTime:e,endTime:n,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function mh(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function ZI(t,e){const n=mh(t.events?.possession??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of t.frames){for(;a<n.length&&n[a].frame<=l.frame_number;){const f=n[a];s=f.active,r=f.possession_state,a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=Ds(l,o,e);let d=null;s&&r==="team_zero"?d={id:`possession:team_zero:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:s&&r==="team_one"?d={id:`possession:team_one:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:s&&r==="neutral"&&(d={id:`possession:neutral:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),rc(i,d),o=l}return i}function JI(t,e){if((t.events?.possession?.length??0)>0)return ZI(t,e);const n=[];let i=0,a=0,s=0,r=null;for(const o of t.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o,c=l.team_zero?.possession?.possession_time??0,u=l.team_one?.possession?.possession_time??0,d=l.team_zero?.possession?.neutral_time??0,f=c-i,h=u-a,_=d-s;i=c,a=u,s=d;let g=null;const{startTime:m,endTime:p}=Ds(o,r,e);f>h+cn&&f>_+cn?g={id:`possession:team_zero:${m.toFixed(3)}`,startTime:m,endTime:p,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:h>f+cn&&h>_+cn?g={id:`possession:team_one:${m.toFixed(3)}`,startTime:m,endTime:p,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:_>cn&&(g={id:`possession:neutral:${m.toFixed(3)}`,startTime:m,endTime:p,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),rc(n,g),r=o}return n}function QI(t,e){const n=mh(t.events?.pressure??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of t.frames){for(;a<n.length&&n[a].frame<=l.frame_number;){const d=n[a];s=d.active,r=d.field_half==="team_zero_side"||d.field_half==="team_one_side"?d.field_half:"neutral",a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=Ds(l,o,e);rc(i,s?ay(r,c,u):null),o=l}return i}function eD(t,e){if((t.events?.pressure?.length??0)>0)return QI(t,e);const n=[];let i=0,a=0,s=0;const r=YI(t);let o=null;for(const l of t.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l,u=c.team_zero?.pressure?.defensive_half_time??0,d=c.team_one?.pressure?.defensive_half_time??0,f=c.team_zero?.pressure?.neutral_time??0,h=u-i,_=d-a,g=f-s;i=u,a=d,s=f;const{startTime:m,endTime:p}=Ds(l,o,e),b=jI(l.frame_number,e,r,h,_,g),w=b?ay(b,m,p):null;rc(n,w),o=l}return n}function tD(t,e){return t.events.rush.map((n,i)=>{const a=e?.frames[n.start_frame]?.time??n.start_time,s=e?.frames[n.end_frame]?.time??n.end_time,r=`${n.attackers}v${n.defenders}`,o=n.is_team_0;return{id:`rush-range:${n.start_frame}:${n.end_frame}:${i}`,startTime:a,endTime:Math.max(a,s),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function nD(t,e={}){const n=sy(e),i=new Set(e.comparisons??["both"]),a=new Set(e.activities??["active","inactive","unknown"]),s=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(n.size===0||!i.has("both")||!a.has("unknown")||!s.has("unknown")||r?.size===0)return[];const o=new Map(t.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of t.boostPads)if(n.has(c.size))for(let u=0;u<c.events.length;u+=1){const d=c.events[u];if(d.available||!Number.isFinite(d.time)||r&&!d.playerId||d.playerId&&r&&!r.has(d.playerId))continue;const f=Math.max(0,Dl(t,d.frame,d.time)),h=c.size==="big"?"Big":"Small",_=d.playerName?`${d.playerName} `:"",g=d.playerId?o.get(d.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${d.frame}:${u}`,startTime:f,endTime:Math.max(f+iy,f),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${_}picked up ${h.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:ph(g)??Qd[c.size],isTeamZero:g})}return l.sort((c,u)=>c.startTime!==u.startTime?c.startTime-u.startTime:(c.id??"").localeCompare(u.id??""))}function sy(t){if(t.padTypes)return new Set(t.padTypes);if(t.sizes){const e=new Set(t.sizes),n=new Set;return e.has("big")&&n.add("big"),e.has("small")&&n.add("small"),e.has("big")&&e.has("small")&&n.add("ambiguous"),n}return new Set(["big","small","ambiguous"])}function ef(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function iD(t){return{big:"big",small:"small",ambiguous:"ambiguous"}[t]}function aD(t){return{both:"counted",ghost:"ghost",missed:"missed"}[t]}function sD(t,e){return t==="ghost"?"G":t==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function rD(t,e,n={}){const i=t.events?.boost_pickups??[];if(i.length===0&&e)return nD(e,n);const a=sy(n),s=new Set(n.comparisons??["both"]),r=new Set(n.activities??["active","inactive","unknown"]),o=new Set(n.fieldHalves??["own","opponent","unknown"]),l=n.playerIds?new Set(n.playerIds):null;if(a.size===0||s.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(u=>[u.id,u.name]));return i.filter(u=>{const d=ef(u.player_id);return a.has(u.pad_type)&&s.has(u.comparison)&&r.has(u.activity)&&o.has(u.field_half)&&(!l||l.has(d))}).map((u,d)=>{const f=ef(u.player_id),h=c.get(f)??f,_=Math.max(0,Dl(e,u.frame,u.time)),g=aD(u.comparison),m=iD(u.pad_type);return{id:`boost-pickup:${u.comparison}:${u.frame}:${f}:${d}`,startTime:_,endTime:Math.max(_+iy,_),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${h} ${g} ${m} boost pickup`,shortLabel:sD(u.comparison,u.pad_type),color:ph(u.is_team_0)??(u.comparison==="both"?u.pad_type==="big"?Qd.big:u.pad_type==="small"?Qd.small:P_.both:P_[u.comparison]),isTeamZero:u.is_team_0}}).sort((u,d)=>u.startTime!==d.startTime?u.startTime-d.startTime:(u.id??"").localeCompare(d.id??""))}const tf=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function ry(t,e){return t.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(t.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function _h(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function oD(t,e){const n=t.positioning;if(!n)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const a=n[i];if(typeof a=="number"&&Number.isFinite(a))return a}return 0}function lD(t,e){return t.players.find(n=>_h(n.player_id)===e)?.name??e}function cD(t,e){for(const n of[e.fieldName,...e.aliases??[]]){const i=t[n];if(typeof i=="number"&&Number.isFinite(i))return i}return 0}function uD(t,e){const n=mh(t.events?.positioning??[]),i=[],a=new Map;let s=0,r=null;for(const o of t.frames){const l=new Map;for(;s<n.length&&n[s].frame<=o.frame_number;){const d=n[s],f=_h(d.player),h=l.get(f)??{event:d,zoneDeltas:new Map};h.event=d;for(const _ of tf)h.zoneDeltas.set(_.fieldName,(h.zoneDeltas.get(_.fieldName)??0)+cD(d,_));l.set(f,h),s+=1}if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const{startTime:c,endTime:u}=Ds(o,r,e);if(u-c<=cn){r=o;continue}for(const[d,{event:f,zoneDeltas:h}]of l){let _=null,g=0;for(const m of tf){const p=h.get(m.fieldName)??0;p>g+cn&&(g=p,_=m)}_&&oy(i,a,{id:`time-in-zone:${d}:${_.fieldName}:${c.toFixed(3)}`,startTime:c,endTime:u,lane:`time-in-zone:${d}`,laneLabel:lD(o,d),label:_.label,color:ry(_,f.is_team_0),isTeamZero:f.is_team_0})}r=o}return i}function dD(t,e){if((t.events?.positioning?.length??0)>0)return uD(t,e);const n=new Map,i=[],a=new Map;let s=null;for(const r of t.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){s=r;continue}const{startTime:o,endTime:l}=Ds(r,s,e);if(l-o<=cn){s=r;continue}for(const c of r.players){const u=_h(c.player_id),d=n.get(u)??new Map;let f=null,h=0;for(const _ of tf){const g=oD(c,_),m=g-(d.get(_.fieldName)??0);m>h+cn&&(h=m,f=_),d.set(_.fieldName,g)}n.set(u,d),f&&oy(i,a,{id:`time-in-zone:${u}:${f.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${u}`,laneLabel:c.name,label:f.label,color:ry(f,c.is_team_0),isTeamZero:c.is_team_0})}s=r}return i}function Ds(t,e,n){const i=n?.frames[t.frame_number]?.time??t.time,a=e?n?.frames[e.frame_number]?.time??e.time:Math.max(0,i-t.dt);return{startTime:Math.max(0,a),endTime:Math.max(a,i)}}function rc(t,e){if(!e)return;const n=t[t.length-1];if(n&&n.lane===e.lane&&n.label===e.label&&Math.abs(n.endTime-e.startTime)<=ny){n.endTime=e.endTime;return}t.push(e)}function oy(t,e,n){if(!n)return;const i=n.lane??"",a=e.get(i);if(a&&a.label===n.label&&Math.abs(a.endTime-n.startTime)<=ny){a.endTime=n.endTime;return}t.push(n),e.set(i,n)}const Ru=236,ly="relative-positioning",fD={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function Fs(t){return t?"team-blue":"team-orange"}function cy(t,e,n){return`<div class="player-card ${n.tone==="shared"?"shared":n.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${t}</span>
      ${n.metaHtml??""}
    </div>
    ${e}
  </div>`}function Bt(t,e,n,i=""){return cy(t,n,{metaHtml:i,tone:e?"blue":"orange"})}function jt(t,e){return`<div class="player-team-stack">${[!0,!1].map(n=>{const i=t.filter(s=>s.is_team_0===n);if(i.length===0)return"";const a=n?"Blue":"Orange";return`<section class="player-team-group ${Fs(n)}">
        <div class="player-team-header">
          <h3>${a} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function gh(t,e,n=""){return cy(t,e,{metaHtml:n,tone:"shared"})}function Ut(t,e,n){const i=St(t.statsFrameLookup,e);return i?i.players.find(a=>Wt(a.player_id)===n)??null:null}function hD(t,e,n){const i=t.players.find(_=>_.id===e);if(!i||!i.frames[n]?.position)return"mid";const s=i.isTeamZero,r=t.players.filter(_=>_.isTeamZero===s).length,o=[];let l=0;for(const _ of t.players){if(_.isTeamZero!==s)continue;const g=_.frames[n];if(!g?.position)continue;const m=s?g.position.y:-g.position.y;o.push(m),_.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),u=Math.max(...o);if(u-c<=Ru)return"level";const f=l-c<=Ru,h=u-l<=Ru;return f&&!h?"last":h&&!f?"upfield":"mid"}function pD(t){let e=null,n=null;const i=new Set,a=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){s()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return JI(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),t.rerenderCurrentState()},renderStats(o,l){const u=St(l.statsFrameLookup,o)?.team_zero?.possession;return u?gh("Control State",g_(u,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const u=St(c.statsFrameLookup,l),d=Ut(c,l,o),f=d?.is_team_0?u?.team_zero?.possession:u?.team_one?.possession;return!f||!d?"":g_(f,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Possession breakdown",l.append(c,u),n=document.createElement("strong"),n.className="metric-readout",o.append(l,n);const d=document.createElement("div");d.className="module-settings-options";const f=document.createElement("label");f.className="toggle";const h=document.createElement("input");h.type="checkbox",h.dataset.breakdownClass="possession_state",h.addEventListener("change",()=>{h.checked?i.add("possession_state"):i.delete("possession_state"),s(),t.rerenderCurrentState(),t.requestConfigSync?.()});const _=document.createElement("span");_.textContent="Control",f.append(h,_),d.append(f);const g=document.createElement("label");g.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),s(),t.rerenderCurrentState(),t.requestConfigSync?.()});const p=document.createElement("span");p.textContent="Third",g.append(m,p),d.append(g),e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(n){const o=a.filter(l=>i.has(l));n.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return a.filter(o=>i.has(o))}}function mD(){let t=null;return{id:"fifty-fifty",label:"50/50",setup(e){t=new eI(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){t?.dispose(),t=null},onBeforeRender(e){t?.update(e.currentTime)},getTimelineEvents(e){return NI(e.statsTimeline,e.replay)},renderStats(e,n){const i=St(n.statsFrameLookup,e);if(!i)return"";const a=gh("Challenge Summary",LN(i.team_zero?.fifty_fifty)),s=jt(i.players,r=>Bt(r.name,r.is_team_0,p_(r.fifty_fifty)));return a+s},renderFocusedPlayerStats(e,n,i){const a=Ut(i,n,e);return a?p_(a.fifty_fifty):""}}}function _D(){let t=null,e=null;return{id:"pressure",label:"Half Control",setup(n){e=n.replay,t=new RN(n.player.sceneState.scene,n.fieldScale)},teardown(){t?.dispose(),t=null,e=null},onBeforeRender(n){const i=e?.ballFrames[n.frameIndex];t?.update(i?.position?.y??null)},getTimelineRanges(n){return eD(n.statsTimeline,n.replay)},renderStats(n,i){const s=St(i.statsFrameLookup,n)?.team_zero?.pressure;return s?gh("Field State",y_(s,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(n,i,a){const s=St(a.statsFrameLookup,i),r=Ut(a,i,n),o=r?.is_team_0?s?.team_zero?.pressure:s?.team_one?.pressure;return!o||!r?"":y_(o,{labelPerspective:{kind:"team"}})}}}function gD(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(t){return tD(t.statsTimeline,t.replay)},getTimelineEvents(t){return FI(t.statsTimeline,t.replay)},renderStats(t,e){const n=St(e.statsFrameLookup,t),i=n?.team_zero?.rush,a=n?.team_one?.rush;return!i||!a?"":[Bt("Blue Team",!0,Tu(i)),Bt("Orange Team",!1,Tu(a))].join("")},renderFocusedPlayerStats(t,e,n){const i=St(n.statsFrameLookup,e),a=Ut(n,e,t),s=a?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!s||!a?"":Tu(s)}}}const nf={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:t=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[t]??t},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:t=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[t]??t}};function vD(t){const e=new Set,n=[];for(const i of t??[])e.has(i)||(e.add(i),n.push(i));return n}function Pu(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function yD(t,e,n=1){return t===void 0||Number.isNaN(t)?"?":e===void 0||Number.isNaN(e)||e<=0?`${t.toFixed(n)}s`:`${t.toFixed(n)}s (${(t*100/e).toFixed(n)}%)`}function L_(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function fl(t,e){return`<div class="stat-row"><span class="label">${L_(t)}</span><span class="value">${L_(e)}</span></div>`}function bD(t,e,n){for(const i of n){const{valueOrder:a}=nf[i],s=a.indexOf(t[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function xD(t,e){if(e.length===1){const n=e[0];return nf[n].formatValue(t[n])}return e.map(n=>nf[n].formatValue(t[n])).join(" / ")}function SD(t,e,n){if(e.length===0||!t?.labeled_tracked_time?.entries?.length)return"";const i=new Map,a=t?.labeled_tracked_time?.entries??[];for(const s of a){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=i.get(c);u?u.total+=s.value:i.set(c,{values:o,total:s.value})}return[...i.values()].sort((s,r)=>bD(s.values,r.values,e)).map(s=>fl(xD(s.values,e),yD(s.total,n))).join("")}function N_(t,e={}){const n=t?.tracked_time,i=t&&n&&n>0?t.speed_integral/n:n===0?0:void 0,a=vD(e.breakdownClasses),s=SD(t,a,n);return`
    ${fl("Tracked",Pu(n,1,"s"))}
    ${fl("Distance",Pu(t?.total_distance,0," uu"))}
    ${fl("Avg speed",Pu(i,0," uu/s"))}
    ${s}
  `}const af={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:t=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[t]??t},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:t=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[t]??t},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:t=>({ground:"Ground",air:"Air",wall:"Wall"})[t]??t},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:t=>({no_dodge:"No dodge",dodge:"Dodge"})[t]??t}};function wD(t){const e=new Set,n=[];for(const i of t??[])e.has(i)||(e.add(i),n.push(i));return n}function Ci(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function Lu(t,e=0,n=""){return t===void 0||!Number.isFinite(t)?"?":`${t.toFixed(e)}${n}`}function I_(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ln(t,e){return`<div class="stat-row"><span class="label">${I_(t)}</span><span class="value">${I_(e)}</span></div>`}function ED(t,e,n){for(const i of n){const{valueOrder:a}=af[i],s=a.indexOf(t[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function MD(t,e){if(e.length===1){const n=e[0];return af[n].formatValue(t[n])}return e.map(n=>af[n].formatValue(t[n])).join(" / ")}function TD(t){return(t?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function AD(t,e){if(e.length===0||t.length===0)return"";const n=new Map;for(const i of t){const a=new Map(i.labels.map(c=>[c.key,c.value])),s={};let r=!0;for(const c of e){const u=a.get(c);if(u===void 0){r=!1;break}s[c]=u}if(!r)continue;const o=e.map(c=>`${c}:${s[c]}`).join("|"),l=n.get(o);l?l.count+=i.count:n.set(o,{values:s,count:i.count})}return[...n.values()].sort((i,a)=>ED(i.values,a.values,e)).map(i=>Ln(MD(i.values,e),Ci(i.count))).join("")}function CD(t,e){if(!t||e.length!==1)return"";const[n]=e;if(n==="kind")return[Ln("Control",Ci(t.control_touch_count)),Ln("Medium",Ci(t.medium_hit_count)),Ln("Hard",Ci(t.hard_hit_count))].join("");if(n==="height_band"){const i=t.high_aerial_touch_count??0,a=(t.aerial_touch_count??0)-i,s=(t.touch_count??0)-(t.aerial_touch_count??0);return[Ln("Ground",Ci(s)),Ln("Low air",Ci(a)),Ln("High air",Ci(i))].join("")}return""}function D_(t,e={}){const n=wD(e.breakdownClasses),i=TD(t),a=AD(i,n)||CD(t,n);return`
    ${Ln("Touches",Ci(t?.touch_count))}
    ${Ln("Ball advanced",Lu(t?.total_ball_advance_distance,0," uu"))}
    ${Ln("Ball traveled",Lu(t?.total_ball_travel_distance,0," uu"))}
    ${Ln("Ball retreated",Lu(t?.total_ball_retreat_distance,0," uu"))}
    ${a}
  `}const F_="subtr-actor-speed-flip-overlay-styles",RD=5882879,PD=16761180,LD=16185075,ND=150,ID=230,DD=220,FD=4;function uy(t){if(!t)return null;const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function kD(t,e){const n=uy(e);return n?t.players.find(i=>i.id===n)?.name??n:"Unknown"}function OD(t,e){return t.events.speed_flip.map(n=>{const i=kD(e,n.player),a=uy(n.player),s=e.frames[n.frame]?.time??n.time,r=n.confidence;return{id:`speed-flip:${n.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:n.frame,isTeamZero:n.is_team_0,playerId:a,playerName:i,position:{x:n.start_position[0],y:n.start_position[1],z:n.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function UD(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function BD(){if(document.getElementById(F_))return;const t=document.createElement("style");t.id=F_,t.textContent=`
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
  `,document.head.append(t)}function zD(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class HD{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,DD);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=FD;constructor(e,n,i,a){BD(),this.scene=e,this.container=n,this.markers=OD(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const n=UD(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+14),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.position.x,a.position.y,a.position.z).add(this.labelOffset);const u=zD(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=new at({color:e.quality>=.75?LD:e.isTeamZero?RD:PD,transparent:!0,opacity:.8,side:Je,depthWrite:!1,depthTest:!1}),a=new Aa(ND,ID,48),s=new ze(a,i);s.renderOrder=30,this.group.add(s);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,label:r};return this.views.set(e.id,o),o}}const $o=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],Nu=[{value:"both",label:"Pickup events"}],Wo=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],Xo=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function VD(t,e){return t===e||t==="ambiguous"}function GD(t,e){const n=e?.events.boost_pickups??[];return n.length===0?null:n.find(i=>{const a=Wt(i.player_id),s=i.reported_frame??i.frame;return a===t.player.id&&i.comparison==="both"&&s===t.event.frame&&VD(i.pad_type,t.pad.size)})??null}function dy(t={}){let e=null,n=null,i=null,a=null,s=null,r=null;const o=new Set($o.map(T=>T.value)),l=new Set(Nu.map(T=>T.value)),c=new Set(Wo.map(T=>T.value)),u=new Set(Xo.map(T=>T.value));let d=null,f=!1;function h(T,A,v,x){const R=document.createElement("div");R.className="boost-pickup-filter-group";const I=document.createElement("p");I.className="module-settings-group-title",I.textContent=T;const H=document.createElement("div");H.className="boost-pickup-filter-options";for(const B of A){const G=document.createElement("label");G.className="toggle";const U=document.createElement("input");U.type="checkbox",U.dataset.boostPickupFilter=x,U.dataset.boostPickupValue=B.value,U.addEventListener("change",()=>{U.checked?v.add(B.value):v.delete(B.value),m(s),t.refreshTimelineRanges?.(),t.rerenderCurrentState?.(),t.requestConfigSync?.()});const X=document.createElement("span");X.textContent=B.label,G.append(U,X),H.append(G)}return R.append(I,H),R}function _(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",a=document.createElement("div"),a.className="boost-pickup-filter-options",T.append(A,a),T}function g(T){if(a&&(a.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const A of T.players){const v=document.createElement("label");v.className="toggle";const x=document.createElement("input");x.type="checkbox",x.dataset.boostPickupPlayerId=A.id,x.addEventListener("change",()=>{d||(d=new Set(T.players.map(I=>I.id))),x.checked?d.add(A.id):d.delete(A.id),m(T),t.refreshTimelineRanges?.(),t.rerenderCurrentState?.(),t.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,v.append(x,R),a.append(v)}}function m(T){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const v=A.dataset.boostPickupFilter,x=A.dataset.boostPickupValue;A.checked=p(v,x)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const v=A.dataset.boostPickupPlayerId;A.checked=v?d?.has(v)??!0:!1}n&&(n.textContent=b(T))}}function p(T,A){if(!A)return!1;switch(T){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return u.has(A);default:return!1}}function b(T){const A=T?.players.length??0,v=d?d.size:A;if(o.size===0||l.size===0||c.size===0||u.size===0||d!==null&&d.size===0)return"Hidden";const R=[o.size<$o.length,l.size<Nu.length,c.size<Wo.length,u.size<Xo.length,d!==null&&v<A].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function w(T){if(d&&!d.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&u.has("unknown");const A=GD(T,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&u.has(A.field_half):!1}function y(T,A,v){if(T.clear(),!Array.isArray(v)){for(const R of A)T.add(R.value);return}const x=new Set(A.map(R=>R.value));for(const R of v)typeof R=="string"&&x.has(R)&&T.add(R)}function C(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...u],playerIds:d?[...d]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const A=T;y(o,$o,A.padTypes),y(l,Nu,A.comparisons),y(c,Wo,A.activities),y(u,Xo,A.fieldHalves),d=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(v=>typeof v=="string")):null,f=s===null&&d!==null,m(s),t.refreshTimelineRanges?.(),t.rerenderCurrentState?.(),t.requestConfigSync?.()}return{setup(T){s!==T.replay&&(s=T.replay,f?f=!1:d=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:C,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:u};return d&&(T.playerIds=d),T},includePickup:w,renderSettings(T,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const v=document.createElement("div");v.className="boost-pickup-filter-summary",n=document.createElement("strong"),n.className="metric-readout",v.append(n);const x=document.createElement("div");x.className="boost-pickup-filter-grid",x.append(h("Pad type",$o,o,"pad-type"),h("Activity",Wo,c,"activity"),h("Field half",Xo,u,"field-half"),_()),(A.showHeader??!1)&&e.append(v),e.append(x)}return g(T?.replay??null),m(T?.replay??null),e}}}function hn(t){return{id:t.id,label:t.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:t.getTimelineEvents,renderStats(e,n){const i=St(n.statsFrameLookup,e);return i?jt(i.players,a=>Bt(a.name,a.is_team_0,t.render(t.select(a),a))):""},renderFocusedPlayerStats(e,n,i){const a=Ut(i,n,e);return a?t.render(t.select(a),a):""}}}const $D=255;function fy(t){return t*100/$D}function Cn(t){return t==null?"?":fy(t).toFixed(0)}function WD(t,e){const n=Cn(t);if(t==null||e==null)return n;const i=Cn(t+e);return`${n} (${i})`}function Iu(t){t&&typeof t=="object"&&"dispose"in t&&typeof t.dispose=="function"&&t.dispose()}function XD(t){t&&(t.removeFromParent(),t.traverse(e=>{const n="geometry"in e?e.geometry:null;Iu(n);const i="material"in e?e.material:null;if(Array.isArray(i))for(const a of i)Iu(a);else Iu(i)}))}function YD(){let t=0,e=null;return{acquire(n){e||(e=PN(n.player.sceneState.scene,n.fieldScale)),t+=1},release(){t<=0||(t-=1,t===0&&(XD(e),e=null))}}}const k_=YD();function Oe(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function ge(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function sf(t,e=0){return ge(t,e,"%")}function hy(t,e,n=1,i=0){if(t===void 0||Number.isNaN(t))return sf(e,i);const a=ge(t,n,"s");return e===void 0||Number.isNaN(e)?a:`${a} (${sf(e,i)})`}function la(t,e,n=1,i=0){const a=t!==void 0&&e!==void 0&&!Number.isNaN(t)&&!Number.isNaN(e)&&e>0?t*100/e:void 0;return hy(t,a,n,i)}function qe(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}function Yn(t){const e=qe(t);return e===void 0?void 0:e*100}function py(t){return qe(t?.tracked_time)}function qD(t,e,n){const i=qe(t?.[e]);if(i!==void 0)return i;const a=py(t),s=qe(t?.[n]);if(!(a===void 0||a<=0||s===void 0))return s*100/a}function Qt(t,e,n){return hy(qe(t?.[n]),qD(t,e,n))}function O_(t,e,n){const i=qe(t?.[e]);if(i!==void 0)return i;const a=py(t),s=qe(t?.[n]);if(!(a===void 0||a<=0||s===void 0))return s/a}function U_(t){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${Qt(t,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${Qt(t,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${Qt(t,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${Qt(t,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${Qt(t,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${Qt(t,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${Qt(t,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${Qt(t,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${Qt(t,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function B_(t){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${Qt(t,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${Qt(t,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${Qt(t,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${Qt(t,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${Qt(t,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${ge(O_(t,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${ge(O_(t,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function ra(t,e){return la(qe(t?.[e]),qe(t?.tracked_time))}function z_(t){return t?t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function KD(t){const e=t&&t.first_man_stint_count>0?t.time_first_man/t.first_man_stint_count:void 0;return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${z_(t?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${z_(t?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${ra(t,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">First stints</span><span class="value">${Oe(t?.first_man_stint_count)}</span></div>
    <div class="stat-row"><span class="label">Avg first stint</span><span class="value">${ge(e,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest first stint</span><span class="value">${ge(t?.longest_first_man_stint_time,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${ra(t,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${ra(t,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${ra(t,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${ra(t,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${ra(t,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${ra(t,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${Oe(t?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${Oe(t?.lost_first_man_count)}</span></div>
  `}function jD(t){const e=t&&t.shots>0?t.goals*100/t.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${Oe(t?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${Oe(t?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${Oe(t?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${Oe(t?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Oe(t?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${sf(e)}</span></div>
  `}function ZD(t){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_backboard),2,"s")}</span></div>
  `}function JD(t){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_double_tap),2,"s")}</span></div>
  `}function QD(t){const e=t&&t.completed_pass_count>0?t.total_pass_distance/t.completed_pass_count:void 0,n=t&&t.completed_pass_count>0?t.total_pass_advance/t.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${Oe(t?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${Oe(t?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${ge(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${ge(n,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ge(t?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function eF(t){const e=t&&t.count>0?t.total_ball_speed/t.count:void 0,n=t&&t.count>0?t.total_pass_distance/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${ge(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${ge(t?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${ge(n,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_one_timer),2,"s")}</span></div>
  `}function H_(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(qe(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(qe(t?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function V_(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0,n=Yn(e),i=t&&t.count>0?t.cumulative_setup_duration/t.count:void 0,a=t&&t.count>0?t.cumulative_takeoff_to_touch_time/t.count:void 0,s=t&&t.count>0?t.cumulative_touch_height/t.count:void 0;return`
    <div class="stat-row"><span class="label">Plays</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(Yn(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(n,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ge(i,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ge(a,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ge(s,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_wall_aerial),2,"s")}</span></div>
  `}function G_(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0,n=t&&t.count>0?t.cumulative_takeoff_to_shot_time/t.count:void 0,i=t&&t.count>0?t.cumulative_shot_height/t.count:void 0;return`
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(Yn(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(Yn(e),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ge(n,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ge(i,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_wall_aerial_shot),2,"s")}</span></div>
  `}function tF(t){const e=t&&t.carry_count>0?t.average_horizontal_gap_sum/t.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${Oe(t?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ge(t?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ge(t?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ge(t?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ge(e,0)}</span></div>
  `}function nF(t){const e=t&&t.count>0?t.average_horizontal_gap_sum/t.count:void 0,n=t&&t.count>0?t.total_touch_count/t.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${Oe(t?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${Oe(t?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${ge(n,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${Oe(t?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ge(t?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ge(t?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ge(t?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ge(e,0)}</span></div>
  `}function iF(t){const e=t&&t.press_count>0?t.total_duration/t.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${Oe(t?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ge(t?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${ge(e,2,"s")}</span></div>
  `}function aF(t){const e=t&&t.whiff_count>0?t.cumulative_closest_approach_distance/t.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${Oe(t?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Beaten to ball</span><span class="value">${Oe(t?.beaten_to_ball_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${Oe(t?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${Oe(t?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${Oe(t?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${ge(qe(t?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${ge(qe(t?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${ge(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_whiff),2,"s")}</span></div>
  `}function sF(t){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Oe(t?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Oe(t?.demos_taken)}</span></div>
  `}function rF(t){const e=t&&t.bumps_inflicted>0?t.cumulative_bump_strength/t.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Oe(t?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Oe(t?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${Oe(t?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${Oe(t?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${ge(qe(t?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${ge(qe(t?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${ge(e,0)}</span></div>
  `}function oF(t){return`
    <div class="stat-row"><span class="label">Refreshes</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Flip resets</span><span class="value">${Oe(t?.on_ball_count)}</span></div>
  `}function $_(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(qe(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(qe(t?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_musty),2,"s")}</span></div>
  `}function W_(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0,n=t&&t.count>0?t.cumulative_setup_duration/t.count:void 0,i=t&&t.count>0?t.cumulative_ball_speed_change/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(qe(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ge(n,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${ge(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_flick),2,"s")}</span></div>
  `}function X_(t){const e=t&&t.count>0?t.cumulative_quality/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(qe(t?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(qe(t?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function Y_(t){const e=t&&t.count>0?t.cumulative_quality/t.count:void 0,n=Yn(t?.last_quality),i=Yn(e),a=Yn(t?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(n,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_half_flip),2,"s")}</span></div>
  `}function q_(t){const e=t&&t.count>0?t.cumulative_quality/t.count:void 0,n=Yn(t?.last_quality),i=Yn(e),a=Yn(t?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(n,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(qe(t?.time_since_last_wavedash),2,"s")}</span></div>
  `}function K_(t){const e=t&&t.tracked_time>0?fy(t.boost_integral/t.tracked_time).toFixed(0):"?",n=qe(t?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${WD(t?.amount_collected,t?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${Cn(t?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${Cn(t?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${Cn(t?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${Cn(t?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${Cn(t?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${Cn(t?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${Cn(t?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${Cn(t?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${t?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${t?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${t?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${t?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${Cn(t?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${la(qe(t?.time_zero_boost),n)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${la(qe(t?.time_boost_0_25),n)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${la(qe(t?.time_boost_25_50),n)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${la(qe(t?.time_boost_50_75),n)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${la(qe(t?.time_boost_75_100),n)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${la(qe(t?.time_hundred_boost),n)}</span></div>
  `}function lF(t,e=dy({refreshTimelineRanges:t.refreshTimelineRanges,rerenderCurrentState:t.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(n){e.setup(n)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(n){return rD(n.statsTimeline,n.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(n){e.applyConfig(n)},includeBoostPickupAnimationPickup(n){return e.includePickup(n)},renderStats(n,i){const a=St(i.statsFrameLookup,n);return a?jt(a.players,s=>Bt(s.name,s.is_team_0,K_(s.boost))):""},renderFocusedPlayerStats(n,i,a){const s=Ut(a,i,n);return s?K_(s.boost):""},renderSettings(n){return e.renderSettings(n,{showHeader:!0})}}}function cF(){return hn({id:"core",label:"Core",select:t=>t.core,render:t=>jD(t)})}function uF(){return hn({id:"backboard",label:"Backboard",select:t=>t.backboard,render:t=>ZD(t),getTimelineEvents(t){return DI(t.statsTimeline,t.replay)}})}function dF(){let t=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){t=new hI(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){t?.dispose(),t=null},onBeforeRender(e){t?.update(e.currentTime)},renderStats(e,n){const i=St(n.statsFrameLookup,e);return i?jt(i.players,a=>Bt(a.name,a.is_team_0,H_(a.ceiling_shot),a.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,n,i){const a=Ut(i,n,e);return a?H_(a.ceiling_shot):""}}}function fF(){return{id:"wall-aerial",label:"Wall-to-Air Setup",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,V_(i.wall_aerial),i.wall_aerial?.is_last_wall_aerial?'<span class="role-indicator role-forward">Last Wall-to-Air Setup</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?V_(i.wall_aerial):""}}}function hF(){return{id:"wall-aerial-shot",label:"Wall Aerial Shot",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,G_(i.wall_aerial_shot),i.wall_aerial_shot?.is_last_wall_aerial_shot?'<span class="role-indicator role-forward">Last Wall Aerial Shot</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?G_(i.wall_aerial_shot):""}}}function pF(){return hn({id:"ball-carry",label:"Ball Carry",select:t=>t.ball_carry,render:t=>tF(t)})}function mF(){return hn({id:"air-dribble",label:"Air Dribble",select:t=>t.air_dribble,render:t=>nF(t)})}function _F(){return hn({id:"dodge-reset",label:"Dodge Refresh",select:t=>t.dodge_reset,render:t=>oF(t)})}function gF(){return hn({id:"double-tap",label:"Double Tap",select:t=>t.double_tap,render:t=>JD(t)})}function vF(){return hn({id:"pass",label:"Pass",select:t=>t.pass,render:t=>QD(t)})}function yF(){return hn({id:"one-timer",label:"One-timer",select:t=>t.one_timer,render:t=>eF(t)})}function bF(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,$_(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?$_(i.musty_flick):""}}}function xF(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,W_(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?W_(i.flick):""}}}function SF(){let t=null;return{id:"speed-flip",label:"Speed Flip",setup(e){t=new HD(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){t?.dispose(),t=null},onBeforeRender(e){t?.update(e.currentTime)},renderStats(e,n){const i=St(n.statsFrameLookup,e);return i?jt(i.players,a=>Bt(a.name,a.is_team_0,X_(a.speed_flip),a.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,n,i){const a=Ut(i,n,e);return a?X_(a.speed_flip):""}}}function wF(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,Y_(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?Y_(i.half_flip):""}}}function EF(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(t){return OI(t.statsTimeline,t.replay)},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,q_(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?q_(i.wavedash):""}}}function MF(t){let e=null,n=5,i="advancement",a=null,s=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(f){e=new SI(f.player.sceneState,f.player.container,f.replay,f.statsTimeline,{mode:i}),e.setDecaySeconds(n),u()},teardown(){e?.dispose(),e=null},onBeforeRender(f){e?.update(f.currentTime)},getTimelineEvents(f){return II(f.statsTimeline,f.replay)},getConfig(){return{decaySeconds:n,overlayMode:i,breakdownClasses:d()}},applyConfig(f){if(f&&typeof f=="object"&&!Array.isArray(f)){const h=f;if(typeof h.decaySeconds=="number"&&Number.isFinite(h.decaySeconds)&&(n=Math.max(1,Math.min(10,h.decaySeconds)),e?.setDecaySeconds(n)),(h.overlayMode==="markers"||h.overlayMode==="advancement")&&(i=h.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(h.breakdownClasses))for(const _ of h.breakdownClasses)c.includes(_)&&l.add(_)}u(),t.rerenderCurrentState()},renderStats(f,h){const _=St(h.statsFrameLookup,f);return _?jt(_.players,g=>Bt(g.name,g.is_team_0,D_(g.touch,{breakdownClasses:d()}),g.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(f,h,_){const g=Ut(_,h,f);return g?D_(g.touch,{breakdownClasses:d()}):""},renderSettings(){if(!a){a=document.createElement("div"),a.className="module-settings-card";const f=document.createElement("div");f.className="module-settings-header";const h=document.createElement("div"),_=document.createElement("p");_.className="module-settings-eyebrow",_.textContent="Touch markers";const g=document.createElement("h3");g.textContent="Touch decay",h.append(_,g),s=document.createElement("strong"),s.className="metric-readout",f.append(h,s);const m=document.createElement("label"),p=document.createElement("span");p.className="label",p.textContent="Keep each marker visible after the touch";const b=document.createElement("input");b.type="range",b.min="1",b.max="10",b.step="0.5",b.value=`${n}`,b.addEventListener("input",()=>{const G=Number(b.value);n=Number.isFinite(G)?Math.max(1,Math.min(10,G)):n,e?.setDecaySeconds(n),u(n),t.requestConfigSync?.()}),m.append(p,b);const w=document.createElement("div");w.className="module-settings-subgroup";const y=document.createElement("div");y.className="module-settings-header";const C=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",C.append(M,T),r=document.createElement("strong"),r.className="metric-readout",y.append(C,r);const A=document.createElement("div");A.className="module-settings-options";for(const G of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const U=document.createElement("label");U.className="toggle";const X=document.createElement("input");X.type="radio",X.name="touch-overlay-mode",X.dataset.overlayMode=G.mode,X.addEventListener("change",()=>{X.checked&&(i=G.mode,e?.setMode(i),u(),t.requestConfigSync?.())});const V=document.createElement("span");V.textContent=G.label,U.append(X,V),A.append(U)}w.append(y,A);const v=document.createElement("div");v.className="module-settings-subgroup";const x=document.createElement("div");x.className="module-settings-header";const R=document.createElement("div"),I=document.createElement("p");I.className="module-settings-eyebrow",I.textContent="Stat display";const H=document.createElement("h3");H.textContent="Touch breakdown",R.append(I,H),o=document.createElement("strong"),o.className="metric-readout",x.append(R,o);const B=document.createElement("div");B.className="module-settings-options";for(const G of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const U=document.createElement("label");U.className="toggle";const X=document.createElement("input");X.type="checkbox",X.dataset.breakdownClass=G.className,X.addEventListener("change",()=>{X.checked?l.add(G.className):l.delete(G.className),u(),t.rerenderCurrentState(),t.requestConfigSync?.()});const V=document.createElement("span");V.textContent=G.label,U.append(X,V),B.append(U)}v.append(x,B),a.append(f,m,w,v)}return u(),a}};function u(f){if(!a)return;const h=f??n,_=a.querySelector("input");_ instanceof HTMLInputElement&&(_.value=`${h}`),s&&(s.textContent=`${h.toFixed(1)}s`);for(const g of a.querySelectorAll("input[data-overlay-mode]"))g.checked=g.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const g of a.querySelectorAll("input[data-breakdown-class]")){const m=g.dataset.breakdownClass;g.checked=m?l.has(m):!1}if(o){const g=d();o.textContent=g.length>0?g.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function d(){return c.filter(f=>l.has(f))}}function TF(){return hn({id:"whiff",label:"Whiff",select:t=>t.whiff,render:t=>aF(t),getTimelineEvents(t){return VI(t.statsTimeline,t.replay)}})}function AF(t){let e=null,n=null;const i=new Set,a=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){s()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),t.rerenderCurrentState()},renderStats(o,l){const c=St(l.statsFrameLookup,o);return c?jt(c.players,u=>Bt(u.name,u.is_team_0,N_(u.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const u=Ut(c,l,o);return u?N_(u.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Movement breakdown",l.append(c,u),n=document.createElement("strong"),n.className="metric-readout",o.append(l,n);const d=document.createElement("div");d.className="module-settings-options";for(const f of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const h=document.createElement("label");h.className="toggle";const _=document.createElement("input");_.type="checkbox",_.dataset.breakdownClass=f.className,_.addEventListener("change",()=>{_.checked?i.add(f.className):i.delete(f.className),s(),t.rerenderCurrentState(),t.requestConfigSync?.()});const g=document.createElement("span");g.textContent=f.label,h.append(_,g),d.append(h)}e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(n){const o=r();n.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return a.filter(o=>i.has(o))}}function CF(){return hn({id:"powerslide",label:"Powerslide",select:t=>t.powerslide,render:t=>iF(t),getTimelineEvents(t){return kI(t.statsTimeline,t.replay)}})}function RF(){return hn({id:"rotation",label:"Rotation",select:t=>t.rotation,render:t=>KD(t)})}function PF(){return hn({id:"demo",label:"Demo",select:t=>t.demo,render:t=>sF(t)})}function LF(){return hn({id:"bump",label:"Bump",select:t=>t.bump,render:t=>rF(t),getTimelineEvents(t){return UI(t.statsTimeline,t.replay)}})}function NF(){let t=null,e=1;return{id:ly,label:"Relative Positioning",setup(n){e=n.fieldScale,t=new AN(n.player.sceneState.scene,n.replay,e)},teardown(){t?.dispose(),t=null},onBeforeRender(n){t?.update(n,e)},renderStats(n,i){const a=St(i.statsFrameLookup,n);return a?jt(a.players,s=>{const r=hD(i.replay,Wt(s.player_id),n),o=fD[r];return Bt(s.name,s.is_team_0,U_(s.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(n,i,a){const s=Ut(a,i,n);return s?U_(s.positioning):""}}}function IF(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(t){k_.acquire(t)},teardown(){k_.release()},onBeforeRender(){},getTimelineRanges(t){return dD(t.statsTimeline,t.replay)},renderStats(t,e){const n=St(e.statsFrameLookup,t);return n?jt(n.players,i=>Bt(i.name,i.is_team_0,B_(i.positioning))):""},renderFocusedPlayerStats(t,e,n){const i=Ut(n,e,t);return i?B_(i.positioning):""}}}function DF(t,e={}){return[cF(),uF(),dF(),fF(),hF(),gF(),yF(),vF(),pD(t),mD(),_D(),gD(),NF(),IF(),RF(),SF(),wF(),EF(),MF(t),TF(),xF(),bF(),_F(),mF(),lF(t,e.boostPickupFilters),pF(),AF(t),CF(),PF(),LF()]}function FF(t){const e={};for(const n of t)if(n.getConfig){if(Object.hasOwn(e,n.id))throw new Error(`Duplicate stats player config adapter id: ${n.id}`);e[n.id]=n.getConfig()}return e}function kF(t,e){for(const n of t)if(n.applyConfig){if(Object.hasOwn(e,n.id)){n.applyConfig(e[n.id]);continue}for(const i of n.aliases??[])if(Object.hasOwn(e,i)){n.applyConfig(e[i]);break}}}const OF=new Set(["player_id","name","is_team_0"]),UF=["is_last_","time_since_last_","frames_since_last_"];function BF(t){return t===null||typeof t=="number"||typeof t=="string"||typeof t=="boolean"||Array.isArray(t)}function zF(t,e){let n=t;for(const i of e){if(!n||typeof n!="object"||Array.isArray(n))return;n=n[i]}return n}function HF(t){return t==null?"--":typeof t=="number"?Number.isFinite(t)?Number.isInteger(t)?`${t}`:`${Number(t.toFixed(3))}`:"--":typeof t=="boolean"?t?"true":"false":Array.isArray(t)?t.length===0?"[]":JSON.stringify(t):`${t}`}function VF(t,e){if(UF.some(s=>t.startsWith(s)))return!0;const n=t.match(/^last_(.+)_time$/),i=t.match(/^last_(.+)_frame$/),a=n?.[1]??i?.[1];return a?`is_last_${a}`in e||`time_since_last_${a}`in e||`frames_since_last_${a}`in e:!1}function rf(t,e,n,i){if(!t||typeof t!="object"||Array.isArray(t))return;const a=t;for(const[s,r]of Object.entries(a)){if(e==="player"&&n.length===0&&OF.has(s)||VF(s,a))continue;const o=[...n,s];if(BF(r)){const l=`${e}:${o.join(".")}`;i.push({id:l,label:o.join("."),category:o[0]??e,scope:e,path:o,read(c){return zF(c,o)},format:HF});continue}rf(r,e,o,i)}}function GF(t){const e=new Set;return t.filter(n=>e.has(n.id)?!1:(e.add(n.id),!0))}function $F(t,e){const n=[];return t&&rf(t,"player",[],n),e&&rf(e,"team",[],n),GF(n).sort((i,a)=>i.label.localeCompare(a.label))}function WF(){return $F(G0(),Lr())}function Fl(t){return WF()}function my(t){return t.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function XF(t){return my(t).split(" ").filter(Boolean)}function YF(t,e){const n=XF(e);if(n.length===0)return 0;const i=my([t.scope,t.category,t.label,t.id,...t.path].join(" "));let a=0;for(const s of n){const r=i.indexOf(s);if(r<0)return null;a+=r}return a+i.length/1e3}function qF(t,e){return t.map((n,i)=>({definition:n,index:i,score:YF(n,e)})).filter(n=>n.score!==null).sort((n,i)=>n.score-i.score||n.index-i.index).map(n=>n.definition)}var Ot=Uint8Array,un=Uint16Array,vh=Int32Array,oc=new Ot([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),lc=new Ot([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),of=new Ot([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),_y=function(t,e){for(var n=new un(31),i=0;i<31;++i)n[i]=e+=1<<t[i-1];for(var a=new vh(n[30]),i=1;i<30;++i)for(var s=n[i];s<n[i+1];++s)a[s]=s-n[i]<<5|i;return{b:n,r:a}},gy=_y(oc,2),vy=gy.b,lf=gy.r;vy[28]=258,lf[258]=28;var yy=_y(lc,0),KF=yy.b,j_=yy.r,cf=new un(32768);for(var pt=0;pt<32768;++pt){var Mi=(pt&43690)>>1|(pt&21845)<<1;Mi=(Mi&52428)>>2|(Mi&13107)<<2,Mi=(Mi&61680)>>4|(Mi&3855)<<4,cf[pt]=((Mi&65280)>>8|(Mi&255)<<8)>>1}var qn=(function(t,e,n){for(var i=t.length,a=0,s=new un(e);a<i;++a)t[a]&&++s[t[a]-1];var r=new un(e);for(a=1;a<e;++a)r[a]=r[a-1]+s[a-1]<<1;var o;if(n){o=new un(1<<e);var l=15-e;for(a=0;a<i;++a)if(t[a])for(var c=a<<4|t[a],u=e-t[a],d=r[t[a]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)o[cf[d]>>l]=c}else for(o=new un(i),a=0;a<i;++a)t[a]&&(o[a]=cf[r[t[a]-1]++]>>15-t[a]);return o}),Gi=new Ot(288);for(var pt=0;pt<144;++pt)Gi[pt]=8;for(var pt=144;pt<256;++pt)Gi[pt]=9;for(var pt=256;pt<280;++pt)Gi[pt]=7;for(var pt=280;pt<288;++pt)Gi[pt]=8;var Ir=new Ot(32);for(var pt=0;pt<32;++pt)Ir[pt]=5;var jF=qn(Gi,9,0),ZF=qn(Gi,9,1),JF=qn(Ir,5,0),QF=qn(Ir,5,1),Du=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Tn=function(t,e,n){var i=e/8|0;return(t[i]|t[i+1]<<8)>>(e&7)&n},Fu=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},yh=function(t){return(t+7)/8|0},cc=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new Ot(t.subarray(e,n))},ek=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Hn=function(t,e,n){var i=new Error(e||ek[t]);if(i.code=t,Error.captureStackTrace&&Error.captureStackTrace(i,Hn),!n)throw i;return i},tk=function(t,e,n,i){var a=t.length,s=0;if(!a||e.f&&!e.l)return n||new Ot(0);var r=!n,o=r||e.i!=2,l=e.i;r&&(n=new Ot(a*3));var c=function(Fe){var st=n.length;if(Fe>st){var N=new Ot(Math.max(st*2,Fe));N.set(n),n=N}},u=e.f||0,d=e.p||0,f=e.b||0,h=e.l,_=e.d,g=e.m,m=e.n,p=a*8;do{if(!h){u=Tn(t,d,1);var b=Tn(t,d+1,3);if(d+=3,b)if(b==1)h=ZF,_=QF,g=9,m=5;else if(b==2){var M=Tn(t,d,31)+257,T=Tn(t,d+10,15)+4,A=M+Tn(t,d+5,31)+1;d+=14;for(var v=new Ot(A),x=new Ot(19),R=0;R<T;++R)x[of[R]]=Tn(t,d+R*3,7);d+=T*3;for(var I=Du(x),H=(1<<I)-1,B=qn(x,I,1),R=0;R<A;){var G=B[Tn(t,d,H)];d+=G&15;var w=G>>4;if(w<16)v[R++]=w;else{var U=0,X=0;for(w==16?(X=3+Tn(t,d,3),d+=2,U=v[R-1]):w==17?(X=3+Tn(t,d,7),d+=3):w==18&&(X=11+Tn(t,d,127),d+=7);X--;)v[R++]=U}}var V=v.subarray(0,M),Q=v.subarray(M);g=Du(V),m=Du(Q),h=qn(V,g,1),_=qn(Q,m,1)}else Hn(1);else{var w=yh(d)+4,y=t[w-4]|t[w-3]<<8,C=w+y;if(C>a){l&&Hn(0);break}o&&c(f+y),n.set(t.subarray(w,C),f),e.b=f+=y,e.p=d=C*8,e.f=u;continue}if(d>p){l&&Hn(0);break}}o&&c(f+131072);for(var fe=(1<<g)-1,Y=(1<<m)-1,ue=d;;ue=d){var U=h[Fu(t,d)&fe],Se=U>>4;if(d+=U&15,d>p){l&&Hn(0);break}if(U||Hn(2),Se<256)n[f++]=Se;else if(Se==256){ue=d,h=null;break}else{var ye=Se-254;if(Se>264){var R=Se-257,pe=oc[R];ye=Tn(t,d,(1<<pe)-1)+vy[R],d+=pe}var O=_[Fu(t,d)&Y],q=O>>4;O||Hn(3),d+=O&15;var Q=KF[q];if(q>3){var pe=lc[q];Q+=Fu(t,d)&(1<<pe)-1,d+=pe}if(d>p){l&&Hn(0);break}o&&c(f+131072);var ne=f+ye;if(f<Q){var xe=s-Q,ve=Math.min(Q,ne);for(xe+f<0&&Hn(3);f<ve;++f)n[f]=i[xe+f]}for(;f<ne;++f)n[f]=n[f-Q]}}e.l=h,e.p=ue,e.b=f,e.f=u,h&&(u=1,e.m=g,e.d=_,e.n=m)}while(!u);return f!=n.length&&r?cc(n,0,f):n.subarray(0,f)},li=function(t,e,n){n<<=e&7;var i=e/8|0;t[i]|=n,t[i+1]|=n>>8},Ys=function(t,e,n){n<<=e&7;var i=e/8|0;t[i]|=n,t[i+1]|=n>>8,t[i+2]|=n>>16},ku=function(t,e){for(var n=[],i=0;i<t.length;++i)t[i]&&n.push({s:i,f:t[i]});var a=n.length,s=n.slice();if(!a)return{t:xy,l:0};if(a==1){var r=new Ot(n[0].s+1);return r[n[0].s]=1,{t:r,l:1}}n.sort(function(C,M){return C.f-M.f}),n.push({s:-1,f:25001});var o=n[0],l=n[1],c=0,u=1,d=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=a-1;)o=n[n[c].f<n[d].f?c++:d++],l=n[c!=u&&n[c].f<n[d].f?c++:d++],n[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var f=s[0].s,i=1;i<a;++i)s[i].s>f&&(f=s[i].s);var h=new un(f+1),_=uf(n[u-1],h,0);if(_>e){var i=0,g=0,m=_-e,p=1<<m;for(s.sort(function(M,T){return h[T.s]-h[M.s]||M.f-T.f});i<a;++i){var b=s[i].s;if(h[b]>e)g+=p-(1<<_-h[b]),h[b]=e;else break}for(g>>=m;g>0;){var w=s[i].s;h[w]<e?g-=1<<e-h[w]++-1:++i}for(;i>=0&&g;--i){var y=s[i].s;h[y]==e&&(--h[y],++g)}_=e}return{t:new Ot(h),l:_}},uf=function(t,e,n){return t.s==-1?Math.max(uf(t.l,e,n+1),uf(t.r,e,n+1)):e[t.s]=n},Z_=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new un(++e),i=0,a=t[0],s=1,r=function(l){n[i++]=l},o=1;o<=e;++o)if(t[o]==a&&o!=e)++s;else{if(!a&&s>2){for(;s>138;s-=138)r(32754);s>2&&(r(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(r(a),--s;s>6;s-=6)r(8304);s>2&&(r(s-3<<5|8208),s=0)}for(;s--;)r(a);s=1,a=t[o]}return{c:n.subarray(0,i),n:e}},qs=function(t,e){for(var n=0,i=0;i<e.length;++i)n+=t[i]*e[i];return n},by=function(t,e,n){var i=n.length,a=yh(e+2);t[a]=i&255,t[a+1]=i>>8,t[a+2]=t[a]^255,t[a+3]=t[a+1]^255;for(var s=0;s<i;++s)t[a+s+4]=n[s];return(a+4+i)*8},J_=function(t,e,n,i,a,s,r,o,l,c,u){li(e,u++,n),++a[256];for(var d=ku(a,15),f=d.t,h=d.l,_=ku(s,15),g=_.t,m=_.l,p=Z_(f),b=p.c,w=p.n,y=Z_(g),C=y.c,M=y.n,T=new un(19),A=0;A<b.length;++A)++T[b[A]&31];for(var A=0;A<C.length;++A)++T[C[A]&31];for(var v=ku(T,7),x=v.t,R=v.l,I=19;I>4&&!x[of[I-1]];--I);var H=c+5<<3,B=qs(a,Gi)+qs(s,Ir)+r,G=qs(a,f)+qs(s,g)+r+14+3*I+qs(T,x)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&H<=B&&H<=G)return by(e,u,t.subarray(l,l+c));var U,X,V,Q;if(li(e,u,1+(G<B)),u+=2,G<B){U=qn(f,h,0),X=f,V=qn(g,m,0),Q=g;var fe=qn(x,R,0);li(e,u,w-257),li(e,u+5,M-1),li(e,u+10,I-4),u+=14;for(var A=0;A<I;++A)li(e,u+3*A,x[of[A]]);u+=3*I;for(var Y=[b,C],ue=0;ue<2;++ue)for(var Se=Y[ue],A=0;A<Se.length;++A){var ye=Se[A]&31;li(e,u,fe[ye]),u+=x[ye],ye>15&&(li(e,u,Se[A]>>5&127),u+=Se[A]>>12)}}else U=jF,X=Gi,V=JF,Q=Ir;for(var A=0;A<o;++A){var pe=i[A];if(pe>255){var ye=pe>>18&31;Ys(e,u,U[ye+257]),u+=X[ye+257],ye>7&&(li(e,u,pe>>23&31),u+=oc[ye]);var O=pe&31;Ys(e,u,V[O]),u+=Q[O],O>3&&(Ys(e,u,pe>>5&8191),u+=lc[O])}else Ys(e,u,U[pe]),u+=X[pe]}return Ys(e,u,U[256]),u+X[256]},nk=new vh([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),xy=new Ot(0),ik=function(t,e,n,i,a,s){var r=s.z||t.length,o=new Ot(i+r+5*(1+Math.ceil(r/7e3))+a),l=o.subarray(i,o.length-a),c=s.l,u=(s.r||0)&7;if(e){u&&(l[0]=s.r>>3);for(var d=nk[e-1],f=d>>13,h=d&8191,_=(1<<n)-1,g=s.p||new un(32768),m=s.h||new un(_+1),p=Math.ceil(n/3),b=2*p,w=function(rt){return(t[rt]^t[rt+1]<<p^t[rt+2]<<b)&_},y=new vh(25e3),C=new un(288),M=new un(32),T=0,A=0,v=s.i||0,x=0,R=s.w||0,I=0;v+2<r;++v){var H=w(v),B=v&32767,G=m[H];if(g[B]=G,m[H]=B,R<=v){var U=r-v;if((T>7e3||x>24576)&&(U>423||!c)){u=J_(t,l,0,y,C,M,A,x,I,v-I,u),x=T=A=0,I=v;for(var X=0;X<286;++X)C[X]=0;for(var X=0;X<30;++X)M[X]=0}var V=2,Q=0,fe=h,Y=B-G&32767;if(U>2&&H==w(v-Y))for(var ue=Math.min(f,U)-1,Se=Math.min(32767,v),ye=Math.min(258,U);Y<=Se&&--fe&&B!=G;){if(t[v+V]==t[v+V-Y]){for(var pe=0;pe<ye&&t[v+pe]==t[v+pe-Y];++pe);if(pe>V){if(V=pe,Q=Y,pe>ue)break;for(var O=Math.min(Y,pe-2),q=0,X=0;X<O;++X){var ne=v-Y+X&32767,xe=g[ne],ve=ne-xe&32767;ve>q&&(q=ve,G=ne)}}}B=G,G=g[B],Y+=B-G&32767}if(Q){y[x++]=268435456|lf[V]<<18|j_[Q];var Fe=lf[V]&31,st=j_[Q]&31;A+=oc[Fe]+lc[st],++C[257+Fe],++M[st],R=v+V,++T}else y[x++]=t[v],++C[t[v]]}}for(v=Math.max(v,R);v<r;++v)y[x++]=t[v],++C[t[v]];u=J_(t,l,c,y,C,M,A,x,I,v-I,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=m,s.p=g,s.i=v,s.w=R)}else{for(var v=s.w||0;v<r+c;v+=65535){var N=v+65535;N>=r&&(l[u/8|0]=c,N=r),u=by(l,u+1,t.subarray(v,N))}s.i=r}return cc(o,0,i+yh(u)+a)},ak=function(t,e,n,i,a){if(!a&&(a={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),r=new Ot(s.length+t.length);r.set(s),r.set(t,s.length),t=r,a.w=s.length}return ik(t,e.level==null?6:e.level,e.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,i,a)};function sk(t,e){return ak(t,e||{},0,0)}function Sy(t,e){return tk(t,{i:2},e,e)}var Q_=typeof TextEncoder<"u"&&new TextEncoder,df=typeof TextDecoder<"u"&&new TextDecoder,rk=0;try{df.decode(xy,{stream:!0}),rk=1}catch{}var ok=function(t){for(var e="",n=0;;){var i=t[n++],a=(i>127)+(i>223)+(i>239);if(n+a>t.length)return{s:e,r:cc(t,n-1)};a?a==3?(i=((i&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):a&1?e+=String.fromCharCode((i&31)<<6|t[n++]&63):e+=String.fromCharCode((i&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(i)}};function lk(t,e){var n;if(Q_)return Q_.encode(t);for(var i=t.length,a=new Ot(t.length+(t.length>>1)),s=0,r=function(c){a[s++]=c},n=0;n<i;++n){if(s+5>a.length){var o=new Ot(s+8+(i-n<<1));o.set(a),a=o}var l=t.charCodeAt(n);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++n)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return cc(a,0,s)}function wy(t,e){var n;if(df)return df.decode(t);var i=ok(t),a=i.s,n=i.r;return n.length&&Hn(8),a}const ck=["replayUrl","replay_url","replay"],uk=["r","replayUrlZ","replay_url_z"],dk=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function fk(t){const e=t.replaceAll("-","+").replaceAll("_","/"),n=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(n),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function hk(t){try{return wy(Sy(fk(t)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function pk(t,e){const n=new URLSearchParams(t);for(const i of ck){const a=n.get(i)?.trim();if(!a)continue;const s=new URL(a,e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}for(const i of uk){const a=n.get(i)?.trim();if(!a)continue;const s=new URL(hk(a),e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}return null}function mk(t,e){for(const n of e){const i=t.get(n)?.trim();if(i)return i}return null}function _k(t,e){const n=new URLSearchParams(t),i=mk(n,dk);if(i){const s=rh(i);return{kind:"ballchasing",url:nC(s),name:tC(s),fetchInit:{method:"POST"}}}const a=pk(t,e);return a?{kind:"url",url:a,name:gk(a)}:null}function gk(t){const n=t.pathname.replace(/\/+$/,"").split("/").pop();if(!n)return t.hostname||"remote replay";try{return decodeURIComponent(n)}catch{return n}}const ff=1,hf="cfg",eg="cfgDebug";function vk(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function yk(t){const e=t.replaceAll("-","+").replaceAll("_","/"),n=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(n),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function bk(t){return vk(sk(lk(JSON.stringify(t)),{level:9}))}function xk(t){let e;try{e=JSON.parse(wy(Sy(yk(t))))}catch(n){throw new Error(`Invalid stats player config: ${n instanceof Error?n.message:String(n)}`)}return Tk(e)}function Sk(t){const e=Ey(t);return e.selectedValue?xk(e.selectedValue):null}function Ey(t){const e=new URLSearchParams(bh(t.hash)),n=new URLSearchParams(t.search),i=e.getAll(hf),a=n.getAll(hf),s=i[0]?"hash":a[0]?"search":null,r=s==="hash"?i[0]:s==="search"?a[0]:null;return{search:t.search,hash:t.hash,searchParams:[...n.entries()],hashParams:[...e.entries()],searchValues:a,hashValues:i,selectedSource:s,selectedValue:r}}function wk(t){const e=new URLSearchParams(t.search),n=new URLSearchParams(bh(t.hash)),i=e.get(eg)??n.get(eg);return i===""||i==="1"||i==="true"}function Ek(t,e){const n=new URL(t.href),i=new URLSearchParams(bh(n.hash));return i.set(hf,bk(e)),n.hash=i.toString(),n}function bh(t){return t.startsWith("#")?t.slice(1):t}function Mk(t,e,n=120,i=100){const a=kl(t.viewport.width)??e.width,s=kl(t.viewport.height)??e.height,r=e.width/Math.max(1,a),o=e.height/Math.max(1,s),l=Math.max(8,e.width-n),c=Math.max(8,e.height-i);return{x:tg(t.x*r,8,l),y:tg(t.y*o,8,c)}}function Tk(t){if(!xn(t)||t.version!==ff)throw new Error("Unsupported stats player config version");return{version:ff,playback:Ck(t.playback),camera:Rk(t.camera),overlays:Lk(t.overlays),recording:Ak(t.recording),singletonWindows:Nk(t.singletonWindows),statsWindows:Ik(t.statsWindows),moduleConfigs:xn(t.moduleConfigs)?t.moduleConfigs:{}}}function Ak(t){return xn(t)?{fps:$t(t.fps),playbackRate:$t(t.playbackRate)}:{}}function Ck(t){return xn(t)?{currentTime:$t(t.currentTime),playing:ki(t.playing),rate:$t(t.rate),skipPostGoalTransitions:ki(t.skipPostGoalTransitions),skipKickoffs:ki(t.skipKickoffs)}:{}}function Rk(t){if(!xn(t))return{};const e={},n=t.mode==="follow"?"follow":t.mode==="free"?"free":void 0,i=t.freePreset==="overhead"?"overhead":t.freePreset==="side"?"side":t.freePreset===null?null:void 0,a=Ty(t.attachedPlayerId),s=$t(t.distanceScale),r=ki(t.ballCam),o=Pk(t.customSettings);return n!==void 0&&(e.mode=n),i!==void 0&&(e.freePreset=i),a!==void 0&&(e.attachedPlayerId=a),s!==void 0&&(e.distanceScale=s),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function Pk(t){if(t===null)return null;if(!xn(t))return;const e={},n=$t(t.fov),i=$t(t.height),a=$t(t.pitch),s=$t(t.distance),r=$t(t.stiffness),o=$t(t.swivelSpeed),l=$t(t.transitionSpeed);return n!==void 0&&(e.fov=n),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function Lk(t){const e=xn(t)?t:{};return{timelineEvents:Yo(e.timelineEvents),timelineRanges:Yo(e.timelineRanges),mechanics:Yo(e.mechanics),renderEffects:Yo(e.renderEffects),followedPlayerHud:ki(e.followedPlayerHud)??!1,boostPads:ki(e.boostPads)??!0,boostPickupAnimation:ki(e.boostPickupAnimation)??!1}}function Nk(t){return Array.isArray(t)?t.map(e=>!xn(e)||!Fk(e.id)?null:{id:e.id,placement:My(e.placement)}).filter(e=>e!==null):[]}function Ik(t){return Array.isArray(t)?t.map(e=>!xn(e)||typeof e.id!="string"||!kk(e.kind)?null:{id:e.id,kind:e.kind,placement:My(e.placement),playerId:Ty(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:Dk(e.entries)}).filter(e=>e!==null):[]}function Dk(t){return Array.isArray(t)?t.map(e=>!xn(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function My(t){const e=xn(t)?t:{},n=xn(e.viewport)?e.viewport:{};return{x:$t(e.x)??8,y:$t(e.y)??8,viewport:{width:kl(n.width)??1,height:kl(n.height)??1},zIndex:$t(e.zIndex),visible:ki(e.visible)??!0}}function Fk(t){return t==="camera"||t==="scoreboard"||t==="playback"||t==="recording"||t==="mechanics"||t==="event-playlist"||t==="mechanics-review"||t==="replay-loading"||t==="boost-pickups"||t==="touch-controls"}function kk(t){return t==="player"||t==="team"||t==="all-players"||t==="all-teams"||t==="goals-overview"||t==="ad-hoc"}function xn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function $t(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}function kl(t){const e=$t(t);return e!==void 0&&e>0?e:void 0}function ki(t){return typeof t=="boolean"?t:void 0}function Ty(t){return t===null?null:typeof t=="string"?t:void 0}function Yo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function tg(t,e,n){return Math.min(n,Math.max(e,t))}const Ay=2.25,Cy=4,Ok=100,Uk=["free","follow"];let te=null,Dn=null,Vt=null,Sa=null,wa=null,ns=null,Ol=null,ng=0;const pf=new Map,Ul=new Map,pr=new Map,uc=dy({refreshTimelineRanges(){Rs()},rerenderCurrentState(){te&&te.setBoostPickupAnimationEnabled(te.getState().boostPickupAnimationEnabled)},requestConfigSync(){je()}}),Wr=DF({rerenderCurrentState(){if(!te)return;const t=te.getState();Yr(t.frameIndex)},refreshTimelineRanges(){Rs()},requestConfigSync(){je()}},{boostPickupFilters:uc});let Oi=[],Kn=new Set,ks=new Set,_a=new Set,Os=new Set;const Bk=new Set(["ceiling-shot","fifty-fifty","pressure",ly,"absolute-positioning","speed-flip","touch"]),Ry="touch",zk=new Set(["module:touch","module:powerslide"]),ig=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],Hk="#d1d9e0",Vk=[{id:"core",label:"Shots, saves, assists",buildEvents(t){return t.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(t){return t.replay.timelineEvents.filter(e=>e.kind==="demo")}}],Gk=[];let Ui=null,gs,Py,Bl,ag,zl,mf,sg,rg,nr,ir,is,qo,Ou,og,_f,Ly,Ny,Iy,Dy,Fy,ky,Oy,gf,vf,yf,bf,xf,Sf,wf,Ef,Uy,ar,By,sr,Mf,hl,Tf,Hl,ga,Bi,Af,Cf,mr,_r,gr,zy,Pi,Vl,Dr,Fr,kr,Or,Ur,Br,zr,Hy,Vy,Gy,$y,Wy,Xy,Yy,vr,Rf,rr,qy,Ky,jy,Zy,en,Jy,Qy,Pf,pl,ml,_l,gl,vl,yl,dn,hi=null,fn,Ts,As,Lf,Nf,If,Df,Ff,eb,tb,nb,ib,Ko=null,va=Fl(),Gl=30,yr=1,mi=!0,$l=null,Gn=null,Ti=null,vs=!1,pa=null,$i=null,Wl=!0,Wi=null;const $k=["camera","scoreboard","playback","recording","mechanics","event-playlist","mechanics-review","replay-loading","boost-pickups","touch-controls"],Ea=new Map;let kt=null,bl=!1;function Wk(){return new Set([...Kn,...ks,...Os])}function ab(t){return t==="events"?Kn:t==="ranges"?ks:Os}function vi(){return!te||!Sa||!wa?null:{player:te,replay:te.replay,statsTimeline:Sa,statsFrameLookup:wa,fieldScale:te.options.fieldScale??1}}function Cs(){xh();const t=vi();if(!t)return;const e=Wk();Oi=Wr.filter(n=>e.has(n.id)),uc.setup(t);for(const n of Oi)n.setup(t);Ol=t.player.onBeforeRender(n=>{for(const i of Oi)Os.has(i.id)&&i.onBeforeRender(n)}),Xl(),Rs()}function sb(){for(const t of ty(Sa)){const e=AI(t);Kn.delete(e)&&_a.add(t)}}function xh(){Ol?.(),Ol=null,dc(),fc();for(const t of Oi)t.teardown();Oi=[]}function xl(t,e,n){const i=ab(e);if(n?i.add(t):i.delete(t),Cs(),Yi(),_i(),te){const a=te.getState();Yr(a.frameIndex)}Xi(),je()}function dc(){for(const t of pf.values())t();pf.clear()}function fc(){for(const t of Ul.values())t();Ul.clear()}function rb(){for(const t of pr.values())t();pr.clear()}function Sh(){pr.get("boost-pad-overlay")?.(),pr.delete("boost-pad-overlay"),!(!te||!mi)&&pr.set("boost-pad-overlay",te.addPlugin(_C()))}function Xk(){mi=!mi,Sh(),Yi(),je()}function Xl(){dc();const t=vi();if(!(!Dn||!t)){for(const e of Xr(t)){if(!e.active)continue;const n=e.buildTimelineEvents();n.length!==0&&pf.set(e.timelineKey,Dn.addEventSource(db(n),{id:e.timelineId,label:e.label}))}Dn.refreshEvents()}}function Rs(){fc();const t=vi();if(!(!Dn||!t)){for(const e of Oi)!ks.has(e.id)||!e.getTimelineRanges||Ul.set(e.id,Dn.addRangeSource(()=>e.getTimelineRanges?.(t)??[]));for(const e of Xr(t)){if(!e.active||!e.buildTimelineRanges)continue;const n=e.buildTimelineRanges();n.length!==0&&Ul.set(e.timelineKey,Dn.addRangeSource(n))}Dn.refreshRanges()}}function Xi(){const t=vi();if(!t){Pf.textContent="--";return}Pf.textContent=`${Yk(t)}`}function Yk(t){return t.replay.timelineEvents.filter(n=>n.kind==="goal").length+Xr(t).filter(n=>n.active).reduce((n,i)=>n+i.count,0)}function ee(t,e){const n=t.querySelector(e);if(!(n instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return n}function qk(t){return t.closest("[data-window-id]")?.dataset.windowId??null}function ob(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function lg(t,e){const n=t.style.getPropertyValue(e).trim(),i=getComputedStyle(t).getPropertyValue(e).trim(),a=n||i,s=Number.parseFloat(a);if(Number.isFinite(s))return s;const r=t.getBoundingClientRect();return e==="--window-y"?r.top:r.left}function lb(t){const e=Number.parseInt(t.style.zIndex,10);return{x:lg(t,"--window-x"),y:lg(t,"--window-y"),viewport:ob(),zIndex:Number.isFinite(e)?e:void 0,visible:!t.hidden}}function cb(t,e){const n=Mk(e,ob());t.style.setProperty("--window-x",`${n.x}px`),t.style.setProperty("--window-y",`${n.y}px`),t.hidden=!e.visible,e.zIndex!==void 0&&(t.style.zIndex=`${e.zIndex}`,Gl=Math.max(Gl,e.zIndex+1))}function Kk(){const t=[],e=Ui??document;for(const n of $k){const i=e.querySelector(`[data-window-id="${n}"]`);i&&t.push({id:n,placement:lb(i)})}return t}function ub(){return Wr.filter(t=>t.getConfig||t.applyConfig).map(t=>{const e={id:t.id};return t.id==="boost"&&(e.aliases=["boost-pickup-animation"]),t.getConfig&&(e.getConfig=()=>t.getConfig?.()),t.applyConfig&&(e.applyConfig=n=>t.applyConfig?.(n)),e})}function jk(){return FF(ub())}function Zk(t){kF(ub(),t)}function Jk(t){return{id:t.id,kind:t.kind,placement:lb(t.element),playerId:t.playerId,team:t.team,entries:t.entries.map(e=>({statId:e.statId,targetId:e.targetId}))}}function Qk(){const t=te?.getState();return{currentTime:t?.currentTime,playing:t?.playing,rate:t?.speed??Number(ga?.value??1),skipPostGoalTransitions:te?t?.skipPostGoalTransitionsEnabled:dn.checked,skipKickoffs:te?t?.skipKickoffsEnabled:fn.checked}}function eO(){const t=te?.getState();return{mode:t?.cameraViewMode,freePreset:Gn,attachedPlayerId:t?.attachedPlayerId,distanceScale:t?.cameraDistanceScale,ballCam:t?.ballCamEnabled,customSettings:t?.customCameraSettings}}function tO(){return{fps:Number(Ts?.value),playbackRate:Number(As?.value)}}function nO(){return{version:ff,playback:Qk(),camera:eO(),overlays:{timelineEvents:[...Kn],timelineRanges:[...ks],mechanics:[..._a],renderEffects:[...Os],followedPlayerHud:!1,boostPads:mi,boostPickupAnimation:te?.getState().boostPickupAnimationEnabled??!1},recording:tO(),singletonWindows:Kk(),statsWindows:[...Ea.values()].map(Jk),moduleConfigs:jk()}}function je(){vs||(pa!==null&&window.clearTimeout(pa),pa=window.setTimeout(()=>{pa=null;const t=Ek(new URL(window.location.href),nO());window.history.replaceState(window.history.state,"",t)},150))}function iO(t,e,n){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",t.search||"(empty)"),console.log("location.hash",t.hash||"(empty)"),console.table([...t.searchParams.map(([i,a])=>({source:"search",name:i,value:a})),...t.hashParams.map(([i,a])=>({source:"hash",name:i,value:a}))]),console.log("cfg selected source",t.selectedSource??"(none)"),console.log("cfg selected raw text",t.selectedValue??"(none)"),console.log("cfg selected raw length",t.selectedValue?.length??0),console.log("cfg search values",t.searchValues),console.log("cfg hash values",t.hashValues),t.hashValues.length>0&&t.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),n&&console.error("cfg decode/apply error",n),console.groupEnd()}function aO(t){const e=Ui??document;for(const n of t.singletonWindows){const i=e.querySelector(`[data-window-id="${n.id}"]`);i&&cb(i,n.placement)}}function sO(t){Kn=new Set(t.overlays.timelineEvents),ks=new Set(t.overlays.timelineRanges),_a=new Set(t.overlays.mechanics),sb(),Os=new Set(t.overlays.renderEffects),mi=t.overlays.boostPads,dn.checked=t.playback.skipPostGoalTransitions??dn.checked,fn.checked=t.playback.skipKickoffs??fn.checked,t.playback.rate!==void 0&&(ga.value=`${t.playback.rate}`),t.recording.fps!==void 0&&(Ts.value=`${t.recording.fps}`),t.recording.playbackRate!==void 0&&(As.value=`${t.recording.playbackRate}`),Zk(t.moduleConfigs),aO(t),WO(t.statsWindows),Yi(),_i(),Xi()}function rO(t,e,n){return{currentTime:t.currentTime,playing:t.playing,speed:t.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:n.overlays.boostPickupAnimation,skipPostGoalTransitionsEnabled:t.skipPostGoalTransitions,skipKickoffsEnabled:t.skipKickoffs}}function oO(t,e){if(!te||!Number.isFinite(t))return;kt&&(kt.currentClip=null),e!==null&&te.replay.players.some(i=>i.id===e)&&(te.setAttachedPlayer(e),te.setCameraViewMode("follow"),Gn=null),dn.checked=!1,fn.checked=!1,te.setState({currentTime:Math.max(0,t-Cy),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),je()}function lO(t){te&&(kt&&(kt.currentClip=null),dn.checked=!1,fn.checked=!1,te.setState({currentTime:oh(t),skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),je())}function db(t){return t.map(e=>({...e,seekTime:oh(e)}))}function cO(t){te&&(te.setState(rO(t.playback,t.camera,t)),Gn=t.camera.freePreset??null,t.camera.mode==="free"&&t.camera.freePreset&&te.setFreeCameraPreset(t.camera.freePreset),Sh(),Cs(),Yi(),_i(),Yr(te.getState().frameIndex))}function hc(t){t.style.zIndex=`${Gl++}`}function fb(t){const e=ee(Ui??document,`[data-window-id="${t}"]`);e.hidden=!1,hc(e),je()}function uO(t){const e=ee(Ui??document,`[data-window-id="${t}"]`);e.hidden=!e.hidden,e.hidden||hc(e),je()}function dO(t){const e=ee(Ui??document,`[data-window-id="${t}"]`);e.hidden=!0,je()}function br(t){mf.hidden=!t,zl.setAttribute("aria-label",t?"Close menu":"Open menu"),zl.setAttribute("aria-expanded",t?"true":"false")}function cg(){gs.click(),br(!1)}function fO(t){return t instanceof Element&&!!t.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function ug(t,e){t.addEventListener("pointerdown",n=>{if(!(n.target instanceof HTMLElement)||fO(n.target))return;const i=n.target.closest("[data-window-id]");if(!i||i.hidden)return;hc(i);const a=n.clientX,s=n.clientY,r=i.getBoundingClientRect(),o=n.pointerId;i.setPointerCapture(o),n.preventDefault();const l=u=>{const d=Math.max(8,Math.min(window.innerWidth-120,r.left+u.clientX-a)),f=Math.max(8,Math.min(window.innerHeight-100,r.top+u.clientY-s));i.style.setProperty("--window-x",`${d}px`),i.style.setProperty("--window-y",`${f}px`)},c=()=>{i.releasePointerCapture(o),i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),je()};i.addEventListener("pointermove",l),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c)},{signal:e})}function Yi(){Rf.replaceChildren();const t=[],e=[];for(const c of Wr){const u=Bk.has(c.id);!c.getTimelineEvents&&!c.getTimelineRanges&&!u||(c.getTimelineEvents&&t.push(Hu(c.id,zu(c,"events"),"events")),c.getTimelineRanges&&t.push(Hu(c.id,zu(c,"ranges"),"ranges")),u&&e.push(Hu(c.id,zu(c,"effects"),"effects")))}const n=te?.getState().boostPickupAnimationEnabled??!1,i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=n?"true":"false",i.setAttribute("aria-pressed",n?"true":"false"),i.addEventListener("click",()=>{const c=!(te?.getState().boostPickupAnimationEnabled??!1);te?.setBoostPickupAnimationEnabled(c),Cs(),Yi(),_i(),je()});const a=document.createElement("span");a.textContent="Boost pickup animation";const s=document.createElement("strong");s.textContent=n?"On":"Off",i.append(a,s),e.push(i);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=mi?"true":"false",r.setAttribute("aria-pressed",mi?"true":"false"),r.addEventListener("click",Xk);const o=document.createElement("span");o.textContent="Boost pad locations";const l=document.createElement("strong");l.textContent=mi?"On":"Off",r.append(o,l),e.push(r),Rf.append(vg("Timeline visualizations",t),vg("In-game visualizations",e))}function Yl(){ir.replaceChildren();const t=vi(),e=Xr(t);if(e.length===0){const u=document.createElement("p");u.className="stat-window-empty",u.textContent="No events loaded.",ir.append(u);return}const n=document.createElement("div");n.className="mechanics-actions";const i=document.createElement("button");i.type="button",i.className="module-summary-item",i.addEventListener("click",()=>{for(const u of e)u.setActive(!0);Cs(),Xl(),Rs(),Yl(),Yi(),_i(),Xi(),je()});const a=document.createElement("span");a.textContent="All events";const s=document.createElement("strong");s.textContent=`${e.length}`,i.append(a,s);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.addEventListener("click",()=>{for(const u of e)u.setActive(!1);Cs(),Xl(),Rs(),Yl(),Yi(),_i(),Xi(),je()});const o=document.createElement("span");o.textContent="No events";const l=document.createElement("strong");l.textContent="Off",r.append(o,l),n.append(i,r),ir.append(n);const c=hO(e);c&&ir.append(c)}function dg(){Yl()}function Xr(t){if(!t)return[];const e=[];for(const n of Vk){const i=n.buildEvents(t),a=i.length;a!==0&&e.push({id:n.id,playlistId:`replay:${n.id}`,timelineKey:`events:${n.id}`,timelineId:`events:${n.id}`,group:"Replay",label:n.label,count:a,active:Kn.has(n.id),buildTimelineEvents(){return i},buildPlaylistEvents(){return i},setActive(s){xl(n.id,"events",s)}})}for(const n of Wr.filter(i=>i.getTimelineEvents)){const i=n.getTimelineEvents?.(t)??[],a=i.length;a!==0&&e.push({id:n.id,playlistId:`module:${n.id}`,timelineKey:`module:${n.id}`,timelineId:`module:${n.id}`,group:"Stats",label:n.label,count:a,active:Kn.has(n.id),buildTimelineEvents(){return i},buildPlaylistEvents(){return i},setActive(s){xl(n.id,"events",s)}})}for(const n of Gk){const i=n.buildEvents(t),a=i.length;a!==0&&e.push({id:n.id,playlistId:`extra:${n.id}`,timelineKey:`extra:${n.id}`,timelineId:`extra:${n.id}`,group:"Stats",label:n.label,count:a,active:Kn.has(n.id),buildTimelineEvents(){return i},buildPlaylistEvents(){return i},setActive(s){xl(n.id,"events",s)}})}for(const n of ty(t.statsTimeline)){const i=CI(t.statsTimeline,t.replay,[n]),a=RI(t.statsTimeline,t.replay,[n]),s=KI(t.statsTimeline,t.replay,[n]),r=i.length+s.length;r!==0&&e.push({id:`mechanic:${n}`,playlistId:`mechanic:${n}`,timelineKey:`mechanic:${n}`,timelineId:`mechanic:${n}`,group:"Mechanics",label:Vi(n),count:r,active:_a.has(n),buildTimelineEvents(){return i},buildPlaylistEvents(){return a},buildTimelineRanges(){return s},setActive(o){o?_a.add(n):_a.delete(n),je()}})}return e.sort((n,i)=>n.label.localeCompare(i.label))}function hO(t){if(t.length===0)return null;const e=document.createElement("div");e.className="module-list mechanics-list mechanics-event-list",e.style.setProperty("--event-source-columns",`${pO(t.length)}`);for(const n of t){const i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=n.active?"true":"false",i.setAttribute("aria-pressed",n.active?"true":"false"),i.addEventListener("click",()=>{n.setActive(!n.active),Xl(),Rs(),Yl(),Xi()});const a=document.createElement("span");a.textContent=n.label;const s=document.createElement("strong");s.textContent=`${n.active?"On":"Off"} ${n.count}`,i.append(a,s),e.append(i)}return e}function pO(t){return window.innerWidth<640?1:window.innerWidth<900?t>=7?2:1:t>=13?3:t>=7?2:1}function mO(t){return[{id:"replay:goals",group:"Replay",label:"Goals",events:t.replay.timelineEvents.filter(n=>n.kind==="goal")}].filter(n=>n.events.length>0)}function _O(){const t=vi();if(!t)return[];const e=Xr(t).map(n=>({id:n.playlistId,group:n.group,label:n.label,events:n.buildPlaylistEvents()})).filter(n=>n.events.length>0);return[...mO(t),...e]}function wh(t){const e=t.map(n=>n.id);return $i===null?new Set(e.filter(n=>!zk.has(n))):new Set(e.filter(n=>$i?.has(n)))}function gO(t){const e=t.playerId??null,n=e&&te?te.replay.players.findIndex(i=>i.id===e):-1;return n>=0?ig[n%ig.length]:t.color??Hk}function vO(t){const e=wh(t);return t.filter(n=>e.has(n.id)).flatMap(n=>n.events.map((i,a)=>({key:`${n.id}:${i.id??`${i.kind}:${i.time}:${a}`}`,sourceId:n.id,sourceLabel:n.label,event:i,color:gO(i)}))).sort((n,i)=>n.event.time!==i.event.time?n.event.time-i.event.time:(n.event.label??n.sourceLabel).localeCompare(i.event.label??i.sourceLabel))}function yO(t,e){const n=wh(t);e(n),$i=n,Wi=null,Ps();const i=te?.getState();i&&Hr(i)}function Ps(){if(!is)return;is.replaceChildren();const t=_O();if(t.length===0){const g=document.createElement("p");g.className="stat-window-empty",g.textContent=te?"No events loaded.":"Load a replay to see events.",is.append(g);return}const e=wh(t),n=vO(t),i=document.createElement("div");i.className="event-playlist-toolbar";const a=document.createElement("details");a.className="event-playlist-filter",a.dataset.noDrag="true";const s=document.createElement("summary");s.textContent=`Filters ${e.size}/${t.length}`,a.append(s);const r=document.createElement("div");r.className="event-playlist-filter-panel";const o=document.createElement("div");o.className="event-playlist-filter-actions";const l=document.createElement("button");l.type="button",l.textContent="All",l.addEventListener("click",()=>{$i=new Set(t.map(m=>m.id)),Wi=null,Ps();const g=te?.getState();g&&Hr(g)});const c=document.createElement("button");c.type="button",c.textContent="None",c.addEventListener("click",()=>{$i=new Set,Wi=null,Ps()}),o.append(l,c),r.append(o);const u=new Map;for(const g of t){const m=u.get(g.group)??[];m.push(g),u.set(g.group,m)}for(const[g,m]of u){const p=document.createElement("section");p.className="event-playlist-filter-group";const b=document.createElement("h3");b.textContent=g,p.append(b);for(const w of m){const y=document.createElement("label");y.className="toggle event-playlist-filter-option";const C=document.createElement("input");C.type="checkbox",C.checked=e.has(w.id),C.addEventListener("change",()=>{yO(t,T=>{C.checked?T.add(w.id):T.delete(w.id)})});const M=document.createElement("span");M.textContent=`${w.label} (${w.events.length})`,y.append(C,M),p.append(y)}r.append(p)}a.append(r);const d=document.createElement("label");d.className="toggle event-playlist-follow";const f=document.createElement("input");f.type="checkbox",f.checked=Wl,f.addEventListener("change",()=>{Wl=f.checked;const g=te?.getState();g&&Hr(g,{forceScroll:!0})});const h=document.createElement("span");h.textContent="Auto-follow",d.append(f,h),i.append(a,d);const _=document.createElement("div");if(_.className="event-playlist-list",_.dataset.noDrag="true",n.length===0){const g=document.createElement("p");g.className="stat-window-empty",g.textContent="No event types selected.",_.append(g)}else for(const g of n){const m=document.createElement("button");m.type="button",m.className="event-playlist-item",m.dataset.eventKey=g.key,m.dataset.eventTime=`${g.event.time}`,m.style.setProperty("--event-color",g.color),m.addEventListener("click",()=>{lO(g.event)});const p=document.createElement("span");p.className="event-playlist-time",p.textContent=Rb(g.event.time);const b=document.createElement("span");b.className="event-playlist-main";const w=document.createElement("strong");w.textContent=g.event.label??g.sourceLabel;const y=document.createElement("span");y.textContent=[g.event.playerName??null,g.event.frame!==void 0?`frame ${g.event.frame}`:null,g.sourceLabel].filter(C=>!!C).join(" · "),b.append(w,y),m.append(p,b),_.append(m)}is.append(i,_)}function bO(t,e){const n=[...t.querySelectorAll(".event-playlist-item")];if(n.length===0)return null;let i=n[0]??null,a=Number.POSITIVE_INFINITY;for(const s of n){const r=Number(s.dataset.eventTime);if(!Number.isFinite(r))continue;const o=Math.abs(r-e);o<a&&(a=o,i=s)}return i}function Hr(t,e={}){const n=is?.querySelector(".event-playlist-list");if(!n)return;const i=bO(n,t.currentTime),a=i?.dataset.eventKey??null;a===Wi&&!e.forceScroll||(n.querySelectorAll(".event-playlist-item[data-active='true']").forEach(s=>{s.dataset.active="false"}),i&&(i.dataset.active="true",(Wl||e.forceScroll)&&i.scrollIntoView({block:"nearest"})),Wi=a)}function yn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function fg(t){return yn(t)&&(t.kind==="time"||t.kind==="frame")&&typeof t.value=="number"&&Number.isFinite(t.value)?{kind:t.kind,value:t.value}:null}function jo(t,e){if(t!=null){if(typeof t!="number"||!Number.isInteger(t)||!Number.isFinite(t)||t<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return t}}function hg(t,e){if(t!=null){if(typeof t!="string")throw new Error(`Review playlist page ${e} must be a string.`);return t}}function xO(t){if(t!=null){if(!yn(t))throw new Error("Review playlist page must be an object.");return{next:hg(t.next,"next"),previous:hg(t.previous,"previous"),total:jo(t.total,"total"),count:jo(t.count,"count"),limit:jo(t.limit,"limit"),offset:jo(t.offset,"offset")}}}function SO(t){if(!yn(t)||!Array.isArray(t.items))throw new Error("Review playlist must contain an items array.");const e=t.items.map((i,a)=>{if(!yn(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${a}.`);const s=fg(i.start),r=fg(i.end);if(!s||!r)throw new Error(`Review item ${a+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:s,end:r,label:typeof i.label=="string"?i.label:void 0,meta:yn(i.meta)?i.meta:void 0}}),n=Array.isArray(t.replays)?t.replays.map(i=>!yn(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:yn(i.locator)?i.locator:void 0,meta:yn(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof t.label=="string"?t.label:void 0,replays:n,items:e,page:xO(t.page),playback:t.playback,meta:t.meta}}function hb(t){let e;try{e=JSON.parse(t)}catch(n){throw new Error(`Invalid review playlist JSON: ${n instanceof Error?n.message:String(n)}`)}return SO(e)}function wO(){const t=new URLSearchParams(window.location.search);return t.get("reviewPlaylist")?.trim()||t.get("review")?.trim()||t.get("playlist")?.trim()||t.get("playlistUrl")?.trim()||null}function EO(t){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(t)}function pb(t,e){const n=t.startsWith("path:")?t.slice(5):t;if(/^https?:\/\//i.test(n)||n.startsWith("/@fs/"))return n;if(n.startsWith("/")){if(EO(n))return`/@fs${n}`;if(e){const i=new URL(e,window.location.href);if(i.origin!==window.location.origin)return new URL(n,i.origin).href}return n}return e?new URL(n,e).href:n}function pc(t,e){const n=e.replaysById.get(t.replay);if(n?.path)return n.path;if(yn(n?.locator)&&n.locator.kind==="path"&&typeof n.locator.path=="string")return n.locator.path;if(/^https?:\/\//i.test(t.replay)||t.replay.startsWith("/")||t.replay.startsWith("/@fs/")||t.replay.startsWith("path:"))return t.replay;throw new Error(`Review replay "${t.replay}" does not include a loadable path.`)}function mb(t,e){const n=e.replaysById.get(t.replay),a=(n?.path??pc(t,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return n?.label??a??"review replay"}function _b(t,e,n){const i=pc(t,e),a=pb(i,e.sourceUrl);return{name:mb(t,e),preparingStatus:"Loading review replay...",async readBytes(){const s=await fetch(a,{signal:n});if(!s.ok){const r=s.statusText?` ${s.statusText}`:"";throw new Error(`Failed to fetch review replay from ${a} (${s.status}${r})`)}return new Uint8Array(await s.arrayBuffer())}}}function pg(t){if(t.kind==="time")return t.value;const e=Math.max(0,Math.trunc(t.value));return te?.replay.frames[e]?.time??te?.replay.frames.at(-1)?.time??0}function Sl(t){return typeof t=="number"&&Number.isFinite(t)?`${t.toFixed(2)}s`:"--"}function mg(t){return t.kind==="time"?Sl(t.value):`frame ${Math.trunc(t.value)}`}function ma(t,e){if(!yn(t.meta?.target))return null;const n=t.meta.target[e];return typeof n=="number"&&Number.isFinite(n)?n:null}function Uu(t,e){if(!yn(t.meta?.target))return null;const n=t.meta.target[e];return typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):null}function MO(t){const e=t.start.kind==="time"?t.start.value:null,n=t.end.kind==="time"?t.end.value:null,i=[`${mg(t.start)} to ${mg(t.end)}`];e!==null&&n!==null&&i.push(`${Math.max(0,n-e).toFixed(1)}s clip`);const a=ma(t,"startTime")??ma(t,"eventTime"),s=ma(t,"endTime")??ma(t,"eventTime");return e!==null&&a!==null&&i.push(`${Math.max(0,a-e).toFixed(1)}s preroll`),n!==null&&s!==null&&i.push(`${Math.max(0,n-s).toFixed(1)}s postroll`),i.join(" · ")}function TO(t){const e=ma(t,"eventTime"),n=ma(t,"startTime"),i=ma(t,"endTime"),a=Uu(t,"eventFrame"),s=Uu(t,"startFrame"),r=Uu(t,"endFrame"),o=n!==null&&i!==null&&Math.abs(i-n)>.001?`${Sl(n)} to ${Sl(i)}`:Sl(e??n??i),l=s!==null&&r!==null&&r!==s?`frames ${s}-${r}`:a!==null?`frame ${a}`:s!==null?`frame ${s}`:null;return[o,l].filter(c=>c&&c!=="--").join(" · ")||"--"}function kf(t,e){return t.label??t.meta?.mechanicLabel??`Review item ${e+1}`}function gb(t){return typeof t.meta?.playerId=="string"?t.meta.playerId:yn(t.meta?.target)&&typeof t.meta.target.playerId=="string"?t.meta.target.playerId:null}function AO(t){if(typeof t.meta?.playerName=="string"&&t.meta.playerName.trim())return t.meta.playerName;const e=gb(t);return e?te?.replay.players.find(n=>n.id===e)?.name??e:"--"}function _g(t){return typeof t.meta?.mechanicLabel=="string"&&t.meta.mechanicLabel.trim()?t.meta.mechanicLabel:typeof t.meta?.mechanic=="string"?Vi(t.meta.mechanic):"--"}function Of(t){return typeof t=="string"&&t.trim()?t.replaceAll("_"," "):"unreviewed"}function vb(t){if(!t)return null;if(typeof t.meta?.reviewEndpoint=="string"&&t.meta.reviewEndpoint)return t.meta.reviewEndpoint;const e=typeof t.meta?.eventId=="string"&&t.meta.eventId?t.meta.eventId:t.id;return e?`/api/v1/mechanics/events/${encodeURIComponent(e)}/reviews`:null}function CO(){const t=new URLSearchParams(window.location.search),e=t.get("reviewToken")??t.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function nn(t){_f&&(_f.textContent=t)}function yb(t){const e=new Map;for(const n of t.manifest.items)e.has(n.replay)||e.set(n.replay,n);return e}function RO(t){const e=new Map;for(const n of t.manifest.items)e.set(n.replay,(e.get(n.replay)??0)+1);return e}function PO(t){const e=RO(t);for(const[n,i]of yb(t)){let a="",s=n;try{a=pc(i,t),s=mb(i,t)}catch{s=t.replaysById.get(n)?.label??n}t.replayLoadStates.set(n,{replayId:n,label:s,path:a,clipCount:e.get(n)??0,status:"idle",progress:null,error:null})}}function Zo(t,e,n){const i=t.replayLoadStates.get(e)??{replayId:e,label:e,path:"",clipCount:0,status:"idle",progress:null,error:null};t.replayLoadStates.set(e,{...i,...n});const a=t.manifest.items[t.currentIndex];t.loading&&a?.replay===e&&n.progress&&(en.textContent=ac(n.progress),hi?.update(n.progress)),kt===t&&bb(t)}function LO(t){if(!t)return"";const e=ac(t);if(t.processedFrames!==void 0){const n=t.totalFrames!==void 0?` / ${t.totalFrames}`:"";return`${e} (${t.processedFrames}${n} frames)`}if(t.processedChunks!==void 0){const n=t.totalChunks!==void 0?` / ${t.totalChunks}`:"";return`${e} (${t.processedChunks}${n} chunks)`}return e}function NO(t){return t.status==="idle"?"Pending":t.status==="loading"?LO(t.progress)||"Loading":t.status==="loaded"?"Loaded":t.error?`Failed: ${t.error}`:"Failed"}function IO(t){if(t.status==="loaded")return 1;const e=t.progress?.progress;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function bb(t){if(!wf||!Ef||!ar)return;const e=t?Array.from(t.replayLoadStates.values()):[],n=e.filter(o=>o.status==="loaded").length,i=e.filter(o=>o.status==="loading").length,a=e.filter(o=>o.status==="error").length,s=e.filter(o=>o.status==="idle").length,r=e.length===0?"0 replays":`${n}/${e.length} loaded${i>0?`, ${i} loading`:""}${a>0?`, ${a} failed`:""}`;if(wf.textContent=r,Ef.textContent=r,Uy.textContent=e.length===0?"No playlist":i>0?`${i} active, ${s} pending`:a>0?`${a} failed`:t?.preloading?`Background queue, ${s} pending`:n===e.length?"Complete":`${s} pending`,ar.replaceChildren(),!t||e.length===0){const o=document.createElement("p");o.className="stat-window-empty",o.textContent="No replay sources.",ar.append(o);return}for(const o of e){const l=document.createElement("div");l.className=`mechanics-review-replay-load ${o.status}`;const c=document.createElement("div");c.className="mechanics-review-replay-load-main";const u=document.createElement("span");u.className="mechanics-review-replay-load-title",u.textContent=o.label;const d=document.createElement("span");d.className="mechanics-review-replay-load-meta",d.textContent=[o.replayId,`${o.clipCount} ${o.clipCount===1?"clip":"clips"}`,o.path].filter(Boolean).join(" · "),c.append(u,d);const f=document.createElement("strong");f.className="mechanics-review-replay-load-status",f.textContent=NO(o);const h=document.createElement("div");h.className="mechanics-review-replay-load-progress";const _=document.createElement("span");_.style.width=`${Math.round(IO(o)*100)}%`,h.append(_),l.append(c,f,h),ar.append(l)}}function DO(t,e){t.preloading||(t.preloading=!0,(async()=>{try{for(const[n,i]of yb(t)){if(n===e)continue;const a=t.replayLoadStates.get(n);if(!(a?.status==="loaded"||a?.status==="loading"))try{await xb(i,t)}catch{}}}finally{t.preloading=!1}})())}function xb(t,e){const n=e.replayLoadCache.get(t.replay);if(n)return n;const i=_b(t,e);Zo(e,t.replay,{label:i.name,path:pc(t,e),status:"loading",progress:null,error:null});const a=Promise.resolve().then(async()=>{const s=await i.readBytes();return X0(s,{reportEveryNFrames:100,onProgress(r){Zo(e,t.replay,{status:"loading",progress:r,error:null})}})}).then(s=>(Zo(e,t.replay,{status:"loaded",progress:null,error:null}),s)).catch(s=>{throw e.replayLoadCache.delete(t.replay),Zo(e,t.replay,{status:"error",error:s instanceof Error?s.message:String(s)}),s});return e.replayLoadCache.set(t.replay,a),a}function Ls(){if(!sr)return;const t=kt,e=t?.manifest.items??[],n=t?e[t.currentIndex]??null:null,i=e.length>0;By.textContent=`${e.length} item${e.length===1?"":"s"}`,Ly.textContent=i&&t?`${t.currentIndex+1} / ${e.length}`:"0 / 0",Ny.textContent=n?kf(n,t?.currentIndex??0):"No candidate selected",Iy.textContent=n?_g(n):"--",Dy.textContent=n?AO(n):"--",Fy.textContent=n?MO(n):"--",ky.textContent=n?TO(n):"--",Oy.textContent=n?.meta?.reason??"--",gf.disabled=!t||t.loading||t.currentIndex<=0,vf.disabled=!t||t.loading||!t.currentClip,yf.disabled=!t||t.loading||t.currentIndex>=e.length-1;const a=!t||t.loading||vb(n)===null;if(bf.disabled=a,xf.disabled=a,Sf.disabled=a,bb(t),sr.replaceChildren(),!t||e.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No review playlist loaded.",sr.append(s);return}e.forEach((s,r)=>{const o=document.createElement("button");o.type="button",o.className="mechanics-review-item",o.dataset.active=r===t.currentIndex?"true":"false",o.disabled=t.loading,o.addEventListener("click",()=>{ql(r)});const l=document.createElement("span");l.textContent=kf(s,r);const c=document.createElement("strong");c.textContent=[_g(s),Of(s.meta?.reviewStatus)].join(" · "),o.append(l,c),sr.append(o)})}async function Sb(t,e){const n=new Map;for(const i of t.replays??[])n.set(i.id,i);kt={manifest:t,sourceUrl:e,replaysById:n,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,preloading:!1,currentReplayId:null,currentClip:null},PO(kt),fb("replay-loading"),nn(t.label?`Loaded ${t.label}.`:"Loaded review playlist."),Ls(),t.items.length>0&&await ql(0)}async function gg(t){if(!t){nn("Enter a review playlist URL.");return}const e=pb(t,window.location.href);nn("Loading review playlist...");const n=await fetch(e);if(!n.ok){const a=n.statusText?` ${n.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${e} (${n.status}${a})`)}const i=hb(await n.text());await Sb(i,n.url||e)}async function ql(t){const e=kt,n=e?.manifest.items[t];if(!(!e||!n||e.loading)){e.loading=!0,e.currentIndex=t,Ls(),nn(`Loading ${kf(n,t)}...`);try{if(!te||e.currentReplayId!==n.replay){const r=_b(n,e),o=xb(n,e);await Ah(r,o),e.currentReplayId=n.replay}DO(e,n.replay);const i=Math.max(0,pg(n.start)),a=Math.min(te?.getState().duration??Number.POSITIVE_INFINITY,Math.max(i,pg(n.end)));if(!Number.isFinite(i)||!Number.isFinite(a)||a<=i)throw new Error("Review item has an empty playback range.");const s=gb(n);s&&te?.replay.players.some(r=>r.id===s)&&(te.setAttachedPlayer(s),te.setCameraViewMode("follow"),Gn=null),dn.checked=!1,fn.checked=!1,e.currentClip={startTime:i,endTime:a},te?.setState({currentTime:i,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),nn(`Playing ${i.toFixed(2)}s to ${a.toFixed(2)}s`)}catch(i){console.error("Failed to activate mechanics review item:",i),e.currentClip=null,nn(i instanceof Error?i.message:"Failed to load review item")}finally{e.loading=!1,Ls()}}}function FO(){const t=kt?.currentClip;!t||!te||te.setState({currentTime:t.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1})}async function Bu(t){const e=kt,n=e?.manifest.items[e.currentIndex]??null,i=vb(n);if(!e||!n||!i){nn("Current review item has no review endpoint.");return}nn(`Submitting ${Of(t)}...`);const a=await fetch(i,{method:"POST",headers:{"content-type":"application/json",...CO()},credentials:"same-origin",body:JSON.stringify({status:t})});if(!a.ok){let s=`${a.status}${a.statusText?` ${a.statusText}`:""}`;try{const r=await a.json();typeof r.error=="string"&&(s=r.error)}catch{}nn(`Review failed: ${s}`);return}n.meta=n.meta??{},n.meta.reviewStatus=t,nn(`Marked ${Of(t)}.`),Ls()}function kO(t){const e=kt?.currentClip;if(!e||!te||bl)return!1;const n=t.currentTime<e.startTime-.1,i=t.playing&&t.currentTime>=e.endTime-.025;if(!n&&!i)return!1;bl=!0;try{te.setState({currentTime:n?e.startTime:e.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),i&&nn(`Finished clip at ${e.endTime.toFixed(2)}s`)}finally{bl=!1}return!0}function vg(t,e){const n=document.createElement("section");n.className="module-summary-group";const i=document.createElement("h3");i.textContent=t;const a=document.createElement("div");return a.className="module-list",a.append(...e),n.append(i,a),n}function zu(t,e){const n={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge refresh","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[t.id]??t.label:n[`${t.id}:${e}`]??`${t.label} timeline`}function Hu(t,e,n){const i=ab(n),a=i.has(t),s=document.createElement("button");s.type="button",s.className="module-summary-item",s.dataset.active=a?"true":"false",s.setAttribute("aria-pressed",a?"true":"false"),s.addEventListener("click",()=>{xl(t,n,!i.has(t))});const r=document.createElement("span");r.textContent=e;const o=document.createElement("strong");return o.textContent=a?"On":"Off",s.append(r,o),s}function _i(){rr.replaceChildren();const t=vi(),e=Oi.filter(n=>n.id!=="boost"&&n.id!==Ry).map(n=>n.renderSettings?.(t)??null).filter(n=>n instanceof HTMLElement);if(e.length===0){rr.hidden=!0,yg(),xg();return}rr.hidden=!1,rr.append(...e),yg(),xg()}function yg(){if(!Mf)return;const t=vi(),e=uc.renderSettings(t,{showHeader:!1});Mf.replaceChildren(e)}function OO(t){return typeof t=="number"&&Number.isFinite(t)?`${Math.round(t)}`:"--"}function Kl(t=te?.getState().frameIndex??0){if(!nr)return;nr.replaceChildren();const e=wb(t),n=te?.replay??null;if(!e||!n){const a=document.createElement("p");a.className="scoreboard-empty",a.textContent="Load a replay to show the scoreboard.",nr.append(a);return}const i=document.createElement("div");i.className="scoreboard-scoreline",i.append(bg(e.team_zero?.core.goals,!0),UO(),bg(e.team_one?.core.goals,!1)),nr.append(i)}function UO(){const t=document.createElement("span");return t.className="scoreboard-divider",t.textContent="-",t}function bg(t,e){const n=document.createElement("strong");return n.className=`scoreboard-goal-value ${Fs(e)}`,n.textContent=OO(t),n}function xg(){if(!hl)return;const t=vi(),n=Wr.find(i=>i.id===Ry)?.renderSettings?.(t)??null;hl.replaceChildren(),n instanceof HTMLElement&&hl.append(n)}function BO(t){return va.find(e=>e.id===t)??null}function wb(t){return wa?St(wa,t):null}function Eh(t,e){return e==="blue"?t.team_zero??null:t.team_one??null}function Mh(t){return t==="blue"?"Blue":"Orange"}function Eb(t){const e=te?.replay.players.find(n=>n.id===t);return e?Fs(e.isTeamZero):null}function mc(t){return Fs(t==="blue")}function Mb(t,e){const n=te?.replay.players??[];for(const i of["blue","orange"]){const a=n.filter(r=>r.isTeamZero===(i==="blue"));if(a.length===0)continue;const s=document.createElement("optgroup");s.label=`${Mh(i)} team`;for(const r of a)s.append(new Option(r.name,r.id,r.id===e,r.id===e));t.append(s)}}function zO(t){return t.kind==="player"?Eb(t.playerId):t.kind==="team"?mc(t.team??"blue"):null}function HO(t,e){return t.scope==="player"?Eb(e):mc(e==="orange"?"orange":"blue")}function VO(t){switch(t){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}function Tb(t){return t==="player"||t==="team"}function GO(t){return t!=="goals-overview"}function Ab(t){switch(t){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}function $O(){const t=Ea.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+t)),y:Math.max(64,Math.min(window.innerHeight-240,96+t))}}function Yr(t=te?.getState().frameIndex??0,e={}){for(const n of Ea.values())e.preserveOpenPickers&&(n.pickerOpen||n.element.contains(document.activeElement))||jn(n,t)}function Cb(t,e){const n=e?.id??`stats-${yr++}`,i=Number.parseInt(n.replace(/^stats-/,""),10);Number.isFinite(i)&&(yr=Math.max(yr,i+1));const{x:a,y:s}=$O(),r=document.createElement("section");r.className="stats-window",r.dataset.windowId=n,r.style.setProperty("--window-x",`${a}px`),r.style.setProperty("--window-y",`${s}px`),e&&cb(r,e.placement);const o=document.createElement("header");o.className="stats-window-header";const l=document.createElement("div");l.className="stats-window-actions";const c=document.createElement("button");if(c.type="button",c.className="stats-window-action",c.textContent="Hide",l.append(c),Tb(t))o.classList.add("stats-window-header-actions-only"),o.append(l);else{const f=document.createElement("h2");f.textContent=VO(t),o.append(f,l)}const u=document.createElement("div");u.className="stats-window-body",r.append(o,u),Tf.append(r);const d={id:n,kind:t,entries:e?.entries.map(f=>({key:`${n}:${f.statId}:${f.targetId??"scope"}`,statId:f.statId,targetId:f.targetId}))??[],playerId:e?.playerId??te?.replay.players[0]?.id??null,team:e?.team??"blue",pickerOpen:!1,query:"",element:r,body:u};return c.addEventListener("click",()=>{r.hidden=!0,je()}),Ea.set(n,d),e||hc(r),br(!1),jn(d),je(),d}function WO(t){for(const e of Ea.values())e.element.remove();Ea.clear(),yr=1;for(const e of t)Cb(e.kind,e)}function jn(t,e=te?.getState().frameIndex??0){const n=document.activeElement,i=n instanceof HTMLInputElement&&n.dataset.statsWindowSearch===t.id,a=i?n.selectionStart:null,s=i?n.selectionEnd:null,r=i?n.selectionDirection:null;if(t.body.replaceChildren(),XO(t),GO(t.kind)&&(YO(t),qO(t)),ZO(t,e),i){const o=t.body.querySelector(`input[data-stats-window-search="${t.id}"]`);o?.focus({preventScroll:!0}),o&&a!==null&&s!==null&&o.setSelectionRange(a,s,r??"none")}}function XO(t){if(t.kind!=="player"&&t.kind!=="team")return;const e=document.createElement("div");e.className="stats-window-scope-row";const n=document.createElement("select");n.className="stats-window-scope-select";const i=zO(t);i&&n.classList.add(i),n.setAttribute("aria-label",t.kind==="player"?"Player stats target":"Team stats target"),t.kind==="player"?(Mb(n,t.playerId),n.value=t.playerId??"",n.addEventListener("change",()=>{t.playerId=n.value||null,jn(t),je()})):(n.append(new Option("Blue","blue",t.team==="blue",t.team==="blue"),new Option("Orange","orange",t.team==="orange",t.team==="orange")),n.value=t.team??"blue",n.addEventListener("change",()=>{t.team=n.value==="orange"?"orange":"blue",jn(t),je()})),e.append(n),t.body.append(e)}function YO(t){const e=document.createElement("button");if(e.type="button",e.className="stats-window-add-button",e.textContent="+",e.title="Add stat",e.setAttribute("aria-label","Add stat"),e.setAttribute("aria-expanded",String(t.pickerOpen)),Uf(e,()=>{t.pickerOpen=!t.pickerOpen,jn(t)}),Tb(t.kind)){t.body.querySelector(".stats-window-scope-row")?.append(e);return}const n=document.createElement("div");n.className="stats-window-toolbar",n.append(e),t.body.append(n)}function Uf(t,e){let n=!1;t.addEventListener("pointerdown",i=>{t.disabled||(n=!0,i.preventDefault(),e())}),t.addEventListener("click",()=>{if(n){n=!1;return}t.disabled||e()})}function qO(t){const e=document.createElement("div");if(e.className="stats-window-picker",e.hidden=!t.pickerOpen,e.hidden){t.body.append(e);return}const n=Ab(t.kind),i=document.createElement("input");i.type="search",i.placeholder="Search stats",i.value=t.query,i.dataset.statsWindowSearch=t.id;const a=document.createElement("div");a.className="stats-window-picker-list",i.addEventListener("input",()=>{t.query=i.value,Sg(t,a,n)}),Sg(t,a,n),e.append(i,a),t.body.append(e)}function Sg(t,e,n){e.replaceChildren();const i=n?va.filter(r=>r.scope===n):va,a=qF(i,t.query),s=new Map;for(const r of a){const o=s.get(r.category)??[];o.push(r),s.set(r.category,o)}for(const[r,o]of s){if(o.length<2)continue;const l=document.createElement("button");l.type="button",l.className="stats-window-picker-item",l.innerHTML=`<span>Add all ${r}</span><strong>${o.length}</strong>`,Uf(l,()=>{for(const c of o)wg(t,c);jn(t),je()}),e.append(l)}for(const r of a){const o=document.createElement("button");o.type="button",o.className="stats-window-picker-item",o.innerHTML=`<span>${r.label}</span><strong>${r.scope}</strong>`,o.disabled=t.kind!=="ad-hoc"&&t.entries.some(l=>l.statId===r.id),Uf(o,()=>{wg(t,r),jn(t),je()}),e.append(o)}if(a.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent=va.length===0?"No stats available.":"No matching stats.",e.append(r)}}function wg(t,e){const n=t.kind==="ad-hoc"?KO(e):void 0;t.entries.some(i=>i.statId===e.id&&i.targetId===n)||t.entries.push({key:`${t.id}:${e.id}:${n??"scope"}`,statId:e.id,targetId:n})}function KO(t){return t.scope==="player"?te?.replay.players[0]?.id??"":"blue"}function jO(t,e){const n=t.entries.findIndex(i=>i.key===e);n>=0&&t.entries.splice(n,1)}function ZO(t,e){if(t.kind==="goals-overview"){JO(t);return}const n=Ab(t.kind),i=t.entries.map(s=>({entry:s,definition:BO(s.statId)})).filter(s=>s.definition!==null&&(!n||s.definition.scope===n));if(i.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No stats added.",t.body.append(s);return}const a=wb(e);if(!a){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="Load a replay to show stats.",t.body.append(s);return}if(t.kind==="all-players"){QO(t,a,i);return}if(t.kind==="all-teams"){eU(t,a,i);return}if(t.kind==="player"){const s=t.playerId?a.players.find(r=>Wt(r.player_id)===t.playerId)??null:null;Mg(t,s,i);return}if(t.kind==="team"){Mg(t,Eh(a,t.team??"blue"),i);return}t.kind==="ad-hoc"&&tU(t,a,i)}function JO(t){const e=Sa,n=te?.replay??null;if(!e||!n){Eg(t,"Load a replay to show goal labels.");return}const i=[...e.events.goal_context??[]].sort((l,c)=>l.time-c.time),a=new Map;for(const l of e.events.goal_tags??[]){const c=a.get(l.goal_index)??[];c.push(l),a.set(l.goal_index,c)}for(const l of a.values())l.sort((c,u)=>c.kind.localeCompare(u.kind)||u.confidence-c.confidence);const s=new Set(i.map((l,c)=>c));for(const l of a.keys())s.add(l);const r=[...s].sort((l,c)=>l-c);if(r.length===0){Eg(t,"No goals loaded.");return}const o=document.createElement("div");o.className="goal-label-list";for(const l of r){const c=i[l]??null,u=a.get(l)??[],d=u[0]??null,f=c?.time??d?.time??0,h=c?.scorer??d?.scorer??null,_=h?Wt(h):null,g=h?n.players.find(v=>v.id===_)?.name??_:"Unknown scorer",m=c?.scoring_team_is_team_0??d?.scoring_team_is_team_0??null,p=document.createElement("section");p.className="goal-label-item",m!==null&&p.classList.add(Fs(m));const b=document.createElement("header"),w=document.createElement("h3");w.textContent=`Goal ${l+1}`;const y=document.createElement("span");y.textContent=`${Rb(f)} · ${g}`,b.append(w,y);const C=document.createElement("div");if(C.className="goal-label-tags",u.length===0){const v=document.createElement("span");v.className="goal-label-tag goal-label-tag-empty",v.textContent="Unlabeled",C.append(v)}else for(const v of u){const x=document.createElement("span");x.className="goal-label-tag",x.textContent=`${Vi(v.kind)} ${Math.round(v.confidence*100)}%`,C.append(x)}const M=document.createElement("div");M.className="goal-label-actions";const T=document.createElement("button");T.type="button",T.className="goal-label-watch",T.textContent="Watch",T.addEventListener("click",()=>{oO(f,_)});const A=document.createElement("button");A.type="button",A.textContent="Cue",A.addEventListener("click",()=>{te?.setState({currentTime:Math.max(0,f-Cy),playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),dn.checked=!1,fn.checked=!1,je()}),M.append(T,A),p.append(b,C,M),o.append(p)}t.body.append(o)}function Eg(t,e){const n=document.createElement("p");n.className="stat-window-empty",n.textContent=e,t.body.append(n)}function Rb(t){if(!Number.isFinite(t))return"--";const e=Math.floor(Math.max(0,t)/60),n=Math.max(0,t)-e*60;return`${e}:${n.toFixed(1).padStart(4,"0")}`}function Mg(t,e,n){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:a,definition:s}of n)i.append(_c(t,a,s,e?s.format(s.read(e)):"--"));t.body.append(i)}function QO(t,e,n){const i=document.createElement("div");i.className="stats-window-team-list";for(const a of["blue","orange"]){const s=e.players.filter(d=>d.is_team_0===(a==="blue"));if(s.length===0)continue;const r=document.createElement("section");r.className=`stats-window-team-group ${mc(a)}`;const o=document.createElement("header");o.className="stats-window-team-header";const l=document.createElement("h3");l.textContent=`${Mh(a)} team`;const c=document.createElement("span");c.textContent=`${s.length} player${s.length===1?"":"s"}`,o.append(l,c),r.append(o);const u=document.createElement("div");u.className="stats-window-entity-list";for(const d of s){const f=document.createElement("section");f.className=`stats-window-entity ${Fs(d.is_team_0)}`;const h=document.createElement("h4");h.className="stats-window-entity-title",h.textContent=d.name,f.append(h);for(const{entry:_,definition:g}of n)f.append(_c(t,_,g,g.format(g.read(d))));u.append(f)}r.append(u),i.append(r)}t.body.append(i)}function eU(t,e,n){const i=document.createElement("div");i.className="stats-window-entity-list";for(const a of["blue","orange"]){const s=Eh(e,a),r=document.createElement("section");r.className=`stats-window-entity ${mc(a)}`;const o=document.createElement("h3");o.className="stats-window-entity-title",o.textContent=Mh(a),r.append(o);for(const{entry:l,definition:c}of n)r.append(_c(t,l,c,s?c.format(c.read(s)):"--"));i.append(r)}t.body.append(i)}function tU(t,e,n){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:a,definition:s}of n){const r=nU(e,s,a.targetId);i.append(_c(t,a,s,r?s.format(s.read(r)):"--"))}t.body.append(i)}function nU(t,e,n){return e.scope==="player"?t.players.find(i=>Wt(i.player_id)===n)??t.players[0]??null:Eh(t,n==="orange"?"orange":"blue")}function _c(t,e,n,i){const a=document.createElement("div");a.className="stats-window-stat-row";const s=document.createElement("span");if(s.className="stats-window-stat-name",s.textContent=n.label,t.kind==="ad-hoc"){const l=document.createElement("select");l.className="stats-window-stat-target";const c=HO(n,e.targetId);c&&l.classList.add(c),n.scope==="player"?Mb(l,e.targetId):l.append(new Option("Blue","blue",e.targetId==="blue",e.targetId==="blue"),new Option("Orange","orange",e.targetId==="orange",e.targetId==="orange")),l.value=e.targetId??"",l.addEventListener("change",()=>{const u=l.value;if(t.entries.some(f=>f!==e&&f.statId===e.statId&&f.targetId===u)){jn(t);return}const d=t.entries.findIndex(f=>f.key===e.key);d>=0&&(t.entries[d]={key:`${t.id}:${e.statId}:${u}`,statId:e.statId,targetId:u}),jn(t),je()}),s.append(" ",l)}const r=document.createElement("span");r.className="stats-window-stat-value",r.textContent=i;const o=document.createElement("button");return o.type="button",o.className="stats-window-stat-remove",o.textContent="x",o.addEventListener("click",()=>{jO(t,e.key),jn(t),je()}),a.append(s,r,o),a}function gn(t,e="",n=0){return t===void 0||Number.isNaN(t)?"--":`${t.toFixed(n)}${e}`}function Pb(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}function iU(t){return!te||t===null?null:te.replay.players.find(e=>e.id===t)?.cameraSettings??null}function Lb(t){return{...Pb(),...iU(t.attachedPlayerId)??{},...t.customCameraSettings??{}}}function Tg(){return{fov:Number(Dr.value),height:Number(Fr.value),pitch:Number(kr.value),distance:Number(Or.value),stiffness:Number(Ur.value),swivelSpeed:Number(Br.value),transitionSpeed:Number(zr.value)}}function aU(t){Vl.hidden=!Pi.checked,Dr.disabled=!t,Fr.disabled=!t,kr.disabled=!t,Or.disabled=!t,Ur.disabled=!t,Br.disabled=!t,zr.disabled=!t}function Nb(t){const e=Pb(),n=t.fov??e.fov,i=t.height??e.height,a=t.pitch??e.pitch,s=t.distance??e.distance,r=t.stiffness??e.stiffness,o=t.swivelSpeed??e.swivelSpeed,l=t.transitionSpeed??e.transitionSpeed;Dr.value=`${n}`,Fr.value=`${i}`,kr.value=`${a}`,Or.value=`${s}`,Ur.value=`${r}`,Br.value=`${o}`,zr.value=`${l}`,Hy.textContent=gn(n,"",0),Vy.textContent=gn(i,"",0),Gy.textContent=gn(a,"",0),$y.textContent=gn(s,"",0),Wy.textContent=gn(r,"",2),Xy.textContent=gn(o,"",1),Yy.textContent=gn(l,"",2)}function Ag(t){Hl.disabled=!t,ga.disabled=!t,Bi.disabled=!t,dn.disabled=!t,fn.disabled=!t,Th(t?te?.getState():void 0)}function sU(t){switch(t){case"free":return Af;case"follow":return Cf}}function Th(t){const e=t?.cameraViewMode??"free",n=te!==null&&t!==void 0,i=(t?.attachedPlayerId??null)!==null;for(const a of Uk){const s=sU(a);s.disabled=!n||a==="follow"&&!i;const r=a===e;s.dataset.active=r?"true":"false",s.setAttribute("aria-pressed",r?"true":"false")}mr.disabled=!n,_r.disabled=!n,mr.dataset.active="false",_r.dataset.active="false",mr.setAttribute("aria-pressed","false"),_r.setAttribute("aria-pressed","false")}function Bf(t){Th(t);const e=te!==null&&t?.cameraViewMode==="follow"&&(t.attachedPlayerId??null)!==null;gr.disabled=!e,Pi.disabled=!e,aU(e&&t?.customCameraSettings!==null),vr.disabled=!e}function rU(t){Bi.replaceChildren(),Bi.append(new Option("Free camera",""));for(const e of t)Bi.append(new Option(`${e.name} (${e.isTeamZero?"Blue":"Orange"})`,e.id))}function oU(t){if(t<=0)return"--";const e=["B","KB","MB","GB"];let n=t,i=0;for(;n>=1024&&i<e.length-1;)n/=1024,i+=1;const a=i===0?0:n>=10?1:2;return`${n.toFixed(a)} ${e[i]}`}function lU(t){if(!t)return"No replay";if(t.error)return t.error;switch(t.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function Cg(){const t=Number(Ts.value),e=Number(As.value);return{fps:Number.isFinite(t)?Math.max(1,Math.min(120,Math.trunc(t))):60,playbackRate:Number.isFinite(e)?Math.max(.1,e):1}}function Pn(t=Vt?.getStatus()??null){const e=Vt!==null&&te!==null,n=t?.state??"idle",i=n==="recording"||n==="stopping",a=(Vt?.getRecording()??null)!==null;eb.textContent=lU(t),tb.textContent=`${(t?.elapsedSeconds??0).toFixed(1)}s`,nb.textContent=oU(t?.sizeBytes??0),ib.textContent=t?.mimeType||"WebM",Lf.disabled=!e||i,Nf.disabled=!e||i,If.disabled=!e||!i,Df.disabled=!a||i,Ff.disabled=!a||i,Ts.disabled=i,As.disabled=i}function cU(){const e=($l?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),n=new Date().toISOString().replace(/[:.]/g,"-");return`${e||"replay"}-${n}.webm`}function uU(t){const e=URL.createObjectURL(t),n=document.createElement("a");n.href=e,n.download=cU(),document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),0)}function Ib(t){const e=t?.attachedPlayerId??null;if(!te||t?.cameraViewMode!=="follow"||e===null){pl.textContent="Free camera",ml.textContent="--",_l.textContent="--",gl.textContent="--",vl.textContent="--",yl.textContent="--";return}const n=te.replay.players.find(a=>a.id===e);if(!n){pl.textContent="Unknown",ml.textContent="--",_l.textContent="--",gl.textContent="--",vl.textContent="--",yl.textContent="--";return}const i=Lb(t);pl.textContent=t.customCameraSettings===null?n.name:`${n.name} custom`,ml.textContent=gn(i.fov,"",0),_l.textContent=gn(i.height,"",0),gl.textContent=gn(i.pitch,"",0),vl.textContent=gn(i.distance,"",0),yl.textContent=gn(i.stiffness,"",2)}function Rg(t){if(kO(t))return;const e=performance.now();t.playing&&e-ng<Ok||(ng=e,qy.textContent=`${t.currentTime.toFixed(2)}s`,Ky.textContent=`${t.frameIndex}`,jy.textContent=`${t.duration.toFixed(2)}s`,Zy.textContent=t.playing?"Playing":"Paused",Hl.textContent=t.playing?"Pause":"Play",ga.value=`${t.speed}`,gr.value=`${t.cameraDistanceScale}`,zy.textContent=`${t.cameraDistanceScale.toFixed(2)}x`,Pi.checked=t.customCameraSettings!==null,Vl.hidden=!Pi.checked,Nb(Lb(t)),vr.checked=t.ballCamEnabled,Bi.value=t.attachedPlayerId??"",dn.checked=t.skipPostGoalTransitionsEnabled,fn.checked=t.skipKickoffsEnabled,Bl.hidden=!0,Bf(t),Ib(t),Yr(t.frameIndex,{preserveOpenPickers:!0}),Kl(t.frameIndex),Hr(t))}function dU(t){return uc.includePickup(t)}function fU(t){return{name:t.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await t.arrayBuffer())}}}function hU(t,e){return{name:t.name,preparingStatus:"Fetching replay...",async readBytes(){const n=await fetch(t.url,{...t.fetchInit,signal:e});if(!n.ok){const i=n.statusText?` ${n.statusText}`:"",a=t.kind==="ballchasing"&&[401,403,404].includes(n.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${t.url.href} (${n.status}${i})${a}`)}return new Uint8Array(await n.arrayBuffer())}}}async function Db(t){await Ah(t,Promise.resolve().then(()=>pU(t,e=>{en.textContent=ac(e),hi?.update(e)})))}async function pU(t,e){const n=await t.readBytes();return X0(n,{reportEveryNFrames:100,onProgress:e})}async function Ah(t,e){en.textContent=t.preparingStatus,gs.disabled=!0,hi?.show(t.name,t.preparingStatus),Ag(!1),Bf(),Bl.hidden=!1,ns&&(ns(),ns=null),xh(),te?.destroy(),te=null,Vt=null,$l=null,Dn=null,Sa=null,wa=null,va=Fl(),dc(),fc(),rb(),$i=null,Wi=null,Kl(),Xi(),dg(),Ps(),_i(),Pn();try{en.textContent="Parsing replay...",hi?.show(t.name,"Parsing replay...");const n=await e,{replay:i}=n;Sa=n.statsTimeline,wa=n.statsFrameLookup,va=Fl(null),sb(),Dn=iR({replayEventsLabel:"Replay",replayEvents:r=>db(LI(r.replay,Kn))});const a=UC({onStatusChange:Pn});Vt=a;const s=Ti;if(te=new ZA(Py,i,{initialPlaybackRate:s?.playback.rate,initialCameraDistanceScale:s?.camera.distanceScale??Ay,initialCustomCameraSettings:s?.camera.customSettings??null,initialAttachedPlayerId:s?.camera.attachedPlayerId??null,initialCameraViewMode:s?.camera.mode,initialBallCamEnabled:s?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:s?.overlays.boostPickupAnimation??!1,initialSkipPostGoalTransitionsEnabled:dn.checked,initialSkipKickoffsEnabled:fn.checked,plugins:[lC(),IC({includePickup:dU}),a,Dn]}),Sh(),Cs(),ns=te.subscribe(Rg),s){vs=!0;try{cO(s)}finally{vs=!1}}rU(i.players),Bl.hidden=!0,en.textContent=`Loaded ${t.name}`,$l=t.name,Jy.textContent=i.players.map(r=>r.name).join(", "),Qy.textContent=`${i.frameCount}`,Xi(),dg(),$i=null,Wi=null,Ps(),Ag(!0),Bf(te.getState()),Rg(te.getState()),Yr(te.getState().frameIndex),Kl(te.getState().frameIndex),Hr(te.getState(),{forceScroll:!0}),_i(),Pn(),hi?.hide()}catch(n){throw hi?.hide(),te?.destroy(),te=null,Vt=null,Pn(),n}finally{gs.disabled=!1}}function mU(t){let e;try{e=_k(window.location.search,window.location.href)}catch(n){console.error("Invalid replay URL:",n),en.textContent=n instanceof Error?n.message:"Invalid replay URL";return}e&&Db(hU(e,t)).catch(n=>{t.aborted||(console.error("Failed to load replay URL:",n),en.textContent=n instanceof Error?n.message:"Failed to load replay URL")})}function _U(t,e={}){Ko?.(),t.innerHTML=aR(Ay),Ui=t,hi=iN(t),gs=ee(t,"#replay-file"),Py=ee(t,"#viewport"),Bl=ee(t,"#empty-state"),ag=ee(t,"#empty-load-replay"),zl=ee(t,"#launcher-toggle"),mf=ee(t,"#launcher-menu"),sg=ee(t,"#load-replay-action"),rg=ee(t,"#floating-window-layer"),nr=ee(t,"#scoreboard-window-body"),ir=ee(t,"#mechanics-timeline-window-body"),is=ee(t,"#event-playlist-window-body"),qo=ee(t,"#mechanics-review-file"),Ou=ee(t,"#mechanics-review-url"),og=ee(t,"#mechanics-review-load-url"),_f=ee(t,"#mechanics-review-status"),Ly=ee(t,"#mechanics-review-index"),Ny=ee(t,"#mechanics-review-title"),Iy=ee(t,"#mechanics-review-mechanic"),Dy=ee(t,"#mechanics-review-player"),Fy=ee(t,"#mechanics-review-clip"),ky=ee(t,"#mechanics-review-event"),Oy=ee(t,"#mechanics-review-reason"),gf=ee(t,"#mechanics-review-prev"),vf=ee(t,"#mechanics-review-replay"),yf=ee(t,"#mechanics-review-next"),bf=ee(t,"#mechanics-review-confirm"),xf=ee(t,"#mechanics-review-reject"),Sf=ee(t,"#mechanics-review-uncertain"),wf=ee(t,"#mechanics-review-replay-load-summary"),Ef=ee(t,"#replay-loading-summary"),Uy=ee(t,"#replay-loading-active"),ar=ee(t,"#replay-loading-list"),By=ee(t,"#mechanics-review-count"),sr=ee(t,"#mechanics-review-list"),Mf=ee(t,"#boost-pickup-filters-window-body"),hl=ee(t,"#touch-controls-window-body"),Tf=ee(t,"#stats-window-layer"),Hl=ee(t,"#toggle-playback"),ga=ee(t,"#playback-rate"),Bi=ee(t,"#attached-player"),Af=ee(t,"#camera-view-free"),Cf=ee(t,"#camera-view-follow"),mr=ee(t,"#camera-view-overhead"),_r=ee(t,"#camera-view-side"),gr=ee(t,"#camera-distance"),zy=ee(t,"#camera-distance-readout"),Pi=ee(t,"#custom-camera-settings"),Vl=ee(t,"#camera-settings-controls"),Dr=ee(t,"#custom-camera-fov"),Fr=ee(t,"#custom-camera-height"),kr=ee(t,"#custom-camera-pitch"),Or=ee(t,"#custom-camera-distance"),Ur=ee(t,"#custom-camera-stiffness"),Br=ee(t,"#custom-camera-swivel-speed"),zr=ee(t,"#custom-camera-transition-speed"),Hy=ee(t,"#custom-camera-fov-readout"),Vy=ee(t,"#custom-camera-height-readout"),Gy=ee(t,"#custom-camera-pitch-readout"),$y=ee(t,"#custom-camera-distance-readout"),Wy=ee(t,"#custom-camera-stiffness-readout"),Xy=ee(t,"#custom-camera-swivel-speed-readout"),Yy=ee(t,"#custom-camera-transition-speed-readout"),vr=ee(t,"#ball-cam"),Rf=ee(t,"#module-summary"),rr=ee(t,"#module-settings"),qy=ee(t,"#time-readout"),Ky=ee(t,"#frame-readout"),jy=ee(t,"#duration-readout"),Zy=ee(t,"#playback-status-readout"),en=ee(t,"#status-readout"),Jy=ee(t,"#players-readout"),Qy=ee(t,"#frames-readout"),Pf=ee(t,"#events-readout"),pl=ee(t,"#camera-profile-readout"),ml=ee(t,"#camera-fov-readout"),_l=ee(t,"#camera-height-readout"),gl=ee(t,"#camera-pitch-readout"),vl=ee(t,"#camera-base-distance-readout"),yl=ee(t,"#camera-stiffness-readout"),dn=ee(t,"#skip-post-goal-transitions"),fn=ee(t,"#skip-kickoffs"),Ts=ee(t,"#recording-fps"),As=ee(t,"#recording-playback-rate"),Lf=ee(t,"#recording-start"),Nf=ee(t,"#recording-full-replay"),If=ee(t,"#recording-stop"),Df=ee(t,"#recording-download"),Ff=ee(t,"#recording-clear"),eb=ee(t,"#recording-status"),tb=ee(t,"#recording-elapsed"),nb=ee(t,"#recording-size"),ib=ee(t,"#recording-type");const n=Ey(window.location),i=wk(window.location);let a=null;if(e.initialConfig!==void 0)Ti=e.initialConfig;else{try{Ti=Sk(window.location)}catch(l){a=l,console.error("Invalid stats player config:",l),en.textContent=l instanceof Error?l.message:"Invalid stats player config",Ti=null}i&&iO(n,Ti,a)}const s=new AbortController;ug(rg,s.signal),ug(Tf,s.signal);const r=()=>{s.abort(),ns?.(),ns=null,xh(),te?.destroy(),te=null,Vt=null,Dn=null,Sa=null,wa=null,va=Fl(),Ea.clear(),dc(),fc(),rb(),Oi=[],hi?.destroy(),hi=null,Kn=new Set,ks=new Set,_a=new Set,Os=new Set,$i=null,Wl=!0,Wi=null,kt=null,bl=!1,mi=!0,$l=null,Gn=null,Ti=null,pa!==null&&(window.clearTimeout(pa),pa=null),vs=!1,yr=1,Gl=30,Ol=null,Ui===t&&(Ui=null,t.replaceChildren()),Ko===r&&(Ko=null)};if(Ko=r,Ti){vs=!0;try{sO(Ti)}finally{vs=!1}}zl.addEventListener("click",()=>{br(mf.hidden)},{signal:s.signal}),t.addEventListener("click",l=>{l.target instanceof Element&&(l.target.closest(".top-chrome")||br(!1))},{signal:s.signal}),sg.addEventListener("click",cg,{signal:s.signal}),ag.addEventListener("click",cg,{signal:s.signal}),t.querySelectorAll("[data-window-toggle]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowToggle;c&&(uO(c),br(!1))},{signal:s.signal})}),t.querySelectorAll("[data-window-hide]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowHide??qk(l);c&&dO(c)},{signal:s.signal})}),t.querySelectorAll("[data-create-stats-window]").forEach(l=>{l.addEventListener("click",()=>{Cb(l.dataset.createStatsWindow)},{signal:s.signal})}),gs.addEventListener("change",async()=>{const l=gs.files?.[0];if(l)try{kt&&(kt.currentClip=null,kt.currentReplayId=null,Ls()),await Db(fU(l))}catch(c){console.error("Failed to load replay:",c),en.textContent=c instanceof Error?c.message:"Failed to load replay"}},{signal:s.signal}),qo.addEventListener("change",async()=>{const l=qo.files?.[0];if(l)try{const c=hb(await l.text());await Sb(c,null)}catch(c){console.error("Failed to load mechanics review playlist:",c),nn(c instanceof Error?c.message:"Failed to load mechanics review playlist")}finally{qo.value=""}},{signal:s.signal}),og.addEventListener("click",()=>{gg(Ou.value.trim()).catch(l=>{console.error("Failed to load mechanics review playlist URL:",l),nn(l instanceof Error?l.message:"Failed to load mechanics review playlist URL")})},{signal:s.signal}),gf.addEventListener("click",()=>{const l=kt;l&&ql(Math.max(0,l.currentIndex-1))},{signal:s.signal}),vf.addEventListener("click",FO,{signal:s.signal}),yf.addEventListener("click",()=>{const l=kt;l&&ql(Math.min(l.manifest.items.length-1,l.currentIndex+1))},{signal:s.signal}),bf.addEventListener("click",()=>{Bu("confirmed")},{signal:s.signal}),xf.addEventListener("click",()=>{Bu("rejected")},{signal:s.signal}),Sf.addEventListener("click",()=>{Bu("uncertain")},{signal:s.signal}),Hl.addEventListener("click",()=>{te?.togglePlayback(),je()},{signal:s.signal}),ga.addEventListener("change",()=>{te?.setPlaybackRate(Number(ga.value)),je()},{signal:s.signal}),Lf.addEventListener("click",()=>{if(Vt)try{const{fps:l}=Cg();Vt.start({fps:l}),Pn()}catch(l){console.error("Failed to start recording:",l),en.textContent=l instanceof Error?l.message:"Failed to start recording",Pn(Vt.getStatus())}},{signal:s.signal}),Nf.addEventListener("click",()=>{if(!Vt)return;const{fps:l,playbackRate:c}=Cg();Vt.recordFullReplay({fps:l,playbackRate:c,restorePlaybackState:!0}).catch(u=>{console.error("Failed to record replay:",u),en.textContent=u instanceof Error?u.message:"Failed to record replay",Pn(Vt?.getStatus()??null)}),Pn()},{signal:s.signal}),If.addEventListener("click",()=>{Vt?.stop().catch(l=>{console.error("Failed to stop recording:",l),en.textContent=l instanceof Error?l.message:"Failed to stop recording"}),Pn()},{signal:s.signal}),Df.addEventListener("click",()=>{const l=Vt?.getRecording();l&&uU(l)},{signal:s.signal}),Ff.addEventListener("click",()=>{try{Vt?.clear(),Pn()}catch(l){console.error("Failed to clear recording:",l)}},{signal:s.signal}),Ts.addEventListener("change",je,{signal:s.signal}),As.addEventListener("change",je,{signal:s.signal}),gr.addEventListener("input",()=>{te?.setCameraDistanceScale(Number(gr.value)),je()},{signal:s.signal}),Pi.addEventListener("change",()=>{Vl.hidden=!Pi.checked,te?.setCustomCameraSettings(Pi.checked?Tg():null),je()},{signal:s.signal});for(const l of[Dr,Fr,kr,Or,Ur,Br,zr])l.addEventListener("input",()=>{const c=Tg();Nb(c),te?.setCustomCameraSettings(c),je()},{signal:s.signal});Bi.addEventListener("change",()=>{te?.setAttachedPlayer(Bi.value||null),Gn=null,je()},{signal:s.signal}),Af.addEventListener("click",()=>{te?.setCameraViewMode("free"),Gn=null,je()},{signal:s.signal}),Cf.addEventListener("click",()=>{te?.setCameraViewMode("follow"),Gn=null,je()},{signal:s.signal}),mr.addEventListener("click",()=>{te?.setFreeCameraPreset("overhead"),Gn="overhead",je()},{signal:s.signal}),_r.addEventListener("click",()=>{te?.setFreeCameraPreset("side"),Gn="side",je()},{signal:s.signal}),vr.addEventListener("change",()=>{te?.setBallCamEnabled(vr.checked),je()},{signal:s.signal}),dn.addEventListener("change",()=>{te?.setSkipPostGoalTransitionsEnabled(dn.checked),je()},{signal:s.signal}),fn.addEventListener("change",()=>{te?.setSkipKickoffsEnabled(fn.checked),je()},{signal:s.signal}),Yi(),_i(),Kl(),Ib(),Th(),Pn(),Xi(),Ls(),Ps(),e.initialBundle?Ah({name:e.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(e.initialBundle)).catch(l=>{s.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",l),en.textContent=l instanceof Error?l.message:"Failed to load preprocessed replay bundle")}):e.loadFromLocation!==!1&&mU(s.signal);const o=wO();return o&&(Ou.value=o,fb("mechanics-review"),gg(o).catch(l=>{s.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",l),nn(l instanceof Error?l.message:"Failed to load mechanics review playlist from URL"))})),{root:t,destroy:r}}export{_U as mountStatEvaluationPlayer};
