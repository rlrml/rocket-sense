const za={ROTATE:0,DOLLY:1,PAN:2},Na={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},k0=0,_f=1,D0=2,c_=1,F0=2,si=3,Pi=0,tn=1,Ze=2,Mi=0,Ha=1,Ti=2,gf=3,vf=4,O0=5,ji=100,U0=101,B0=102,z0=103,H0=104,V0=200,G0=201,$0=202,W0=203,Vc=204,Gc=205,X0=206,K0=207,q0=208,Y0=209,j0=210,Z0=211,J0=212,Q0=213,ey=214,$c=0,Wc=1,Xc=2,ns=3,Kc=4,qc=5,Yc=6,jc=7,tl=0,ty=1,ny=2,Ci=0,iy=1,ay=2,sy=3,ry=4,oy=5,ly=6,cy=7,u_=300,is=301,as=302,Zc=303,Jc=304,nl=306,Qc=1e3,ta=1001,eu=1002,Nn=1003,uy=1004,dr=1005,Vn=1006,vl=1007,na=1008,Kn=1009,d_=1010,f_=1011,zs=1012,Md=1013,aa=1014,ci=1015,ar=1016,Td=1017,Cd=1018,Hs=1020,h_=35902,p_=35899,m_=1021,__=1022,Ln=1023,Vs=1026,Gs=1027,g_=1028,Ad=1029,v_=1030,Rd=1031,Pd=1033,po=33776,mo=33777,_o=33778,go=33779,tu=35840,nu=35841,iu=35842,au=35843,su=36196,ru=37492,ou=37496,lu=37808,cu=37809,uu=37810,du=37811,fu=37812,hu=37813,pu=37814,mu=37815,_u=37816,gu=37817,vu=37818,yu=37819,bu=37820,Su=37821,xu=36492,wu=36494,Eu=36495,Mu=36283,Tu=36284,Cu=36285,Au=36286,dy=3200,fy=3201,Ld=0,hy=1,xi="",Gt="srgb",ss="srgb-linear",Do="linear",ot="srgb",ua=7680,yf=519,py=512,my=513,_y=514,y_=515,gy=516,vy=517,yy=518,by=519,Ru=35044,bf="300 es",Gn=2e3,Fo=2001;class oa{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(t);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sf=1234567;const Va=Math.PI/180,$s=180/Math.PI;function $n(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function Id(n,e){return(n%e+e)%e}function Sy(n,e,t,i,a){return i+(n-e)*(a-i)/(t-e)}function xy(n,e,t){return n!==e?(t-n)/(e-n):0}function Ns(n,e,t){return(1-t)*n+t*e}function wy(n,e,t,i){return Ns(n,e,1-Math.exp(-t*i))}function Ey(n,e=1){return e-Math.abs(Id(n,e*2)-e)}function My(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ty(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Cy(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ay(n,e){return n+Math.random()*(e-n)}function Ry(n){return n*(.5-Math.random())}function Py(n){n!==void 0&&(Sf=n);let e=Sf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ly(n){return n*Va}function Iy(n){return n*$s}function Ny(n){return(n&n-1)===0&&n!==0}function ky(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Dy(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Fy(n,e,t,i,a){const s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+i)/2),u=r((e+i)/2),d=s((e-i)/2),f=r((e-i)/2),h=s((i-e)/2),_=r((i-e)/2);switch(a){case"XYX":n.set(o*u,l*d,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*h,o*c);break;case"YXY":n.set(l*h,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*h,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Pn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function it(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ht={DEG2RAD:Va,RAD2DEG:$s,generateUUID:$n,clamp:Ke,euclideanModulo:Id,mapLinear:Sy,inverseLerp:xy,lerp:Ns,damp:wy,pingpong:Ey,smoothstep:My,smootherstep:Ty,randInt:Cy,randFloat:Ay,randFloatSpread:Ry,seededRandom:Py,degToRad:Ly,radToDeg:Iy,isPowerOfTwo:Ny,ceilPowerOfTwo:ky,floorPowerOfTwo:Dy,setQuaternionFromProperEuler:Fy,normalize:it,denormalize:Pn};class oe{constructor(e=0,t=0){oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qn{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,s,r,o){let l=i[a+0],c=i[a+1],u=i[a+2],d=i[a+3];const f=s[r+0],h=s[r+1],_=s[r+2],g=s[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-o;const p=l*f+c*h+u*_+d*g,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),M=Math.atan2(C,p*y);m=Math.sin(m*M)/C,o=Math.sin(o*M)/C}const S=o*y;if(l=l*m+f*S,c=c*m+h*S,u=u*m+_*S,d=d*m+g*S,m===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],d=s[r],f=s[r+1],h=s[r+2],_=s[r+3];return e[t]=o*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-o*h,e[t+2]=c*_+u*h+o*f-l*d,e[t+3]=u*_-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),d=o(s/2),f=l(i/2),h=l(a/2),_=l(s/2);switch(r){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(r-a)*h}else if(i>o&&i>d){const h=2*Math.sqrt(1+i-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(a+r)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-i-d);this._w=(s-c)/h,this._x=(a+r)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-i-o);this._w=(r-a)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+a*c-s*l,this._y=a*u+r*l+s*o-i*c,this._z=s*u+r*c+i*l-a*o,this._w=r*u-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+a*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const h=1-t;return this._w=h*r+t*this._w,this._x=h*i+t*this._x,this._y=h*a+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=r*d+this._w*f,this._x=i*d+this._x*f,this._y=a*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*a,this.y=s[1]*t+s[4]*i+s[7]*a,this.z=s[2]*t+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),u=2*(o*t-s*a),d=2*(s*i-r*t);return this.x=t+l*c+r*d-o*u,this.y=i+l*u+o*c-s*d,this.z=a+l*d+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a,this.y=s[1]*t+s[5]*i+s[9]*a,this.z=s[2]*t+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yl.copy(this).projectOnVector(e),this.sub(yl)}reflect(e){return this.sub(yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yl=new L,xf=new qn;class $e{constructor(e,t,i,a,s,r,o,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,l,c)}set(e,t,i,a,s,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],_=i[8],g=a[0],m=a[3],p=a[6],y=a[1],x=a[4],S=a[7],C=a[2],M=a[5],T=a[8];return s[0]=r*g+o*y+l*C,s[3]=r*m+o*x+l*M,s[6]=r*p+o*S+l*T,s[1]=c*g+u*y+d*C,s[4]=c*m+u*x+d*M,s[7]=c*p+u*S+d*T,s[2]=f*g+h*y+_*C,s[5]=f*m+h*x+_*M,s[8]=f*p+h*S+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*s*u+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*r-o*c,f=o*l-u*s,h=c*s-r*l,_=t*d+i*f+a*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(a*c-u*i)*g,e[2]=(o*i-a*r)*g,e[3]=f*g,e[4]=(u*t-a*l)*g,e[5]=(a*s-o*t)*g,e[6]=h*g,e[7]=(i*l-c*t)*g,e[8]=(r*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(bl.makeScale(e,t)),this}rotate(e){return this.premultiply(bl.makeRotation(-e)),this}translate(e,t){return this.premultiply(bl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bl=new $e;function b_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Oo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Oy(){const n=Oo("canvas");return n.style.display="block",n}const wf={};function Ws(n){n in wf||(wf[n]=!0,console.warn(n))}function Uy(n,e,t){return new Promise(function(i,a){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Ef=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mf=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function By(){const n={enabled:!0,workingColorSpace:ss,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ot&&(a.r=ui(a.r),a.g=ui(a.g),a.b=ui(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ot&&(a.r=Ga(a.r),a.g=Ga(a.g),a.b=Ga(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===xi?Do:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Ws("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Ws("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ss]:{primaries:e,whitePoint:i,transfer:Do,toXYZ:Ef,fromXYZ:Mf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:Ef,fromXYZ:Mf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),n}const Qe=By();function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ga(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let da;class zy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{da===void 0&&(da=Oo("canvas")),da.width=e.width,da.height=e.height;const a=da.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=da}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Oo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=ui(s[r]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ui(t[i]/255)*255):t[i]=ui(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hy=0;class Nd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(Sl(a[r].image)):s.push(Sl(a[r]))}else s=Sl(a);i.url=s}return t||(e.images[this.uuid]=i),i}}function Sl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zy.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vy=0;const xl=new L;class Yt extends oa{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,i=ta,a=ta,s=Vn,r=na,o=Ln,l=Kn,c=Yt.DEFAULT_ANISOTROPY,u=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vy++}),this.uuid=$n(),this.name="",this.source=new Nd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(xl).x}get height(){return this.source.getSize(xl).y}get depth(){return this.source.getSize(xl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==u_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qc:e.x=e.x-Math.floor(e.x);break;case ta:e.x=e.x<0?0:1;break;case eu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qc:e.y=e.y-Math.floor(e.y);break;case ta:e.y=e.y<0?0:1;break;case eu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=u_;Yt.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,t=0,i=0,a=1){Et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,S=(h+1)/2,C=(p+1)/2,M=(u+f)/4,T=(d+g)/4,A=(_+m)/4;return x>S&&x>C?x<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(x),a=M/i,s=T/i):S>C?S<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(S),i=M/a,s=A/a):C<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(C),i=T/s,a=A/s),this.set(i,a,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(d-g)/y,this.z=(f-u)/y,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gy extends oa{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);const a={width:e,height:t,depth:i.depth},s=new Yt(a);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new Nd(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sa extends Gy{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class S_ extends Yt{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $y extends Yt{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,vn):vn.fromBufferAttribute(s,r),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fr.copy(i.boundingBox)),fr.applyMatrix4(e.matrixWorld),this.union(fr)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hs),hr.subVectors(this.max,hs),fa.subVectors(e.a,hs),ha.subVectors(e.b,hs),pa.subVectors(e.c,hs),fi.subVectors(ha,fa),hi.subVectors(pa,ha),Ui.subVectors(fa,pa);let t=[0,-fi.z,fi.y,0,-hi.z,hi.y,0,-Ui.z,Ui.y,fi.z,0,-fi.x,hi.z,0,-hi.x,Ui.z,0,-Ui.x,-fi.y,fi.x,0,-hi.y,hi.x,0,-Ui.y,Ui.x,0];return!wl(t,fa,ha,pa,hr)||(t=[1,0,0,0,1,0,0,0,1],!wl(t,fa,ha,pa,hr))?!1:(pr.crossVectors(fi,hi),t=[pr.x,pr.y,pr.z],wl(t,fa,ha,pa,hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qn=[new L,new L,new L,new L,new L,new L,new L,new L],vn=new L,fr=new sr,fa=new L,ha=new L,pa=new L,fi=new L,hi=new L,Ui=new L,hs=new L,hr=new L,pr=new L,Bi=new L;function wl(n,e,t,i,a){for(let s=0,r=n.length-3;s<=r;s+=3){Bi.fromArray(n,s);const o=a.x*Math.abs(Bi.x)+a.y*Math.abs(Bi.y)+a.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),u=i.dot(Bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Wy=new sr,ps=new L,El=new L;class il{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Wy.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ps.subVectors(e,this.center);const t=ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(ps,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(El.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ps.copy(e.center).add(El)),this.expandByPoint(ps.copy(e.center).sub(El))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ei=new L,Ml=new L,mr=new L,pi=new L,Tl=new L,_r=new L,Cl=new L;class kd{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){Ml.copy(e).add(t).multiplyScalar(.5),mr.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Ml);const s=e.distanceTo(t)*.5,r=-this.direction.dot(mr),o=pi.dot(this.direction),l=-pi.dot(mr),c=pi.lengthSq(),u=Math.abs(1-r*r);let d,f,h,_;if(u>0)if(d=r*l-o,f=r*o-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+r*f+2*o)+f*(r*d+f+2*l)+c}else f=s,d=Math.max(0,-(r*f+o)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(r*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-r*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(r*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=r>0?-s:s,d=Math.max(0,-(r*f+o)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Ml).addScaledVector(mr,f),h}intersectSphere(e,t){ei.subVectors(e.center,this.origin);const i=ei.dot(this.direction),a=ei.dot(ei)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,s,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,a=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,a=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,r=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,r=(e.min.y-f.y)*u),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,i,a,s){Tl.subVectors(t,e),_r.subVectors(i,e),Cl.crossVectors(Tl,_r);let r=this.direction.dot(Cl),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;pi.subVectors(this.origin,e);const l=o*this.direction.dot(_r.crossVectors(pi,_r));if(l<0)return null;const c=o*this.direction.dot(Tl.cross(pi));if(c<0||l+c>r)return null;const u=-o*pi.dot(Cl);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,a,s,r,o,l,c,u,d,f,h,_,g,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,l,c,u,d,f,h,_,g,m)}set(e,t,i,a,s,r,o,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=a,p[1]=s,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/ma.setFromMatrixColumn(e,0).length(),s=1/ma.setFromMatrixColumn(e,1).length(),r=1/ma.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=r*u,h=r*d,_=o*u,g=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=r*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*o,t[4]=_*o-h,t[8]=r*c,t[1]=r*d,t[5]=r*u,t[9]=-o,t[2]=h*o-_,t[6]=g+f*o,t[10]=r*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*o,t[4]=-r*d,t[8]=_+h*o,t[1]=h+_*o,t[5]=r*u,t[9]=g-f*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const f=r*u,h=r*d,_=o*u,g=o*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const f=r*l,h=r*c,_=o*l,g=o*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=r*l,h=r*c,_=o*l,g=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=r*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=o*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xy,e,Ky)}lookAt(e,t,i){const a=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),mi.crossVectors(i,sn),mi.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),mi.crossVectors(i,sn)),mi.normalize(),gr.crossVectors(sn,mi),a[0]=mi.x,a[4]=gr.x,a[8]=sn.x,a[1]=mi.y,a[5]=gr.y,a[9]=sn.y,a[2]=mi.z,a[6]=gr.z,a[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],_=i[2],g=i[6],m=i[10],p=i[14],y=i[3],x=i[7],S=i[11],C=i[15],M=a[0],T=a[4],A=a[8],b=a[12],v=a[1],R=a[5],N=a[9],z=a[13],B=a[2],G=a[6],U=a[10],X=a[14],V=a[3],Q=a[7],de=a[11],K=a[15];return s[0]=r*M+o*v+l*B+c*V,s[4]=r*T+o*R+l*G+c*Q,s[8]=r*A+o*N+l*U+c*de,s[12]=r*b+o*z+l*X+c*K,s[1]=u*M+d*v+f*B+h*V,s[5]=u*T+d*R+f*G+h*Q,s[9]=u*A+d*N+f*U+h*de,s[13]=u*b+d*z+f*X+h*K,s[2]=_*M+g*v+m*B+p*V,s[6]=_*T+g*R+m*G+p*Q,s[10]=_*A+g*N+m*U+p*de,s[14]=_*b+g*z+m*X+p*K,s[3]=y*M+x*v+S*B+C*V,s[7]=y*T+x*R+S*G+C*Q,s[11]=y*A+x*N+S*U+C*de,s[15]=y*b+x*z+S*X+C*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-a*c*d-s*o*f+i*c*f+a*o*h-i*l*h)+g*(+t*l*h-t*c*f+s*r*f-a*r*h+a*c*u-s*l*u)+m*(+t*c*d-t*o*h-s*r*d+i*r*h+s*o*u-i*c*u)+p*(-a*o*u-t*l*d+t*o*f+a*r*d-i*r*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],y=d*m*c-g*f*c+g*l*h-o*m*h-d*l*p+o*f*p,x=_*f*c-u*m*c-_*l*h+r*m*h+u*l*p-r*f*p,S=u*g*c-_*d*c+_*o*h-r*g*h-u*o*p+r*d*p,C=_*d*l-u*g*l-_*o*f+r*g*f+u*o*m-r*d*m,M=t*y+i*x+a*S+s*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=y*T,e[1]=(g*f*s-d*m*s-g*a*h+i*m*h+d*a*p-i*f*p)*T,e[2]=(o*m*s-g*l*s+g*a*c-i*m*c-o*a*p+i*l*p)*T,e[3]=(d*l*s-o*f*s-d*a*c+i*f*c+o*a*h-i*l*h)*T,e[4]=x*T,e[5]=(u*m*s-_*f*s+_*a*h-t*m*h-u*a*p+t*f*p)*T,e[6]=(_*l*s-r*m*s-_*a*c+t*m*c+r*a*p-t*l*p)*T,e[7]=(r*f*s-u*l*s+u*a*c-t*f*c-r*a*h+t*l*h)*T,e[8]=S*T,e[9]=(_*d*s-u*g*s-_*i*h+t*g*h+u*i*p-t*d*p)*T,e[10]=(r*g*s-_*o*s+_*i*c-t*g*c-r*i*p+t*o*p)*T,e[11]=(u*o*s-r*d*s-u*i*c+t*d*c+r*i*h-t*o*h)*T,e[12]=C*T,e[13]=(u*g*a-_*d*a+_*i*f-t*g*f-u*i*m+t*d*m)*T,e[14]=(_*o*a-r*g*a-_*i*l+t*g*l+r*i*m-t*o*m)*T,e[15]=(r*d*a-u*o*a+u*i*l-t*d*l-r*i*f+t*o*f)*T,this}scale(e){const t=this.elements,i=e.x,a=e.y,s=e.z;return t[0]*=i,t[4]*=a,t[8]*=s,t[1]*=i,t[5]*=a,t[9]*=s,t[2]*=i,t[6]*=a,t[10]*=s,t[3]*=i,t[7]*=a,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,u=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*r,0,c*l-a*o,u*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,u=r+r,d=o+o,f=s*c,h=s*u,_=s*d,g=r*u,m=r*d,p=o*d,y=l*c,x=l*u,S=l*d,C=i.x,M=i.y,T=i.z;return a[0]=(1-(g+p))*C,a[1]=(h+S)*C,a[2]=(_-x)*C,a[3]=0,a[4]=(h-S)*M,a[5]=(1-(f+p))*M,a[6]=(m+y)*M,a[7]=0,a[8]=(_+x)*T,a[9]=(m-y)*T,a[10]=(1-(f+g))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let s=ma.set(a[0],a[1],a[2]).length();const r=ma.set(a[4],a[5],a[6]).length(),o=ma.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],yn.copy(this);const c=1/s,u=1/r,d=1/o;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,t.setFromRotationMatrix(yn),i.x=s,i.y=r,i.z=o,this}makePerspective(e,t,i,a,s,r,o=Gn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-a),f=(t+e)/(t-e),h=(i+a)/(i-a);let _,g;if(l)_=s/(r-s),g=r*s/(r-s);else if(o===Gn)_=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===Fo)_=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,a,s,r,o=Gn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-a),f=-(t+e)/(t-e),h=-(i+a)/(i-a);let _,g;if(l)_=1/(r-s),g=r/(r-s);else if(o===Gn)_=-2/(r-s),g=-(r+s)/(r-s);else if(o===Fo)_=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ma=new L,yn=new vt,Xy=new L(0,0,0),Ky=new L(1,1,1),mi=new L,gr=new L,sn=new L,Tf=new vt,Cf=new qn;class Dn{constructor(e=0,t=0,i=0,a=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],u=a[9],d=a[2],f=a[6],h=a[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Ke(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Tf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cf.setFromEuler(this),this.setFromQuaternion(Cf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class x_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qy=0;const Af=new L,_a=new qn,ti=new vt,vr=new L,ms=new L,Yy=new L,jy=new qn,Rf=new L(1,0,0),Pf=new L(0,1,0),Lf=new L(0,0,1),If={type:"added"},Zy={type:"removed"},ga={type:"childadded",child:null},Al={type:"childremoved",child:null};class Lt extends oa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new L,t=new Dn,i=new qn,a=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new vt},normalMatrix:{value:new $e}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new x_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _a.setFromAxisAngle(e,t),this.quaternion.multiply(_a),this}rotateOnWorldAxis(e,t){return _a.setFromAxisAngle(e,t),this.quaternion.premultiply(_a),this}rotateX(e){return this.rotateOnAxis(Rf,e)}rotateY(e){return this.rotateOnAxis(Pf,e)}rotateZ(e){return this.rotateOnAxis(Lf,e)}translateOnAxis(e,t){return Af.copy(e).applyQuaternion(this.quaternion),this.position.add(Af.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rf,e)}translateY(e){return this.translateOnAxis(Pf,e)}translateZ(e){return this.translateOnAxis(Lf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?vr.copy(e):vr.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(ms,vr,this.up):ti.lookAt(vr,ms,this.up),this.quaternion.setFromRotationMatrix(ti),a&&(ti.extractRotation(a.matrixWorld),_a.setFromRotationMatrix(ti),this.quaternion.premultiply(_a.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(If),ga.child=e,this.dispatchEvent(ga),ga.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zy),Al.child=e,this.dispatchEvent(Al),Al.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(If),ga.child=e,this.dispatchEvent(ga),ga.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,e,Yy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,jy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),d=r(e.shapes),f=r(e.skeletons),h=r(e.animations),_=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),_.length>0&&(i.nodes=_)}return i.object=a,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Lt.DEFAULT_UP=new L(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bn=new L,ni=new L,Rl=new L,ii=new L,va=new L,ya=new L,Nf=new L,Pl=new L,Ll=new L,Il=new L,Nl=new Et,kl=new Et,Dl=new Et;class ln{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),bn.subVectors(e,t),a.cross(bn);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,t,i,a,s){bn.subVectors(a,t),ni.subVectors(i,t),Rl.subVectors(e,t);const r=bn.dot(bn),o=bn.dot(ni),l=bn.dot(Rl),c=ni.dot(ni),u=ni.dot(Rl),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,_=(r*u-o*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,i,a,s,r,o,l){return this.getBarycoord(e,t,i,a,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ii.x),l.addScaledVector(r,ii.y),l.addScaledVector(o,ii.z),l)}static getInterpolatedAttribute(e,t,i,a,s,r){return Nl.setScalar(0),kl.setScalar(0),Dl.setScalar(0),Nl.fromBufferAttribute(e,t),kl.fromBufferAttribute(e,i),Dl.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Nl,s.x),r.addScaledVector(kl,s.y),r.addScaledVector(Dl,s.z),r}static isFrontFacing(e,t,i,a){return bn.subVectors(i,t),ni.subVectors(e,t),bn.cross(ni).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),bn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,s){return ln.getInterpolation(e,this.a,this.b,this.c,t,i,a,s)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,s=this.c;let r,o;va.subVectors(a,i),ya.subVectors(s,i),Pl.subVectors(e,i);const l=va.dot(Pl),c=ya.dot(Pl);if(l<=0&&c<=0)return t.copy(i);Ll.subVectors(e,a);const u=va.dot(Ll),d=ya.dot(Ll);if(u>=0&&d<=u)return t.copy(a);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector(va,r);Il.subVectors(e,s);const h=va.dot(Il),_=ya.dot(Il);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(ya,o);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return Nf.subVectors(s,a),o=(d-u)/(d-u+(h-_)),t.copy(a).addScaledVector(Nf,o);const p=1/(m+g+f);return r=g*p,o=f*p,t.copy(i).addScaledVector(va,r).addScaledVector(ya,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const w_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},yr={h:0,s:0,l:0};function Fl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,a=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,a),this}setHSL(e,t,i,a=Qe.workingColorSpace){if(e=Id(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=Fl(r,s,e+1/3),this.g=Fl(r,s,e),this.b=Fl(r,s,e-1/3)}return Qe.colorSpaceToWorking(this,a),this}setStyle(e,t=Gt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const i=w_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=Ga(e.r),this.g=Ga(e.g),this.b=Ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return Qe.workingToColorSpace(Ht.copy(this),e),Math.round(Ke(Ht.r*255,0,255))*65536+Math.round(Ke(Ht.g*255,0,255))*256+Math.round(Ke(Ht.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Ht.copy(this),t);const i=Ht.r,a=Ht.g,s=Ht.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Gt){Qe.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,i=Ht.g,a=Ht.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(yr);const i=Ns(_i.h,yr.h,t),a=Ns(_i.s,yr.s,t),s=Ns(_i.l,yr.l,t);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*a,this.g=s[1]*t+s[4]*i+s[7]*a,this.b=s[2]*t+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ve;Ve.NAMES=w_;let Jy=0;class di extends oa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jy++}),this.uuid=$n(),this.name="",this.type="Material",this.blending=Ha,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vc,this.blendDst=Gc,this.blendEquation=ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ua,this.stencilZFail=ua,this.stencilZPass=ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ha&&(i.blending=this.blending),this.side!==Pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Vc&&(i.blendSrc=this.blendSrc),this.blendDst!==Gc&&(i.blendDst=this.blendDst),this.blendEquation!==ji&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ua&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ua&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ua&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(t){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nt extends di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new L,br=new oe;let Qy=0;class kn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ru,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=it(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array),a=it(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array),a=it(a,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ru&&(e.usage=this.usage),e}}class E_ extends kn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class M_ extends kn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class et extends kn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let eb=0;const pn=new vt,Ol=new Lt,ba=new L,rn=new sr,_s=new sr,Ft=new L;class Mt extends oa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eb++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b_(e)?M_:E_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new $e().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,i){return pn.makeTranslation(e,t,i),this.applyMatrix4(pn),this}scale(e,t,i){return pn.makeScale(e,t,i),this.applyMatrix4(pn),this}lookAt(e){return Ol.lookAt(e),Ol.updateMatrix(),this.applyMatrix4(Ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ba).negate(),this.translate(ba.x,ba.y,ba.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new et(i,3))}else{const i=Math.min(e.length,t.count);for(let a=0;a<i;a++){const s=e[a];t.setXYZ(a,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const s=t[i];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new il);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(rn.min,_s.min),rn.expandByPoint(Ft),Ft.addVectors(rn.max,_s.max),rn.expandByPoint(Ft)):(rn.expandByPoint(_s.min),rn.expandByPoint(_s.max))}rn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Ft.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Ft));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ft.fromBufferAttribute(o,c),l&&(ba.fromBufferAttribute(e,c),Ft.add(ba)),a=Math.max(a,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,u=new L,d=new L,f=new oe,h=new oe,_=new oe,g=new L,m=new L;function p(A,b,v){c.fromBufferAttribute(i,A),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,v),f.fromBufferAttribute(s,A),h.fromBufferAttribute(s,b),_.fromBufferAttribute(s,v),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const R=1/(h.x*_.y-_.x*h.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(R),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(R),o[A].add(g),o[b].add(g),o[v].add(g),l[A].add(m),l[b].add(m),l[v].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let A=0,b=y.length;A<b;++A){const v=y[A],R=v.start,N=v.count;for(let z=R,B=R+N;z<B;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const x=new L,S=new L,C=new L,M=new L;function T(A){C.fromBufferAttribute(a,A),M.copy(C);const b=o[A];x.copy(b),x.sub(C.multiplyScalar(C.dot(b))).normalize(),S.crossVectors(M,b);const R=S.dot(l[A])<0?-1:1;r.setXYZW(A,x.x,x.y,x.z,R)}for(let A=0,b=y.length;A<b;++A){const v=y[A],R=v.start,N=v.count;for(let z=R,B=R+N;z<B;z+=3)T(e.getX(z+0)),T(e.getX(z+1)),T(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);const a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);a.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,m),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)a.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),r.fromBufferAttribute(t,f+2),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?h=l[g]*o.data.stride+o.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new kn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,i);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(a[l]=u,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const u=a[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kf=new vt,zi=new kd,Sr=new il,Df=new L,xr=new L,wr=new L,Er=new L,Ul=new L,Mr=new L,Ff=new L,Tr=new L;class Be extends Lt{constructor(e=new Mt,t=new nt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Mr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Ul.fromBufferAttribute(d,e),r?Mr.addScaledVector(Ul,u):Mr.addScaledVector(Ul.sub(t),u))}t.add(Mr)}return t}raycast(e,t){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Sr.copy(i.boundingSphere),Sr.applyMatrix4(s),zi.copy(e.ray).recast(e.near),!(Sr.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Sr,Df)===null||zi.origin.distanceToSquared(Df)>(e.far-e.near)**2))&&(kf.copy(s).invert(),zi.copy(e.ray).applyMatrix4(kf),!(i.boundingBox!==null&&zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=r[m.materialIndex],y=Math.max(m.start,h.start),x=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let S=y,C=x;S<C;S+=3){const M=o.getX(S),T=o.getX(S+1),A=o.getX(S+2);a=Cr(this,p,e,i,c,u,d,M,T,A),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const _=Math.max(0,h.start),g=Math.min(o.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const y=o.getX(m),x=o.getX(m+1),S=o.getX(m+2);a=Cr(this,r,e,i,c,u,d,y,x,S),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=r[m.materialIndex],y=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let S=y,C=x;S<C;S+=3){const M=S,T=S+1,A=S+2;a=Cr(this,p,e,i,c,u,d,M,T,A),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const y=m,x=m+1,S=m+2;a=Cr(this,r,e,i,c,u,d,y,x,S),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function tb(n,e,t,i,a,s,r,o){let l;if(e.side===tn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===Pi,o),l===null)return null;Tr.copy(o),Tr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Tr);return c<t.near||c>t.far?null:{distance:c,point:Tr.clone(),object:n}}function Cr(n,e,t,i,a,s,r,o,l,c){n.getVertexPosition(o,xr),n.getVertexPosition(l,wr),n.getVertexPosition(c,Er);const u=tb(n,e,t,i,xr,wr,Er,Ff);if(u){const d=new L;ln.getBarycoord(Ff,xr,wr,Er,d),a&&(u.uv=ln.getInterpolatedAttribute(a,o,l,c,d,new oe)),s&&(u.uv1=ln.getInterpolatedAttribute(s,o,l,c,d,new oe)),r&&(u.normal=ln.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};ln.getNormal(xr,wr,Er,f.normal),u.face=f,u.barycoord=d}return u}class ki extends Mt{constructor(e=1,t=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,i,t,e,r,s,0),_("z","y","x",1,-1,i,t,-e,r,s,1),_("x","z","y",1,1,e,i,t,a,r,2),_("x","z","y",1,-1,e,i,-t,a,r,3),_("x","y","z",1,-1,e,t,i,a,s,4),_("x","y","z",-1,-1,e,t,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(d,2));function _(g,m,p,y,x,S,C,M,T,A,b){const v=S/T,R=C/A,N=S/2,z=C/2,B=M/2,G=T+1,U=A+1;let X=0,V=0;const Q=new L;for(let de=0;de<U;de++){const K=de*R-z;for(let ce=0;ce<G;ce++){const Se=ce*v-N;Q[g]=Se*y,Q[m]=K*x,Q[p]=B,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[m]=0,Q[p]=M>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(ce/T),d.push(1-de/A),X+=1}}for(let de=0;de<A;de++)for(let K=0;K<T;K++){const ce=f+K+G*de,Se=f+K+G*(de+1),ve=f+(K+1)+G*(de+1),he=f+(K+1)+G*de;l.push(ce,Se,he),l.push(Se,ve,he),V+=6}o.addGroup(h,V,b),h+=V,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function rs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const a=n[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function qt(n){const e={};for(let t=0;t<n.length;t++){const i=rs(n[t]);for(const a in i)e[a]=i[a]}return e}function nb(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function T_(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const ib={clone:rs,merge:qt};var ab=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Li extends di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ab,this.fragmentShader=sb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=nb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?t.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[a]={type:"m4",value:r.toArray()}:t.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class C_ extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const gi=new L,Of=new oe,Uf=new oe;class _n extends C_{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Va*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $s*2*Math.atan(Math.tan(Va*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gi.x,gi.y).multiplyScalar(-e/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gi.x,gi.y).multiplyScalar(-e/gi.z)}getViewSize(e,t){return this.getViewBounds(e,Of,Uf),t.subVectors(Uf,Of)}setViewOffset(e,t,i,a,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Va*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,t-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Sa=-90,xa=1;class rb extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new _n(Sa,xa,e,t);a.layers=this.layers,this.add(a);const s=new _n(Sa,xa,e,t);s.layers=this.layers,this.add(s);const r=new _n(Sa,xa,e,t);r.layers=this.layers,this.add(r);const o=new _n(Sa,xa,e,t);o.layers=this.layers,this.add(o);const l=new _n(Sa,xa,e,t);l.layers=this.layers,this.add(l);const c=new _n(Sa,xa,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,s,r,o,l]=t;for(const c of t)this.remove(c);if(e===Gn)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fo)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,s),e.setRenderTarget(i,1,a),e.render(t,r),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,l),e.setRenderTarget(i,4,a),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,a),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class A_ extends Yt{constructor(e=[],t=is,i,a,s,r,o,l,c,u){super(e,t,i,a,s,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ob extends sa{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new A_(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new ki(5,5,5),s=new Li({name:"CubemapFromEquirect",uniforms:rs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:Mi});s.uniforms.tEquirect.value=t;const r=new Be(a,s),o=t.minFilter;return t.minFilter===na&&(t.minFilter=Vn),new rb(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,a);e.setRenderTarget(s)}}class ut extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lb={type:"move"};class Bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lb)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ut;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class cb extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ub{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ru,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let a=0,s=this.stride;a<s;a++)this.array[e+a]=t.array[i+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Kt=new L;class Uo{constructor(e,t,i,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Pn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=it(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array),a=it(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array),a=it(a,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return new kn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Uo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class R_ extends di{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let wa;const gs=new L,Ea=new L,Ma=new L,Ta=new oe,vs=new oe,P_=new vt,Ar=new L,ys=new L,Rr=new L,Bf=new oe,zl=new oe,zf=new oe;class L_ extends Lt{constructor(e=new R_){if(super(),this.isSprite=!0,this.type="Sprite",wa===void 0){wa=new Mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ub(t,5);wa.setIndex([0,1,2,0,2,3]),wa.setAttribute("position",new Uo(i,3,0,!1)),wa.setAttribute("uv",new Uo(i,2,3,!1))}this.geometry=wa,this.material=e,this.center=new oe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ea.setFromMatrixScale(this.matrixWorld),P_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ma.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ea.multiplyScalar(-Ma.z);const i=this.material.rotation;let a,s;i!==0&&(s=Math.cos(i),a=Math.sin(i));const r=this.center;Pr(Ar.set(-.5,-.5,0),Ma,r,Ea,a,s),Pr(ys.set(.5,-.5,0),Ma,r,Ea,a,s),Pr(Rr.set(.5,.5,0),Ma,r,Ea,a,s),Bf.set(0,0),zl.set(1,0),zf.set(1,1);let o=e.ray.intersectTriangle(Ar,ys,Rr,!1,gs);if(o===null&&(Pr(ys.set(-.5,.5,0),Ma,r,Ea,a,s),zl.set(0,1),o=e.ray.intersectTriangle(Ar,Rr,ys,!1,gs),o===null))return;const l=e.ray.origin.distanceTo(gs);l<e.near||l>e.far||t.push({distance:l,point:gs.clone(),uv:ln.getInterpolation(gs,Ar,ys,Rr,Bf,zl,zf,new oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Pr(n,e,t,i,a,s){Ta.subVectors(n,t).addScalar(.5).multiply(i),a!==void 0?(vs.x=s*Ta.x-a*Ta.y,vs.y=a*Ta.x+s*Ta.y):vs.copy(Ta),n.copy(e),n.x+=vs.x,n.y+=vs.y,n.applyMatrix4(P_)}const Hl=new L,db=new L,fb=new $e;class yi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=Hl.subVectors(i,t).cross(db.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Hl),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fb.getNormalMatrix(e),a=this.coplanarPoint(Hl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new il,hb=new oe(.5,.5),Lr=new L;class Dd{constructor(e=new yi,t=new yi,i=new yi,a=new yi,s=new yi,r=new yi){this.planes=[e,t,i,a,s,r]}set(e,t,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Gn,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],_=s[8],g=s[9],m=s[10],p=s[11],y=s[12],x=s[13],S=s[14],C=s[15];if(a[0].setComponents(c-r,h-u,p-_,C-y).normalize(),a[1].setComponents(c+r,h+u,p+_,C+y).normalize(),a[2].setComponents(c+o,h+d,p+g,C+x).normalize(),a[3].setComponents(c-o,h-d,p-g,C-x).normalize(),i)a[4].setComponents(l,f,m,S).normalize(),a[5].setComponents(c-l,h-f,p-m,C-S).normalize();else if(a[4].setComponents(c-l,h-f,p-m,C-S).normalize(),t===Gn)a[5].setComponents(c+l,h+f,p+m,C+S).normalize();else if(t===Fo)a[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);const t=hb.distanceTo(e.center);return Hi.radius=.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(Lr.x=a.normal.x>0?e.max.x:e.min.x,Lr.y=a.normal.y>0?e.max.y:e.min.y,Lr.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rr extends di{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Bo=new L,zo=new L,Hf=new vt,bs=new kd,Ir=new il,Vl=new L,Vf=new L;class al extends Lt{constructor(e=new Mt,t=new rr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let a=1,s=t.count;a<s;a++)Bo.fromBufferAttribute(t,a-1),zo.fromBufferAttribute(t,a),i[a]=i[a-1],i[a]+=Bo.distanceTo(zo);e.setAttribute("lineDistance",new et(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(a),Ir.radius+=s,e.ray.intersectsSphere(Ir)===!1)return;Hf.copy(a).invert(),bs.copy(e.ray).applyMatrix4(Hf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),y=u.getX(g+1),x=Nr(this,e,bs,l,p,y,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=Nr(this,e,bs,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,r.start),_=Math.min(f.count,r.start+r.count);for(let g=h,m=_-1;g<m;g+=c){const p=Nr(this,e,bs,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Nr(this,e,bs,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Nr(n,e,t,i,a,s,r){const o=n.geometry.attributes.position;if(Bo.fromBufferAttribute(o,a),zo.fromBufferAttribute(o,s),t.distanceSqToSegment(Bo,zo,Vl,Vf)>i)return;Vl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Vl);if(!(c<e.near||c>e.far))return{distance:c,point:Vf.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const Gf=new L,$f=new L;class pb extends al{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let a=0,s=t.count;a<s;a+=2)Gf.fromBufferAttribute(t,a),$f.fromBufferAttribute(t,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+Gf.distanceTo($f);e.setAttribute("lineDistance",new et(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sl extends Yt{constructor(e,t,i,a,s,r,o,l,c){super(e,t,i,a,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class I_ extends Yt{constructor(e,t,i=aa,a,s,r,o=Nn,l=Nn,c,u=Vs,d=1){if(u!==Vs&&u!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,a,s,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Nd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class N_ extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ka extends Mt{constructor(e=1,t=32,i=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:a},t=Math.max(3,t);const s=[],r=[],o=[],l=[],c=new L,u=new oe;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const h=i+d/t*a;c.x=e*Math.cos(h),c.y=e*Math.sin(h),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[f]/e+1)/2,u.y=(r[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(o,3)),this.setAttribute("uv",new et(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ka(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class rl extends Mt{constructor(e=1,t=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),s=Math.floor(s);const u=[],d=[],f=[],h=[];let _=0;const g=[],m=i/2;let p=0;y(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new et(d,3)),this.setAttribute("normal",new et(f,3)),this.setAttribute("uv",new et(h,2));function y(){const S=new L,C=new L;let M=0;const T=(t-e)/i;for(let A=0;A<=s;A++){const b=[],v=A/s,R=v*(t-e)+e;for(let N=0;N<=a;N++){const z=N/a,B=z*l+o,G=Math.sin(B),U=Math.cos(B);C.x=R*G,C.y=-v*i+m,C.z=R*U,d.push(C.x,C.y,C.z),S.set(G,T,U).normalize(),f.push(S.x,S.y,S.z),h.push(z,1-v),b.push(_++)}g.push(b)}for(let A=0;A<a;A++)for(let b=0;b<s;b++){const v=g[b][A],R=g[b+1][A],N=g[b+1][A+1],z=g[b][A+1];(e>0||b!==0)&&(u.push(v,R,z),M+=3),(t>0||b!==s-1)&&(u.push(R,N,z),M+=3)}c.addGroup(p,M,0),p+=M}function x(S){const C=_,M=new oe,T=new L;let A=0;const b=S===!0?e:t,v=S===!0?1:-1;for(let N=1;N<=a;N++)d.push(0,m*v,0),f.push(0,v,0),h.push(.5,.5),_++;const R=_;for(let N=0;N<=a;N++){const B=N/a*l+o,G=Math.cos(B),U=Math.sin(B);T.x=b*U,T.y=m*v,T.z=b*G,d.push(T.x,T.y,T.z),f.push(0,v,0),M.x=G*.5+.5,M.y=U*.5*v+.5,h.push(M.x,M.y),_++}for(let N=0;N<a;N++){const z=C+N,B=R+N;S===!0?u.push(B,B+1,z):u.push(B+1,B,z),A+=3}c.addGroup(p,A,S===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xs extends rl{constructor(e=1,t=1,i=32,a=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,i,a,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:a,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Xs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const kr=new L,Dr=new L,Gl=new L,Fr=new ln;class mb extends Mt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const a=Math.pow(10,4),s=Math.cos(Va*t),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),f={},h=[];for(let _=0;_<l;_+=3){r?(c[0]=r.getX(_),c[1]=r.getX(_+1),c[2]=r.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:g,b:m,c:p}=Fr;if(g.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Fr.getNormal(Gl),d[0]=`${Math.round(g.x*a)},${Math.round(g.y*a)},${Math.round(g.z*a)}`,d[1]=`${Math.round(m.x*a)},${Math.round(m.y*a)},${Math.round(m.z*a)}`,d[2]=`${Math.round(p.x*a)},${Math.round(p.y*a)},${Math.round(p.z*a)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){const x=(y+1)%3,S=d[y],C=d[x],M=Fr[u[y]],T=Fr[u[x]],A=`${S}_${C}`,b=`${C}_${S}`;b in f&&f[b]?(Gl.dot(f[b].normal)<=s&&(h.push(M.x,M.y,M.z),h.push(T.x,T.y,T.z)),f[b]=null):A in f||(f[A]={index0:c[y],index1:c[x],normal:Gl.clone()})}}for(const _ in f)if(f[_]){const{index0:g,index1:m}=f[_];kr.fromBufferAttribute(o,g),Dr.fromBufferAttribute(o,m),h.push(kr.x,kr.y,kr.z),h.push(Dr.x,Dr.y,Dr.z)}this.setAttribute("position",new et(h,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Yn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,a=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),s+=i.distanceTo(a),t.push(s),a=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let a=0;const s=i.length;let r;t?r=t:r=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);const u=i[a],f=i[a+1]-u,h=(r-u)/f;return(a+h)/(s-1)}getTangent(e,t){let a=e-1e-4,s=e+1e-4;a<0&&(a=0),s>1&&(s=1);const r=this.getPoint(a),o=this.getPoint(s),l=t||(r.isVector2?new oe:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,a=[],s=[],r=[],o=new L,l=new vt;for(let h=0;h<=e;h++){const _=h/e;a[h]=this.getTangentAt(_,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(a[0].x),d=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),r[h]=r[h-1].clone(),o.crossVectors(a[h-1],a[h]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Ke(a[h-1].dot(a[h]),-1,1));s[h].applyMatrix4(l.makeRotationAxis(o,_))}r[h].crossVectors(a[h],s[h])}if(t===!0){let h=Math.acos(Ke(s[0].dot(s[e]),-1,1));h/=e,a[0].dot(o.crossVectors(s[0],s[e]))>0&&(h=-h);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(a[_],h*_)),r[_].crossVectors(a[_],s[_])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Fd extends Yn{constructor(e=0,t=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new oe){const i=t,a=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,h=c-this.aY;l=f*u-h*d+this.aX,c=f*d+h*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class _b extends Fd{constructor(e,t,i,a,s,r){super(e,t,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Od(){let n=0,e=0,t=0,i=0;function a(s,r,o,l){n=s,e=o,t=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,u,d){let f=(r-s)/c-(o-s)/(c+u)+(o-r)/u,h=(o-r)/u-(l-r)/(u+d)+(l-o)/d;f*=u,h*=u,a(r,o,f,h)},calc:function(s){const r=s*s,o=r*s;return n+e*s+t*r+i*o}}}const Or=new L,$l=new Od,Wl=new Od,Xl=new Od;class gb extends Yn{constructor(e=[],t=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=a}getPoint(e,t=new L){const i=t,a=this.points,s=a.length,r=(s-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=a[(o-1)%s]:(Or.subVectors(a[0],a[1]).add(a[0]),c=Or);const d=a[o%s],f=a[(o+1)%s];if(this.closed||o+2<s?u=a[(o+2)%s]:(Or.subVectors(a[s-1],a[s-2]).add(a[s-1]),u=Or),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(f),h),m=Math.pow(f.distanceToSquared(u),h);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),$l.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,_,g,m),Wl.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,_,g,m),Xl.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&($l.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Wl.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Xl.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set($l.calc(l),Wl.calc(l),Xl.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const a=this.points[t];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(new L().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wf(n,e,t,i,a){const s=(i-e)*.5,r=(a-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+r)*l+(-3*t+3*i-2*s-r)*o+s*n+t}function vb(n,e){const t=1-n;return t*t*e}function yb(n,e){return 2*(1-n)*n*e}function bb(n,e){return n*n*e}function ks(n,e,t,i){return vb(n,e)+yb(n,t)+bb(n,i)}function Sb(n,e){const t=1-n;return t*t*t*e}function xb(n,e){const t=1-n;return 3*t*t*n*e}function wb(n,e){return 3*(1-n)*n*n*e}function Eb(n,e){return n*n*n*e}function Ds(n,e,t,i,a){return Sb(n,e)+xb(n,t)+wb(n,i)+Eb(n,a)}class k_ extends Yn{constructor(e=new oe,t=new oe,i=new oe,a=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=a}getPoint(e,t=new oe){const i=t,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(Ds(e,a.x,s.x,r.x,o.x),Ds(e,a.y,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mb extends Yn{constructor(e=new L,t=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=a}getPoint(e,t=new L){const i=t,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(Ds(e,a.x,s.x,r.x,o.x),Ds(e,a.y,s.y,r.y,o.y),Ds(e,a.z,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class D_ extends Yn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tb extends Yn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class F_ extends Yn{constructor(e=new oe,t=new oe,i=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new oe){const i=t,a=this.v0,s=this.v1,r=this.v2;return i.set(ks(e,a.x,s.x,r.x),ks(e,a.y,s.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cb extends Yn{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,a=this.v0,s=this.v1,r=this.v2;return i.set(ks(e,a.x,s.x,r.x),ks(e,a.y,s.y,r.y),ks(e,a.z,s.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class O_ extends Yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const i=t,a=this.points,s=(a.length-1)*e,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],u=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(Wf(o,l.x,c.x,u.x,d.x),Wf(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const a=this.points[t];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(new oe().fromArray(a))}return this}}var Xf=Object.freeze({__proto__:null,ArcCurve:_b,CatmullRomCurve3:gb,CubicBezierCurve:k_,CubicBezierCurve3:Mb,EllipseCurve:Fd,LineCurve:D_,LineCurve3:Tb,QuadraticBezierCurve:F_,QuadraticBezierCurve3:Cb,SplineCurve:O_});class Ab extends Yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xf[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),a=this.getCurveLengths();let s=0;for(;s<a.length;){if(a[s]>=i){const r=a[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,a=this.curves.length;i<a;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let a=0,s=this.curves;a<s.length;a++){const r=s[a],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const a=e.curves[t];this.curves.push(a.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const a=this.curves[t];e.curves.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const a=e.curves[t];this.curves.push(new Xf[a.type]().fromJSON(a))}return this}}class Kf extends Ab{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new D_(this.currentPoint.clone(),new oe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,a){const s=new F_(this.currentPoint.clone(),new oe(e,t),new oe(i,a));return this.curves.push(s),this.currentPoint.set(i,a),this}bezierCurveTo(e,t,i,a,s,r){const o=new k_(this.currentPoint.clone(),new oe(e,t),new oe(i,a),new oe(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new O_(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,a,s,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,a,s,r),this}absarc(e,t,i,a,s,r){return this.absellipse(e,t,i,i,a,s,r),this}ellipse(e,t,i,a,s,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,a,s,r,o,l),this}absellipse(e,t,i,a,s,r,o,l){const c=new Fd(e,t,i,a,s,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ud extends Kf{constructor(e){super(e),this.uuid=$n(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,a=this.holes.length;i<a;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const a=e.holes[t];this.holes.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const a=this.holes[t];e.holes.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const a=e.holes[t];this.holes.push(new Kf().fromJSON(a))}return this}}function Rb(n,e,t=2){const i=e&&e.length,a=i?e[0]*t:n.length;let s=U_(n,0,a,t,!0);const r=[];if(!s||s.next===s.prev)return r;let o,l,c;if(i&&(s=kb(n,e,s,t)),n.length>80*t){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let f=t;f<a;f+=t){const h=n[f],_=n[f+1];h<o&&(o=h),_<l&&(l=_),h>u&&(u=h),_>d&&(d=_)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return Ks(s,r,t,o,l,c,0),r}function U_(n,e,t,i,a){let s;if(a===Wb(n,e,t,i)>0)for(let r=e;r<t;r+=i)s=qf(r/i|0,n[r],n[r+1],s);else for(let r=t-i;r>=e;r-=i)s=qf(r/i|0,n[r],n[r+1],s);return s&&os(s,s.next)&&(Ys(s),s=s.next),s}function ra(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(os(t,t.next)||xt(t.prev,t,t.next)===0)){if(Ys(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ks(n,e,t,i,a,s,r){if(!n)return;!r&&s&&Bb(n,i,a,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Lb(n,i,a,s):Pb(n)){e.push(l.i,n.i,c.i),Ys(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=Ib(ra(n),e),Ks(n,e,t,i,a,s,2)):r===2&&Nb(n,e,t,i,a,s):Ks(ra(n),e,t,i,a,s,1);break}}}function Pb(n){const e=n.prev,t=n,i=n.next;if(xt(e,t,i)>=0)return!1;const a=e.x,s=t.x,r=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(a,s,r),d=Math.min(o,l,c),f=Math.max(a,s,r),h=Math.max(o,l,c);let _=i.next;for(;_!==e;){if(_.x>=u&&_.x<=f&&_.y>=d&&_.y<=h&&Es(a,o,s,l,r,c,_.x,_.y)&&xt(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Lb(n,e,t,i){const a=n.prev,s=n,r=n.next;if(xt(a,s,r)>=0)return!1;const o=a.x,l=s.x,c=r.x,u=a.y,d=s.y,f=r.y,h=Math.min(o,l,c),_=Math.min(u,d,f),g=Math.max(o,l,c),m=Math.max(u,d,f),p=Pu(h,_,e,t,i),y=Pu(g,m,e,t,i);let x=n.prevZ,S=n.nextZ;for(;x&&x.z>=p&&S&&S.z<=y;){if(x.x>=h&&x.x<=g&&x.y>=_&&x.y<=m&&x!==a&&x!==r&&Es(o,u,l,d,c,f,x.x,x.y)&&xt(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=h&&S.x<=g&&S.y>=_&&S.y<=m&&S!==a&&S!==r&&Es(o,u,l,d,c,f,S.x,S.y)&&xt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=p;){if(x.x>=h&&x.x<=g&&x.y>=_&&x.y<=m&&x!==a&&x!==r&&Es(o,u,l,d,c,f,x.x,x.y)&&xt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=y;){if(S.x>=h&&S.x<=g&&S.y>=_&&S.y<=m&&S!==a&&S!==r&&Es(o,u,l,d,c,f,S.x,S.y)&&xt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Ib(n,e){let t=n;do{const i=t.prev,a=t.next.next;!os(i,a)&&z_(i,t,t.next,a)&&qs(i,a)&&qs(a,i)&&(e.push(i.i,t.i,a.i),Ys(t),Ys(t.next),t=n=a),t=t.next}while(t!==n);return ra(t)}function Nb(n,e,t,i,a,s){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&Vb(r,o)){let l=H_(r,o);r=ra(r,r.next),l=ra(l,l.next),Ks(r,e,t,i,a,s,0),Ks(l,e,t,i,a,s,0);return}o=o.next}r=r.next}while(r!==n)}function kb(n,e,t,i){const a=[];for(let s=0,r=e.length;s<r;s++){const o=e[s]*i,l=s<r-1?e[s+1]*i:n.length,c=U_(n,o,l,i,!1);c===c.next&&(c.steiner=!0),a.push(Hb(c))}a.sort(Db);for(let s=0;s<a.length;s++)t=Fb(a[s],t);return t}function Db(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),a=(e.next.y-e.y)/(e.next.x-e.x);t=i-a}return t}function Fb(n,e){const t=Ob(n,e);if(!t)return e;const i=H_(t,n);return ra(i,i.next),ra(t,t.next)}function Ob(n,e){let t=e;const i=n.x,a=n.y;let s=-1/0,r;if(os(n,t))return t;do{if(os(n,t.next))return t.next;if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>s&&(s=d,r=t.x<t.next.x?t:t.next,d===i))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&B_(a<c?i:s,a,l,c,a<c?s:i,a,t.x,t.y)){const d=Math.abs(a-t.y)/(i-t.x);qs(t,n)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&Ub(r,t)))&&(r=t,u=d)}t=t.next}while(t!==o);return r}function Ub(n,e){return xt(n.prev,n,e.prev)<0&&xt(e.next,n,n.next)<0}function Bb(n,e,t,i){let a=n;do a.z===0&&(a.z=Pu(a.x,a.y,e,t,i)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==n);a.prevZ.nextZ=null,a.prevZ=null,zb(a)}function zb(n){let e,t=1;do{let i=n,a;n=null;let s=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<t&&(o++,r=r.nextZ,!!r);c++);let l=t;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(a=i,i=i.nextZ,o--):(a=r,r=r.nextZ,l--),s?s.nextZ=a:n=a,a.prevZ=s,s=a;i=r}s.nextZ=null,t*=2}while(e>1);return n}function Pu(n,e,t,i,a){return n=(n-t)*a|0,e=(e-i)*a|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Hb(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function B_(n,e,t,i,a,s,r,o){return(a-r)*(e-o)>=(n-r)*(s-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(s-o)>=(a-r)*(i-o)}function Es(n,e,t,i,a,s,r,o){return!(n===r&&e===o)&&B_(n,e,t,i,a,s,r,o)}function Vb(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Gb(n,e)&&(qs(n,e)&&qs(e,n)&&$b(n,e)&&(xt(n.prev,n,e.prev)||xt(n,e.prev,e))||os(n,e)&&xt(n.prev,n,n.next)>0&&xt(e.prev,e,e.next)>0)}function xt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function os(n,e){return n.x===e.x&&n.y===e.y}function z_(n,e,t,i){const a=Br(xt(n,e,t)),s=Br(xt(n,e,i)),r=Br(xt(t,i,n)),o=Br(xt(t,i,e));return!!(a!==s&&r!==o||a===0&&Ur(n,t,e)||s===0&&Ur(n,i,e)||r===0&&Ur(t,n,i)||o===0&&Ur(t,e,i))}function Ur(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Br(n){return n>0?1:n<0?-1:0}function Gb(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&z_(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function qs(n,e){return xt(n.prev,n,n.next)<0?xt(n,e,n.next)>=0&&xt(n,n.prev,e)>=0:xt(n,e,n.prev)<0||xt(n,n.next,e)<0}function $b(n,e){let t=n,i=!1;const a=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&a<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function H_(n,e){const t=Lu(n.i,n.x,n.y),i=Lu(e.i,e.x,e.y),a=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=a,a.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function qf(n,e,t,i){const a=Lu(n,e,t);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a}function Ys(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Lu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Wb(n,e,t,i){let a=0;for(let s=e,r=t-i;s<t;s+=i)a+=(n[r]-n[s])*(n[s+1]+n[r+1]),r=s;return a}class Xb{static triangulate(e,t,i=2){return Rb(e,t,i)}}class Fs{static area(e){const t=e.length;let i=0;for(let a=t-1,s=0;s<t;a=s++)i+=e[a].x*e[s].y-e[s].x*e[a].y;return i*.5}static isClockWise(e){return Fs.area(e)<0}static triangulateShape(e,t){const i=[],a=[],s=[];Yf(e),jf(i,e);let r=e.length;t.forEach(Yf);for(let l=0;l<t.length;l++)a.push(r),r+=t[l].length,jf(i,t[l]);const o=Xb.triangulate(i,a);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Yf(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function jf(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class en extends Mt{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const s=e/2,r=t/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,d=e/o,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const y=p*f-r;for(let x=0;x<c;x++){const S=x*d-s;_.push(S,-y,0),g.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const x=y+c*p,S=y+c*(p+1),C=y+1+c*(p+1),M=y+1+c*p;h.push(x,S,M),h.push(S,C,M)}this.setIndex(h),this.setAttribute("position",new et(_,3)),this.setAttribute("normal",new et(g,3)),this.setAttribute("uv",new et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.width,e.height,e.widthSegments,e.heightSegments)}}class la extends Mt{constructor(e=.5,t=1,i=32,a=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:a,thetaStart:s,thetaLength:r},i=Math.max(3,i),a=Math.max(1,a);const o=[],l=[],c=[],u=[];let d=e;const f=(t-e)/a,h=new L,_=new oe;for(let g=0;g<=a;g++){for(let m=0;m<=i;m++){const p=s+m/i*r;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),_.x=(h.x/t+1)/2,_.y=(h.y/t+1)/2,u.push(_.x,_.y)}d+=f}for(let g=0;g<a;g++){const m=g*(i+1);for(let p=0;p<i;p++){const y=p+m,x=y,S=y+i+1,C=y+i+2,M=y+1;o.push(x,S,M),o.push(S,C,M)}}this.setIndex(o),this.setAttribute("position",new et(l,3)),this.setAttribute("normal",new et(c,3)),this.setAttribute("uv",new et(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new la(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ol extends Mt{constructor(e=new Ud([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],a=[],s=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new et(a,3)),this.setAttribute("normal",new et(s,3)),this.setAttribute("uv",new et(r,2));function c(u){const d=a.length/3,f=u.extractPoints(t);let h=f.shape;const _=f.holes;Fs.isClockWise(h)===!1&&(h=h.reverse());for(let m=0,p=_.length;m<p;m++){const y=_[m];Fs.isClockWise(y)===!0&&(_[m]=y.reverse())}const g=Fs.triangulateShape(h,_);for(let m=0,p=_.length;m<p;m++){const y=_[m];h=h.concat(y)}for(let m=0,p=h.length;m<p;m++){const y=h[m];a.push(y.x,y.y,0),s.push(0,0,1),r.push(y.x,y.y)}for(let m=0,p=g.length;m<p;m++){const y=g[m],x=y[0]+d,S=y[1]+d,C=y[2]+d;i.push(x,S,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Kb(t,e)}static fromJSON(e,t){const i=[];for(let a=0,s=e.shapes.length;a<s;a++){const r=t[e.shapes[a]];i.push(r)}return new ol(i,e.curveSegments)}}function Kb(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const a=n[t];e.shapes.push(a.uuid)}else e.shapes.push(n.uuid);return e}class ls extends Mt{constructor(e=1,t=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],d=new L,f=new L,h=[],_=[],g=[],m=[];for(let p=0;p<=i;p++){const y=[],x=p/i;let S=0;p===0&&r===0?S=.5/t:p===i&&l===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const M=C/t;d.x=-e*Math.cos(a+M*s)*Math.sin(r+x*o),d.y=e*Math.cos(r+x*o),d.z=e*Math.sin(a+M*s)*Math.sin(r+x*o),_.push(d.x,d.y,d.z),f.copy(d).normalize(),g.push(f.x,f.y,f.z),m.push(M+S,1-x),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const x=u[p][y+1],S=u[p][y],C=u[p+1][y],M=u[p+1][y+1];(p!==0||r>0)&&h.push(x,S,M),(p!==i-1||l<Math.PI)&&h.push(S,C,M)}this.setIndex(h),this.setAttribute("position",new et(_,3)),this.setAttribute("normal",new et(g,3)),this.setAttribute("uv",new et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Bd extends Mt{constructor(e=1,t=.4,i=12,a=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:a,arc:s},i=Math.floor(i),a=Math.floor(a);const r=[],o=[],l=[],c=[],u=new L,d=new L,f=new L;for(let h=0;h<=i;h++)for(let _=0;_<=a;_++){const g=_/a*s,m=h/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(g),d.y=(e+t*Math.cos(m))*Math.sin(g),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/a),c.push(h/i)}for(let h=1;h<=i;h++)for(let _=1;_<=a;_++){const g=(a+1)*h+_-1,m=(a+1)*(h-1)+_-1,p=(a+1)*(h-1)+_,y=(a+1)*h+_;r.push(g,m,y),r.push(m,p,y)}this.setIndex(r),this.setAttribute("position",new et(o,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bd(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ho extends di{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ve(16777215),this.specular=new Ve(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ld,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class V_ extends di{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ld,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qb extends di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Yb extends di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class G_ extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Kl=new vt,Zf=new L,Jf=new L;class jb{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=Kn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dd,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Zf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zf),Jf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jf),t.updateMatrixWorld(),Kl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Kl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class $_ extends C_{constructor(e=-1,t=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zb extends jb{constructor(){super(new $_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qf extends G_{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Zb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Jb extends G_{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Qb extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class eh{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const th=new L;let zr,ql;class eS extends Lt{constructor(e=new L(0,0,1),t=new L(0,0,0),i=1,a=16776960,s=i*.2,r=s*.2){super(),this.type="ArrowHelper",zr===void 0&&(zr=new Mt,zr.setAttribute("position",new et([0,0,0,0,1,0],3)),ql=new Xs(.5,1,5,1),ql.translate(0,-.5,0)),this.position.copy(t),this.line=new al(zr,new rr({color:a,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Be(ql,new nt({color:a,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{th.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(th,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class tS extends oa{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function nh(n,e,t,i){const a=nS(i);switch(t){case m_:return n*e;case g_:return n*e/a.components*a.byteLength;case Ad:return n*e/a.components*a.byteLength;case v_:return n*e*2/a.components*a.byteLength;case Rd:return n*e*2/a.components*a.byteLength;case __:return n*e*3/a.components*a.byteLength;case Ln:return n*e*4/a.components*a.byteLength;case Pd:return n*e*4/a.components*a.byteLength;case po:case mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _o:case go:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case nu:case au:return Math.max(n,16)*Math.max(e,8)/4;case tu:case iu:return Math.max(n,8)*Math.max(e,8)/2;case su:case ru:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ou:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case uu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case du:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case fu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case hu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case pu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case mu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case _u:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case gu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case vu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case yu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case bu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Su:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case xu:case wu:case Eu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Mu:case Tu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Cu:case Au:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nS(n){switch(n){case Kn:case d_:return{byteLength:1,components:1};case zs:case f_:case ar:return{byteLength:2,components:1};case Td:case Cd:return{byteLength:2,components:4};case aa:case Md:case ci:return{byteLength:4,components:1};case h_:case p_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function W_(){let n=null,e=!1,t=null,i=null;function a(s,r){t(s,r),i=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function iS(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var aS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sS=`#ifdef USE_ALPHAHASH
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
#endif`,rS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uS=`#ifdef USE_AOMAP
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
#endif`,dS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fS=`#ifdef USE_BATCHING
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
#endif`,hS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_S=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gS=`#ifdef USE_IRIDESCENCE
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
#endif`,vS=`#ifdef USE_BUMPMAP
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
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ES=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,MS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,TS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,CS=`#define PI 3.141592653589793
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
} // validated`,AS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,RS=`vec3 transformedNormal = objectNormal;
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
#endif`,PS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,LS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,IS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,NS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kS="gl_FragColor = linearToOutputTexel( gl_FragColor );",DS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,FS=`#ifdef USE_ENVMAP
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
#endif`,OS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,US=`#ifdef USE_ENVMAP
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
#endif`,BS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zS=`#ifdef USE_ENVMAP
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
#endif`,HS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,VS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,GS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$S=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,WS=`#ifdef USE_GRADIENTMAP
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
}`,XS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,KS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YS=`uniform bool receiveShadow;
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
#endif`,jS=`#ifdef USE_ENVMAP
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
#endif`,ZS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,JS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ex=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tx=`PhysicalMaterial material;
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
#endif`,nx=`struct PhysicalMaterial {
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
}`,ix=`
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
#endif`,ax=`#if defined( RE_IndirectDiffuse )
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
#endif`,sx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ox=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ux=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hx=`#if defined( USE_POINTS_UV )
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
#endif`,px=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_x=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yx=`#ifdef USE_MORPHTARGETS
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
#endif`,bx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,xx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tx=`#ifdef USE_NORMALMAP
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
#endif`,Cx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Px=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ix=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Nx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ox=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ux=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vx=`float getShadowMask() {
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
}`,Gx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$x=`#ifdef USE_SKINNING
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
#endif`,Wx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xx=`#ifdef USE_SKINNING
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
#endif`,Kx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zx=`#ifdef USE_TRANSMISSION
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
#endif`,Jx=`#ifdef USE_TRANSMISSION
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
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,aw=`uniform sampler2D t2D;
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
}`,sw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ow=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cw=`#include <common>
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
}`,uw=`#if DEPTH_PACKING == 3200
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
}`,dw=`#define DISTANCE
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
}`,fw=`#define DISTANCE
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
}`,hw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mw=`uniform float scale;
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
}`,_w=`uniform vec3 diffuse;
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
}`,gw=`#include <common>
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
}`,vw=`uniform vec3 diffuse;
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
}`,yw=`#define LAMBERT
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
}`,bw=`#define LAMBERT
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
}`,Sw=`#define MATCAP
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
}`,xw=`#define MATCAP
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
}`,ww=`#define NORMAL
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
}`,Ew=`#define NORMAL
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
}`,Mw=`#define PHONG
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
}`,Tw=`#define PHONG
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
}`,Cw=`#define STANDARD
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
}`,Aw=`#define STANDARD
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
}`,Rw=`#define TOON
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
}`,Pw=`#define TOON
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
}`,Lw=`uniform float size;
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
}`,Iw=`uniform vec3 diffuse;
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
}`,Nw=`#include <common>
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
}`,kw=`uniform vec3 color;
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
}`,Dw=`uniform float rotation;
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
}`,Fw=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:aS,alphahash_pars_fragment:sS,alphamap_fragment:rS,alphamap_pars_fragment:oS,alphatest_fragment:lS,alphatest_pars_fragment:cS,aomap_fragment:uS,aomap_pars_fragment:dS,batching_pars_vertex:fS,batching_vertex:hS,begin_vertex:pS,beginnormal_vertex:mS,bsdfs:_S,iridescence_fragment:gS,bumpmap_pars_fragment:vS,clipping_planes_fragment:yS,clipping_planes_pars_fragment:bS,clipping_planes_pars_vertex:SS,clipping_planes_vertex:xS,color_fragment:wS,color_pars_fragment:ES,color_pars_vertex:MS,color_vertex:TS,common:CS,cube_uv_reflection_fragment:AS,defaultnormal_vertex:RS,displacementmap_pars_vertex:PS,displacementmap_vertex:LS,emissivemap_fragment:IS,emissivemap_pars_fragment:NS,colorspace_fragment:kS,colorspace_pars_fragment:DS,envmap_fragment:FS,envmap_common_pars_fragment:OS,envmap_pars_fragment:US,envmap_pars_vertex:BS,envmap_physical_pars_fragment:jS,envmap_vertex:zS,fog_vertex:HS,fog_pars_vertex:VS,fog_fragment:GS,fog_pars_fragment:$S,gradientmap_pars_fragment:WS,lightmap_pars_fragment:XS,lights_lambert_fragment:KS,lights_lambert_pars_fragment:qS,lights_pars_begin:YS,lights_toon_fragment:ZS,lights_toon_pars_fragment:JS,lights_phong_fragment:QS,lights_phong_pars_fragment:ex,lights_physical_fragment:tx,lights_physical_pars_fragment:nx,lights_fragment_begin:ix,lights_fragment_maps:ax,lights_fragment_end:sx,logdepthbuf_fragment:rx,logdepthbuf_pars_fragment:ox,logdepthbuf_pars_vertex:lx,logdepthbuf_vertex:cx,map_fragment:ux,map_pars_fragment:dx,map_particle_fragment:fx,map_particle_pars_fragment:hx,metalnessmap_fragment:px,metalnessmap_pars_fragment:mx,morphinstance_vertex:_x,morphcolor_vertex:gx,morphnormal_vertex:vx,morphtarget_pars_vertex:yx,morphtarget_vertex:bx,normal_fragment_begin:Sx,normal_fragment_maps:xx,normal_pars_fragment:wx,normal_pars_vertex:Ex,normal_vertex:Mx,normalmap_pars_fragment:Tx,clearcoat_normal_fragment_begin:Cx,clearcoat_normal_fragment_maps:Ax,clearcoat_pars_fragment:Rx,iridescence_pars_fragment:Px,opaque_fragment:Lx,packing:Ix,premultiplied_alpha_fragment:Nx,project_vertex:kx,dithering_fragment:Dx,dithering_pars_fragment:Fx,roughnessmap_fragment:Ox,roughnessmap_pars_fragment:Ux,shadowmap_pars_fragment:Bx,shadowmap_pars_vertex:zx,shadowmap_vertex:Hx,shadowmask_pars_fragment:Vx,skinbase_vertex:Gx,skinning_pars_vertex:$x,skinning_vertex:Wx,skinnormal_vertex:Xx,specularmap_fragment:Kx,specularmap_pars_fragment:qx,tonemapping_fragment:Yx,tonemapping_pars_fragment:jx,transmission_fragment:Zx,transmission_pars_fragment:Jx,uv_pars_fragment:Qx,uv_pars_vertex:ew,uv_vertex:tw,worldpos_vertex:nw,background_vert:iw,background_frag:aw,backgroundCube_vert:sw,backgroundCube_frag:rw,cube_vert:ow,cube_frag:lw,depth_vert:cw,depth_frag:uw,distanceRGBA_vert:dw,distanceRGBA_frag:fw,equirect_vert:hw,equirect_frag:pw,linedashed_vert:mw,linedashed_frag:_w,meshbasic_vert:gw,meshbasic_frag:vw,meshlambert_vert:yw,meshlambert_frag:bw,meshmatcap_vert:Sw,meshmatcap_frag:xw,meshnormal_vert:ww,meshnormal_frag:Ew,meshphong_vert:Mw,meshphong_frag:Tw,meshphysical_vert:Cw,meshphysical_frag:Aw,meshtoon_vert:Rw,meshtoon_frag:Pw,points_vert:Lw,points_frag:Iw,shadow_vert:Nw,shadow_frag:kw,sprite_vert:Dw,sprite_frag:Fw},ue={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Hn={basic:{uniforms:qt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:qt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:qt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:qt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:qt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:qt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:qt([ue.points,ue.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:qt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:qt([ue.common,ue.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:qt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:qt([ue.sprite,ue.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:qt([ue.common,ue.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:qt([ue.lights,ue.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Hn.physical={uniforms:qt([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Hr={r:0,b:0,g:0},Vi=new Dn,Ow=new vt;function Uw(n,e,t,i,a,s,r){const o=new Ve(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(x){let S=x.isScene===!0?x.background:null;return S&&S.isTexture&&(S=(x.backgroundBlurriness>0?t:e).get(S)),S}function g(x){let S=!1;const C=_(x);C===null?p(o,l):C&&C.isColor&&(p(C,1),S=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,S){const C=_(S);C&&(C.isCubeTexture||C.mapping===nl)?(u===void 0&&(u=new Be(new ki(1,1,1),new Li({name:"BackgroundCubeMaterial",uniforms:rs(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),Vi.copy(S.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ow.makeRotationFromEuler(Vi)),u.material.toneMapped=Qe.getTransfer(C.colorSpace)!==ot,(d!==C||f!==C.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=C,f=C.version,h=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Be(new en(2,2),new Li({name:"BackgroundMaterial",uniforms:rs(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(C.colorSpace)!==ot,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||f!==C.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,f=C.version,h=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,S){x.getRGB(Hr,T_(n)),i.buffers.color.setClear(Hr.r,Hr.g,Hr.b,S,r)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,S=1){o.set(x),l=S,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:g,addToRenderList:m,dispose:y}}function Bw(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=f(null);let s=a,r=!1;function o(v,R,N,z,B){let G=!1;const U=d(z,N,R);s!==U&&(s=U,c(s.object)),G=h(v,z,N,B),G&&_(v,z,N,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,S(v,R,N,z),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function d(v,R,N){const z=N.wireframe===!0;let B=i[v.id];B===void 0&&(B={},i[v.id]=B);let G=B[R.id];G===void 0&&(G={},B[R.id]=G);let U=G[z];return U===void 0&&(U=f(l()),G[z]=U),U}function f(v){const R=[],N=[],z=[];for(let B=0;B<t;B++)R[B]=0,N[B]=0,z[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:z,object:v,attributes:{},index:null}}function h(v,R,N,z){const B=s.attributes,G=R.attributes;let U=0;const X=N.getAttributes();for(const V in X)if(X[V].location>=0){const de=B[V];let K=G[V];if(K===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(K=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(K=v.instanceColor)),de===void 0||de.attribute!==K||K&&de.data!==K.data)return!0;U++}return s.attributesNum!==U||s.index!==z}function _(v,R,N,z){const B={},G=R.attributes;let U=0;const X=N.getAttributes();for(const V in X)if(X[V].location>=0){let de=G[V];de===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(de=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(de=v.instanceColor));const K={};K.attribute=de,de&&de.data&&(K.data=de.data),B[V]=K,U++}s.attributes=B,s.attributesNum=U,s.index=z}function g(){const v=s.newAttributes;for(let R=0,N=v.length;R<N;R++)v[R]=0}function m(v){p(v,0)}function p(v,R){const N=s.newAttributes,z=s.enabledAttributes,B=s.attributeDivisors;N[v]=1,z[v]===0&&(n.enableVertexAttribArray(v),z[v]=1),B[v]!==R&&(n.vertexAttribDivisor(v,R),B[v]=R)}function y(){const v=s.newAttributes,R=s.enabledAttributes;for(let N=0,z=R.length;N<z;N++)R[N]!==v[N]&&(n.disableVertexAttribArray(N),R[N]=0)}function x(v,R,N,z,B,G,U){U===!0?n.vertexAttribIPointer(v,R,N,B,G):n.vertexAttribPointer(v,R,N,z,B,G)}function S(v,R,N,z){g();const B=z.attributes,G=N.getAttributes(),U=R.defaultAttributeValues;for(const X in G){const V=G[X];if(V.location>=0){let Q=B[X];if(Q===void 0&&(X==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),X==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor)),Q!==void 0){const de=Q.normalized,K=Q.itemSize,ce=e.get(Q);if(ce===void 0)continue;const Se=ce.buffer,ve=ce.type,he=ce.bytesPerElement,O=ve===n.INT||ve===n.UNSIGNED_INT||Q.gpuType===Md;if(Q.isInterleavedBufferAttribute){const q=Q.data,ee=q.stride,be=Q.offset;if(q.isInstancedInterleavedBuffer){for(let ge=0;ge<V.locationSize;ge++)p(V.location+ge,q.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ge=0;ge<V.locationSize;ge++)m(V.location+ge);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let ge=0;ge<V.locationSize;ge++)x(V.location+ge,K/V.locationSize,ve,de,ee*he,(be+K/V.locationSize*ge)*he,O)}else{if(Q.isInstancedBufferAttribute){for(let q=0;q<V.locationSize;q++)p(V.location+q,Q.meshPerAttribute);v.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let q=0;q<V.locationSize;q++)m(V.location+q);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let q=0;q<V.locationSize;q++)x(V.location+q,K/V.locationSize,ve,de,K*he,K/V.locationSize*q*he,O)}}else if(U!==void 0){const de=U[X];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(V.location,de);break;case 3:n.vertexAttrib3fv(V.location,de);break;case 4:n.vertexAttrib4fv(V.location,de);break;default:n.vertexAttrib1fv(V.location,de)}}}}y()}function C(){A();for(const v in i){const R=i[v];for(const N in R){const z=R[N];for(const B in z)u(z[B].object),delete z[B];delete R[N]}delete i[v]}}function M(v){if(i[v.id]===void 0)return;const R=i[v.id];for(const N in R){const z=R[N];for(const B in z)u(z[B].object),delete z[B];delete R[N]}delete i[v.id]}function T(v){for(const R in i){const N=i[R];if(N[v.id]===void 0)continue;const z=N[v.id];for(const B in z)u(z[B].object),delete z[B];delete N[v.id]}}function A(){b(),r=!0,s!==a&&(s=a,c(s.object))}function b(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:A,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function zw(n,e,t){let i;function a(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,i,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)r(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Hw(n,e,t,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Ln&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===ar&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Kn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ci&&!A)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:S,vertexTextures:C,maxSamples:M}}function Vw(n){const e=this;let t=null,i=0,a=!1,s=!1;const r=new yi,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||i!==0||a;return a=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!a||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,x=y*4;let S=p.clippingState||null;l.value=S,S=u(_,f,x,h);for(let C=0;C!==x;++C)S[C]=t[C];p.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,S=h;x!==g;++x,S+=4)r.copy(d[x]).applyMatrix4(y,o),r.normal.toArray(m,S),m[S+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Gw(n){let e=new WeakMap;function t(r,o){return o===Zc?r.mapping=is:o===Jc&&(r.mapping=as),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===Zc||o===Jc)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new ob(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",a),t(c.texture,r.mapping)}else return null}}return r}function a(r){const o=r.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Da=4,ih=[.125,.215,.35,.446,.526,.582],Zi=20,Yl=new $_,ah=new Ve;let jl=null,Zl=0,Jl=0,Ql=!1;const qi=(1+Math.sqrt(5))/2,Ca=1/qi,sh=[new L(-qi,Ca,0),new L(qi,Ca,0),new L(-Ca,0,qi),new L(Ca,0,qi),new L(0,qi,-Ca),new L(0,qi,Ca),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],$w=new L;class rh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100,s={}){const{size:r=256,position:o=$w}=s;jl=this._renderer.getRenderTarget(),Zl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),Ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jl,Zl,Jl),this._renderer.xr.enabled=Ql,e.scissorTest=!1,Vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jl=this._renderer.getRenderTarget(),Zl=this._renderer.getActiveCubeFace(),Jl=this._renderer.getActiveMipmapLevel(),Ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:ar,format:Ln,colorSpace:ss,depthBuffer:!1},a=oh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oh(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ww(s)),this._blurMaterial=Xw(s,e,t)}return a}_compileMaterial(e){const t=new Be(this._lodPlanes[0],e);this._renderer.compile(t,Yl)}_sceneToCubeUV(e,t,i,a,s){const l=new _n(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(ah),d.toneMapping=Ci,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));const g=new nt({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),m=new Be(new ki,g);let p=!1;const y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,p=!0):(g.color.copy(ah),p=!0);for(let x=0;x<6;x++){const S=x%3;S===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):S===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const C=this._cubeSize;Vr(a,S*C,x>2?C:0,C,C),d.setRenderTarget(a),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===is||e.mapping===as;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lh());const s=a?this._cubemapMaterial:this._equirectMaterial,r=new Be(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Vr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,Yl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=sh[(a-s-1)%sh.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,t,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Be(this._lodPlanes[a],c),f=c.uniforms,h=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Zi-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Zi;m>Zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zi}`);const p=[];let y=0;for(let T=0;T<Zi;++T){const A=T/g,b=Math.exp(-A*A/2);p.push(b),T===0?y+=b:T<m&&(y+=2*b)}for(let T=0;T<p.length;T++)p[T]=p[T]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-i;const S=this._sizeLods[a],C=3*S*(a>x-Da?a-x+Da:0),M=4*(this._cubeSize-S);Vr(t,C,M,3*S,2*S),l.setRenderTarget(t),l.render(d,Yl)}}function Ww(n){const e=[],t=[],i=[];let a=n;const s=n-Da+1+ih.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let l=1/o;r>n-Da?l=ih[r-n+Da-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,y=new Float32Array(g*_*h),x=new Float32Array(m*_*h),S=new Float32Array(p*_*h);for(let M=0;M<h;M++){const T=M%3*2/3-1,A=M>2?0:-1,b=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];y.set(b,g*_*M),x.set(f,m*_*M);const v=[M,M,M,M,M,M];S.set(v,p*_*M)}const C=new Mt;C.setAttribute("position",new kn(y,g)),C.setAttribute("uv",new kn(x,m)),C.setAttribute("faceIndex",new kn(S,p)),e.push(C),a>Da&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function oh(n,e,t){const i=new sa(n,e,t);return i.texture.mapping=nl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Vr(n,e,t,i,a){n.viewport.set(e,t,i,a),n.scissor.set(e,t,i,a)}function Xw(n,e,t){const i=new Float32Array(Zi),a=new L(0,1,0);return new Li({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:zd(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function lh(){return new Li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zd(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ch(){return new Li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function zd(){return`

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
	`}function Kw(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Zc||l===Jc,u=l===is||l===as;if(c||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new rh(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const h=o.image;return c&&h&&h.height>0||u&&h&&a(h)?(t===null&&(t=new rh(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function qw(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&Ws("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function Yw(n,e,t,i){const a={},s=new WeakMap;function r(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",r),delete a[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",r),a[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const y=h.array;g=h.version;for(let x=0,S=y.length;x<S;x+=3){const C=y[x+0],M=y[x+1],T=y[x+2];f.push(C,M,M,T,T,C)}}else if(_!==void 0){const y=_.array;g=_.version;for(let x=0,S=y.length/3-1;x<S;x+=3){const C=x+0,M=x+1,T=x+2;f.push(C,M,M,T,T,C)}}else return;const m=new(b_(f)?M_:E_)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function jw(n,e,t){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*r),t.update(h,i,1)}function c(f,h,_){_!==0&&(n.drawElementsInstanced(i,h,s,f*r,_),t.update(h,i,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,i,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/r,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,g,0,_);let p=0;for(let y=0;y<_;y++)p+=h[y]*g[y];t.update(p,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Zw(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function Jw(n,e,t){const i=new WeakMap,a=new Et;function s(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let b=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();const h=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;h===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let S=o.attributes.position.count*x,C=1;S>e.maxTextureSize&&(C=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const M=new Float32Array(S*C*4*d),T=new S_(M,S,C,d);T.type=ci,T.needsUpdate=!0;const A=x*4;for(let v=0;v<d;v++){const R=m[v],N=p[v],z=y[v],B=S*C*4*v;for(let G=0;G<R.count;G++){const U=G*A;h===!0&&(a.fromBufferAttribute(R,G),M[B+U+0]=a.x,M[B+U+1]=a.y,M[B+U+2]=a.z,M[B+U+3]=0),_===!0&&(a.fromBufferAttribute(N,G),M[B+U+4]=a.x,M[B+U+5]=a.y,M[B+U+6]=a.z,M[B+U+7]=0),g===!0&&(a.fromBufferAttribute(z,G),M[B+U+8]=a.x,M[B+U+9]=a.y,M[B+U+10]=a.z,M[B+U+11]=z.itemSize===4?a.w:1)}}f={count:d,texture:T,size:new oe(S,C)},i.set(o,f),o.addEventListener("dispose",b)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let h=0;for(let g=0;g<c.length;g++)h+=c[g];const _=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Qw(n,e,t,i){let a=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(a.get(d)!==c&&(e.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function r(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}const X_=new Yt,uh=new I_(1,1),K_=new S_,q_=new $y,Y_=new A_,dh=[],fh=[],hh=new Float32Array(16),ph=new Float32Array(9),mh=new Float32Array(4);function cs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const a=e*t;let s=dh[a];if(s===void 0&&(s=new Float32Array(a),dh[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(s,o)}return s}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ll(n,e){let t=fh[e];t===void 0&&(t=new Int32Array(e),fh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function eE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function tE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),kt(t,e)}}function nE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),kt(t,e)}}function iE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),kt(t,e)}}function aE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Nt(t,i))return;mh.set(i),n.uniformMatrix2fv(this.addr,!1,mh),kt(t,i)}}function sE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Nt(t,i))return;ph.set(i),n.uniformMatrix3fv(this.addr,!1,ph),kt(t,i)}}function rE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Nt(t,i))return;hh.set(i),n.uniformMatrix4fv(this.addr,!1,hh),kt(t,i)}}function oE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function lE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),kt(t,e)}}function cE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),kt(t,e)}}function uE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),kt(t,e)}}function dE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function fE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),kt(t,e)}}function hE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),kt(t,e)}}function pE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),kt(t,e)}}function mE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let s;this.type===n.SAMPLER_2D_SHADOW?(uh.compareFunction=y_,s=uh):s=X_,t.setTexture2D(e||s,a)}function _E(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||q_,a)}function gE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||Y_,a)}function vE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||K_,a)}function yE(n){switch(n){case 5126:return eE;case 35664:return tE;case 35665:return nE;case 35666:return iE;case 35674:return aE;case 35675:return sE;case 35676:return rE;case 5124:case 35670:return oE;case 35667:case 35671:return lE;case 35668:case 35672:return cE;case 35669:case 35673:return uE;case 5125:return dE;case 36294:return fE;case 36295:return hE;case 36296:return pE;case 35678:case 36198:case 36298:case 36306:case 35682:return mE;case 35679:case 36299:case 36307:return _E;case 35680:case 36300:case 36308:case 36293:return gE;case 36289:case 36303:case 36311:case 36292:return vE}}function bE(n,e){n.uniform1fv(this.addr,e)}function SE(n,e){const t=cs(e,this.size,2);n.uniform2fv(this.addr,t)}function xE(n,e){const t=cs(e,this.size,3);n.uniform3fv(this.addr,t)}function wE(n,e){const t=cs(e,this.size,4);n.uniform4fv(this.addr,t)}function EE(n,e){const t=cs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ME(n,e){const t=cs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function TE(n,e){const t=cs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function CE(n,e){n.uniform1iv(this.addr,e)}function AE(n,e){n.uniform2iv(this.addr,e)}function RE(n,e){n.uniform3iv(this.addr,e)}function PE(n,e){n.uniform4iv(this.addr,e)}function LE(n,e){n.uniform1uiv(this.addr,e)}function IE(n,e){n.uniform2uiv(this.addr,e)}function NE(n,e){n.uniform3uiv(this.addr,e)}function kE(n,e){n.uniform4uiv(this.addr,e)}function DE(n,e,t){const i=this.cache,a=e.length,s=ll(t,a);Nt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture2D(e[r]||X_,s[r])}function FE(n,e,t){const i=this.cache,a=e.length,s=ll(t,a);Nt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture3D(e[r]||q_,s[r])}function OE(n,e,t){const i=this.cache,a=e.length,s=ll(t,a);Nt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTextureCube(e[r]||Y_,s[r])}function UE(n,e,t){const i=this.cache,a=e.length,s=ll(t,a);Nt(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture2DArray(e[r]||K_,s[r])}function BE(n){switch(n){case 5126:return bE;case 35664:return SE;case 35665:return xE;case 35666:return wE;case 35674:return EE;case 35675:return ME;case 35676:return TE;case 5124:case 35670:return CE;case 35667:case 35671:return AE;case 35668:case 35672:return RE;case 35669:case 35673:return PE;case 5125:return LE;case 36294:return IE;case 36295:return NE;case 36296:return kE;case 35678:case 36198:case 36298:case 36306:case 35682:return DE;case 35679:case 36299:case 36307:return FE;case 35680:case 36300:case 36308:case 36293:return OE;case 36289:case 36303:case 36311:case 36292:return UE}}class zE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=yE(t.type)}}class HE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=BE(t.type)}}class VE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,t[o.id],i)}}}const ec=/(\w+)(\])?(\[|\.)?/g;function _h(n,e){n.seq.push(e),n.map[e.id]=e}function GE(n,e,t){const i=n.name,a=i.length;for(ec.lastIndex=0;;){const s=ec.exec(i),r=ec.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){_h(t,c===void 0?new zE(o,n,e):new HE(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new VE(o),_h(t,d)),t=d}}}class vo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=e.getActiveUniform(t,a),r=e.getUniformLocation(t,s.name);GE(s,r,this)}}setValue(e,t,i,a){const s=this.map[t];s!==void 0&&s.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let s=0,r=t.length;s!==r;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in t&&i.push(r)}return i}}function gh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const $E=37297;let WE=0;function XE(n,e){const t=n.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const vh=new $e;function KE(n){Qe._getMatrix(vh,Qe.workingColorSpace,n);const e=`mat3( ${vh.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Do:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function yh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+XE(n.getShaderSource(e),o)}else return s}function qE(n,e){const t=KE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function YE(n,e){let t;switch(e){case iy:t="Linear";break;case ay:t="Reinhard";break;case sy:t="Cineon";break;case ry:t="ACESFilmic";break;case ly:t="AgX";break;case cy:t="Neutral";break;case oy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new L;function jE(){Qe.getLuminanceCoefficients(Gr);const n=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ZE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function JE(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function QE(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=n.getActiveAttrib(e,a),r=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Ms(n){return n!==""}function bh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Iu(n){return n.replace(eM,nM)}const tM=new Map;function nM(n,e){let t=Xe[e];if(t===void 0){const i=tM.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Iu(t)}const iM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xh(n){return n.replace(iM,aM)}function aM(n,e,t,i){let a="";for(let s=parseInt(e);s<parseInt(t);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function wh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function sM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===c_?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===F0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===si&&(e="SHADOWMAP_TYPE_VSM"),e}function rM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case is:case as:e="ENVMAP_TYPE_CUBE";break;case nl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function oM(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===as&&(e="ENVMAP_MODE_REFRACTION"),e}function lM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case tl:e="ENVMAP_BLENDING_MULTIPLY";break;case ty:e="ENVMAP_BLENDING_MIX";break;case ny:e="ENVMAP_BLENDING_ADD";break}return e}function cM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function uM(n,e,t,i){const a=n.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=sM(t),c=rM(t),u=oM(t),d=lM(t),f=cM(t),h=ZE(t),_=JE(s),g=a.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ms).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ms).join(`
`),p.length>0&&(p+=`
`)):(m=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),p=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Ci?YE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,qE("linearToOutputTexel",t.outputColorSpace),jE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ms).join(`
`)),r=Iu(r),r=bh(r,t),r=Sh(r,t),o=Iu(o),o=bh(o,t),o=Sh(o,t),r=xh(r),o=xh(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===bf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+m+r,S=y+p+o,C=gh(a,a.VERTEX_SHADER,x),M=gh(a,a.FRAGMENT_SHADER,S);a.attachShader(g,C),a.attachShader(g,M),t.index0AttributeName!==void 0?a.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g);function T(R){if(n.debug.checkShaderErrors){const N=a.getProgramInfoLog(g)||"",z=a.getShaderInfoLog(C)||"",B=a.getShaderInfoLog(M)||"",G=N.trim(),U=z.trim(),X=B.trim();let V=!0,Q=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,g,C,M);else{const de=yh(a,C,"vertex"),K=yh(a,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+de+`
`+K)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(U===""||X==="")&&(Q=!1);Q&&(R.diagnostics={runnable:V,programLog:G,vertexShader:{log:U,prefix:m},fragmentShader:{log:X,prefix:p}})}a.deleteShader(C),a.deleteShader(M),A=new vo(a,g),b=QE(a,g)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=a.getProgramParameter(g,$E)),v},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=WE++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=M,this}let dM=0;class fM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new hM(e),t.set(e,i)),i}}class hM{constructor(e){this.id=dM++,this.code=e,this.usedTimes=0}}function pM(n,e,t,i,a,s,r){const o=new x_,l=new fM,c=new Set,u=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures;let h=a.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,R,N,z){const B=N.fog,G=z.geometry,U=b.isMeshStandardMaterial?N.environment:null,X=(b.isMeshStandardMaterial?t:e).get(b.envMap||U),V=X&&X.mapping===nl?X.image.height:null,Q=_[b.type];b.precision!==null&&(h=a.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const de=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,K=de!==void 0?de.length:0;let ce=0;G.morphAttributes.position!==void 0&&(ce=1),G.morphAttributes.normal!==void 0&&(ce=2),G.morphAttributes.color!==void 0&&(ce=3);let Se,ve,he,O;if(Q){const tt=Hn[Q];Se=tt.vertexShader,ve=tt.fragmentShader}else Se=b.vertexShader,ve=b.fragmentShader,l.update(b),he=l.getVertexShaderID(b),O=l.getFragmentShaderID(b);const q=n.getRenderTarget(),ee=n.state.buffers.depth.getReversed(),be=z.isInstancedMesh===!0,ge=z.isBatchedMesh===!0,ke=!!b.map,at=!!b.matcap,I=!!X,st=!!b.aoMap,He=!!b.lightMap,Oe=!!b.bumpMap,Me=!!b.normalMap,mt=!!b.displacementMap,Te=!!b.emissiveMap,We=!!b.metalnessMap,Dt=!!b.roughnessMap,Tt=b.anisotropy>0,P=b.clearcoat>0,w=b.dispersion>0,H=b.iridescence>0,j=b.sheen>0,J=b.transmission>0,Y=Tt&&!!b.anisotropyMap,Pe=P&&!!b.clearcoatMap,re=P&&!!b.clearcoatNormalMap,Ce=P&&!!b.clearcoatRoughnessMap,Ae=H&&!!b.iridescenceMap,ae=H&&!!b.iridescenceThicknessMap,me=j&&!!b.sheenColorMap,De=j&&!!b.sheenRoughnessMap,Re=!!b.specularMap,fe=!!b.specularColorMap,Ge=!!b.specularIntensityMap,k=J&&!!b.transmissionMap,se=J&&!!b.thicknessMap,le=!!b.gradientMap,xe=!!b.alphaMap,ne=b.alphaTest>0,Z=!!b.alphaHash,Ee=!!b.extensions;let ze=Ci;b.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(ze=n.toneMapping);const dt={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:Se,fragmentShader:ve,defines:b.defines,customVertexShaderID:he,customFragmentShaderID:O,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:ge,batchingColor:ge&&z._colorsTexture!==null,instancing:be,instancingColor:be&&z.instanceColor!==null,instancingMorph:be&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:q===null?n.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ss,alphaToCoverage:!!b.alphaToCoverage,map:ke,matcap:at,envMap:I,envMapMode:I&&X.mapping,envMapCubeUVHeight:V,aoMap:st,lightMap:He,bumpMap:Oe,normalMap:Me,displacementMap:f&&mt,emissiveMap:Te,normalMapObjectSpace:Me&&b.normalMapType===hy,normalMapTangentSpace:Me&&b.normalMapType===Ld,metalnessMap:We,roughnessMap:Dt,anisotropy:Tt,anisotropyMap:Y,clearcoat:P,clearcoatMap:Pe,clearcoatNormalMap:re,clearcoatRoughnessMap:Ce,dispersion:w,iridescence:H,iridescenceMap:Ae,iridescenceThicknessMap:ae,sheen:j,sheenColorMap:me,sheenRoughnessMap:De,specularMap:Re,specularColorMap:fe,specularIntensityMap:Ge,transmission:J,transmissionMap:k,thicknessMap:se,gradientMap:le,opaque:b.transparent===!1&&b.blending===Ha&&b.alphaToCoverage===!1,alphaMap:xe,alphaTest:ne,alphaHash:Z,combine:b.combine,mapUv:ke&&g(b.map.channel),aoMapUv:st&&g(b.aoMap.channel),lightMapUv:He&&g(b.lightMap.channel),bumpMapUv:Oe&&g(b.bumpMap.channel),normalMapUv:Me&&g(b.normalMap.channel),displacementMapUv:mt&&g(b.displacementMap.channel),emissiveMapUv:Te&&g(b.emissiveMap.channel),metalnessMapUv:We&&g(b.metalnessMap.channel),roughnessMapUv:Dt&&g(b.roughnessMap.channel),anisotropyMapUv:Y&&g(b.anisotropyMap.channel),clearcoatMapUv:Pe&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:me&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:De&&g(b.sheenRoughnessMap.channel),specularMapUv:Re&&g(b.specularMap.channel),specularColorMapUv:fe&&g(b.specularColorMap.channel),specularIntensityMapUv:Ge&&g(b.specularIntensityMap.channel),transmissionMapUv:k&&g(b.transmissionMap.channel),thicknessMapUv:se&&g(b.thicknessMap.channel),alphaMapUv:xe&&g(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Me||Tt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!G.attributes.uv&&(ke||xe),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:z.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:ce,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:ke&&b.map.isVideoTexture===!0&&Qe.getTransfer(b.map.colorSpace)===ot,decodeVideoTextureEmissive:Te&&b.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(b.emissiveMap.colorSpace)===ot,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ze,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ee&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&b.extensions.multiDraw===!0||ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return dt.vertexUv1s=c.has(1),dt.vertexUv2s=c.has(2),dt.vertexUv3s=c.has(3),c.clear(),dt}function p(b){const v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(const R in b.defines)v.push(R),v.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(y(v,b),x(v,b),v.push(n.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function y(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function x(b,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),v.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),b.push(o.mask)}function S(b){const v=_[b.type];let R;if(v){const N=Hn[v];R=ib.clone(N.uniforms)}else R=b.uniforms;return R}function C(b,v){let R;for(let N=0,z=u.length;N<z;N++){const B=u[N];if(B.cacheKey===v){R=B,++R.usedTimes;break}}return R===void 0&&(R=new uM(n,v,b,s),u.push(R)),R}function M(b){if(--b.usedTimes===0){const v=u.indexOf(b);u[v]=u[u.length-1],u.pop(),b.destroy()}}function T(b){l.remove(b)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:C,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:A}}function mM(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function a(r,o,l){n.get(r)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:a,dispose:s}}function _M(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Eh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Mh(){const n=[];let e=0;const t=[],i=[],a=[];function s(){e=0,t.length=0,i.length=0,a.length=0}function r(d,f,h,_,g,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function o(d,f,h,_,g,m){const p=r(d,f,h,_,g,m);h.transmission>0?i.push(p):h.transparent===!0?a.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=r(d,f,h,_,g,m);h.transmission>0?i.unshift(p):h.transparent===!0?a.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||_M),i.length>1&&i.sort(f||Eh),a.length>1&&a.sort(f||Eh)}function u(){for(let d=e,f=n.length;d<f;d++){const h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:u,sort:c}}function gM(){let n=new WeakMap;function e(i,a){const s=n.get(i);let r;return s===void 0?(r=new Mh,n.set(i,[r])):a>=s.length?(r=new Mh,s.push(r)):r=s[a],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function vM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ve};break;case"SpotLight":t={position:new L,direction:new L,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function yM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let bM=0;function SM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function xM(n){const e=new vM,t=yM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const a=new L,s=new vt,r=new vt;function o(c){let u=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,y=0,x=0,S=0,C=0,M=0,T=0;c.sort(SM);for(let b=0,v=c.length;b<v;b++){const R=c[b],N=R.color,z=R.intensity,B=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=N.r*z,d+=N.g*z,f+=N.b*z;else if(R.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(R.sh.coefficients[U],z);T++}else if(R.isDirectionalLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,V=t.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.directionalShadow[h]=V,i.directionalShadowMap[h]=G,i.directionalShadowMatrix[h]=R.shadow.matrix,y++}i.directional[h]=U,h++}else if(R.isSpotLight){const U=e.get(R);U.position.setFromMatrixPosition(R.matrixWorld),U.color.copy(N).multiplyScalar(z),U.distance=B,U.coneCos=Math.cos(R.angle),U.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),U.decay=R.decay,i.spot[g]=U;const X=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,X.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[g]=X.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=G,S++}g++}else if(R.isRectAreaLight){const U=e.get(R);U.color.copy(N).multiplyScalar(z),U.halfWidth.set(R.width*.5,0,0),U.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=U,m++}else if(R.isPointLight){const U=e.get(R);if(U.color.copy(R.color).multiplyScalar(R.intensity),U.distance=R.distance,U.decay=R.decay,R.castShadow){const X=R.shadow,V=t.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=G,i.pointShadowMatrix[_]=R.shadow.matrix,x++}i.point[_]=U,_++}else if(R.isHemisphereLight){const U=e.get(R);U.skyColor.copy(R.color).multiplyScalar(z),U.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[p]=U,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const A=i.hash;(A.directionalLength!==h||A.pointLength!==_||A.spotLength!==g||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==y||A.numPointShadows!==x||A.numSpotShadows!==S||A.numSpotMaps!==C||A.numLightProbes!==T)&&(i.directional.length=h,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=S+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,A.directionalLength=h,A.pointLength=_,A.spotLength=g,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=y,A.numPointShadows=x,A.numSpotShadows=S,A.numSpotMaps=C,A.numLightProbes=T,i.version=bM++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const x=c[p];if(x.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(x.matrixWorld),a.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(m),d++}else if(x.isSpotLight){const S=i.spot[h];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(x.matrixWorld),a.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(m),h++}else if(x.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),r.identity(),s.copy(x.matrixWorld),s.premultiply(m),r.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),_++}else if(x.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const S=i.hemi[g];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function Th(n){const e=new xM(n),t=[],i=[];function a(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function r(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function wM(n){let e=new WeakMap;function t(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Th(n),e.set(a,[o])):s>=r.length?(o=new Th(n),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const EM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MM=`uniform sampler2D shadow_pass;
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
}`;function TM(n,e,t){let i=new Dd;const a=new oe,s=new oe,r=new Et,o=new qb({depthPacking:fy}),l=new Yb,c={},u=t.maxTextureSize,d={[Pi]:tn,[tn]:Pi,[Ze]:Ze},f=new Li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:EM,fragmentShader:MM}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new Mt;_.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Be(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=c_;let p=this.type;this.render=function(M,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const b=n.getRenderTarget(),v=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Mi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const z=p!==si&&this.type===si,B=p===si&&this.type!==si;for(let G=0,U=M.length;G<U;G++){const X=M[G],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const Q=V.getFrameExtents();if(a.multiply(Q),s.copy(V.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(s.x=Math.floor(u/Q.x),a.x=s.x*Q.x,V.mapSize.x=s.x),a.y>u&&(s.y=Math.floor(u/Q.y),a.y=s.y*Q.y,V.mapSize.y=s.y)),V.map===null||z===!0||B===!0){const K=this.type!==si?{minFilter:Nn,magFilter:Nn}:{};V.map!==null&&V.map.dispose(),V.map=new sa(a.x,a.y,K),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const de=V.getViewportCount();for(let K=0;K<de;K++){const ce=V.getViewport(K);r.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),N.viewport(r),V.updateMatrices(X,K),i=V.getFrustum(),S(T,A,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===si&&y(V,A),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,v,R)};function y(M,T){const A=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,h.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new sa(a.x,a.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(T,null,A,f,g,null),h.uniforms.shadow_pass.value=M.mapPass.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(T,null,A,h,g,null)}function x(M,T,A,b){let v=null;const R=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)v=R;else if(v=A.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const N=v.uuid,z=T.uuid;let B=c[N];B===void 0&&(B={},c[N]=B);let G=B[z];G===void 0&&(G=v.clone(),B[z]=G,T.addEventListener("dispose",C)),v=G}if(v.visible=T.visible,v.wireframe=T.wireframe,b===si?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:d[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,A.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=n.properties.get(v);N.light=A}return v}function S(M,T,A,b,v){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&v===si)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const z=e.update(M),B=M.material;if(Array.isArray(B)){const G=z.groups;for(let U=0,X=G.length;U<X;U++){const V=G[U],Q=B[V.materialIndex];if(Q&&Q.visible){const de=x(M,Q,b,v);M.onBeforeShadow(n,M,T,A,z,de,V),n.renderBufferDirect(A,null,z,de,M,V),M.onAfterShadow(n,M,T,A,z,de,V)}}}else if(B.visible){const G=x(M,B,b,v);M.onBeforeShadow(n,M,T,A,z,G,null),n.renderBufferDirect(A,null,z,G,M,null),M.onAfterShadow(n,M,T,A,z,G,null)}}const N=M.children;for(let z=0,B=N.length;z<B;z++)S(N[z],T,A,b,v)}function C(M){M.target.removeEventListener("dispose",C);for(const A in c){const b=c[A],v=M.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}const CM={[$c]:Wc,[Xc]:Yc,[Kc]:jc,[ns]:qc,[Wc]:$c,[Yc]:Xc,[jc]:Kc,[qc]:ns};function AM(n,e){function t(){let k=!1;const se=new Et;let le=null;const xe=new Et(0,0,0,0);return{setMask:function(ne){le!==ne&&!k&&(n.colorMask(ne,ne,ne,ne),le=ne)},setLocked:function(ne){k=ne},setClear:function(ne,Z,Ee,ze,dt){dt===!0&&(ne*=ze,Z*=ze,Ee*=ze),se.set(ne,Z,Ee,ze),xe.equals(se)===!1&&(n.clearColor(ne,Z,Ee,ze),xe.copy(se))},reset:function(){k=!1,le=null,xe.set(-1,0,0,0)}}}function i(){let k=!1,se=!1,le=null,xe=null,ne=null;return{setReversed:function(Z){if(se!==Z){const Ee=e.get("EXT_clip_control");Z?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),se=Z;const ze=ne;ne=null,this.setClear(ze)}},getReversed:function(){return se},setTest:function(Z){Z?q(n.DEPTH_TEST):ee(n.DEPTH_TEST)},setMask:function(Z){le!==Z&&!k&&(n.depthMask(Z),le=Z)},setFunc:function(Z){if(se&&(Z=CM[Z]),xe!==Z){switch(Z){case $c:n.depthFunc(n.NEVER);break;case Wc:n.depthFunc(n.ALWAYS);break;case Xc:n.depthFunc(n.LESS);break;case ns:n.depthFunc(n.LEQUAL);break;case Kc:n.depthFunc(n.EQUAL);break;case qc:n.depthFunc(n.GEQUAL);break;case Yc:n.depthFunc(n.GREATER);break;case jc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=Z}},setLocked:function(Z){k=Z},setClear:function(Z){ne!==Z&&(se&&(Z=1-Z),n.clearDepth(Z),ne=Z)},reset:function(){k=!1,le=null,xe=null,ne=null,se=!1}}}function a(){let k=!1,se=null,le=null,xe=null,ne=null,Z=null,Ee=null,ze=null,dt=null;return{setTest:function(tt){k||(tt?q(n.STENCIL_TEST):ee(n.STENCIL_TEST))},setMask:function(tt){se!==tt&&!k&&(n.stencilMask(tt),se=tt)},setFunc:function(tt,Jn,Fn){(le!==tt||xe!==Jn||ne!==Fn)&&(n.stencilFunc(tt,Jn,Fn),le=tt,xe=Jn,ne=Fn)},setOp:function(tt,Jn,Fn){(Z!==tt||Ee!==Jn||ze!==Fn)&&(n.stencilOp(tt,Jn,Fn),Z=tt,Ee=Jn,ze=Fn)},setLocked:function(tt){k=tt},setClear:function(tt){dt!==tt&&(n.clearStencil(tt),dt=tt)},reset:function(){k=!1,se=null,le=null,xe=null,ne=null,Z=null,Ee=null,ze=null,dt=null}}}const s=new t,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,y=null,x=null,S=null,C=null,M=null,T=new Ve(0,0,0),A=0,b=!1,v=null,R=null,N=null,z=null,B=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,X=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),U=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),U=X>=2);let Q=null,de={};const K=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),Se=new Et().fromArray(K),ve=new Et().fromArray(ce);function he(k,se,le,xe){const ne=new Uint8Array(4),Z=n.createTexture();n.bindTexture(k,Z),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ee=0;Ee<le;Ee++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,ne):n.texImage2D(se+Ee,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ne);return Z}const O={};O[n.TEXTURE_2D]=he(n.TEXTURE_2D,n.TEXTURE_2D,1),O[n.TEXTURE_CUBE_MAP]=he(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[n.TEXTURE_2D_ARRAY]=he(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),O[n.TEXTURE_3D]=he(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),q(n.DEPTH_TEST),r.setFunc(ns),Oe(!1),Me(_f),q(n.CULL_FACE),st(Mi);function q(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function ee(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function be(k,se){return d[k]!==se?(n.bindFramebuffer(k,se),d[k]=se,k===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=se),k===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=se),!0):!1}function ge(k,se){let le=h,xe=!1;if(k){le=f.get(se),le===void 0&&(le=[],f.set(se,le));const ne=k.textures;if(le.length!==ne.length||le[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,Ee=ne.length;Z<Ee;Z++)le[Z]=n.COLOR_ATTACHMENT0+Z;le.length=ne.length,xe=!0}}else le[0]!==n.BACK&&(le[0]=n.BACK,xe=!0);xe&&n.drawBuffers(le)}function ke(k){return _!==k?(n.useProgram(k),_=k,!0):!1}const at={[ji]:n.FUNC_ADD,[U0]:n.FUNC_SUBTRACT,[B0]:n.FUNC_REVERSE_SUBTRACT};at[z0]=n.MIN,at[H0]=n.MAX;const I={[V0]:n.ZERO,[G0]:n.ONE,[$0]:n.SRC_COLOR,[Vc]:n.SRC_ALPHA,[j0]:n.SRC_ALPHA_SATURATE,[q0]:n.DST_COLOR,[X0]:n.DST_ALPHA,[W0]:n.ONE_MINUS_SRC_COLOR,[Gc]:n.ONE_MINUS_SRC_ALPHA,[Y0]:n.ONE_MINUS_DST_COLOR,[K0]:n.ONE_MINUS_DST_ALPHA,[Z0]:n.CONSTANT_COLOR,[J0]:n.ONE_MINUS_CONSTANT_COLOR,[Q0]:n.CONSTANT_ALPHA,[ey]:n.ONE_MINUS_CONSTANT_ALPHA};function st(k,se,le,xe,ne,Z,Ee,ze,dt,tt){if(k===Mi){g===!0&&(ee(n.BLEND),g=!1);return}if(g===!1&&(q(n.BLEND),g=!0),k!==O0){if(k!==m||tt!==b){if((p!==ji||S!==ji)&&(n.blendEquation(n.FUNC_ADD),p=ji,S=ji),tt)switch(k){case Ha:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ti:n.blendFunc(n.ONE,n.ONE);break;case gf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Ha:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ti:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case gf:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vf:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,x=null,C=null,M=null,T.set(0,0,0),A=0,m=k,b=tt}return}ne=ne||se,Z=Z||le,Ee=Ee||xe,(se!==p||ne!==S)&&(n.blendEquationSeparate(at[se],at[ne]),p=se,S=ne),(le!==y||xe!==x||Z!==C||Ee!==M)&&(n.blendFuncSeparate(I[le],I[xe],I[Z],I[Ee]),y=le,x=xe,C=Z,M=Ee),(ze.equals(T)===!1||dt!==A)&&(n.blendColor(ze.r,ze.g,ze.b,dt),T.copy(ze),A=dt),m=k,b=!1}function He(k,se){k.side===Ze?ee(n.CULL_FACE):q(n.CULL_FACE);let le=k.side===tn;se&&(le=!le),Oe(le),k.blending===Ha&&k.transparent===!1?st(Mi):st(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),r.setFunc(k.depthFunc),r.setTest(k.depthTest),r.setMask(k.depthWrite),s.setMask(k.colorWrite);const xe=k.stencilWrite;o.setTest(xe),xe&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Te(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?q(n.SAMPLE_ALPHA_TO_COVERAGE):ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(k){v!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),v=k)}function Me(k){k!==k0?(q(n.CULL_FACE),k!==R&&(k===_f?n.cullFace(n.BACK):k===D0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ee(n.CULL_FACE),R=k}function mt(k){k!==N&&(U&&n.lineWidth(k),N=k)}function Te(k,se,le){k?(q(n.POLYGON_OFFSET_FILL),(z!==se||B!==le)&&(n.polygonOffset(se,le),z=se,B=le)):ee(n.POLYGON_OFFSET_FILL)}function We(k){k?q(n.SCISSOR_TEST):ee(n.SCISSOR_TEST)}function Dt(k){k===void 0&&(k=n.TEXTURE0+G-1),Q!==k&&(n.activeTexture(k),Q=k)}function Tt(k,se,le){le===void 0&&(Q===null?le=n.TEXTURE0+G-1:le=Q);let xe=de[le];xe===void 0&&(xe={type:void 0,texture:void 0},de[le]=xe),(xe.type!==k||xe.texture!==se)&&(Q!==le&&(n.activeTexture(le),Q=le),n.bindTexture(k,se||O[k]),xe.type=k,xe.texture=se)}function P(){const k=de[Q];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function w(){try{n.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function H(){try{n.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function j(){try{n.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function J(){try{n.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pe(){try{n.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{n.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ce(){try{n.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ae(){try{n.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ae(){try{n.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function me(k){Se.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),Se.copy(k))}function De(k){ve.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),ve.copy(k))}function Re(k,se){let le=c.get(se);le===void 0&&(le=new WeakMap,c.set(se,le));let xe=le.get(k);xe===void 0&&(xe=n.getUniformBlockIndex(se,k.name),le.set(k,xe))}function fe(k,se){const xe=c.get(se).get(k);l.get(se)!==xe&&(n.uniformBlockBinding(se,xe,k.__bindingPointIndex),l.set(se,xe))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Q=null,de={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,y=null,x=null,S=null,C=null,M=null,T=new Ve(0,0,0),A=0,b=!1,v=null,R=null,N=null,z=null,B=null,Se.set(0,0,n.canvas.width,n.canvas.height),ve.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:q,disable:ee,bindFramebuffer:be,drawBuffers:ge,useProgram:ke,setBlending:st,setMaterial:He,setFlipSided:Oe,setCullFace:Me,setLineWidth:mt,setPolygonOffset:Te,setScissorTest:We,activeTexture:Dt,bindTexture:Tt,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:H,texImage2D:Ae,texImage3D:ae,updateUBOMapping:Re,uniformBlockBinding:fe,texStorage2D:re,texStorage3D:Ce,texSubImage2D:j,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:Pe,scissor:me,viewport:De,reset:Ge}}function RM(n,e,t,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new oe,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,w){return h?new OffscreenCanvas(P,w):Oo("canvas")}function g(P,w,H){let j=1;const J=Tt(P);if((J.width>H||J.height>H)&&(j=H/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Y=Math.floor(j*J.width),Pe=Math.floor(j*J.height);d===void 0&&(d=_(Y,Pe));const re=w?_(Y,Pe):d;return re.width=Y,re.height=Pe,re.getContext("2d").drawImage(P,0,0,Y,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+Pe+")."),re}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){n.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(P,w,H,j,J=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Y=w;if(w===n.RED&&(H===n.FLOAT&&(Y=n.R32F),H===n.HALF_FLOAT&&(Y=n.R16F),H===n.UNSIGNED_BYTE&&(Y=n.R8)),w===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.R8UI),H===n.UNSIGNED_SHORT&&(Y=n.R16UI),H===n.UNSIGNED_INT&&(Y=n.R32UI),H===n.BYTE&&(Y=n.R8I),H===n.SHORT&&(Y=n.R16I),H===n.INT&&(Y=n.R32I)),w===n.RG&&(H===n.FLOAT&&(Y=n.RG32F),H===n.HALF_FLOAT&&(Y=n.RG16F),H===n.UNSIGNED_BYTE&&(Y=n.RG8)),w===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.RG8UI),H===n.UNSIGNED_SHORT&&(Y=n.RG16UI),H===n.UNSIGNED_INT&&(Y=n.RG32UI),H===n.BYTE&&(Y=n.RG8I),H===n.SHORT&&(Y=n.RG16I),H===n.INT&&(Y=n.RG32I)),w===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),H===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),H===n.UNSIGNED_INT&&(Y=n.RGB32UI),H===n.BYTE&&(Y=n.RGB8I),H===n.SHORT&&(Y=n.RGB16I),H===n.INT&&(Y=n.RGB32I)),w===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),H===n.UNSIGNED_INT&&(Y=n.RGBA32UI),H===n.BYTE&&(Y=n.RGBA8I),H===n.SHORT&&(Y=n.RGBA16I),H===n.INT&&(Y=n.RGBA32I)),w===n.RGB&&(H===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),w===n.RGBA){const Pe=J?Do:Qe.getTransfer(j);H===n.FLOAT&&(Y=n.RGBA32F),H===n.HALF_FLOAT&&(Y=n.RGBA16F),H===n.UNSIGNED_BYTE&&(Y=Pe===ot?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function S(P,w){let H;return P?w===null||w===aa||w===Hs?H=n.DEPTH24_STENCIL8:w===ci?H=n.DEPTH32F_STENCIL8:w===zs&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===aa||w===Hs?H=n.DEPTH_COMPONENT24:w===ci?H=n.DEPTH_COMPONENT32F:w===zs&&(H=n.DEPTH_COMPONENT16),H}function C(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Nn&&P.minFilter!==Vn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function M(P){const w=P.target;w.removeEventListener("dispose",M),A(w),w.isVideoTexture&&u.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),v(w)}function A(P){const w=i.get(P);if(w.__webglInit===void 0)return;const H=P.source,j=f.get(H);if(j){const J=j[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(P),Object.keys(j).length===0&&f.delete(H)}i.remove(P)}function b(P){const w=i.get(P);n.deleteTexture(w.__webglTexture);const H=P.source,j=f.get(H);delete j[w.__cacheKey],r.memory.textures--}function v(P){const w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(w.__webglFramebuffer[j]))for(let J=0;J<w.__webglFramebuffer[j].length;J++)n.deleteFramebuffer(w.__webglFramebuffer[j][J]);else n.deleteFramebuffer(w.__webglFramebuffer[j]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[j])}else{if(Array.isArray(w.__webglFramebuffer))for(let j=0;j<w.__webglFramebuffer.length;j++)n.deleteFramebuffer(w.__webglFramebuffer[j]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let j=0;j<w.__webglColorRenderbuffer.length;j++)w.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[j]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=P.textures;for(let j=0,J=H.length;j<J;j++){const Y=i.get(H[j]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),r.memory.textures--),i.remove(H[j])}i.remove(P)}let R=0;function N(){R=0}function z(){const P=R;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),R+=1,P}function B(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function G(P,w){const H=i.get(P);if(P.isVideoTexture&&We(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(H,P,w);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+w)}function U(P,w){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){O(H,P,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+w)}function X(P,w){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){O(H,P,w);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+w)}function V(P,w){const H=i.get(P);if(P.version>0&&H.__version!==P.version){q(H,P,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+w)}const Q={[Qc]:n.REPEAT,[ta]:n.CLAMP_TO_EDGE,[eu]:n.MIRRORED_REPEAT},de={[Nn]:n.NEAREST,[uy]:n.NEAREST_MIPMAP_NEAREST,[dr]:n.NEAREST_MIPMAP_LINEAR,[Vn]:n.LINEAR,[vl]:n.LINEAR_MIPMAP_NEAREST,[na]:n.LINEAR_MIPMAP_LINEAR},K={[py]:n.NEVER,[by]:n.ALWAYS,[my]:n.LESS,[y_]:n.LEQUAL,[_y]:n.EQUAL,[yy]:n.GEQUAL,[gy]:n.GREATER,[vy]:n.NOTEQUAL};function ce(P,w){if(w.type===ci&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Vn||w.magFilter===vl||w.magFilter===dr||w.magFilter===na||w.minFilter===Vn||w.minFilter===vl||w.minFilter===dr||w.minFilter===na)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,Q[w.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,Q[w.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,Q[w.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,de[w.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,de[w.minFilter]),w.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,K[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Nn||w.minFilter!==dr&&w.minFilter!==na||w.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,a.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Se(P,w){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",M));const j=w.source;let J=f.get(j);J===void 0&&(J={},f.set(j,J));const Y=B(w);if(Y!==P.__cacheKey){J[Y]===void 0&&(J[Y]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,H=!0),J[Y].usedTimes++;const Pe=J[P.__cacheKey];Pe!==void 0&&(J[P.__cacheKey].usedTimes--,Pe.usedTimes===0&&b(w)),P.__cacheKey=Y,P.__webglTexture=J[Y].texture}return H}function ve(P,w,H){return Math.floor(Math.floor(P/H)/w)}function he(P,w,H,j){const Y=P.updateRanges;if(Y.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,w.width,w.height,H,j,w.data);else{Y.sort((ae,me)=>ae.start-me.start);let Pe=0;for(let ae=1;ae<Y.length;ae++){const me=Y[Pe],De=Y[ae],Re=me.start+me.count,fe=ve(De.start,w.width,4),Ge=ve(me.start,w.width,4);De.start<=Re+1&&fe===Ge&&ve(De.start+De.count-1,w.width,4)===fe?me.count=Math.max(me.count,De.start+De.count-me.start):(++Pe,Y[Pe]=De)}Y.length=Pe+1;const re=n.getParameter(n.UNPACK_ROW_LENGTH),Ce=n.getParameter(n.UNPACK_SKIP_PIXELS),Ae=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,w.width);for(let ae=0,me=Y.length;ae<me;ae++){const De=Y[ae],Re=Math.floor(De.start/4),fe=Math.ceil(De.count/4),Ge=Re%w.width,k=Math.floor(Re/w.width),se=fe,le=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,Ge,k,se,le,H,j,w.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,re),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ce),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ae)}}function O(P,w,H){let j=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(j=n.TEXTURE_3D);const J=Se(P,w),Y=w.source;t.bindTexture(j,P.__webglTexture,n.TEXTURE0+H);const Pe=i.get(Y);if(Y.version!==Pe.__version||J===!0){t.activeTexture(n.TEXTURE0+H);const re=Qe.getPrimaries(Qe.workingColorSpace),Ce=w.colorSpace===xi?null:Qe.getPrimaries(w.colorSpace),Ae=w.colorSpace===xi||re===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let ae=g(w.image,!1,a.maxTextureSize);ae=Dt(w,ae);const me=s.convert(w.format,w.colorSpace),De=s.convert(w.type);let Re=x(w.internalFormat,me,De,w.colorSpace,w.isVideoTexture);ce(j,w);let fe;const Ge=w.mipmaps,k=w.isVideoTexture!==!0,se=Pe.__version===void 0||J===!0,le=Y.dataReady,xe=C(w,ae);if(w.isDepthTexture)Re=S(w.format===Gs,w.type),se&&(k?t.texStorage2D(n.TEXTURE_2D,1,Re,ae.width,ae.height):t.texImage2D(n.TEXTURE_2D,0,Re,ae.width,ae.height,0,me,De,null));else if(w.isDataTexture)if(Ge.length>0){k&&se&&t.texStorage2D(n.TEXTURE_2D,xe,Re,Ge[0].width,Ge[0].height);for(let ne=0,Z=Ge.length;ne<Z;ne++)fe=Ge[ne],k?le&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,me,De,fe.data):t.texImage2D(n.TEXTURE_2D,ne,Re,fe.width,fe.height,0,me,De,fe.data);w.generateMipmaps=!1}else k?(se&&t.texStorage2D(n.TEXTURE_2D,xe,Re,ae.width,ae.height),le&&he(w,ae,me,De)):t.texImage2D(n.TEXTURE_2D,0,Re,ae.width,ae.height,0,me,De,ae.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){k&&se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Re,Ge[0].width,Ge[0].height,ae.depth);for(let ne=0,Z=Ge.length;ne<Z;ne++)if(fe=Ge[ne],w.format!==Ln)if(me!==null)if(k){if(le)if(w.layerUpdates.size>0){const Ee=nh(fe.width,fe.height,w.format,w.type);for(const ze of w.layerUpdates){const dt=fe.data.subarray(ze*Ee/fe.data.BYTES_PER_ELEMENT,(ze+1)*Ee/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,ze,fe.width,fe.height,1,me,dt)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,ae.depth,me,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,Re,fe.width,fe.height,ae.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?le&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,ae.depth,me,De,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,Re,fe.width,fe.height,ae.depth,0,me,De,fe.data)}else{k&&se&&t.texStorage2D(n.TEXTURE_2D,xe,Re,Ge[0].width,Ge[0].height);for(let ne=0,Z=Ge.length;ne<Z;ne++)fe=Ge[ne],w.format!==Ln?me!==null?k?le&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,me,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,Re,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?le&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,me,De,fe.data):t.texImage2D(n.TEXTURE_2D,ne,Re,fe.width,fe.height,0,me,De,fe.data)}else if(w.isDataArrayTexture)if(k){if(se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Re,ae.width,ae.height,ae.depth),le)if(w.layerUpdates.size>0){const ne=nh(ae.width,ae.height,w.format,w.type);for(const Z of w.layerUpdates){const Ee=ae.data.subarray(Z*ne/ae.data.BYTES_PER_ELEMENT,(Z+1)*ne/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,ae.width,ae.height,1,me,De,Ee)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,me,De,ae.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ae.width,ae.height,ae.depth,0,me,De,ae.data);else if(w.isData3DTexture)k?(se&&t.texStorage3D(n.TEXTURE_3D,xe,Re,ae.width,ae.height,ae.depth),le&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,me,De,ae.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ae.width,ae.height,ae.depth,0,me,De,ae.data);else if(w.isFramebufferTexture){if(se)if(k)t.texStorage2D(n.TEXTURE_2D,xe,Re,ae.width,ae.height);else{let ne=ae.width,Z=ae.height;for(let Ee=0;Ee<xe;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,Re,ne,Z,0,me,De,null),ne>>=1,Z>>=1}}else if(Ge.length>0){if(k&&se){const ne=Tt(Ge[0]);t.texStorage2D(n.TEXTURE_2D,xe,Re,ne.width,ne.height)}for(let ne=0,Z=Ge.length;ne<Z;ne++)fe=Ge[ne],k?le&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,me,De,fe):t.texImage2D(n.TEXTURE_2D,ne,Re,me,De,fe);w.generateMipmaps=!1}else if(k){if(se){const ne=Tt(ae);t.texStorage2D(n.TEXTURE_2D,xe,Re,ne.width,ne.height)}le&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,De,ae)}else t.texImage2D(n.TEXTURE_2D,0,Re,me,De,ae);m(w)&&p(j),Pe.__version=Y.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function q(P,w,H){if(w.image.length!==6)return;const j=Se(P,w),J=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+H);const Y=i.get(J);if(J.version!==Y.__version||j===!0){t.activeTexture(n.TEXTURE0+H);const Pe=Qe.getPrimaries(Qe.workingColorSpace),re=w.colorSpace===xi?null:Qe.getPrimaries(w.colorSpace),Ce=w.colorSpace===xi||Pe===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Ae=w.isCompressedTexture||w.image[0].isCompressedTexture,ae=w.image[0]&&w.image[0].isDataTexture,me=[];for(let Z=0;Z<6;Z++)!Ae&&!ae?me[Z]=g(w.image[Z],!0,a.maxCubemapSize):me[Z]=ae?w.image[Z].image:w.image[Z],me[Z]=Dt(w,me[Z]);const De=me[0],Re=s.convert(w.format,w.colorSpace),fe=s.convert(w.type),Ge=x(w.internalFormat,Re,fe,w.colorSpace),k=w.isVideoTexture!==!0,se=Y.__version===void 0||j===!0,le=J.dataReady;let xe=C(w,De);ce(n.TEXTURE_CUBE_MAP,w);let ne;if(Ae){k&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ge,De.width,De.height);for(let Z=0;Z<6;Z++){ne=me[Z].mipmaps;for(let Ee=0;Ee<ne.length;Ee++){const ze=ne[Ee];w.format!==Ln?Re!==null?k?le&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,0,0,ze.width,ze.height,Re,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,Ge,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,0,0,ze.width,ze.height,Re,fe,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee,Ge,ze.width,ze.height,0,Re,fe,ze.data)}}}else{if(ne=w.mipmaps,k&&se){ne.length>0&&xe++;const Z=Tt(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ge,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ae){k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,me[Z].width,me[Z].height,Re,fe,me[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,me[Z].width,me[Z].height,0,Re,fe,me[Z].data);for(let Ee=0;Ee<ne.length;Ee++){const dt=ne[Ee].image[Z].image;k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,0,0,dt.width,dt.height,Re,fe,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,Ge,dt.width,dt.height,0,Re,fe,dt.data)}}else{k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Re,fe,me[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,Re,fe,me[Z]);for(let Ee=0;Ee<ne.length;Ee++){const ze=ne[Ee];k?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,0,0,Re,fe,ze.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Ee+1,Ge,Re,fe,ze.image[Z])}}}m(w)&&p(n.TEXTURE_CUBE_MAP),Y.__version=J.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ee(P,w,H,j,J,Y){const Pe=s.convert(H.format,H.colorSpace),re=s.convert(H.type),Ce=x(H.internalFormat,Pe,re,H.colorSpace),Ae=i.get(w),ae=i.get(H);if(ae.__renderTarget=w,!Ae.__hasExternalTextures){const me=Math.max(1,w.width>>Y),De=Math.max(1,w.height>>Y);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,Y,Ce,me,De,w.depth,0,Pe,re,null):t.texImage2D(J,Y,Ce,me,De,0,Pe,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Te(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,J,ae.__webglTexture,0,mt(w)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,J,ae.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function be(P,w,H){if(n.bindRenderbuffer(n.RENDERBUFFER,P),w.depthBuffer){const j=w.depthTexture,J=j&&j.isDepthTexture?j.type:null,Y=S(w.stencilBuffer,J),Pe=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=mt(w);Te(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,Y,w.width,w.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,Y,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Y,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Pe,n.RENDERBUFFER,P)}else{const j=w.textures;for(let J=0;J<j.length;J++){const Y=j[J],Pe=s.convert(Y.format,Y.colorSpace),re=s.convert(Y.type),Ce=x(Y.internalFormat,Pe,re,Y.colorSpace),Ae=mt(w);H&&Te(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,Ce,w.width,w.height):Te(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae,Ce,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Ce,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(w.depthTexture);j.__renderTarget=w,(!j.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const J=j.__webglTexture,Y=mt(w);if(w.depthTexture.format===Vs)Te(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(w.depthTexture.format===Gs)Te(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function ke(P){const w=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),j){const J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=j}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const j=P.texture.mipmaps;j&&j.length>0?ge(w.__webglFramebuffer[0],P):ge(w.__webglFramebuffer,P)}else if(H){w.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[j]),w.__webglDepthbuffer[j]===void 0)w.__webglDepthbuffer[j]=n.createRenderbuffer(),be(w.__webglDepthbuffer[j],P,!1);else{const J=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Y)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),be(w.__webglDepthbuffer,P,!1);else{const J=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Y)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function at(P,w,H){const j=i.get(P);w!==void 0&&ee(j.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&ke(P)}function I(P){const w=P.texture,H=i.get(P),j=i.get(w);P.addEventListener("dispose",T);const J=P.textures,Y=P.isWebGLCubeRenderTarget===!0,Pe=J.length>1;if(Pe||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=w.version,r.memory.textures++),Y){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let Ce=0;Ce<w.mipmaps.length;Ce++)H.__webglFramebuffer[re][Ce]=n.createFramebuffer()}else H.__webglFramebuffer[re]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<w.mipmaps.length;re++)H.__webglFramebuffer[re]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Pe)for(let re=0,Ce=J.length;re<Ce;re++){const Ae=i.get(J[re]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Te(P)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const Ce=J[re];H.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[re]);const Ae=s.convert(Ce.format,Ce.colorSpace),ae=s.convert(Ce.type),me=x(Ce.internalFormat,Ae,ae,Ce.colorSpace,P.isXRRenderTarget===!0),De=mt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,me,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,H.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),be(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),ce(n.TEXTURE_CUBE_MAP,w);for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ce=0;Ce<w.mipmaps.length;Ce++)ee(H.__webglFramebuffer[re][Ce],P,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce);else ee(H.__webglFramebuffer[re],P,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(w)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let re=0,Ce=J.length;re<Ce;re++){const Ae=J[re],ae=i.get(Ae);let me=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,ae.__webglTexture),ce(me,Ae),ee(H.__webglFramebuffer,P,Ae,n.COLOR_ATTACHMENT0+re,me,0),m(Ae)&&p(me)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(re=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,j.__webglTexture),ce(re,w),w.mipmaps&&w.mipmaps.length>0)for(let Ce=0;Ce<w.mipmaps.length;Ce++)ee(H.__webglFramebuffer[Ce],P,w,n.COLOR_ATTACHMENT0,re,Ce);else ee(H.__webglFramebuffer,P,w,n.COLOR_ATTACHMENT0,re,0);m(w)&&p(re),t.unbindTexture()}P.depthBuffer&&ke(P)}function st(P){const w=P.textures;for(let H=0,j=w.length;H<j;H++){const J=w[H];if(m(J)){const Y=y(P),Pe=i.get(J).__webglTexture;t.bindTexture(Y,Pe),p(Y),t.unbindTexture()}}}const He=[],Oe=[];function Me(P){if(P.samples>0){if(Te(P)===!1){const w=P.textures,H=P.width,j=P.height;let J=n.COLOR_BUFFER_BIT;const Y=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pe=i.get(P),re=w.length>1;if(re)for(let Ae=0;Ae<w.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const Ce=P.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Ae=0;Ae<w.length;Ae++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ae]);const ae=i.get(w[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ae,0)}n.blitFramebuffer(0,0,H,j,0,0,H,j,J,n.NEAREST),l===!0&&(He.length=0,Oe.length=0,He.push(n.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&P.resolveDepthBuffer===!1&&(He.push(Y),Oe.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let Ae=0;Ae<w.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ae]);const ae=i.get(w[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,ae,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function mt(P){return Math.min(a.maxSamples,P.samples)}function Te(P){const w=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function We(P){const w=r.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function Dt(P,w){const H=P.colorSpace,j=P.format,J=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==ss&&H!==xi&&(Qe.getTransfer(H)===ot?(j!==Ln||J!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Tt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=N,this.setTexture2D=G,this.setTexture2DArray=U,this.setTexture3D=X,this.setTextureCube=V,this.rebindTextures=at,this.setupRenderTarget=I,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=Te}function PM(n,e){function t(i,a=xi){let s;const r=Qe.getTransfer(a);if(i===Kn)return n.UNSIGNED_BYTE;if(i===Td)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Cd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===h_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===p_)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===d_)return n.BYTE;if(i===f_)return n.SHORT;if(i===zs)return n.UNSIGNED_SHORT;if(i===Md)return n.INT;if(i===aa)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===ar)return n.HALF_FLOAT;if(i===m_)return n.ALPHA;if(i===__)return n.RGB;if(i===Ln)return n.RGBA;if(i===Vs)return n.DEPTH_COMPONENT;if(i===Gs)return n.DEPTH_STENCIL;if(i===g_)return n.RED;if(i===Ad)return n.RED_INTEGER;if(i===v_)return n.RG;if(i===Rd)return n.RG_INTEGER;if(i===Pd)return n.RGBA_INTEGER;if(i===po||i===mo||i===_o||i===go)if(r===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===po)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_o)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===go)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===po)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===mo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_o)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===go)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tu||i===nu||i===iu||i===au)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===tu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===iu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===au)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===su||i===ru||i===ou)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===su||i===ru)return r===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ou)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===lu||i===cu||i===uu||i===du||i===fu||i===hu||i===pu||i===mu||i===_u||i===gu||i===vu||i===yu||i===bu||i===Su)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===lu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===uu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===du)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_u)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Su)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xu||i===wu||i===Eu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===xu)return r===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Eu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Mu||i===Tu||i===Cu||i===Au)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Mu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Tu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Au)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const LM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,IM=`
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

}`;class NM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new N_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Li({vertexShader:LM,fragmentShader:IM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Be(new en(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kM extends oa{constructor(e,t){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=typeof XRWebGLBinding<"u",m=new NM,p={},y=t.getContextAttributes();let x=null,S=null;const C=[],M=[],T=new oe;let A=null;const b=new _n;b.viewport=new Et;const v=new _n;v.viewport=new Et;const R=[b,v],N=new Qb;let z=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let q=C[O];return q===void 0&&(q=new Bl,C[O]=q),q.getTargetRaySpace()},this.getControllerGrip=function(O){let q=C[O];return q===void 0&&(q=new Bl,C[O]=q),q.getGripSpace()},this.getHand=function(O){let q=C[O];return q===void 0&&(q=new Bl,C[O]=q),q.getHandSpace()};function G(O){const q=M.indexOf(O.inputSource);if(q===-1)return;const ee=C[q];ee!==void 0&&(ee.update(O.inputSource,O.frame,c||r),ee.dispatchEvent({type:O.type,data:O.inputSource}))}function U(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",U),a.removeEventListener("inputsourceschange",X);for(let O=0;O<C.length;O++){const q=M[O];q!==null&&(M[O]=null,C[O].disconnect(q))}z=null,B=null,m.reset();for(const O in p)delete p[O];e.setRenderTarget(x),h=null,f=null,d=null,a=null,S=null,he.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(a,t)),d},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(O){if(a=O,a!==null){if(x=e.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",U),a.addEventListener("inputsourceschange",X),y.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,be=null,ge=null;y.depth&&(ge=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=y.stencil?Gs:Vs,be=y.stencil?Hs:aa);const ke={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(ke),a.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new sa(f.textureWidth,f.textureHeight,{format:Ln,type:Kn,depthTexture:new I_(f.textureWidth,f.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ee={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(a,t,ee),a.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new sa(h.framebufferWidth,h.framebufferHeight,{format:Ln,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),he.setContext(a),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(O){for(let q=0;q<O.removed.length;q++){const ee=O.removed[q],be=M.indexOf(ee);be>=0&&(M[be]=null,C[be].disconnect(ee))}for(let q=0;q<O.added.length;q++){const ee=O.added[q];let be=M.indexOf(ee);if(be===-1){for(let ke=0;ke<C.length;ke++)if(ke>=M.length){M.push(ee),be=ke;break}else if(M[ke]===null){M[ke]=ee,be=ke;break}if(be===-1)break}const ge=C[be];ge&&ge.connect(ee)}}const V=new L,Q=new L;function de(O,q,ee){V.setFromMatrixPosition(q.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);const be=V.distanceTo(Q),ge=q.projectionMatrix.elements,ke=ee.projectionMatrix.elements,at=ge[14]/(ge[10]-1),I=ge[14]/(ge[10]+1),st=(ge[9]+1)/ge[5],He=(ge[9]-1)/ge[5],Oe=(ge[8]-1)/ge[0],Me=(ke[8]+1)/ke[0],mt=at*Oe,Te=at*Me,We=be/(-Oe+Me),Dt=We*-Oe;if(q.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Dt),O.translateZ(We),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),ge[10]===-1)O.projectionMatrix.copy(q.projectionMatrix),O.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const Tt=at+We,P=I+We,w=mt-Dt,H=Te+(be-Dt),j=st*I/P*Tt,J=He*I/P*Tt;O.projectionMatrix.makePerspective(w,H,j,J,Tt,P),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function K(O,q){q===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(q.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(a===null)return;let q=O.near,ee=O.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),N.near=v.near=b.near=q,N.far=v.far=b.far=ee,(z!==N.near||B!==N.far)&&(a.updateRenderState({depthNear:N.near,depthFar:N.far}),z=N.near,B=N.far),N.layers.mask=O.layers.mask|6,b.layers.mask=N.layers.mask&3,v.layers.mask=N.layers.mask&5;const be=O.parent,ge=N.cameras;K(N,be);for(let ke=0;ke<ge.length;ke++)K(ge[ke],be);ge.length===2?de(N,b,v):N.projectionMatrix.copy(b.projectionMatrix),ce(O,N,be)};function ce(O,q,ee){ee===null?O.matrix.copy(q.matrixWorld):(O.matrix.copy(ee.matrixWorld),O.matrix.invert(),O.matrix.multiply(q.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(q.projectionMatrix),O.projectionMatrixInverse.copy(q.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=$s*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(O){l=O,f!==null&&(f.fixedFoveation=O),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(O){return p[O]};let Se=null;function ve(O,q){if(u=q.getViewerPose(c||r),_=q,u!==null){const ee=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let be=!1;ee.length!==N.cameras.length&&(N.cameras.length=0,be=!0);for(let I=0;I<ee.length;I++){const st=ee[I];let He=null;if(h!==null)He=h.getViewport(st);else{const Me=d.getViewSubImage(f,st);He=Me.viewport,I===0&&(e.setRenderTargetTextures(S,Me.colorTexture,Me.depthStencilTexture),e.setRenderTarget(S))}let Oe=R[I];Oe===void 0&&(Oe=new _n,Oe.layers.enable(I),Oe.viewport=new Et,R[I]=Oe),Oe.matrix.fromArray(st.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(st.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(He.x,He.y,He.width,He.height),I===0&&(N.matrix.copy(Oe.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),be===!0&&N.cameras.push(Oe)}const ge=a.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&g){d=i.getBinding();const I=d.getDepthInformation(ee[0]);I&&I.isValid&&I.texture&&m.init(I,a.renderState)}if(ge&&ge.includes("camera-access")&&g){e.state.unbindTexture(),d=i.getBinding();for(let I=0;I<ee.length;I++){const st=ee[I].camera;if(st){let He=p[st];He||(He=new N_,p[st]=He);const Oe=d.getCameraImage(st);He.sourceTexture=Oe}}}}for(let ee=0;ee<C.length;ee++){const be=M[ee],ge=C[ee];be!==null&&ge!==void 0&&ge.update(be,q,c||r)}Se&&Se(O,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),_=null}const he=new W_;he.setAnimationLoop(ve),this.setAnimationLoop=function(O){Se=O},this.dispose=function(){}}}const Gi=new Dn,DM=new vt;function FM(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,T_(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function a(m,p,y,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),x=y.envMap,S=y.envMapRotation;x&&(m.envMap.value=x,Gi.copy(S),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),m.envMapRotation.value.setFromMatrix4(DM.makeRotationFromEuler(Gi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function OM(n,e,t,i){let a={},s={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const S=x.program;i.uniformBlockBinding(y,S)}function c(y,x){let S=a[y.id];S===void 0&&(_(y),S=u(y),a[y.id]=S,y.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(y,C);const M=e.render.frame;s[y.id]!==M&&(f(y),s[y.id]=M)}function u(y){const x=d();y.__bindingPointIndex=x;const S=n.createBuffer(),C=y.__size,M=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,S),S}function d(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const x=a[y.id],S=y.uniforms,C=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let M=0,T=S.length;M<T;M++){const A=Array.isArray(S[M])?S[M]:[S[M]];for(let b=0,v=A.length;b<v;b++){const R=A[b];if(h(R,M,b,C)===!0){const N=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let G=0;G<z.length;G++){const U=z[G],X=g(U);typeof U=="number"||typeof U=="boolean"?(R.__data[0]=U,n.bufferSubData(n.UNIFORM_BUFFER,N+B,R.__data)):U.isMatrix3?(R.__data[0]=U.elements[0],R.__data[1]=U.elements[1],R.__data[2]=U.elements[2],R.__data[3]=0,R.__data[4]=U.elements[3],R.__data[5]=U.elements[4],R.__data[6]=U.elements[5],R.__data[7]=0,R.__data[8]=U.elements[6],R.__data[9]=U.elements[7],R.__data[10]=U.elements[8],R.__data[11]=0):(U.toArray(R.__data,B),B+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(y,x,S,C){const M=y.value,T=x+"_"+S;if(C[T]===void 0)return typeof M=="number"||typeof M=="boolean"?C[T]=M:C[T]=M.clone(),!0;{const A=C[T];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return C[T]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function _(y){const x=y.uniforms;let S=0;const C=16;for(let T=0,A=x.length;T<A;T++){const b=Array.isArray(x[T])?x[T]:[x[T]];for(let v=0,R=b.length;v<R;v++){const N=b[v],z=Array.isArray(N.value)?N.value:[N.value];for(let B=0,G=z.length;B<G;B++){const U=z[B],X=g(U),V=S%C,Q=V%X.boundary,de=V+Q;S+=Q,de!==0&&C-de<X.storage&&(S+=C-de),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=X.storage}}}const M=S%C;return M>0&&(S+=C-M),y.__size=S,y.__cache={},this}function g(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const S=r.indexOf(x.__bindingPointIndex);r.splice(S,1),n.deleteBuffer(a[x.id]),delete a[x.id],delete s[x.id]}function p(){for(const y in a)n.deleteBuffer(a[y]);r=[],a={},s={}}return{bind:l,update:c,dispose:p}}class UM{constructor(e={}){const{canvas:t=Oy(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=r;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const y=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let C=!1;this._outputColorSpace=Gt;let M=0,T=0,A=null,b=-1,v=null;const R=new Et,N=new Et;let z=null;const B=new Ve(0);let G=0,U=t.width,X=t.height,V=1,Q=null,de=null;const K=new Et(0,0,U,X),ce=new Et(0,0,U,X);let Se=!1;const ve=new Dd;let he=!1,O=!1;const q=new vt,ee=new L,be=new Et,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ke=!1;function at(){return A===null?V:1}let I=i;function st(E,D){return t.getContext(E,D)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r180"),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ne,!1),I===null){const D="webgl2";if(I=st(D,E),I===null)throw st(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let He,Oe,Me,mt,Te,We,Dt,Tt,P,w,H,j,J,Y,Pe,re,Ce,Ae,ae,me,De,Re,fe,Ge;function k(){He=new qw(I),He.init(),Re=new PM(I,He),Oe=new Hw(I,He,e,Re),Me=new AM(I,He),Oe.reversedDepthBuffer&&f&&Me.buffers.depth.setReversed(!0),mt=new Zw(I),Te=new mM,We=new RM(I,He,Me,Te,Oe,Re,mt),Dt=new Gw(S),Tt=new Kw(S),P=new iS(I),fe=new Bw(I,P),w=new Yw(I,P,mt,fe),H=new Qw(I,w,P,mt),ae=new Jw(I,Oe,We),re=new Vw(Te),j=new pM(S,Dt,Tt,He,Oe,fe,re),J=new FM(S,Te),Y=new gM,Pe=new wM(He),Ae=new Uw(S,Dt,Tt,Me,H,h,l),Ce=new TM(S,H,Oe),Ge=new OM(I,mt,Oe,Me),me=new zw(I,He,mt),De=new jw(I,He,mt),mt.programs=j.programs,S.capabilities=Oe,S.extensions=He,S.properties=Te,S.renderLists=Y,S.shadowMap=Ce,S.state=Me,S.info=mt}k();const se=new kM(S,I);this.xr=se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=He.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=He.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(E){E!==void 0&&(V=E,this.setSize(U,X,!1))},this.getSize=function(E){return E.set(U,X)},this.setSize=function(E,D,$=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=E,X=D,t.width=Math.floor(E*V),t.height=Math.floor(D*V),$===!0&&(t.style.width=E+"px",t.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(U*V,X*V).floor()},this.setDrawingBufferSize=function(E,D,$){U=E,X=D,V=$,t.width=Math.floor(E*$),t.height=Math.floor(D*$),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(K)},this.setViewport=function(E,D,$,W){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,D,$,W),Me.viewport(R.copy(K).multiplyScalar(V).round())},this.getScissor=function(E){return E.copy(ce)},this.setScissor=function(E,D,$,W){E.isVector4?ce.set(E.x,E.y,E.z,E.w):ce.set(E,D,$,W),Me.scissor(N.copy(ce).multiplyScalar(V).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(E){Me.setScissorTest(Se=E)},this.setOpaqueSort=function(E){Q=E},this.setTransparentSort=function(E){de=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(E=!0,D=!0,$=!0){let W=0;if(E){let F=!1;if(A!==null){const ie=A.texture.format;F=ie===Pd||ie===Rd||ie===Ad}if(F){const ie=A.texture.type,pe=ie===Kn||ie===aa||ie===zs||ie===Hs||ie===Td||ie===Cd,we=Ae.getClearColor(),ye=Ae.getClearAlpha(),Ne=we.r,Ue=we.g,Le=we.b;pe?(_[0]=Ne,_[1]=Ue,_[2]=Le,_[3]=ye,I.clearBufferuiv(I.COLOR,0,_)):(g[0]=Ne,g[1]=Ue,g[2]=Le,g[3]=ye,I.clearBufferiv(I.COLOR,0,g))}else W|=I.COLOR_BUFFER_BIT}D&&(W|=I.DEPTH_BUFFER_BIT),$&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),Ae.dispose(),Y.dispose(),Pe.dispose(),Te.dispose(),Dt.dispose(),Tt.dispose(),H.dispose(),fe.dispose(),Ge.dispose(),j.dispose(),se.dispose(),se.removeEventListener("sessionstart",Fn),se.removeEventListener("sessionend",uf),Fi.stop()};function le(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=mt.autoReset,D=Ce.enabled,$=Ce.autoUpdate,W=Ce.needsUpdate,F=Ce.type;k(),mt.autoReset=E,Ce.enabled=D,Ce.autoUpdate=$,Ce.needsUpdate=W,Ce.type=F}function ne(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Z(E){const D=E.target;D.removeEventListener("dispose",Z),Ee(D)}function Ee(E){ze(E),Te.remove(E)}function ze(E){const D=Te.get(E).programs;D!==void 0&&(D.forEach(function($){j.releaseProgram($)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,$,W,F,ie){D===null&&(D=ge);const pe=F.isMesh&&F.matrixWorld.determinant()<0,we=A0(E,D,$,W,F);Me.setMaterial(W,pe);let ye=$.index,Ne=1;if(W.wireframe===!0){if(ye=w.getWireframeAttribute($),ye===void 0)return;Ne=2}const Ue=$.drawRange,Le=$.attributes.position;let Ye=Ue.start*Ne,rt=(Ue.start+Ue.count)*Ne;ie!==null&&(Ye=Math.max(Ye,ie.start*Ne),rt=Math.min(rt,(ie.start+ie.count)*Ne)),ye!==null?(Ye=Math.max(Ye,0),rt=Math.min(rt,ye.count)):Le!=null&&(Ye=Math.max(Ye,0),rt=Math.min(rt,Le.count));const wt=rt-Ye;if(wt<0||wt===1/0)return;fe.setup(F,W,we,$,ye);let ft,ct=me;if(ye!==null&&(ft=P.get(ye),ct=De,ct.setIndex(ft)),F.isMesh)W.wireframe===!0?(Me.setLineWidth(W.wireframeLinewidth*at()),ct.setMode(I.LINES)):ct.setMode(I.TRIANGLES);else if(F.isLine){let Ie=W.linewidth;Ie===void 0&&(Ie=1),Me.setLineWidth(Ie*at()),F.isLineSegments?ct.setMode(I.LINES):F.isLineLoop?ct.setMode(I.LINE_LOOP):ct.setMode(I.LINE_STRIP)}else F.isPoints?ct.setMode(I.POINTS):F.isSprite&&ct.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Ws("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ie=F._multiDrawStarts,bt=F._multiDrawCounts,Je=F._multiDrawCount,nn=ye?P.get(ye).bytesPerElement:1,ca=Te.get(W).currentProgram.getUniforms();for(let an=0;an<Je;an++)ca.setValue(I,"_gl_DrawID",an),ct.render(Ie[an]/nn,bt[an])}else if(F.isInstancedMesh)ct.renderInstances(Ye,wt,F.count);else if($.isInstancedBufferGeometry){const Ie=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,bt=Math.min($.instanceCount,Ie);ct.renderInstances(Ye,wt,bt)}else ct.render(Ye,wt)};function dt(E,D,$){E.transparent===!0&&E.side===Ze&&E.forceSinglePass===!1?(E.side=tn,E.needsUpdate=!0,ur(E,D,$),E.side=Pi,E.needsUpdate=!0,ur(E,D,$),E.side=Ze):ur(E,D,$)}this.compile=function(E,D,$=null){$===null&&($=E),p=Pe.get($),p.init(D),x.push(p),$.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ie=F.material;if(ie)if(Array.isArray(ie))for(let pe=0;pe<ie.length;pe++){const we=ie[pe];dt(we,$,F),W.add(we)}else dt(ie,$,F),W.add(ie)}),p=x.pop(),W},this.compileAsync=function(E,D,$=null){const W=this.compile(E,D,$);return new Promise(F=>{function ie(){if(W.forEach(function(pe){Te.get(pe).currentProgram.isReady()&&W.delete(pe)}),W.size===0){F(E);return}setTimeout(ie,10)}He.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let tt=null;function Jn(E){tt&&tt(E)}function Fn(){Fi.stop()}function uf(){Fi.start()}const Fi=new W_;Fi.setAnimationLoop(Jn),typeof self<"u"&&Fi.setContext(self),this.setAnimationLoop=function(E){tt=E,se.setAnimationLoop(E),E===null?Fi.stop():Fi.start()},se.addEventListener("sessionstart",Fn),se.addEventListener("sessionend",uf),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(D),D=se.getCamera()),E.isScene===!0&&E.onBeforeRender(S,E,D,A),p=Pe.get(E,x.length),p.init(D),x.push(p),q.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ve.setFromProjectionMatrix(q,Gn,D.reversedDepth),O=this.localClippingEnabled,he=re.init(this.clippingPlanes,O),m=Y.get(E,y.length),m.init(),y.push(m),se.enabled===!0&&se.isPresenting===!0){const ie=S.xr.getDepthSensingMesh();ie!==null&&_l(ie,D,-1/0,S.sortObjects)}_l(E,D,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(Q,de),ke=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,ke&&Ae.addToRenderList(m,E),this.info.render.frame++,he===!0&&re.beginShadows();const $=p.state.shadowsArray;Ce.render($,E,D),he===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(p.setupLights(),D.isArrayCamera){const ie=D.cameras;if(F.length>0)for(let pe=0,we=ie.length;pe<we;pe++){const ye=ie[pe];ff(W,F,E,ye)}ke&&Ae.render(E);for(let pe=0,we=ie.length;pe<we;pe++){const ye=ie[pe];df(m,E,ye,ye.viewport)}}else F.length>0&&ff(W,F,E,D),ke&&Ae.render(E),df(m,E,D);A!==null&&T===0&&(We.updateMultisampleRenderTarget(A),We.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(S,E,D),fe.resetDefaultState(),b=-1,v=null,x.pop(),x.length>0?(p=x[x.length-1],he===!0&&re.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function _l(E,D,$,W){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ve.intersectsSprite(E)){W&&be.setFromMatrixPosition(E.matrixWorld).applyMatrix4(q);const pe=H.update(E),we=E.material;we.visible&&m.push(E,pe,we,$,be.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ve.intersectsObject(E))){const pe=H.update(E),we=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),be.copy(E.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),be.copy(pe.boundingSphere.center)),be.applyMatrix4(E.matrixWorld).applyMatrix4(q)),Array.isArray(we)){const ye=pe.groups;for(let Ne=0,Ue=ye.length;Ne<Ue;Ne++){const Le=ye[Ne],Ye=we[Le.materialIndex];Ye&&Ye.visible&&m.push(E,pe,Ye,$,be.z,Le)}}else we.visible&&m.push(E,pe,we,$,be.z,null)}}const ie=E.children;for(let pe=0,we=ie.length;pe<we;pe++)_l(ie[pe],D,$,W)}function df(E,D,$,W){const F=E.opaque,ie=E.transmissive,pe=E.transparent;p.setupLightsView($),he===!0&&re.setGlobalState(S.clippingPlanes,$),W&&Me.viewport(R.copy(W)),F.length>0&&cr(F,D,$),ie.length>0&&cr(ie,D,$),pe.length>0&&cr(pe,D,$),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function ff(E,D,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new sa(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?ar:Kn,minFilter:na,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ie=p.state.transmissionRenderTarget[W.id],pe=W.viewport||R;ie.setSize(pe.z*S.transmissionResolutionScale,pe.w*S.transmissionResolutionScale);const we=S.getRenderTarget(),ye=S.getActiveCubeFace(),Ne=S.getActiveMipmapLevel();S.setRenderTarget(ie),S.getClearColor(B),G=S.getClearAlpha(),G<1&&S.setClearColor(16777215,.5),S.clear(),ke&&Ae.render($);const Ue=S.toneMapping;S.toneMapping=Ci;const Le=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),he===!0&&re.setGlobalState(S.clippingPlanes,W),cr(E,$,W),We.updateMultisampleRenderTarget(ie),We.updateRenderTargetMipmap(ie),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let rt=0,wt=D.length;rt<wt;rt++){const ft=D[rt],ct=ft.object,Ie=ft.geometry,bt=ft.material,Je=ft.group;if(bt.side===Ze&&ct.layers.test(W.layers)){const nn=bt.side;bt.side=tn,bt.needsUpdate=!0,hf(ct,$,W,Ie,bt,Je),bt.side=nn,bt.needsUpdate=!0,Ye=!0}}Ye===!0&&(We.updateMultisampleRenderTarget(ie),We.updateRenderTargetMipmap(ie))}S.setRenderTarget(we,ye,Ne),S.setClearColor(B,G),Le!==void 0&&(W.viewport=Le),S.toneMapping=Ue}function cr(E,D,$){const W=D.isScene===!0?D.overrideMaterial:null;for(let F=0,ie=E.length;F<ie;F++){const pe=E[F],we=pe.object,ye=pe.geometry,Ne=pe.group;let Ue=pe.material;Ue.allowOverride===!0&&W!==null&&(Ue=W),we.layers.test($.layers)&&hf(we,D,$,ye,Ue,Ne)}}function hf(E,D,$,W,F,ie){E.onBeforeRender(S,D,$,W,F,ie),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(S,D,$,W,E,ie),F.transparent===!0&&F.side===Ze&&F.forceSinglePass===!1?(F.side=tn,F.needsUpdate=!0,S.renderBufferDirect($,D,W,F,E,ie),F.side=Pi,F.needsUpdate=!0,S.renderBufferDirect($,D,W,F,E,ie),F.side=Ze):S.renderBufferDirect($,D,W,F,E,ie),E.onAfterRender(S,D,$,W,F,ie)}function ur(E,D,$){D.isScene!==!0&&(D=ge);const W=Te.get(E),F=p.state.lights,ie=p.state.shadowsArray,pe=F.state.version,we=j.getParameters(E,F.state,ie,D,$),ye=j.getProgramCacheKey(we);let Ne=W.programs;W.environment=E.isMeshStandardMaterial?D.environment:null,W.fog=D.fog,W.envMap=(E.isMeshStandardMaterial?Tt:Dt).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,Ne===void 0&&(E.addEventListener("dispose",Z),Ne=new Map,W.programs=Ne);let Ue=Ne.get(ye);if(Ue!==void 0){if(W.currentProgram===Ue&&W.lightsStateVersion===pe)return mf(E,we),Ue}else we.uniforms=j.getUniforms(E),E.onBeforeCompile(we,S),Ue=j.acquireProgram(we,ye),Ne.set(ye,Ue),W.uniforms=we.uniforms;const Le=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=re.uniform),mf(E,we),W.needsLights=P0(E),W.lightsStateVersion=pe,W.needsLights&&(Le.ambientLightColor.value=F.state.ambient,Le.lightProbe.value=F.state.probe,Le.directionalLights.value=F.state.directional,Le.directionalLightShadows.value=F.state.directionalShadow,Le.spotLights.value=F.state.spot,Le.spotLightShadows.value=F.state.spotShadow,Le.rectAreaLights.value=F.state.rectArea,Le.ltc_1.value=F.state.rectAreaLTC1,Le.ltc_2.value=F.state.rectAreaLTC2,Le.pointLights.value=F.state.point,Le.pointLightShadows.value=F.state.pointShadow,Le.hemisphereLights.value=F.state.hemi,Le.directionalShadowMap.value=F.state.directionalShadowMap,Le.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Le.spotShadowMap.value=F.state.spotShadowMap,Le.spotLightMatrix.value=F.state.spotLightMatrix,Le.spotLightMap.value=F.state.spotLightMap,Le.pointShadowMap.value=F.state.pointShadowMap,Le.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Ue,W.uniformsList=null,Ue}function pf(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=vo.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function mf(E,D){const $=Te.get(E);$.outputColorSpace=D.outputColorSpace,$.batching=D.batching,$.batchingColor=D.batchingColor,$.instancing=D.instancing,$.instancingColor=D.instancingColor,$.instancingMorph=D.instancingMorph,$.skinning=D.skinning,$.morphTargets=D.morphTargets,$.morphNormals=D.morphNormals,$.morphColors=D.morphColors,$.morphTargetsCount=D.morphTargetsCount,$.numClippingPlanes=D.numClippingPlanes,$.numIntersection=D.numClipIntersection,$.vertexAlphas=D.vertexAlphas,$.vertexTangents=D.vertexTangents,$.toneMapping=D.toneMapping}function A0(E,D,$,W,F){D.isScene!==!0&&(D=ge),We.resetTextureUnits();const ie=D.fog,pe=W.isMeshStandardMaterial?D.environment:null,we=A===null?S.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ss,ye=(W.isMeshStandardMaterial?Tt:Dt).get(W.envMap||pe),Ne=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ue=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Le=!!$.morphAttributes.position,Ye=!!$.morphAttributes.normal,rt=!!$.morphAttributes.color;let wt=Ci;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(wt=S.toneMapping);const ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ct=ft!==void 0?ft.length:0,Ie=Te.get(W),bt=p.state.lights;if(he===!0&&(O===!0||E!==v)){const Xt=E===v&&W.id===b;re.setState(W,E,Xt)}let Je=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==bt.state.version||Ie.outputColorSpace!==we||F.isBatchedMesh&&Ie.batching===!1||!F.isBatchedMesh&&Ie.batching===!0||F.isBatchedMesh&&Ie.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ie.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ie.instancing===!1||!F.isInstancedMesh&&Ie.instancing===!0||F.isSkinnedMesh&&Ie.skinning===!1||!F.isSkinnedMesh&&Ie.skinning===!0||F.isInstancedMesh&&Ie.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ie.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ie.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ie.instancingMorph===!1&&F.morphTexture!==null||Ie.envMap!==ye||W.fog===!0&&Ie.fog!==ie||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==re.numPlanes||Ie.numIntersection!==re.numIntersection)||Ie.vertexAlphas!==Ne||Ie.vertexTangents!==Ue||Ie.morphTargets!==Le||Ie.morphNormals!==Ye||Ie.morphColors!==rt||Ie.toneMapping!==wt||Ie.morphTargetsCount!==ct)&&(Je=!0):(Je=!0,Ie.__version=W.version);let nn=Ie.currentProgram;Je===!0&&(nn=ur(W,D,F));let ca=!1,an=!1,fs=!1;const St=nn.getUniforms(),fn=Ie.uniforms;if(Me.useProgram(nn.program)&&(ca=!0,an=!0,fs=!0),W.id!==b&&(b=W.id,an=!0),ca||v!==E){Me.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),St.setValue(I,"projectionMatrix",E.projectionMatrix),St.setValue(I,"viewMatrix",E.matrixWorldInverse);const Zt=St.map.cameraPosition;Zt!==void 0&&Zt.setValue(I,ee.setFromMatrixPosition(E.matrixWorld)),Oe.logarithmicDepthBuffer&&St.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&St.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),v!==E&&(v=E,an=!0,fs=!0)}if(F.isSkinnedMesh){St.setOptional(I,F,"bindMatrix"),St.setOptional(I,F,"bindMatrixInverse");const Xt=F.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),St.setValue(I,"boneTexture",Xt.boneTexture,We))}F.isBatchedMesh&&(St.setOptional(I,F,"batchingTexture"),St.setValue(I,"batchingTexture",F._matricesTexture,We),St.setOptional(I,F,"batchingIdTexture"),St.setValue(I,"batchingIdTexture",F._indirectTexture,We),St.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&St.setValue(I,"batchingColorTexture",F._colorsTexture,We));const hn=$.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0)&&ae.update(F,$,nn),(an||Ie.receiveShadow!==F.receiveShadow)&&(Ie.receiveShadow=F.receiveShadow,St.setValue(I,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(fn.envMap.value=ye,fn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&D.environment!==null&&(fn.envMapIntensity.value=D.environmentIntensity),an&&(St.setValue(I,"toneMappingExposure",S.toneMappingExposure),Ie.needsLights&&R0(fn,fs),ie&&W.fog===!0&&J.refreshFogUniforms(fn,ie),J.refreshMaterialUniforms(fn,W,V,X,p.state.transmissionRenderTarget[E.id]),vo.upload(I,pf(Ie),fn,We)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(vo.upload(I,pf(Ie),fn,We),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&St.setValue(I,"center",F.center),St.setValue(I,"modelViewMatrix",F.modelViewMatrix),St.setValue(I,"normalMatrix",F.normalMatrix),St.setValue(I,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Xt=W.uniformsGroups;for(let Zt=0,gl=Xt.length;Zt<gl;Zt++){const Oi=Xt[Zt];Ge.update(Oi,nn),Ge.bind(Oi,nn)}}return nn}function R0(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function P0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,D,$){const W=Te.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Te.get(E.texture).__webglTexture=D,Te.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,D){const $=Te.get(E);$.__webglFramebuffer=D,$.__useDefaultFramebuffer=D===void 0};const L0=I.createFramebuffer();this.setRenderTarget=function(E,D=0,$=0){A=E,M=D,T=$;let W=!0,F=null,ie=!1,pe=!1;if(E){const ye=Te.get(E);if(ye.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(ye.__webglFramebuffer===void 0)We.setupRenderTarget(E);else if(ye.__hasExternalTextures)We.rebindTextures(E,Te.get(E.texture).__webglTexture,Te.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Le=E.depthTexture;if(ye.__boundDepthTexture!==Le){if(Le!==null&&Te.has(Le)&&(E.width!==Le.image.width||E.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(E)}}const Ne=E.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(pe=!0);const Ue=Te.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ue[D])?F=Ue[D][$]:F=Ue[D],ie=!0):E.samples>0&&We.useMultisampledRTT(E)===!1?F=Te.get(E).__webglMultisampledFramebuffer:Array.isArray(Ue)?F=Ue[$]:F=Ue,R.copy(E.viewport),N.copy(E.scissor),z=E.scissorTest}else R.copy(K).multiplyScalar(V).floor(),N.copy(ce).multiplyScalar(V).floor(),z=Se;if($!==0&&(F=L0),Me.bindFramebuffer(I.FRAMEBUFFER,F)&&W&&Me.drawBuffers(E,F),Me.viewport(R),Me.scissor(N),Me.setScissorTest(z),ie){const ye=Te.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+D,ye.__webglTexture,$)}else if(pe){const ye=D;for(let Ne=0;Ne<E.textures.length;Ne++){const Ue=Te.get(E.textures[Ne]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ne,Ue.__webglTexture,$,ye)}}else if(E!==null&&$!==0){const ye=Te.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ye.__webglTexture,$)}b=-1},this.readRenderTargetPixels=function(E,D,$,W,F,ie,pe,we=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Te.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(ye=ye[pe]),ye){Me.bindFramebuffer(I.FRAMEBUFFER,ye);try{const Ne=E.textures[we],Ue=Ne.format,Le=Ne.type;if(!Oe.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-W&&$>=0&&$<=E.height-F&&(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+we),I.readPixels(D,$,W,F,Re.convert(Ue),Re.convert(Le),ie))}finally{const Ne=A!==null?Te.get(A).__webglFramebuffer:null;Me.bindFramebuffer(I.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(E,D,$,W,F,ie,pe,we=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Te.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(ye=ye[pe]),ye)if(D>=0&&D<=E.width-W&&$>=0&&$<=E.height-F){Me.bindFramebuffer(I.FRAMEBUFFER,ye);const Ne=E.textures[we],Ue=Ne.format,Le=Ne.type;if(!Oe.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ye),I.bufferData(I.PIXEL_PACK_BUFFER,ie.byteLength,I.STREAM_READ),E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+we),I.readPixels(D,$,W,F,Re.convert(Ue),Re.convert(Le),0);const rt=A!==null?Te.get(A).__webglFramebuffer:null;Me.bindFramebuffer(I.FRAMEBUFFER,rt);const wt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Uy(I,wt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ye),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ie),I.deleteBuffer(Ye),I.deleteSync(wt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,D=null,$=0){const W=Math.pow(2,-$),F=Math.floor(E.image.width*W),ie=Math.floor(E.image.height*W),pe=D!==null?D.x:0,we=D!==null?D.y:0;We.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,pe,we,F,ie),Me.unbindTexture()};const I0=I.createFramebuffer(),N0=I.createFramebuffer();this.copyTextureToTexture=function(E,D,$=null,W=null,F=0,ie=null){ie===null&&(F!==0?(Ws("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=F,F=0):ie=0);let pe,we,ye,Ne,Ue,Le,Ye,rt,wt;const ft=E.isCompressedTexture?E.mipmaps[ie]:E.image;if($!==null)pe=$.max.x-$.min.x,we=$.max.y-$.min.y,ye=$.isBox3?$.max.z-$.min.z:1,Ne=$.min.x,Ue=$.min.y,Le=$.isBox3?$.min.z:0;else{const hn=Math.pow(2,-F);pe=Math.floor(ft.width*hn),we=Math.floor(ft.height*hn),E.isDataArrayTexture?ye=ft.depth:E.isData3DTexture?ye=Math.floor(ft.depth*hn):ye=1,Ne=0,Ue=0,Le=0}W!==null?(Ye=W.x,rt=W.y,wt=W.z):(Ye=0,rt=0,wt=0);const ct=Re.convert(D.format),Ie=Re.convert(D.type);let bt;D.isData3DTexture?(We.setTexture3D(D,0),bt=I.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(We.setTexture2DArray(D,0),bt=I.TEXTURE_2D_ARRAY):(We.setTexture2D(D,0),bt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,D.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,D.unpackAlignment);const Je=I.getParameter(I.UNPACK_ROW_LENGTH),nn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ca=I.getParameter(I.UNPACK_SKIP_PIXELS),an=I.getParameter(I.UNPACK_SKIP_ROWS),fs=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ft.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ft.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ne),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ue),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Le);const St=E.isDataArrayTexture||E.isData3DTexture,fn=D.isDataArrayTexture||D.isData3DTexture;if(E.isDepthTexture){const hn=Te.get(E),Xt=Te.get(D),Zt=Te.get(hn.__renderTarget),gl=Te.get(Xt.__renderTarget);Me.bindFramebuffer(I.READ_FRAMEBUFFER,Zt.__webglFramebuffer),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,gl.__webglFramebuffer);for(let Oi=0;Oi<ye;Oi++)St&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.get(E).__webglTexture,F,Le+Oi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.get(D).__webglTexture,ie,wt+Oi)),I.blitFramebuffer(Ne,Ue,pe,we,Ye,rt,pe,we,I.DEPTH_BUFFER_BIT,I.NEAREST);Me.bindFramebuffer(I.READ_FRAMEBUFFER,null),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||Te.has(E)){const hn=Te.get(E),Xt=Te.get(D);Me.bindFramebuffer(I.READ_FRAMEBUFFER,I0),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,N0);for(let Zt=0;Zt<ye;Zt++)St?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,hn.__webglTexture,F,Le+Zt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,hn.__webglTexture,F),fn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Xt.__webglTexture,ie,wt+Zt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Xt.__webglTexture,ie),F!==0?I.blitFramebuffer(Ne,Ue,pe,we,Ye,rt,pe,we,I.COLOR_BUFFER_BIT,I.NEAREST):fn?I.copyTexSubImage3D(bt,ie,Ye,rt,wt+Zt,Ne,Ue,pe,we):I.copyTexSubImage2D(bt,ie,Ye,rt,Ne,Ue,pe,we);Me.bindFramebuffer(I.READ_FRAMEBUFFER,null),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else fn?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(bt,ie,Ye,rt,wt,pe,we,ye,ct,Ie,ft.data):D.isCompressedArrayTexture?I.compressedTexSubImage3D(bt,ie,Ye,rt,wt,pe,we,ye,ct,ft.data):I.texSubImage3D(bt,ie,Ye,rt,wt,pe,we,ye,ct,Ie,ft):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ie,Ye,rt,pe,we,ct,Ie,ft.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ie,Ye,rt,ft.width,ft.height,ct,ft.data):I.texSubImage2D(I.TEXTURE_2D,ie,Ye,rt,pe,we,ct,Ie,ft);I.pixelStorei(I.UNPACK_ROW_LENGTH,Je),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,nn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ca),I.pixelStorei(I.UNPACK_SKIP_ROWS,an),I.pixelStorei(I.UNPACK_SKIP_IMAGES,fs),ie===0&&D.generateMipmaps&&I.generateMipmap(bt),Me.unbindTexture()},this.initRenderTarget=function(E){Te.get(E).__webglFramebuffer===void 0&&We.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?We.setTextureCube(E,0):E.isData3DTexture?We.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?We.setTexture2DArray(E,0):We.setTexture2D(E,0),Me.unbindTexture()},this.resetState=function(){M=0,T=0,A=null,Me.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const Ch={type:"change"},Hd={type:"start"},j_={type:"end"},$r=new kd,Ah=new yi,BM=Math.cos(70*ht.DEG2RAD),Rt=new L,Jt=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},tc=1e-6;class zM extends tS{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:za.ROTATE,MIDDLE:za.DOLLY,RIGHT:za.PAN},this.touches={ONE:Na.ROTATE,TWO:Na.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new qn,this._lastTargetPosition=new L,this._quat=new qn().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new eh,this._sphericalDelta=new eh,this._scale=1,this._panOffset=new L,this._rotateStart=new oe,this._rotateEnd=new oe,this._rotateDelta=new oe,this._panStart=new oe,this._panEnd=new oe,this._panDelta=new oe,this._dollyStart=new oe,this._dollyEnd=new oe,this._dollyDelta=new oe,this._dollyDirection=new L,this._mouse=new oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=VM.bind(this),this._onPointerDown=HM.bind(this),this._onPointerUp=GM.bind(this),this._onContextMenu=jM.bind(this),this._onMouseWheel=XM.bind(this),this._onKeyDown=KM.bind(this),this._onTouchStart=qM.bind(this),this._onTouchMove=YM.bind(this),this._onMouseDown=$M.bind(this),this._onMouseMove=WM.bind(this),this._interceptControlDown=ZM.bind(this),this._interceptControlUp=JM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ch),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Rt.copy(t).sub(this.target),Rt.applyQuaternion(this._quat),this._spherical.setFromVector3(Rt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=Jt:i>Math.PI&&(i-=Jt),a<-Math.PI?a+=Jt:a>Math.PI&&(a-=Jt),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Rt.setFromSpherical(this._spherical),Rt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Rt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Rt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Rt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):($r.origin.copy(this.object.position),$r.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($r.direction))<BM?this.object.lookAt(this.target):(Ah.setFromNormalAndCoplanarPoint(this.object.up,this.target),$r.intersectPlane(Ah,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>tc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>tc||this._lastTargetPosition.distanceToSquared(this.target)>tc?(this.dispatchEvent(Ch),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Jt/60*this.autoRotateSpeed*e:Jt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Rt.setFromMatrixColumn(t,0),Rt.multiplyScalar(-e),this._panOffset.add(Rt)}_panUp(e,t){this.screenSpacePanning===!0?Rt.setFromMatrixColumn(t,1):(Rt.setFromMatrixColumn(t,0),Rt.crossVectors(this.object.up,Rt)),Rt.multiplyScalar(e),this._panOffset.add(Rt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;Rt.copy(a).sub(this.target);let s=Rt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=e-i.left,s=t-i.top,r=i.width,o=i.height;this._mouse.x=a/r*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),a=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(a,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new oe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function HM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function VM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function GM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(j_),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function $M(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case za.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=lt.DOLLY;break;case za.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}break;case za.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Hd)}function WM(n){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function XM(n){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(n.preventDefault(),this.dispatchEvent(Hd),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(j_))}function KM(n){this.enabled!==!1&&this._handleKeyDown(n)}function qM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Na.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=lt.TOUCH_ROTATE;break;case Na.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Na.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=lt.TOUCH_DOLLY_PAN;break;case Na.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Hd)}function YM(n){switch(this._trackPointer(n),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=lt.NONE}}function jM(n){this.enabled!==!1&&n.preventDefault()}function ZM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function JM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function QM(n){const e={};for(const[t,i]of n)for(const a of t)e[a]=i;return e}QM([[[22,1416,1894,1932,3031,3311,6243,6489,7651,7696,7890,7901,8006,8360,8361,8565,8566,8669,9357,10697,10698,10817,10822,11038,11394,11505,11677,11800,11933,11949,12173,12315,12361,12484],"breakout"],[[29,403,597,600,1018,1171,1286,1675,1689,1883,2070,2268,2666,2950,2951,3155,3156,3157,3265,3426,3875,3879,3880,4014,4155,4367,4472,4473,4745,4770,4781,4861,4864,5709,5773,5823,5858,5964,5979,6122,6244,6247,6260,6836,7211,7337,7338,7341,7343,7415,7512,7532,7593,7772,8454,9053,9088,9089,9140,9388,9894,10094,10440,10441,10694,10695,11016,11095,11315,11336,11534,11941,11996,12106,12142,12262,12286,12325,12382,12563,12669],"dominus"],[[28,31,1159,1317,1624,1856,2269,3451,3582,3702,5470,5488,5879,7012,9084,9085,9427,10044,10805,11138,11141,11379,11932,12569,12652],"hybrid"],[[30,4780,7336,7477,7815,7979,10689,11098,11736,11905,11950,12318,12335],"merc"],[[21,23,25,26,27,402,404,523,607,625,723,1172,1295,1300,1475,1478,1533,1568,1623,2665,2853,2919,2949,4284,4318,4319,4320,4782,4906,5020,5039,5188,5361,5547,5713,5837,5951,6939,7947,7948,8383,8806,8807,10896,10897,10900,10901,11314,11603,12104,12105],"octane"],[[24,803,1603,1691,1919,3594,3614,3622,4268,5265,7052,8524],"plank"]]);function eT(n){return{position:[n.offset,0,n.elevation],rotationYDegrees:n.slopeDegrees,dimensions:[n.length,n.width,n.height]}}const Z_=.08,tT=.22,nT=.94,Vd=1,yo=.32,Rh=1024,iT=16,aT=1.5;function Ph(n){const e=new nt({color:n,transparent:!0,opacity:Vd,side:Ze});return e.forceSinglePass=!0,e}function sT(n){return new V_({color:n,side:Ze,transparent:!0,opacity:Vd})}function Aa(n,e,t,i){return new Be(new ki(n,t,e,6,1,6),i)}function rT(n){return new Ve(n).lerp(new Ve(0),nT)}function nc(n,e,t,i,a,s,r,o){n.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,u=i*t+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*4+s*.5)*a*.35;l===0?n.moveTo(l,u):n.lineTo(l,u)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function ic(n,e,t,i,a,s,r,o){n.beginPath();for(let l=0;l<=t;l+=8){const c=l/t,u=i*e+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*6+s*.3)*a*.18;l===0?n.moveTo(u,l):n.lineTo(u,l)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function ac(n,e,t,i,a,s){n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fillStyle=a,n.fill(),n.lineWidth=Math.max(6,i*.15),n.strokeStyle=s,n.stroke()}function oT(n){const e=document.createElement("canvas");e.width=Rh,e.height=Rh;const t=e.getContext("2d");if(!t)throw new Error("Unable to create ball texture canvas");const{width:i,height:a}=e,s=t.createLinearGradient(0,0,i,a);s.addColorStop(0,"#faf7ee"),s.addColorStop(.55,"#e7e1d0"),s.addColorStop(1,"#d5cfbe"),t.fillStyle=s,t.fillRect(0,0,i,a),t.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*a;t.fillStyle=l%2===0?"#ffffff":"#d3cbb6",t.fillRect(0,c,i,a/54)}t.globalAlpha=1;const r="#2d313b";t.lineCap="round",nc(t,i,a,.24,22,.35,18,r),nc(t,i,a,.5,14,1.1,20,r),nc(t,i,a,.77,20,2.35,18,r),ic(t,i,a,.2,24,.2,18,r),ic(t,i,a,.48,18,1.6,18,r),ic(t,i,a,.76,26,2.7,18,r),t.globalAlpha=.92,ac(t,i*.28,a*.32,88,"#f1a63a","#fff4d7"),ac(t,i*.68,a*.6,72,"#4db0ff","#eef8ff"),ac(t,i*.76,a*.2,54,"#1f232c","#f0ece1"),t.globalAlpha=1,t.beginPath(),t.moveTo(i*.08,a*.86),t.quadraticCurveTo(i*.28,a*.72,i*.42,a*.8),t.quadraticCurveTo(i*.58,a*.9,i*.82,a*.78),t.lineWidth=24,t.strokeStyle="rgba(255, 246, 220, 0.9)",t.stroke();const o=new sl(e);return o.colorSpace=Gt,o.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),o}function lT(n,e,t,i){return new Be(new ki(n,e,t,6,6,1),i)}function cT(n){const e=10280*n,t=8240*n,i=1960*n,a=1e3*n,s=1900*n,r=800*n,o=900*n,l=Math.max(1,n),c=[],u=[1,-1];function d(g,m,p=null){const y=g.material.clone();return g.material=y,c.push({mesh:g,material:y,outwardLocal:m.clone().normalize(),fixedOpacity:p}),g}function f(g){const m=new ut,p=Ph(g),y=t/2-a-s/2,x=Math.sqrt(2*Math.pow(a,2));for(const C of u){const M=d(Aa(y,i,l,p),new L(0,1,0));M.position.set(C*(y/2+s/2),0,i/2),m.add(M);const T=d(Aa(x,i,l,p),new L(0,1,0));T.position.set(C*(t/2-a/2),-a/2,i/2),T.rotateZ(-C*Math.PI/4),m.add(T)}const S=d(Aa(s,i-r,l,p),new L(0,1,0));return S.position.set(0,0,i/2+r/2),m.add(S),m}function h(g,m){const p=new ut,y=[[t/2,0],[-t/2,0],[-t/2,e/2-a],[-t/2+a,e/2],[-s/2,e/2],[-s/2,e/2+o],[s/2,e/2+o],[s/2,e/2],[t/2-a,e/2],[t/2,e/2-a],[t/2,0]],x=new Ud;y.forEach(([v,R],N)=>{N===0?x.moveTo(v,R):x.lineTo(v,R)});const S=sT(g),C=Ph(g),M=d(new Be(new ol(x),S),new L(0,0,-1));M.receiveShadow=!0,p.add(M);for(const v of u){const R=d(Aa(o,r,l,C),new L(0,-v,0),yo);R.position.set(v*s/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),p.add(R)}const T=d(lT(s,o,l,C),new L(0,0,1),yo);T.position.set(0,e/2+o/2,r),p.add(T);const A=d(Aa(s,r,l,C),new L(0,1,0),yo);A.position.set(0,e/2+o,r/2),p.add(A);const b=f(g);b.position.y=e/2,p.add(b);for(const v of u){const R=d(Aa(e/2-a,i,l,C),new L(0,-v,0));R.position.set(v*t/2,(e/2-a)/2,i/2),R.rotateZ(Math.PI/2),p.add(R)}return m&&p.rotateZ(Math.PI),p}const _=new ut;return _.add(h(16771251,!1)),_.add(h(8381439,!0)),{stadium:_,wallPanels:c}}function uT(n,e){const t=eT(n),i=rT(e),a=new ut;a.name=`${n.kind}-hitbox-overlay`,a.visible=!1,a.position.set(...t.position),a.rotateY(ht.degToRad(t.rotationYDegrees));const s=new ki(...t.dimensions),r=new nt({color:i,transparent:!0,opacity:Z_,depthTest:!1,depthWrite:!1,side:Ze}),o=new Be(s,r);o.name="hitbox-overlay-fill",o.renderOrder=9,a.add(o);const l=new mb(s),c=new rr({color:i,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1}),u=new pb(l,c);return u.name="hitbox-overlay-lines",u.renderOrder=10,a.add(u),a}function dT(n,e){const t=n.getObjectByName("hitbox-overlay-fill");t&&(t.material.opacity=e?tT:Z_)}function fT(n){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],t=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new Mt;i.setAttribute("position",new et(e.flat(),3)),i.setIndex(t.flat()),i.computeVertexNormals();const a=new ut,s=new ut,r=new Be(i,new V_({color:n}));r.castShadow=!0,s.add(r);const o=new Ho({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],u=new Mt;u.setAttribute("position",new et(l.flat(),3)),u.setIndex(c.flat()),u.computeVertexNormals();const d=new Be(u,o);d.position.z=1,s.add(d);const f=new nt({color:8968191,transparent:!0,opacity:.34,side:Ze}),h=new Mt;h.setAttribute("position",new et([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),h.setIndex([0,2,3,0,3,1]),h.computeVertexNormals();const _=new Be(h,f);_.position.z=2,s.add(_);const g=new Ho({color:2236962,shininess:48}),m=(p,y,x,S)=>{const C=new Be(new rl(70,70,S,10),g);return C.rotateZ(Math.PI/2),C.position.set(p,y,x),C.castShadow=!0,C};return s.add(m(120,-300,-60,50)),s.add(m(-120,-300,-60,50)),s.add(m(120,150,-60,70)),s.add(m(-120,150,-60,70)),s.position.set(0,0,50),s.rotateZ(Math.PI/2),s.scale.set(.35,.35,.35),a.add(s),a}function hT(){const n=new ut;n.visible=!1,n.position.set(-124,0,8);const e=new Xs(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const t=new Xs(17,150,12,1,!0);t.rotateZ(Math.PI/2),t.translate(-75,0,0);const i=new ls(21,12,12),a=[-38,38];for(const s of a){const r=new ut;r.position.set(0,s,0);const o=new nt({color:"#ff9b2f",transparent:!0,opacity:.42,blending:Ti,depthWrite:!1,side:Ze});o.forceSinglePass=!0;const l=new Be(e,o);l.name="outer-flame",r.add(l);const c=new nt({color:"#fff2ba",transparent:!0,opacity:.9,blending:Ti,depthWrite:!1,side:Ze});c.forceSinglePass=!0;const u=new Be(t,c);u.name="inner-flame",r.add(u);const d=new nt({color:"#fff8db",transparent:!0,opacity:.62,blending:Ti,depthWrite:!1});d.forceSinglePass=!0;const f=new Be(i,d);f.name="glow",f.position.x=-10,r.add(f),n.add(r)}return n}function pT(){const n=new ut;n.visible=!1,n.position.set(0,0,235);const e=240,t=82,i=188,a=20,s=new en(e,t),r=new nt({color:463645,transparent:!0,opacity:.78,side:Ze,depthWrite:!1}),o=new Be(s,r);o.position.z=-1,n.add(o);const l=new en(i,a),c=new nt({color:1385521,transparent:!0,opacity:.92,side:Ze,depthWrite:!1}),u=new Be(l,c);u.position.y=-18,n.add(u);const d=new en(i,a),f=new nt({color:16761415,transparent:!0,opacity:.98,side:Ze,depthWrite:!1}),h=new Be(d,f);h.position.y=-18,n.add(h);const _=document.createElement("canvas");_.width=512,_.height=160;const g=_.getContext("2d");if(!g)throw new Error("Unable to create boost meter label context");const m=new sl(_);m.colorSpace=Gt,m.needsUpdate=!0;const p=new en(190,48),y=new nt({map:m,transparent:!0,depthWrite:!1,side:Ze}),x=new Be(p,y);return x.position.set(0,15,0),n.add(x),{group:n,fillMesh:h,fillMaterial:f,labelTexture:m,labelContext:g,labelCanvas:_,lastPercent:null}}function mT(){const n=new ut;n.visible=!1;const e=new nt({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),t=new Be(new Bd(170,8,8,48),e);t.position.z=16,n.add(t);const i=document.createElement("canvas");i.width=512,i.height=192;const a=i.getContext("2d");if(!a)throw new Error("Unable to create demo indicator label context");a.textAlign="center",a.textBaseline="middle",a.lineJoin="round",a.font="800 86px sans-serif",a.lineWidth=20,a.strokeStyle="rgba(7, 19, 29, 0.94)",a.strokeText("DEMO",i.width/2,88),a.fillStyle="#fff0b8",a.fillText("DEMO",i.width/2,88),a.font="700 34px sans-serif",a.lineWidth=10,a.strokeText("RESPAWNING",i.width/2,150),a.fillStyle="#ffbd4a",a.fillText("RESPAWNING",i.width/2,150);const s=new sl(i);s.colorSpace=Gt;const r=new nt({map:s,transparent:!0,depthWrite:!1,side:Ze}),o=new Be(new en(310,116),r);return o.position.z=300,n.add(o),{group:n,ring:t,label:o}}function _T(n,e,t,i){n.fillMesh.scale.x=Math.max(.001,e);const a=94;n.fillMesh.position.x=-(1-e)*a,n.fillMesh.position.y=-18;const s=Math.max(0,Math.min(100,Math.round(t/255*100)));if(n.lastPercent!==s){const{labelContext:r,labelCanvas:o,labelTexture:l}=n;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${s}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${s}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,n.lastPercent=s}n.group.quaternion.copy(i.quaternion)}function gT(n){n.add(new Jb("#d8ecff",1.6));const e=new Qf("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),n.add(e);const t=new Qf("#97d7ff",1.2);t.position.set(-5e3,4e3,3e3),n.add(t)}function vT(n){const e=oT(n),t=new Ho({color:16777215,map:e,shininess:42,specular:new Ve("#f7f2e3")});return{mesh:new Be(new ls(93,24,24),t),texture:e}}function yT(n,e,t){const i=new cb;i.background=new Ve("#081119");const a=new _n(48,1,10*t,5e5*t);a.up.set(0,0,1),a.position.set(0,-9e3*t,5e3*t),a.lookAt(0,0,0);const s=new UM({antialias:!1,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,aT)),s.domElement.style.display="block",s.domElement.style.width="100%",s.domElement.style.height="100%",s.domElement.tabIndex=0,s.domElement.setAttribute("aria-label","Replay player viewport"),n.replaceChildren(s.domElement);const r=new zM(a,s.domElement);r.enableDamping=!0,r.maxDistance=16e4*t,r.keyPanSpeed=iT,r.target.set(0,0,600*t),r.listenToKeyEvents(s.domElement),r.update();const o=()=>{s.domElement.focus()};s.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=cT(t);i.add(l),gT(i);const u=new ut;u.scale.set(-t,t,t),i.add(u);const{mesh:d,texture:f}=vT(s);u.add(d);const h=new Map,_=new Map,g=new Map,m=new Map,p=new Map,y=new Map;for(const v of e.players){const R=new ut,N=v.isTeamZero?"#57a8ff":"#ff9c40",z=fT(N),B=uT(v.hitbox,N);R.add(z),R.add(B);const G=hT();R.add(G);const U=pT();R.add(U.group);const X=mT();u.add(R),u.add(X.group),h.set(v.id,R),_.set(v.id,z),g.set(v.id,B),m.set(v.id,G),p.set(v.id,U),y.set(v.id,X)}const x=()=>{const v=n.clientWidth||1,R=n.clientHeight||1;a.aspect=v/R,a.updateProjectionMatrix(),s.setSize(v,R,!1)};x();const S=new L,C=new L,M=new qn,T=new L;return{scene:i,replayRoot:u,camera:a,renderer:s,controls:r,resize:x,dispose:()=>{s.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),f.dispose(),s.dispose(),n.replaceChildren()},ballMesh:d,playerMeshes:h,playerBodyMeshes:_,playerHitboxes:g,playerBoostTrails:m,playerBoostMeters:p,playerDemoIndicators:y,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const v of c){if(v.fixedOpacity!==null){v.material.transparent=!0,v.material.opacity=v.fixedOpacity,v.material.depthWrite=!1;continue}v.mesh.getWorldPosition(S),v.mesh.getWorldQuaternion(M),C.copy(v.outwardLocal).applyQuaternion(M).normalize(),T.copy(a.position).sub(S);const R=C.dot(T)>0;v.material.transparent=!0,v.material.opacity=R?yo:Vd,v.material.depthWrite=!R}}}}function js(n,e){if(n.frames.length===0)return 0;let t=0,i=n.frames.length-1;for(;t<=i;){const a=Math.floor((t+i)/2),s=n.frames[a]?.time??0;if(s<e)t=a+1;else if(s>e)i=a-1;else return a}return Math.max(0,t-1)}function bT(n,e){return n.frames.length===0?0:ht.clamp(Math.round(e),0,n.frames.length-1)}function ST(n){if(n.frames.length===0)return null;const e=new Map;for(const a of n.frames)e.set(a.gameState,(e.get(a.gameState)??0)+1);let t=null,i=-1;for(const[a,s]of e.entries())s<=i||(t=a,i=s);return t}function xT(n,e){if(e===null)return null;for(const t of n.frames){if(t.gameState===e)break;return t.gameState}return null}function J_(n,e){return e===null?n.kickoffCountdown<=0:n.gameState===e}function Gd(n,e){return n.kickoffCountdown>0?!0:e!==null&&n.gameState===e}function wT(n,e){return n.ballFrames[e]?.position?!0:n.players.some(t=>t.frames[e]?.position)}function ET(n,e,t,i){return Gd(e,i)&&wT(n,t)}function bo(n,e,t,i,a){return!J_(e,i)&&!ET(n,e,t,a)}function Lh(n,e,t,i,a,s,r){return i&&bo(n,e,t,s,r)||a&&Gd(e,r)}function MT(n,e,t,i,a){const s=[],{frames:r}=n;if(r.length===0||!e&&!t)return s;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Lh(n,l,o,e,t,i,a)){o+=1;continue}const c=l.time;let u=o+1;for(;u<r.length&&Lh(n,r[u],u,e,t,i,a);)u+=1;const d=r[u]?.time??n.duration;if(d>c){const f=s.at(-1);f&&f.endTime>=c?f.endTime=Math.max(f.endTime,d):s.push({startTime:c,endTime:d})}o=u}return s}function TT(n,e,t){const i=ht.clamp(t,0,n);for(const a of e){if(i<a.startTime)break;if(i<a.endTime)return{replayTime:i,timelineTime:i,seekTime:a.endTime,hiddenBySkip:!0}}return{replayTime:i,timelineTime:i,seekTime:i,hiddenBySkip:!1}}function CT(n,e,t,i){return ht.clamp(i,0,n)}function AT(n,e){const t=e.at(-1);return!t||t.endTime<n?n:ht.clamp(t.startTime,0,n)}function RT(n,e,t){const i=n.frames[e];if(!i||i.kickoffCountdown<=0)return null;let a=e;for(;a>0&&(n.frames[a-1]?.kickoffCountdown??0)>0;)a-=1;let s=e+1;for(;s<n.frames.length&&n.frames[s].kickoffCountdown>0;)s+=1;let r=0;for(let c=a;c<s;c+=1)r=Math.max(r,n.frames[c].kickoffCountdown);const o=n.frames[s]?.time??n.duration,l=Math.max(0,o-t);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function PT(n,e){const t=js(n,e),i=Math.min(t+1,n.frames.length-1);if(i===t)return{frameIndex:t,nextFrameIndex:i,alpha:0};const a=n.frames[t]?.time??0,s=n.frames[i]?.time??a;return s<=a?{frameIndex:t,nextFrameIndex:i,alpha:0}:{frameIndex:t,nextFrameIndex:i,alpha:ht.clamp((e-a)/(s-a),0,1)}}const LT=1.4,Ra=.18,Wr=.14,IT=120,Ih=90,NT=40,kT=45,DT=.58,Nh=.82,FT=132,Q_=new L(-1,0,0),Ji=new L(0,0,1),OT=new L(-1,0,0),UT=new L(0,0,18800),BT=new L(0,0,700),zT=new L(-9600,-12600,6400),HT=new L(0,0,900),Vo=48,VT=16,GT=16,$T=.003,WT=.05;function eg(n,e,t){return n?!e||t<=0?n:{x:ht.lerp(n.x,e.x,t),y:ht.lerp(n.y,e.y,t),z:ht.lerp(n.z,e.z,t)}:e}function tg(n,e,t){const i=n??e;if(!i)return null;const a=new qn(i.x,i.y,i.z,i.w);return!e||t<=0||n===null?a:a.slerp(new qn(e.x,e.y,e.z,e.w),t)}function $d(n){return new L(n.x,n.y,n.z)}function ng(n,e){return new L(-n.x*e,n.y*e,n.z*e)}function sc(n){return new L(-n.x,n.y,n.z).normalize()}function XT(n,e){switch(n){case"overhead":return{position:UT.clone().multiplyScalar(e),target:BT.clone().multiplyScalar(e),up:OT.clone(),fov:Vo};case"side":return{position:zT.clone().multiplyScalar(e),target:HT.clone().multiplyScalar(e),up:Ji.clone(),fov:Vo}}}function KT(n){const{fov:e,position:t,sceneState:i,target:a,up:s}=n,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(t,Wr),o.target.lerp(a,Wr),r.up.lerp(s,Wr).normalize(),r.fov=ht.lerp(r.fov,e,Wr),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(t)<=VT,c=o.target.distanceToSquared(a)<=GT,u=r.up.angleTo(s)<=$T,d=Math.abs(r.fov-e)<=WT;return!l||!c||!u||!d?!1:(r.position.copy(t),o.target.copy(a),r.up.copy(s).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(a),o.enabled=!0,!0)}function qT(n){const e=n.linearVelocity?sc(n.linearVelocity):null,t=n.forward?sc(n.forward):null,i=n.up?sc(n.up):null;if((n.position?.z??1/0)<IT){const l=(t??e??Q_.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(Ji,l).normalize(),u=new L().crossVectors(l,c).normalize();return{forward:l,up:u,right:c}}if(!t||!i)return null;const s=t.clone().normalize(),r=new L().crossVectors(i,s).normalize(),o=new L().crossVectors(s,r).normalize();return{forward:s,up:o,right:r}}function YT(n){const{cameraViewMode:e,attachedPlayerId:t,ballCamEnabled:i,ballPosition:a,cameraDistanceScale:s,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,attachedPlayerUnavailable:c=!1,fieldScale:u,frameIndex:d,replay:f,sceneState:h}=n,_=h.controls;if(e==="free"){_.enabled=!0,h.camera.fov=ht.lerp(h.camera.fov,Vo,Ra),h.camera.updateProjectionMatrix();return}if(!t){_.enabled=!0,h.camera.fov=ht.lerp(h.camera.fov,Vo,Ra),h.camera.updateProjectionMatrix();return}const g=f.players.find(B=>B.id===t),m=g?.frames[d];if(!g||c||!m?.position||m.isPresent===!1){_.enabled=!0;return}_.enabled=!1;const p=ng(m.position,u),y=qT(m),x=y?.forward??Q_.clone(),S=y?.right??new L(0,1,0),C={...g.cameraSettings,...r??{}},M=(C.distance??270)*u*s,T=(C.height??100)*u*LT,A=ht.degToRad(C.pitch??-4),b=x.clone().applyAxisAngle(S,A).normalize(),v=p.clone().addScaledVector(Ji,T),R=x.clone().multiplyScalar(-M).addScaledVector(Ji,T).applyAxisAngle(S,A),N=p.clone().addScaledVector(Ji,NT*u);let z=C.fov??110;if(i&&a){const B=a.clone().addScaledVector(Ji,kT*u),G=B.clone().sub(N),U=(G.lengthSq()>1e-4?G.normalize():b.clone()).multiplyScalar(Nh).addScaledVector(b,1-Nh).normalize();l.copy(N).lerp(B,DT),o.copy(v).addScaledVector(U,-M),o.z=Math.max(Ih*u,o.z);const X=N.clone().sub(o),V=B.clone().sub(o);if(X.lengthSq()>1e-4&&V.lengthSq()>1e-4){const Q=X.angleTo(V);z=Math.min(FT,Math.max(z,ht.radToDeg(Q)*1.7))}}else o.copy(N).add(R),o.z=Math.max(Ih*u,o.z),l.copy(N);h.camera.position.lerp(o,Ra),h.camera.up.lerp(Ji,Ra).normalize(),_.target.lerp(l,Ra),h.camera.fov=ht.lerp(h.camera.fov,z,Ra),h.camera.updateProjectionMatrix(),h.camera.lookAt(_.target)}const jT=2.25,ig=3.2,So="free";function $i(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Nu(n){if(!n)return null;const e={},t=$i(n.fov),i=$i(n.height),a=$i(n.pitch),s=$i(n.distance),r=$i(n.stiffness),o=$i(n.swivelSpeed),l=$i(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function ZT(n){const e=n.initialAttachedPlayerId??null;return{speed:Math.max(.1,n.initialPlaybackRate??1),cameraDistanceScale:Math.max(.25,n.initialCameraDistanceScale??jT),customCameraSettings:Nu(n.initialCustomCameraSettings),attachedPlayerId:e,cameraViewMode:n.initialCameraViewMode??(e?"follow":So),ballCamEnabled:n.initialBallCamEnabled??!1,boostMeterEnabled:n.initialBoostMeterEnabled??!1,boostPickupAnimationEnabled:n.initialBoostPickupAnimationEnabled??!0,hitboxWireframesEnabled:n.initialHitboxWireframesEnabled??!1,hitboxOnlyModeEnabled:n.initialHitboxOnlyModeEnabled??!1,skipPostGoalTransitionsEnabled:n.initialSkipPostGoalTransitionsEnabled??!0,skipKickoffsEnabled:n.initialSkipKickoffsEnabled??!1}}function JT(n,e,t,i){const a=js(n,e),s=n.frames[a];if(!s||!Gd(s,i))return null;const r=n.frames.find((o,l)=>l>a&&J_(o,t));return!r||r.time===e?null:r.time}function QT(n,e,t,i){const a=js(n,e),s=n.frames[a];if(!s||!bo(n,s,a,t,i))return null;const r=n.frames.find((c,u)=>u>a&&!bo(n,c,u,t,i));if(r)return r.time===e?null:r.time;let o=a;for(;o>0&&bo(n,n.frames[o-1],o-1,t,i);)o-=1;const l=n.frames[o]?.time;return l===void 0||l===e?null:l}function e1({replay:n,sceneState:e,fieldScale:t,frameWindow:i}){const a=n.ballFrames[i.frameIndex]??null,s=n.ballFrames[i.nextFrameIndex]??a,r=eg(a?.position??null,s?.position??null,i.alpha),o=r?ng(r,t):null;if(r){e.ballMesh.visible=!0,e.ballMesh.position.copy($d(r));const l=tg(a?.rotation??null,s?.rotation??null,i.alpha);l?e.ballMesh.quaternion.copy(l):e.ballMesh.quaternion.identity()}else e.ballMesh.visible=!1;return{ballFrame:a,nextBallFrame:s,ballPosition:o}}function t1(n){return!!n?.position&&n?.isPresent!==!1}function kh(n,e,t){for(let i=n.length-1;i>=0;i-=1){const a=n[i],s=t-a.time;if(!(s<0)){if(s>ig)break;if(a.kind==="demo"&&a.secondaryPlayerId===e)return a}}return null}function rc({indicator:n,fallbackPosition:e,demoEvent:t,currentTime:i,camera:a}){if(!n)return;const s=t?.location??e;if(!t||!s){n.group.visible=!1;return}const r=Math.max(0,i-t.time),o=i*8,l=1+.08*Math.sin(o);n.group.visible=!0,n.group.position.copy($d(s)),n.ring.rotation.z=o*.15,n.ring.scale.setScalar(l),n.label.quaternion.copy(a.quaternion),n.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=ht.clamp(1-r/ig,.28,1);for(const u of[n.ring,n.label]){const d=u.material;d instanceof di&&(d.opacity=c)}}function n1(n,e,t,i,a){if(!e){n.visible=!1;return}n.visible=!0;const s=i*36+a*1.7,r=.86+.14*Math.sin(s),o=ht.clamp(.62+t*.88,.62,1.5),l=o*(1.02+r*.52),c=1.02+o*.28;n.scale.set(l,c,c);for(const[u,d]of n.children.entries()){const f=d,h=.92+.14*Math.sin(s+u*.85);f.scale.setScalar(h),f.traverse(_=>{if(!(_ instanceof Be))return;const g=_.material;if(g instanceof nt)switch(_.name){case"outer-flame":g.opacity=.24+o*.24;break;case"inner-flame":g.opacity=.58+o*.3;break;case"glow":g.opacity=.4+o*.26;break}})}}const i1=1;class a1 extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;hitboxWireframesEnabled;hitboxOnlyModeEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,t,i={}){super(),this.container=e,this.replay=t,this.options=i,this.fieldScale=i.fieldScale??i1,this.sceneState=yT(e,t,this.fieldScale),this.liveGameState=ST(t),this.kickoffGameState=xT(t,this.liveGameState);const a=ZT(i);this.speed=a.speed,this.cameraDistanceScale=a.cameraDistanceScale,this.customCameraSettings=a.customCameraSettings,this.attachedPlayerId=a.attachedPlayerId,this.cameraViewMode=a.cameraViewMode,this.ballCamEnabled=a.ballCamEnabled,this.boostMeterEnabled=a.boostMeterEnabled,this.boostPickupAnimationEnabled=a.boostPickupAnimationEnabled,this.hitboxWireframesEnabled=a.hitboxWireframesEnabled,this.hitboxOnlyModeEnabled=a.hitboxOnlyModeEnabled,this.skipPostGoalTransitionsEnabled=a.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled=a.skipKickoffsEnabled,this.setHitboxVisualizationVisibility(),this.installResizeHandling();for(const s of i.plugins??[])this.installPlugin(s,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=Nu(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":So,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:t,position:i,target:a,up:s}=XT(e,this.fieldScale);this.cameraViewMode=So,this.freeCameraTransition={position:i,target:a,up:s,fov:t},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const t of this.sceneState.playerBoostMeters.values())t.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setHitboxWireframesEnabled(e){this.hitboxWireframesEnabled=e,this.setHitboxVisualizationVisibility(),this.render(),this.emitChange()}setHitboxOnlyModeEnabled(e){this.hitboxOnlyModeEnabled=e,this.setHitboxVisualizationVisibility(),this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.playing&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&this.playing&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=this.clampReplayTime(e),this.playing&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const t=bT(this.replay,e),i=this.replay.frames[t]?.time??0,a=this.playing,s=this.currentTime!==i||a;this.playing=!1,this.currentTime=i,this.render(),s&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const t=js(this.replay,this.currentTime);this.setFrameIndex(t+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const t=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(t),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=Nu(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":So)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.hitboxWireframesEnabled!==void 0&&(this.hitboxWireframesEnabled=e.hitboxWireframesEnabled,this.setHitboxVisualizationVisibility()),e.hitboxOnlyModeEnabled!==void 0&&(this.hitboxOnlyModeEnabled=e.hitboxOnlyModeEnabled,this.setHitboxVisualizationVisibility()),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=this.clampReplayTime(e.currentTime)),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(t),this.playing=!1)),this.playing&&(this.skipPostGoalTransitionIfNeeded(t),this.skipPastKickoffIfNeeded(t),this.reanchorPlaybackClock(t)),this.render(),this.emitChange()}getState(){const e=js(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,hitboxWireframesEnabled:this.hitboxWireframesEnabled,hitboxOnlyModeEnabled:this.hitboxOnlyModeEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.replay.duration}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return TT(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return CT(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}clampReplayTime(e){return ht.clamp(e,0,this.replay.duration)}getPlaybackEndTime(){return AT(this.replay.duration,this.getTimelineSegments())}subscribe(e){const t=i=>{e(i.detail)};return this.addEventListener("change",t),e(this.getState()),()=>{this.removeEventListener("change",t)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const t=this.beforeRenderCallbacks.indexOf(e);t>=0&&this.beforeRenderCallbacks.splice(t,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const t=this.plugins.findIndex(a=>a.plugin.id===e);if(t<0)return!1;const[i]=this.plugins.splice(t,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}setHitboxVisualizationVisibility(){for(const e of this.sceneState.playerHitboxes.values())e.visible=this.hitboxWireframesEnabled||this.hitboxOnlyModeEnabled,dT(e,this.hitboxOnlyModeEnabled);for(const e of this.sceneState.playerBodyMeshes.values())e.visible=!this.hitboxOnlyModeEnabled;if(this.hitboxOnlyModeEnabled){for(const e of this.sceneState.playerBoostTrails.values())e.visible=!1;for(const e of this.sceneState.playerBoostMeters.values())e.group.visible=!1}}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const t=(e-this.playbackStartedAt)/1e3,i=ht.clamp(this.playbackStartedTime+t*this.speed,0,this.getPlaybackEndTime()),a=i!==this.currentTime;return this.currentTime=i,a}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let t=!1;this.playing&&(t=this.syncPlaybackClock(e),t=this.skipPostGoalTransitionIfNeeded(e)||t,t=this.skipPastKickoffIfNeeded(e)||t,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,t=!0)),this.render(),t&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=PT(this.replay,this.currentTime),t=e.frameIndex,{ballFrame:i,nextBallFrame:a,ballPosition:s}=e1({replay:this.replay,sceneState:this.sceneState,fieldScale:this.fieldScale,frameWindow:e}),r=[];for(const[c,u]of this.replay.players.entries()){const d=this.sceneState.playerMeshes.get(u.id),f=this.sceneState.playerBoostTrails.get(u.id),h=this.sceneState.playerBoostMeters.get(u.id),_=this.sceneState.playerDemoIndicators.get(u.id),g=u.frames[t]??null,m=u.frames[e.nextFrameIndex]??g;let p=null,y=null,x=0;if(!d){_&&(_.group.visible=!1),r.push({track:u,mesh:null,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}p=eg(g?.position??null,m?.position??null,e.alpha);const S=kh(this.replay.timelineEvents,u.id,this.currentTime);if(!p){d.visible=!1,f&&(f.visible=!1),h&&(h.group.visible=!1),rc({indicator:_??null,fallbackPosition:null,demoEvent:S,currentTime:this.currentTime,camera:this.sceneState.camera}),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}if(S){d.visible=!1,f&&(f.visible=!1),h&&(h.group.visible=!1),rc({indicator:_??null,fallbackPosition:p,demoEvent:S,currentTime:this.currentTime,camera:this.sceneState.camera}),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}if(!t1(g)){d.visible=!1,f&&(f.visible=!1),h&&(h.group.visible=!1),rc({indicator:_??null,fallbackPosition:p,demoEvent:null,currentTime:this.currentTime,camera:this.sceneState.camera}),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}d.visible=!0,_&&(_.group.visible=!1),y=p,d.position.copy($d(p));const M=tg(g?.rotation??null,m?.rotation??null,e.alpha);M?d.quaternion.copy(M):d.quaternion.identity();const T=g?.boostFraction??0,A=m?.boostFraction??T;if(x=ht.lerp(T,A,e.alpha),f){const b=(e.alpha>=.5?m?.boostActive:g?.boostActive)??g?.boostActive??m?.boostActive??!1;this.hitboxOnlyModeEnabled?f.visible=!1:n1(f,b,x,this.currentTime,c)}h&&(this.boostMeterEnabled&&!this.hitboxOnlyModeEnabled?(h.group.visible=!0,_T(h,x,ht.lerp(g?.boostAmount??0,m?.boostAmount??g?.boostAmount??0,e.alpha),this.sceneState.camera)):h.group.visible=!1),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x})}YT({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:t,attachedPlayerUnavailable:this.attachedPlayerId!==null&&kh(this.replay.timelineEvents,this.attachedPlayerId,this.currentTime)!==null,ballPosition:s,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&KT({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const o={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const c of this.beforeRenderCallbacks)c(o);const l=this.createRenderContext(o,i,a,s,r);for(const c of this.plugins)c.plugin.beforeRender?.(l);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const t=JT(this.replay,this.currentTime,this.liveGameState,this.kickoffGameState);return t===null?!1:(this.currentTime=t,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const t=QT(this.replay,this.currentTime,this.liveGameState,this.kickoffGameState);return t===null?!1:(this.currentTime=t,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,t){return RT(this.replay,e,t)}computeTimelineSegments(){return MT(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,t){const i=typeof e=="function"?e():e;if(this.plugins.some(s=>s.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const a={definition:e,plugin:i};return this.plugins.push(a),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),t&&this.render(),()=>{const s=this.plugins.indexOf(a);s<0||(this.plugins.splice(s,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,t,i,a,s){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:t,nextBallFrame:i,ballPosition:a,players:s}}emitChange(){const e=this.getState(),t=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(t);this.dispatchEvent(new CustomEvent("change",{detail:e}))}}const s1="https://ballchasing.com",r1=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function o1(n,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${n.replace(/^\/+/,"")}`)}function Dh(n){return r1.test(n.trim())}function Wd(n){const e=n.trim();if(Dh(e))return e.toLowerCase();let t;try{t=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${n}`)}if(!/(^|\.)ballchasing\.com$/i.test(t.hostname))throw new Error(`Invalid Ballchasing replay URL: ${n}`);const i=t.pathname.split("/").filter(Boolean),a=i.findIndex(o=>o==="replay"),s=i.findIndex(o=>o==="replays"),r=a>=0?i[a+1]:s>=0?i[s+1]:void 0;if(!r||!Dh(r))throw new Error(`Invalid Ballchasing replay URL: ${n}`);return r.toLowerCase()}function l1(n){return`ballchasing-${Wd(n)}.replay`}function c1(n,e=s1){const t=Wd(n);return o1(`dl/replay/${encodeURIComponent(t)}`,e)}const Fh="subtr-actor-ballchasing-overlay-styles",u1="#3b82f6",d1="#f59e0b";function f1(){if(document.getElementById(Fh))return;const n=document.createElement("style");n.id=Fh,n.textContent=`
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
      border-bottom: 2px solid ${u1};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${d1};
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
  `,document.head.append(n)}function h1(n,e){const t=n.players[e],i=t.frame?.boostAmount??0,a=t.nextFrame?.boostAmount??i;return ht.lerp(i,a,n.alpha)}function Oh(n,e,t,i){if(!n||!e)return;const a=Math.max(0,Math.min(100,Math.round(t/255*100)));n.style.width=`${a}%`,e.textContent=`${a} ${i}`}function Uh(n,e,t,i){if(!n)return;const a=()=>{e.player.setAttachedPlayer(t)};n.classList.add("sap-bc-player-selectable"),n.tabIndex=0,n.setAttribute("role","button"),n.setAttribute("aria-label",`Follow ${i}`),n.title=`Follow ${i}`,n.addEventListener("click",a),n.addEventListener("keydown",s=>{s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),a())})}function p1(n,e,t,i,a){if(n.getWorldPosition(a),a.add(e),a.project(t),a.z<-1||a.z>1)return!1;const s=i.clientWidth||1,r=i.clientHeight||1;return a.x=(a.x+1)*s/2,a.y=(1-a.y)*r/2,!(a.x<-80||a.x>s+80||a.y<-80||a.y>r+80)}function m1(n={}){const e=n.showFloatingNames??!0,t=n.showFloatingBoostBars??!0,i=n.showTeamBoostHud??!0;let a=null,s=null,r=null,o=null,l=!1,c="";const u=new Map,d=new L,f=new L(0,0,255);function h(g){for(const[m,p]of u.entries()){const y=m===g;p.floatingRoot?.classList.toggle("sap-bc-player-following",y),p.teamHudEntry?.classList.toggle("sap-bc-player-following",y),p.floatingRoot?.setAttribute("aria-pressed",y?"true":"false"),p.teamHudEntry?.setAttribute("aria-pressed",y?"true":"false")}}function _(g,m){f1(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),a=document.createElement("div"),a.className="sap-bc-overlay-root",e||t?(s=document.createElement("div"),s.className="sap-bc-floating-layer",a.append(s)):s=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",a.append(r,o)):(r=null,o=null);for(const p of g.replay.players){let y=null,x=null,S=null,C=null;s&&(y=document.createElement("div"),y.className="sap-bc-floating-track",y.hidden=!0,(e||t)&&(x=document.createElement("div"),x.className=`sap-bc-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,S=document.createElement("div"),S.className=`sap-bc-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-boost-text",x.append(S,C),y.append(x)),Uh(y,g,p.id,p.name),s.append(y));let M=null,T=null,A=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const b=document.createElement("div");b.className=`sap-bc-hud-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",b.append(T,A),M.append(b),Uh(M,g,p.id,p.name),(p.isTeamZero?r:o)?.append(M)}u.set(p.id,{floatingRoot:y,floatingBoostFill:S,floatingBoostText:C,teamHudEntry:M,teamHudFill:T,teamHudText:A})}f.set(0,0,255*(g.options.fieldScale??1)),m.append(a),h(g.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(g){_(g,g.container)},onStateChange(g){h(g.state.attachedPlayerId)},teardown(g){a?.remove(),a=null,s=null,r=null,o=null,u.clear(),l&&(g.container.style.position=c,l=!1)},beforeRender(g){if(a)for(const[m,p]of g.players.entries()){const y=u.get(p.track.id);if(!y)continue;const x=h1(g,m);Oh(y.floatingBoostFill,y.floatingBoostText,x,p.track.name),Oh(y.teamHudFill,y.teamHudText,x,p.track.name);const S=p.mesh,C=S!==null&&p.interpolatedPosition!==null;if(y.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!C),!!y.floatingRoot){if(!C||!p1(S,f,g.scene.camera,g.container,d)){y.floatingRoot.hidden=!0;continue}y.floatingRoot.hidden=!1,y.floatingRoot.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function oc(n){n.depthTest=!1,n.depthWrite=!1,n.transparent=!0,n.polygonOffset=!0,n.polygonOffsetFactor=-2,n.polygonOffsetUnits=-2,n.forceSinglePass=!0}const $a=6,_1=.6;function or(n){return n*_1}function g1(n){return or(n.size==="big"?150:92)}function ag(n){return or(n.size==="big"?155:46)}function v1(n){return or(n.size==="big"?34:14)}function sg(n){return $a+v1(n)+ag(n)}function rg(n){return n.size==="big"?sg(n):$a+or(1.2)}function og(n){return n.size==="big"?sg(n):$a+or(.8)}function y1(n){return n.size==="big"?16096779:16436245}function b1(n){const e=g1(n),t=y1(n),i=ag(n),a=n.size==="big",s=new ut;s.position.set(n.position.x,n.position.y,n.position.z),s.renderOrder=20,s.frustumCulled=!1;const r=new Be(new la(e*.72,e,24),new nt({color:t,transparent:!0,opacity:.92,side:Ze,depthWrite:!1}));oc(r.material),r.position.z=$a,r.renderOrder=20,r.frustumCulled=!1,s.add(r);const o=new Be(new ka(e*.58,24),new nt({color:t,transparent:!0,opacity:.3,side:Ze,depthWrite:!1}));oc(o.material),o.position.z=$a+.5,o.renderOrder=21,o.frustumCulled=!1,s.add(o);const l=new Be(new ka(e*.42,20),new nt({color:16777215,transparent:!0,opacity:.22,side:Ze,depthWrite:!1}));oc(l.material),l.position.z=$a+1,l.renderOrder=22,l.frustumCulled=!1,s.add(l);const c=new Be(a?new ls(i,32,18):new ka(i*.9,24),a?new Ho({color:t,emissive:new Ve(t),emissiveIntensity:.6,shininess:88,specular:new Ve(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new nt({color:t,transparent:!0,opacity:.88,side:Ze,blending:Ti,depthWrite:!1}));c.position.z=rg(n),c.renderOrder=23,c.frustumCulled=!1,s.add(c);const u=new Be(a?new ls(i*1.36,32,14):new ka(i*1.35,28),new nt({color:t,transparent:!0,opacity:a?.2:.16,side:Ze,blending:Ti,depthWrite:!1}));return u.position.z=og(n),u.renderOrder=24,u.frustumCulled=!1,s.add(u),{group:s,ring:r,core:o,cooldown:l,orb:c,glow:u}}function S1(n,e){let t=-1;for(let s=0;s<n.events.length&&!(n.events[s].time>e);s+=1)t=s;if(t<0)return{available:!0,progress:1};const i=n.events[t];if(i.available)return{available:!0,progress:1};const a=n.events.slice(t+1).find(s=>s.available);return!a||a.time<=i.time?{available:!1,progress:0}:{available:!1,progress:ht.clamp((e-i.time)/(a.time-i.time),0,1)}}function x1(n,e,t,i){const{available:a,progress:s}=S1(e,t),r=e.size==="big",o=.92+.08*Math.sin(t*6+e.index*.45),l=.96+.04*Math.sin(t*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(t*2.2+e.index*.61)*18:0,u=rg(e)+c,d=og(e)+c;if(n.orb.position.z=u,n.glow.position.z=d,n.orb.rotation.z=t*(r?.9:1.25),n.glow.rotation.z=-t*.45,a){n.group.visible=!0,n.ring.material.opacity=.95,n.core.material.opacity=r?.56:.5,n.cooldown.visible=!1,n.ring.scale.setScalar(o),n.core.scale.setScalar(1),n.orb.visible=!0,n.glow.visible=!0,n.orb.material.opacity=r?.96:.9,n.glow.material.opacity=(r?.2:.16)+(l-.96),n.orb.scale.setScalar(l),n.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(n.group.visible=!0,n.ring.material.opacity=.18,n.core.material.opacity=.07,n.ring.scale.setScalar(1),n.core.scale.setScalar(1),n.orb.visible=!1,n.glow.visible=!1,n.cooldown.visible=i,i){const f=.3+s*.7;n.cooldown.scale.setScalar(f),n.cooldown.material.opacity=.16+s*.2}}function w1(n={}){const e=n.showCooldownProgress??!0;let t=null;const i=new Map;function a(r){t=new ut,t.name="boost-pad-overlay",t.renderOrder=20,t.frustumCulled=!1;for(const o of r.replay.boostPads){const l=b1(o);t.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(t)}function s(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&x1(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){a(r),s({...r,state:r.player.getState()})},onStateChange(r){s(r)},teardown(){t?.removeFromParent(),t=null,i.clear()}}}const E1=1.35,M1="#57a8ff",T1="#ff9c40",C1=256,A1=160,R1=360,P1=225,L1=260,I1=430,lg=18,Bh=120;function N1(n){return n?M1:T1}function k1(n){return n.events.filter(e=>!e.available&&e.playerId)}function cg(n,e){const t=document.createElement("canvas");t.width=C1,t.height=A1;const i=t.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${n}`,t.width/2,t.height/2),i.fillStyle=e,i.fillText(`${n}`,t.width/2,t.height/2);const a=new sl(t);return a.colorSpace=Gt,a.needsUpdate=!0,a}function D1(n){n?.dispose()}function F1(n){const e=new ut;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const t=cg(1,n),i=new R_({map:t,transparent:!0,depthTest:!1,depthWrite:!1}),a=new L_(i);a.scale.set(R1,P1,1),a.renderOrder=62,a.frustumCulled=!1,e.add(a);const s=new nt({color:n,transparent:!0,opacity:0,side:Ze,depthTest:!1,depthWrite:!1,blending:Ti}),r=new Be(new la(Bh*.72,Bh,36),s);return r.position.z=lg,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:s}}function O1(n,e){n.currentCount!==e&&(D1(n.textMaterial.map),n.textMaterial.map=cg(e,n.color),n.textMaterial.needsUpdate=!0,n.currentCount=e)}function U1(n){const e=new Map;for(const a of n.replay.players)e.set(a.id,a);const t=[];for(const a of n.replay.boostPads)for(const s of k1(a))t.push({pad:a,event:s});t.sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:a.event.frame!==s.event.frame?a.event.frame-s.event.frame:a.pad.index-s.pad.index);const i=[];for(const{pad:a,event:s}of t){if(!s.playerId)continue;const r=e.get(s.playerId);if(!r)continue;const o=N1(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:u}=F1(o);l.position.copy(a.position),n.scene.replayRoot.add(l),i.push({time:s.time,pad:a,event:s,player:r,color:o,currentCount:1,position:new L(a.position.x,a.position.y,a.position.z),size:a.size,group:l,textMaterial:c,ringMaterial:u})}return i}function B1(n,e,t){const i=ht.clamp(e/t,0,1),a=1-Math.pow(1-i,3),s=i*i,r=n.size==="big"?I1:L1,o=n.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;n.group.visible=!0,n.group.position.set(n.position.x,n.position.y,n.position.z+r+a*o),n.group.scale.setScalar(l),n.textMaterial.opacity=Math.max(0,1-s),n.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=n.group.children[1];if(c){const u=.75+a*(n.size==="big"?2.8:1.85);c.scale.setScalar(u),c.position.z=lg-r-a*o}}function z1(n={}){const e=Math.max(.1,n.durationSeconds??E1);let t=[];function i(s){return n.includePickup?.({pad:s.pad,event:s.event,player:s.player})??!0}function a(){for(const s of t)s.group.visible=!1}return{id:"boost-pickup-animation",setup(s){t=U1(s)},beforeRender(s){if(!s.state.boostPickupAnimationEnabled){a();return}const r=s.currentTime-e,o=new Map;for(const l of t){if(l.time>s.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}O1(l,c),B1(l,s.currentTime-l.time,e)}},teardown(){for(const s of t)s.group.removeFromParent(),s.group.traverse(r=>{(r instanceof Be||r instanceof L_)&&r.geometry?.dispose()}),s.textMaterial.map?.dispose(),s.textMaterial.dispose(),s.ringMaterial.dispose();t=[]}}}const H1=60,V1=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function G1(n){if(n&&MediaRecorder.isTypeSupported(n))return n;for(const e of V1)if(MediaRecorder.isTypeSupported(e))return e;return""}function $1(n){return n instanceof Error?n.message:String(n)}function W1(n={}){let e=null,t=null,i=[],a=null,s=0,r=0,o="",l=0,c=null,u=null,d=null,f=null,h=!1,_=null;const g=new Set;function m(){return{state:t?t.state==="recording"?"recording":"stopping":c?"error":a?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function p(){const M=m();n.onStatusChange?.(M);for(const T of g)T(M)}function y(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function x(M){t=null,f=null,h=!1,a=M,l=M?.size??0,_&&e&&e.player.setState({currentTime:_.currentTime,speed:_.speed,playing:_.playing}),_=null,M&&n.onComplete?.(M),p(),d?.(M),d=null,u=null}function S(M){c=$1(M),t=null,f=null,h=!1,_=null,p(),d?.(null),d=null,u=null}const C={id:"canvas-recorder",setup(M){e=M},beforeRender(M){t?.state==="recording"&&(r=(performance.now()-s)/1e3,p()),t?.state==="recording"&&f!==null&&M.currentTime>=f&&C.stop()},onStateChange(M){h&&t?.state==="recording"&&!M.state.playing&&r>0&&C.stop()},teardown(){t?.state==="recording"&&t.stop(),e=null,t=null,f=null,h=!1,_=null,d?.(null),d=null,u=null,g.clear()},start(M={}){const T=y();if(t?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=T.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,a=null,i=[],l=0,r=0,s=performance.now(),o=G1(M.mimeType??n.mimeType);const b=Math.max(1,M.fps??n.fps??H1),v=A.captureStream(b);t=new MediaRecorder(v,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??n.videoBitsPerSecond}),u=new Promise(R=>{d=R}),t.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,p())}),t.addEventListener("stop",()=>{v.getTracks().forEach(R=>R.stop()),x(new Blob(i,{type:o||"video/webm"}))},{once:!0}),t.addEventListener("error",R=>{v.getTracks().forEach(N=>N.stop()),S(R.error??R)},{once:!0}),t.start(1e3),p()},stop(){if(!t)return Promise.resolve(a);if(t.state==="inactive")return u??Promise.resolve(a);const M=u??new Promise(T=>{d=T});return t.stop(),p(),M},clear(){if(t?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");a=null,i=[],l=0,r=0,c=null,p()},getRecording(){return a},getStatus(){return m()},subscribe(M){return g.add(M),M(m()),()=>{g.delete(M)}},recordRange(M={}){const T=y(),A=T.player.getState();(M.restorePlaybackState??!0)&&(_=A);const b=M.playbackRate??A.speed,v=M.startTime??A.currentTime;f=M.endTime??A.duration,h=!0,T.player.setState({currentTime:v,speed:b,playing:!1}),C.start(M);const R=u;return T.player.play(),(R??Promise.resolve(null)).then(N=>{if(!N)throw new Error("Recording stopped without producing a video");return N})},recordFullReplay(M={}){return C.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??y().replay.duration})}};return C}const zh="subtr-actor-timeline-overlay-styles";function X1(){if(document.getElementById(zh))return;const n=document.createElement("style");n.id=zh,n.textContent=`
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
  `,document.head.append(n)}const K1=new Set(["goal","save","bookmark"]),q1=.2,Y1=2,j1=4,Z1=.01,Hh=.01;function ku(n){if(!Number.isFinite(n))return"--:--.--";const e=Math.max(0,n),t=Math.floor(e/60),i=Math.floor(e%60),a=Math.floor((e-Math.floor(e))*100);return`${t}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}function Vh(n){switch(n.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":case"bookmark":return 1;default:return 0}}function J1(n){switch(n.kind){case"goal":case"goal-context":case"goal-tag":return j1;default:return Y1}}function Xd(n){return n.seekTime!==void 0&&Number.isFinite(n.seekTime)?Math.max(0,n.seekTime):Number.isFinite(n.time)?Math.max(0,n.time-J1(n)):0}function Q1(n){if(n.color)return n.color;if(n.isTeamZero===!0)return"#3b82f6";if(n.isTeamZero===!1)return"#f59e0b";switch(n.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";case"bookmark":return"#facc15";default:return"#d1d9e0"}}function eC(n){if(n.events.length>1)return`${n.events.length}`;const e=n.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function tC(n){return n.events.map(e=>`${ku(e.time)} ${e.label??e.kind}`).join(`
`)}function ug(n){const e=new Map;for(const t of n){const i=t.frame!==void 0?`frame:${t.frame}`:`time:${t.time.toFixed(2)}`,a=e.get(i);if(a){a.events.push(t);continue}e.set(i,{key:i,time:t.time,events:[t]})}return[...e.values()].map(t=>({...t,events:[...t.events].sort((i,a)=>{const s=Vh(a)-Vh(i);return s!==0?s:i.time-a.time})})).sort((t,i)=>t.time-i.time)}function dg(n,e){return n?typeof n=="function"?n(e):n:[]}function nC(n,e){const t=[];for(const i of n){const a=dg(i.source,e);a.length!==0&&t.push({key:i.key,label:i.label,buckets:ug(a)})}return t}function iC(n,e){return n?typeof n=="function"?n(e):n:[]}function aC(n,e){const t=new Set,i=[];for(const a of n)for(const s of iC(a,e)){const r=s.id;if(r!==void 0){if(t.has(r))continue;t.add(r)}i.push(s)}return i}function sC(n){const e=new Map;for(const t of n){const i=t.lane??"default",a=t.laneLabel??t.lane??"",s=e.get(i);if(s){s.ranges.push(t);continue}e.set(i,{key:i,label:a,ranges:[t]})}return[...e.values()].map(t=>({...t,ranges:[...t.ranges].sort((i,a)=>i.startTime-a.startTime)}))}function rC(n){return n.color?n.color:n.isTeamZero===!0?"#3b82f6":n.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function oC(n,e){if(n.replayEvents)return dg(n.replayEvents,e);if(n.includeReplayEvents===!1)return[];const t=new Set(n.replayEventKinds??K1);return e.replay.timelineEvents.filter(i=>t.has(i.kind))}function lC(n,e){const t=e.player.projectReplayTimeToTimeline(Xd(n));if(!t.hiddenBySkip)return t.seekTime;const i=Math.min(e.player.getTimelineDuration(),t.timelineTime+Z1);return e.player.projectTimelineTimeToReplay(i)}function Xr(n,e){return`${n/Math.max(e,1e-4)*100}%`}function cC(n,e,t){let i=n.timelineTime,a=e.timelineTime;return a<=i&&(n.hiddenBySkip||e.hiddenBySkip)&&(i>=t?(i=Math.max(0,t-Hh),a=t):a=Math.min(t,i+Hh)),{startTimelineTime:i,endTimelineTime:a}}function uC(n={}){const e=n.pauseWhileScrubbing??!0;let t=0;const i=n.events?[{key:"events:initial",label:n.eventsLabel??"Events",source:n.events}]:[],a=n.ranges?[n.ranges]:[];let s=null,r=null,o=null,l=null,c=null,u=null,d=null,f=null,h=null,_=null,g=null,m=null,p=!1,y="",x=!1,S=!1,C=null,M=[],T=[],A=null;const b=new Map,v=[],R=[],N=[];function z(){C&&(X(C),G({...C,state:C.player.getState()}))}function B(){C&&(V(C),G({...C,state:C.player.getState()}))}function G(K){if(!l||!c||!u||!d||!f||!h||!r)return;const ce=K.player.getTimelineCurrentTime(),Se=K.player.getTimelineDuration(),ve=[Se.toFixed(4),K.state.skipKickoffsEnabled?"1":"0",K.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");A!==ve&&(X(K),V(K),A=ve),l.min="0",l.max=`${Se}`,l.step="0.01",l.value=`${Math.min(ce,Se)}`,c.dataset.playing=K.state.playing?"true":"false",c.setAttribute("aria-label",K.state.playing?"Pause replay":"Play replay"),c.title=K.state.playing?"Pause replay":"Play replay",u.textContent=K.state.playing?"||":">",d.textContent=K.state.playing?"Pause":"Play",f.textContent=ku(ce),h.textContent=`-${ku(Se-ce)}`,r.dataset.scrubbing=x?"true":"false";for(const O of b.values()){const q=ce-O.timelineTime,ee=q>=0&&q<=q1;O.element.dataset.active=ee?"true":"false",O.element.dataset.passed=O.timelineTime<=ce?"true":"false"}for(const O of v){const q=Math.max(0,O.startTimelineTime),ee=Math.min(Se,O.endTimelineTime);if(Math.max(0,ee-q)<=1e-4){O.element.hidden=!0;continue}O.element.hidden=!1,O.element.dataset.active=ce>=q&&ce<=ee?"true":"false"}const he=Xr(Math.min(ce,Se),Se);for(const O of N)O.element.style.left=he;for(const O of R)O.element.style.left=he}function U(K,ce,Se){const ve=K.events[0];if(!ve)return null;const he=ce.player.projectReplayTimeToTimeline(K.time),O=document.createElement("button");return O.type="button",O.className="sap-tl-marker",O.style.left=Xr(he.timelineTime,Se),O.style.color=Q1(ve),O.title=tC(K),O.textContent=eC(K),O.addEventListener("click",()=>{ce.player.seek(lC(ve,ce))}),O.dataset.active="false",O.dataset.passed="false",b.set(K.key,{element:O,timelineTime:he.timelineTime}),O}function X(K){if(!g||!_)return;g.replaceChildren(),_.replaceChildren(),b.clear(),N.splice(0,N.length);const ce=oC(n,K);M=[],ce.length>0&&M.push({key:"replay",label:n.replayEventsLabel??"Replay",buckets:ug(ce)}),M.push(...nC(i,K));const Se=Math.max(K.player.getTimelineDuration(),1e-4),ve=M[0];if(ve?.key==="replay")for(const O of ve.buckets){const q=U({...O,key:`${ve.key}:${O.key}`},K,Se);q&&g.append(q)}const he=M.filter(O=>O.key!=="replay");_.hidden=he.length===0;for(const O of he){const q=document.createElement("div");q.className="sap-tl-event-lane",q.dataset.label=O.label;const ee=document.createElement("span");ee.className="sap-tl-event-lane-label",ee.textContent=O.label,ee.setAttribute("aria-label",O.label),q.append(ee);const be=document.createElement("div");be.className="sap-tl-event-lane-track";const ge=document.createElement("div");ge.className="sap-tl-markers";for(const at of O.buckets){const I=U({...at,key:`${O.key}:${at.key}`},K,Se);I&&ge.append(I)}const ke=document.createElement("div");ke.className="sap-tl-event-playhead",be.append(ge,ke),N.push({element:ke}),q.append(be),_.append(q)}}function V(K){if(!o)return;o.replaceChildren(),v.splice(0,v.length),R.splice(0,R.length);const ce=aC(a,K).filter(ve=>Number.isFinite(ve.startTime)&&Number.isFinite(ve.endTime)&&ve.endTime>ve.startTime);T=sC(ce);const Se=Math.max(K.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const ve of T){const he=document.createElement("div");he.className="sap-tl-range-lane";const O=document.createElement("div");if(O.className="sap-tl-range-lane-track",ve.label){he.dataset.label=ve.label;const ee=document.createElement("span");ee.className="sap-tl-range-lane-label",ee.textContent=ve.label,ee.setAttribute("aria-label",ve.label),he.append(ee)}for(const ee of ve.ranges){const be=K.player.projectReplayTimeToTimeline(ee.startTime),ge=K.player.projectReplayTimeToTimeline(ee.endTime),{startTimelineTime:ke,endTimelineTime:at}=cC(be,ge,Se),I=document.createElement("div");I.className="sap-tl-range-segment",ee.className&&I.classList.add(ee.className),I.style.background=rC(ee),I.title=ee.label??ve.label,I.dataset.active="false",I.style.left=Xr(ke,Se),I.style.width=Xr(Math.max(0,at-ke),Se),O.append(I),v.push({range:ee,element:I,startTimelineTime:ke,endTimelineTime:at})}const q=document.createElement("div");q.className="sap-tl-range-playhead",O.append(q),R.push({element:q}),he.append(O),o.append(he)}}function Q(){x&&(x=!1,r?.setAttribute("data-scrubbing","false"),S&&C?.player.play(),S=!1)}function de(){if(x||(x=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const K=C?.player;K&&(S=K.getState().playing,S&&K.pause())}return{id:"timeline-overlay",addEventSource(K,ce={}){return i.push({key:ce.id??`events:${t++}`,label:ce.label??"Events",source:K}),z(),()=>{this.removeEventSource(K)}},removeEventSource(K){const ce=i.findIndex(Se=>Se.source===K);return ce<0?!1:(i.splice(ce,1),z(),!0)},refreshEvents(){z()},addRangeSource(K){return a.push(K),B(),()=>{this.removeRangeSource(K)}},removeRangeSource(K){const ce=a.indexOf(K);return ce<0?!1:(a.splice(ce,1),B(),!0)},refreshRanges(){B()},setup(K){C=K,X1(),getComputedStyle(K.container).position==="static"&&(p=!0,y=K.container.style.position,K.container.style.position="relative"),s=document.createElement("div"),s.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const ce=document.createElement("div");ce.className="sap-tl-topline";const Se=document.createElement("div");Se.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",u=document.createElement("span"),u.className="sap-tl-toggle-icon",u.setAttribute("aria-hidden","true"),u.textContent=">",d=document.createElement("span"),d.className="sap-tl-toggle-label",d.textContent="Play",c.append(u,d),c.addEventListener("click",()=>{K.player.togglePlayback()}),f=document.createElement("span"),f.className="sap-tl-current",f.textContent="0:00.00",h=document.createElement("span"),h.className="sap-tl-remaining",h.textContent="-0:00.00",Se.append(f),ce.append(Se,h);const ve=document.createElement("div");ve.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,_=document.createElement("div"),_.className="sap-tl-event-lanes",_.hidden=!0;const he=document.createElement("div");he.className="sap-tl-track-rail";const O=document.createElement("div");O.className="sap-tl-main-rail",g=document.createElement("div"),g.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${K.replay.duration}`,l.step="0.01",l.value="0";const q=()=>{de()},ee=()=>{l&&K.player.seek(K.player.projectTimelineTimeToReplay(Number(l.value)))},be=()=>{Q()};l.addEventListener("pointerdown",q),l.addEventListener("input",ee),l.addEventListener("change",be),window.addEventListener("pointerup",be),window.addEventListener("pointercancel",be),m=()=>{l?.removeEventListener("pointerdown",q),l?.removeEventListener("input",ee),l?.removeEventListener("change",be),window.removeEventListener("pointerup",be),window.removeEventListener("pointercancel",be)},he.append(O,g,l),ve.append(o,_,c,he),r.append(ce,ve),s.append(r),K.container.append(s),X(K),V(K),G({...K,state:K.player.getState()})},onStateChange(K){C=K,G(K)},teardown(K){m?.(),m=null,Q(),s?.remove(),s=null,r=null,o=null,_=null,l=null,c=null,u=null,d=null,f=null,h=null,g=null,C=null,M=[],T=[],A=null,b.clear(),v.splice(0,v.length),R.splice(0,R.length),N.splice(0,N.length),p&&(K.container.style.position=y,p=!1)}}}function dC(n){return`
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
              <button type="button" data-window-toggle="mechanics-review">Events review</button>
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
            <label class="toggle">
              <input id="hitbox-only-mode" type="checkbox" />
              <span>Hitbox only</span>
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
                <h2>Events review</h2>
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
                    <dt>Event type</dt>
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
`}const Kd=["timeline","core_player","core_player_goal_context","possession","pressure","territorial_pressure","movement","positioning","rotation_player","rotation_team","mechanics","goal_context","backboard","ceiling_shot","wall_aerial","wall_aerial_shot","center","flick","musty_flick","dodge_reset","double_tap","fifty_fifty","one_timer","pass","pass_last_completed","ball_carry","rush","speed_flip","half_flip","half_volley","wavedash","whiff","powerslide","touch","touch_ball_movement","touch_last_touch","boost_pickups","boost_ledger","boost_state","bump"],fg=["air_dribble","ball_carry","ceiling_shot","center","double_tap","flick","flip_reset","half_flip","half_volley","musty_flick","one_timer","pass","speed_flip","wall_aerial","wall_aerial_shot","wavedash"],hg=[...new Set([...Kd,...fg])],fC=new Set(Kd),hC=new Set(fg);function Wa(){return Object.fromEntries(hg.map(n=>[n,0]))}function lc(n){return{...n??Wa()}}function Kr(n,e){n[e]+=1}function pC(n){return hg.includes(n)}function pg(n){if(n==null)return null;if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Du(n){return pg(n.player??n.player_id??n.scorer)}function mC(n){const e=n.is_team_0??n.scoring_team_is_team_0;return typeof e=="boolean"?e:null}function _C(n){const e=n.kind;return typeof e!="string"||!hC.has(e)||fC.has(e)||!pC(e)?null:e}function Fu(n){const e=n.timing,t=n.resolved_frame??n.frame??(e&&typeof e=="object"&&"frame"in e?e.frame:void 0)??(e&&typeof e=="object"&&"end_frame"in e?e.end_frame:void 0);return typeof t=="number"&&Number.isFinite(t)?t:null}function Ou(n){const e=n.timing,t=n.resolved_time??n.time??(e&&typeof e=="object"&&"time"in e?e.time:void 0)??(e&&typeof e=="object"&&"end_time"in e?e.end_time:void 0);return typeof t=="number"&&Number.isFinite(t)?t:null}function gC(n,e){const t=Fu(n);if(t!==null)return t<=e.frame_number;const i=Ou(n);return i!==null&&i<=e.time}function vC(n){return[...n].filter(e=>!!e&&typeof e=="object").sort((e,t)=>{const i=Fu(e),a=Fu(t);if(i!==a)return(i??Number.POSITIVE_INFINITY)-(a??Number.POSITIVE_INFINITY);const s=Ou(e),r=Ou(t);return s!==r?(s??Number.POSITIVE_INFINITY)-(r??Number.POSITIVE_INFINITY):(Du(e)??"").localeCompare(Du(t)??"")})}function mg(n){const e=_g(n);for(const t of n.frames)e.applyFrame(t);return n}function _g(n){const e=Kd.map(a=>({eventType:a,events:vC(n.events[a]??[]),index:0})),t=new Map,i={teamZero:Wa(),teamOne:Wa()};return{applyFrame(a){for(const s of e)for(;s.index<s.events.length&&gC(s.events[s.index],a);){const r=s.events[s.index],o=Du(r),l=s.eventType==="mechanics"?_C(r):null;if(o!==null){const u=t.get(o)??Wa();t.set(o,u),Kr(u,s.eventType),l!==null&&Kr(u,l)}const c=mC(r);if(c!==null){const u=c?i.teamZero:i.teamOne;Kr(u,s.eventType),l!==null&&Kr(u,l)}s.index+=1}for(const s of a.players){const r=pg(s.player_id);s.event_counts=lc(r===null?void 0:t.get(r))}a.team_zero.event_counts=lc(i.teamZero),a.team_one.event_counts=lc(i.teamOne)}}}function Gh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function gg(){return{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null}}function yC(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function bC(n,e,t,i){n.is_last_backboard=i,n.time_since_last_backboard=n.last_backboard_time==null?null:Math.max(0,t-n.last_backboard_time),n.frames_since_last_backboard=n.last_backboard_frame==null?null:Math.max(0,e-n.last_backboard_frame)}function SC(n,e,t,i){n.count+=1,n.last_backboard_time=e.time,n.last_backboard_frame=e.frame,n.time_since_last_backboard=Math.max(0,i-e.time),n.frames_since_last_backboard=Math.max(0,t-e.frame)}function xC(n,e){Object.assign(n,e??gg())}function $h(n,e){n.count=e}function wC(n){const e=vg(n);for(const t of n.frames)e.applyFrame(t);return n}function vg(n){const e=yC(n.events.backboard??[]);let t=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)bC(u,o.frame_number,o.time,c===s);let l=!1;for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=Gh(c.player),d=r.get(u)??gg();r.set(u,d),SC(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,t+=1}if(l)for(const c of r.values())c.is_last_backboard=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_backboard=!0)}$h(o.team_zero.backboard,i),$h(o.team_one.backboard,a);for(const c of o.players)xC(c.backboard,r.get(Gh(c.player_id)))}}}function Wh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function xo(){return{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function wo(){return{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function EC(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.end_frame!==t.event.end_frame?e.event.end_frame-t.event.end_frame:e.event.end_time!==t.event.end_time?e.event.end_time-t.event.end_time:e.index-t.index).map(({event:e})=>e)}function Uu(n){return`${n.key}\0${n.value}`}function qr(n){return n.map(Uu).join("")}function yg(n,e){e.sort((a,s)=>Uu(a).localeCompare(Uu(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>qr(a.labels)===qr(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>qr(a.labels).localeCompare(qr(s.labels))))}function Xh(n,e){return n.labeled_event_counts?.entries.filter(t=>t.labels.some(i=>i.key==="origin"&&i.value===e)).reduce((t,i)=>t+i.count,0)??0}function bg(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function Sg(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function Kh(n,e){yg(n,[{key:"kind",value:"carry"}]),n.carry_count=bg(n),n.total_carry_time+=e.duration,n.total_straight_line_distance+=e.straight_line_distance,n.total_path_distance+=e.path_distance,n.longest_carry_time=Math.max(n.longest_carry_time,e.duration),n.furthest_carry_distance=Math.max(n.furthest_carry_distance,e.straight_line_distance),n.fastest_carry_speed=Math.max(n.fastest_carry_speed,e.average_speed),n.carry_speed_sum+=e.average_speed,n.average_horizontal_gap_sum+=e.average_horizontal_gap,n.average_vertical_gap_sum+=e.average_vertical_gap}function qh(n,e){e.air_dribble_origin!=null&&yg(n,[{key:"origin",value:e.air_dribble_origin}]),n.count=bg(n),n.ground_to_air_count=Xh(n,"ground_to_air"),n.wall_to_air_count=Xh(n,"wall_to_air"),n.total_time+=e.duration,n.total_straight_line_distance+=e.straight_line_distance,n.total_path_distance+=e.path_distance,n.longest_time=Math.max(n.longest_time,e.duration),n.furthest_distance=Math.max(n.furthest_distance,e.straight_line_distance),n.fastest_speed=Math.max(n.fastest_speed,e.average_speed),n.speed_sum+=e.average_speed,n.average_horizontal_gap_sum+=e.average_horizontal_gap,n.average_vertical_gap_sum+=e.average_vertical_gap,n.total_touch_count+=e.touch_count,n.max_touch_count=Math.max(n.max_touch_count,e.touch_count)}function cc(n,e){Object.assign(n,e??xo()),e?.labeled_event_counts?n.labeled_event_counts=Sg(e.labeled_event_counts):delete n.labeled_event_counts}function uc(n,e){Object.assign(n,e??wo()),e?.labeled_event_counts?n.labeled_event_counts=Sg(e.labeled_event_counts):delete n.labeled_event_counts}function MC(n){const e=xg(n);for(const t of n.frames)e.applyFrame(t);return n}function xg(n){const e=EC(n.events.ball_carry??[]);let t=0;const i=new Map,a=new Map,s=xo(),r=xo(),o=wo(),l=wo();return{applyFrame(c){for(;t<e.length&&e[t].end_frame<c.frame_number;){const u=e[t],d=Wh(u.player_id);if(u.kind==="carry"){const f=i.get(d)??xo();i.set(d,f),Kh(f,u),Kh(u.is_team_0?s:r,u)}else{const f=a.get(d)??wo();a.set(d,f),qh(f,u),qh(u.is_team_0?o:l,u)}t+=1}cc(c.team_zero.ball_carry,s),cc(c.team_one.ball_carry,r),uc(c.team_zero.air_dribble,o),uc(c.team_one.air_dribble,l);for(const u of c.players){const d=Wh(u.player_id);cc(u.ball_carry,i.get(d)),uc(u.air_dribble,a.get(d))}}}}function dc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Bu(){return{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}}function Yh(){return{bumps_inflicted:0,team_bumps_inflicted:0}}function TC(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function CC(n,e){n.bumps_inflicted+=1,e.is_team_bump&&(n.team_bumps_inflicted+=1),n.last_bump_time=e.time,n.last_bump_frame=e.frame,n.last_bump_strength=e.strength,n.max_bump_strength=Math.max(n.max_bump_strength,e.strength),n.cumulative_bump_strength+=e.strength}function AC(n,e){n.bumps_taken+=1,e.is_team_bump&&(n.team_bumps_taken+=1)}function RC(n,e){n.bumps_inflicted+=1,e.is_team_bump&&(n.team_bumps_inflicted+=1)}function PC(n,e){Object.assign(n,e??Bu())}function jh(n,e){Object.assign(n,e)}function LC(n){const e=wg(n);for(const t of n.frames)e.applyFrame(t);return n}function wg(n){const e=TC(n.events.bump??[]);let t=0;const i=new Map,a=Yh(),s=Yh();return{applyFrame(r){for(;t<e.length&&e[t].frame<=r.frame_number;){const o=e[t],l=dc(o.initiator),c=i.get(l)??Bu();i.set(l,c),CC(c,o);const u=dc(o.victim),d=i.get(u)??Bu();i.set(u,d),AC(d,o),RC(o.initiator_is_team_0?a:s,o),t+=1}jh(r.team_zero.bump,a),jh(r.team_one.bump,s);for(const o of r.players)PC(o.bump,i.get(dc(o.player_id)))}}}const Go=255,IC=1,NC=Go-1,kC=11920928955078125e-23,DC=["tracked_time","boost_integral","time_zero_boost","time_hundred_boost","time_boost_0_25","time_boost_25_50","time_boost_50_75","time_boost_75_100"],FC=["amount_collected","amount_collected_inactive","big_pads_collected_inactive","small_pads_collected_inactive","amount_stolen","big_pads_collected","small_pads_collected","big_pads_stolen","small_pads_stolen","amount_collected_big","amount_stolen_big","amount_collected_small","amount_stolen_small","amount_respawned","overfill_total","overfill_from_stolen","amount_used","amount_used_while_grounded","amount_used_while_airborne","amount_used_while_supersonic"],OC=[...DC,...FC];function It(n){return Math.fround(n)}function gt(n,e){return It(It(n)+It(e))}function Yr(n,e){return It(It(n)-It(e))}function ri(n,e){return It(It(n)*It(e))}function zu(n,e){return It(It(n)/It(e))}function Eg(){return{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0}}const UC=Eg();function jr(){return{stats:Eg(),countedPickupKeys:new Set,currentBoostAmount:null,currentBoostBefore:null,currentBoostFrame:null,previousBoostAmount:null,labeledAmountsVersion:0,labeledAmountsSnapshot:void 0,labeledAmountsSnapshotVersion:-1,labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function Ai(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function li(n,e){return n.labels?.find(t=>t.key===e)?.value??null}function Mg(n){return[...n??[]].sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function $o(n){return JSON.stringify(Mg(n))}function Tg(n){return Mg(n).map(e=>({...e}))}function BC(n,e){const t=It(e.amount);if(t<=0)return!1;const i=(n.labeled_amounts??={entries:[]}).entries,a=$o(e.labels),s=i.find(r=>$o(r.labels)===a);return s?(s.value=gt(s.value,t),!0):(i.push({labels:Tg(e.labels),value:t}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function zC(n,e,t){if(t<=0)return!1;const i=(n.labeled_counts??={entries:[]}).entries,a=$o(e.labels),s=i.find(r=>$o(r.labels)===a);return s?(s.count+=t,!0):(i.push({labels:Tg(e.labels),count:t}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function Pa(n){return zu(ri(n,Go),100)}function La(n,e,t,i){const a=Yr(e,n);if(Math.abs(a)<=kC)return n>=t&&n<i?1:0;const s=zu(Yr(t,n),a),r=zu(Yr(i,n),a),o=Math.max(Math.min(s,r),0),l=Math.min(Math.max(s,r),1);return Math.max(Yr(l,o),0)}function HC(n,e){n.currentBoostAmount=It(e.boost_amount),n.currentBoostBefore=e.boost_before==null?null:It(e.boost_before),n.currentBoostFrame=e.frame}function Cg(n,e,t,i){const a=It(e),s=It(t),r=It(i),o=ri(gt(a,s),.5);n.tracked_time=gt(n.tracked_time,r),n.boost_integral=gt(n.boost_integral,ri(o,r)),n.time_zero_boost=gt(n.time_zero_boost,ri(r,La(a,s,0,IC))),n.time_hundred_boost=gt(n.time_hundred_boost,ri(r,La(a,s,NC,Go+1))),n.time_boost_0_25=gt(n.time_boost_0_25,ri(r,La(a,s,0,Pa(25)))),n.time_boost_25_50=gt(n.time_boost_25_50,ri(r,La(a,s,Pa(25),Pa(50)))),n.time_boost_50_75=gt(n.time_boost_50_75,ri(r,La(a,s,Pa(50),Pa(75)))),n.time_boost_75_100=gt(n.time_boost_75_100,ri(r,La(a,s,Pa(75),Go+1)))}function VC(n,e,t){if(n.currentBoostFrame!==t)return null;const i=n.currentBoostAmount;if(i==null)return null;const a=n.currentBoostBefore??i;return Cg(n.stats,a,i,e),n.previousBoostAmount=i,[a,i]}function Zh(n,e){if(e.count<=0)return;const t=li(e,"pad_size");if(t!=="big"&&t!=="small")return;const i=li(e,"activity")??"unknown",a=li(e,"field_half")??"unknown",s=`${e.frame}:${Ai(e.player_id)}:${t}:${i}:${a}`;if(!n.countedPickupKeys.has(s)){if(n.countedPickupKeys.add(s),i==="inactive"){t==="big"?n.stats.big_pads_collected_inactive+=1:n.stats.small_pads_collected_inactive+=1;return}t==="big"?n.stats.big_pads_collected+=1:n.stats.small_pads_collected+=1}}function Jh(n,e){const t=It(Number.isFinite(e.amount)?e.amount:0);e.transaction!=="used"&&BC(n.stats,e)&&(n.labeledAmountsVersion+=1),e.transaction==="collected"&&zC(n.stats,e,Math.max(e.count,1))&&(n.labeledCountsVersion+=1);const i=li(e,"pad_size"),a=li(e,"activity")??"active",s=li(e,"field_half");switch(e.transaction){case"collected":if(Zh(n,e),a==="inactive"){n.stats.amount_collected_inactive=gt(n.stats.amount_collected_inactive,t);break}n.stats.amount_collected=gt(n.stats.amount_collected,t),i==="big"?n.stats.amount_collected_big=gt(n.stats.amount_collected_big,t):i==="small"&&(n.stats.amount_collected_small=gt(n.stats.amount_collected_small,t));break;case"stolen":n.stats.amount_stolen=gt(n.stats.amount_stolen,t),i==="big"?(n.stats.big_pads_stolen+=1,n.stats.amount_stolen_big=gt(n.stats.amount_stolen_big,t)):i==="small"&&(n.stats.small_pads_stolen+=1,n.stats.amount_stolen_small=gt(n.stats.amount_stolen_small,t));break;case"overfill":n.stats.overfill_total=gt(n.stats.overfill_total,t),s==="opponent"&&(n.stats.overfill_from_stolen=gt(n.stats.overfill_from_stolen,t)),Zh(n,e);break;case"respawn":n.stats.amount_respawned=gt(n.stats.amount_respawned,t);break;case"used":n.stats.amount_used=gt(n.stats.amount_used,t);break;case"used_allocation":li(e,"vertical_state")==="grounded"?n.stats.amount_used_while_grounded=gt(n.stats.amount_used_while_grounded,t):li(e,"vertical_state")==="aerial"&&(n.stats.amount_used_while_airborne=gt(n.stats.amount_used_while_airborne,t)),li(e,"supersonic")==="true"&&(n.stats.amount_used_while_supersonic=gt(n.stats.amount_used_while_supersonic,t));break}}function GC(n){return n.labeledAmountsSnapshotVersion!==n.labeledAmountsVersion&&(n.labeledAmountsSnapshot=n.stats.labeled_amounts&&n.stats.labeled_amounts.entries.length>0?{entries:n.stats.labeled_amounts.entries.map(e=>({labels:e.labels.map(t=>({...t})),value:e.value}))}:void 0,n.labeledAmountsSnapshotVersion=n.labeledAmountsVersion),n.labeledAmountsSnapshot}function $C(n){return n.labeledCountsSnapshotVersion!==n.labeledCountsVersion&&(n.labeledCountsSnapshot=n.stats.labeled_counts&&n.stats.labeled_counts.entries.length>0?{entries:n.stats.labeled_counts.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}:void 0,n.labeledCountsSnapshotVersion=n.labeledCountsVersion),n.labeledCountsSnapshot}function fc(n,e){const t=e?.stats??UC;for(const s of OC)n[s]=t[s];const i=e?GC(e):void 0;i?n.labeled_amounts=i:delete n.labeled_amounts;const a=e?$C(e):void 0;a?n.labeled_counts=a:delete n.labeled_counts}function WC(n){return[...n.events.boost_ledger??[]].sort((e,t)=>e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:Ai(e.player_id).localeCompare(Ai(t.player_id)))}function XC(n){return[...n.events.boost_state??[]].sort((e,t)=>e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:Ai(e.player_id).localeCompare(Ai(t.player_id)))}function KC(n){const e=Ag(n);for(const t of n.frames)e.applyFrame(t);return n}function Ag(n){const e=WC(n),t=XC(n);let i=0,a=0;const s=new Map,r=jr(),o=jr();return{applyFrame(l){const c=[];for(;a<t.length&&t[a].frame<=l.frame_number;){const u=t[a],d=Ai(u.player_id);let f=s.get(d);f||(f=jr(),s.set(d,f)),HC(f,u),u.frame===l.frame_number&&c.push({key:d,isTeamZero:u.is_team_0}),a+=1}for(;i<e.length&&e[i].frame<=l.frame_number;){const u=e[i],d=Ai(u.player_id);let f=s.get(d);f||(f=jr(),s.set(d,f)),Jh(f,u),Jh(u.is_team_0?r:o,u),i+=1}for(const u of c){const d=s.get(u.key);if(!d)continue;const f=VC(d,l.dt,l.frame_number);f&&Cg(u.isTeamZero?r.stats:o.stats,f[0],f[1],l.dt)}fc(l.team_zero.boost,r),fc(l.team_one.boost,o);for(const u of l.players){const d=s.get(Ai(u.player_id));fc(u.boost,d)}}}}const qC=.78;function Xa(n){return Math.fround(n)}function YC(n,e){return Xa(Xa(n)+Xa(e))}function Rg(n,e){return Xa(Xa(n)-Xa(e))}function Qh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Pg(){return{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function jC(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function Hu(n){return`${n.key}\0${n.value}`}function Zr(n){return n.map(Hu).join("")}function ZC(n,e){e.sort((a,s)=>Hu(a).localeCompare(Hu(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>Zr(a.labels)===Zr(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>Zr(a.labels).localeCompare(Zr(s.labels))))}function JC(n,e){return n.labeled_event_counts?.entries.filter(t=>t.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((t,i)=>t+i.count,0)??0}function QC(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function eA(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function tA(n,e,t,i){n.is_last_ceiling_shot=i,n.time_since_last_ceiling_shot=n.last_ceiling_shot_time==null?null:Math.max(0,Rg(t,n.last_ceiling_shot_time)),n.frames_since_last_ceiling_shot=n.last_ceiling_shot_frame==null?null:Math.max(0,e-n.last_ceiling_shot_frame)}function nA(n,e,t,i){ZC(n,[{key:"confidence_band",value:e.confidence>=qC?"high":"standard"}]),n.count=QC(n),n.high_confidence_count=JC(n,"high"),n.is_last_ceiling_shot=!0,n.last_ceiling_shot_time=e.time,n.last_ceiling_shot_frame=e.frame,n.time_since_last_ceiling_shot=Math.max(0,Rg(i,e.time)),n.frames_since_last_ceiling_shot=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=YC(n.cumulative_confidence,e.confidence)}function iA(n,e){Object.assign(n,e??Pg()),e?.labeled_event_counts?n.labeled_event_counts=eA(e.labeled_event_counts):delete n.labeled_event_counts}function aA(n){const e=Lg(n);for(const t of n.frames)e.applyFrame(t);return n}function Lg(n){const e=jC(n.events.ceiling_shot??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)tA(o,s.frame_number,s.time,i===r);for(;t<e.length&&e[t].frame<=s.frame_number;){const r=e[t],o=Qh(r.player),l=a.get(o)??Pg();a.set(o,l),nA(l,r,s.frame_number,s.time),i=o,t+=1}}else i=null;for(const r of s.players)iA(r.ceiling_shot,a.get(Qh(r.player_id)))}}}function hc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function On(n,e){return Math.fround(Math.fround(n)+Math.fround(e))}function Vu(){return{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null}}function Gu(){return{...Vu(),goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null}}function ep(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function sA(n,e){Object.assign(n,e??Gu())}function tp(n,e){Object.assign(n,e)}function np(n,e){n.score+=e.score_delta,n.goals+=e.goals_delta,n.assists+=e.assists_delta,n.saves+=e.saves_delta,n.shots+=e.shots_delta}function Ig(n,e){if(e.time_after_kickoff!=null){const t=Math.max(0,e.time_after_kickoff);t<10?n.kickoff_goal_count+=1:t<20?n.short_goal_count+=1:t<40?n.medium_goal_count+=1:n.long_goal_count+=1}if(e.goal_buildup==="counter_attack"?n.counter_attack_goal_count+=1:e.goal_buildup==="sustained_pressure"?n.sustained_pressure_goal_count+=1:e.goal_buildup!=null&&(n.other_buildup_goal_count+=1),e.ball_air_time_before_goal!=null){const t=Math.max(0,e.ball_air_time_before_goal);n.goal_ball_air_time_sample_count+=1,n.cumulative_goal_ball_air_time=On(n.cumulative_goal_ball_air_time,t),n.last_goal_ball_air_time=t}}function rA(n,e){e.goals_conceded_while_last_defender&&(n.goals_conceded_while_last_defender+=1),e.goals_for_while_most_back&&(n.goals_for_while_most_back+=1),e.goals_against_while_most_back&&(n.goals_against_while_most_back+=1),e.goal_against_boost_amount!=null&&(n.goal_against_boost_sample_count+=1,n.cumulative_boost_on_goals_against=On(n.cumulative_boost_on_goals_against,e.goal_against_boost_amount),n.last_boost_on_goal_against=e.goal_against_boost_amount),e.goal_against_average_boost_in_leadup!=null&&e.goal_against_min_boost_in_leadup!=null&&(n.goal_against_boost_leadup_sample_count+=1,n.cumulative_average_boost_in_goal_against_leadup=On(n.cumulative_average_boost_in_goal_against_leadup,e.goal_against_average_boost_in_leadup),n.cumulative_min_boost_in_goal_against_leadup=On(n.cumulative_min_boost_in_goal_against_leadup,e.goal_against_min_boost_in_leadup),n.last_average_boost_in_goal_against_leadup=e.goal_against_average_boost_in_leadup,n.last_min_boost_in_goal_against_leadup=e.goal_against_min_boost_in_leadup),e.goal_against_position!=null&&(n.goal_against_position_sample_count+=1,n.cumulative_goal_against_position_x=On(n.cumulative_goal_against_position_x,e.goal_against_position.x),n.cumulative_goal_against_position_y=On(n.cumulative_goal_against_position_y,e.goal_against_position.y),n.cumulative_goal_against_position_z=On(n.cumulative_goal_against_position_z,e.goal_against_position.z),n.last_goal_against_position={...e.goal_against_position}),e.scoring_goal_last_touch_position!=null&&(n.scoring_goal_last_touch_position_sample_count+=1,n.cumulative_scoring_goal_last_touch_position_x=On(n.cumulative_scoring_goal_last_touch_position_x,e.scoring_goal_last_touch_position.x),n.cumulative_scoring_goal_last_touch_position_y=On(n.cumulative_scoring_goal_last_touch_position_y,e.scoring_goal_last_touch_position.y),n.cumulative_scoring_goal_last_touch_position_z=On(n.cumulative_scoring_goal_last_touch_position_z,e.scoring_goal_last_touch_position.z),n.last_scoring_goal_last_touch_position={...e.scoring_goal_last_touch_position}),Ig(n,e)}function oA(n){const e=Ng(n);for(const t of n.frames)e.applyFrame(t);return n}function Ng(n){const e=ep(n.events.core_player??[]),t=ep(n.events.core_player_goal_context??[]);let i=0,a=0;const s=new Map,r=Vu(),o=Vu();return{applyFrame(l){for(;i<e.length&&e[i].frame<=l.frame_number;){const c=e[i],u=hc(c.player),d=s.get(u)??Gu();s.set(u,d),np(d,c);const f=c.is_team_0?r:o;np(f,c),i+=1}for(;a<t.length&&t[a].frame<=l.frame_number;){const c=t[a],u=hc(c.player),d=s.get(u)??Gu();s.set(u,d),rA(d,c),(c.time_after_kickoff!=null||c.goal_buildup!=null||c.ball_air_time_before_goal!=null)&&Ig(c.is_team_0?r:o,c),a+=1}tp(l.team_zero.core,r),tp(l.team_one.core,o);for(const c of l.players)sA(c.core,s.get(hc(c.player_id)))}}}function ip(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function kg(){return{count:0,on_ball_count:0}}function lA(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function cA(n,e){n.count+=1,e.on_ball&&(n.on_ball_count+=1)}function uA(n,e){Object.assign(n,e??kg())}function dA(n){const e=Dg(n);for(const t of n.frames)e.applyFrame(t);return n}function Dg(n){const e=lA(n.events.dodge_reset??[]);let t=0;const i=new Map;return{applyFrame(a){for(;t<e.length&&e[t].frame<=a.frame_number;){const s=e[t],r=ip(s.player),o=i.get(r)??kg();i.set(r,o),cA(o,s),t+=1}for(const s of a.players)uA(s.dodge_reset,i.get(ip(s.player_id)))}}}function ap(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Fg(){return{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null}}function fA(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function hA(n,e,t,i){n.is_last_double_tap=i,n.time_since_last_double_tap=n.last_double_tap_time==null?null:Math.max(0,t-n.last_double_tap_time),n.frames_since_last_double_tap=n.last_double_tap_frame==null?null:Math.max(0,e-n.last_double_tap_frame)}function pA(n,e,t,i){n.count+=1,n.last_double_tap_time=e.time,n.last_double_tap_frame=e.frame,n.time_since_last_double_tap=Math.max(0,i-e.time),n.frames_since_last_double_tap=Math.max(0,t-e.frame)}function mA(n,e){Object.assign(n,e??Fg())}function sp(n,e){n.count=e}function _A(n){const e=Og(n);for(const t of n.frames)e.applyFrame(t);return n}function Og(n){const e=fA(n.events.double_tap??[]);let t=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)hA(u,o.frame_number,o.time,c===s);let l=!1;for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=ap(c.player),d=r.get(u)??Fg();r.set(u,d),pA(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,t+=1}if(l)for(const c of r.values())c.is_last_double_tap=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_double_tap=!0)}sp(o.team_zero.double_tap,i),sp(o.team_one.double_tap,a);for(const c of o.players)mA(c.double_tap,r.get(ap(c.player_id)))}}}function rp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Ug(){return{demos_inflicted:0,demos_taken:0}}function op(){return{demos_inflicted:0}}function gA(n){return n.filter(e=>e.kind==="Kill"||e.kind==="Death").map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function vA(n,e){Object.assign(n,e??Ug())}function lp(n,e){Object.assign(n,e)}function yA(n){const e=Bg(n);for(const t of n.frames)e.applyFrame(t);return n}function Bg(n){const e=gA(n.events.timeline??[]);let t=0;const i=new Map,a=op(),s=op();return{applyFrame(r){for(;t<e.length&&e[t].time<=r.time;){const o=e[t];if(o.player_id!=null){const l=rp(o.player_id),c=i.get(l)??Ug();i.set(l,c),o.kind==="Kill"?(c.demos_inflicted+=1,o.is_team_0===!0?a.demos_inflicted+=1:o.is_team_0===!1&&(s.demos_inflicted+=1)):o.kind==="Death"&&(c.demos_taken+=1)}t+=1}lp(r.team_zero.demo,a),lp(r.team_one.demo,s);for(const o of r.players)vA(o.demo,i.get(rp(o.player_id)))}}}function pc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function cp(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0}}function $u(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0}}function bA(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.resolve_frame!==t.event.resolve_frame?e.event.resolve_frame-t.event.resolve_frame:e.event.resolve_time!==t.event.resolve_time?e.event.resolve_time-t.event.resolve_time:e.index-t.index).map(({event:e})=>e)}function SA(n){return{key:"phase",value:n?"kickoff":"open_play"}}function xA(n,e){return e==null?{key:"outcome",value:"neutral"}:{key:"outcome",value:e===n?"win":"loss"}}function wA(n,e){return e==null?{key:"possession_after",value:"neutral"}:{key:"possession_after",value:e===n?"self":"opponent"}}function EA(n,e){return{key:"dodge_state",value:(n?e.team_zero_dodge_contact:e.team_one_dodge_contact)?"dodge":"no_dodge"}}function Wu(n){return`${n.key}\0${n.value}`}function Jr(n){return n.map(Wu).join("")}function MA(n,e){e.sort((a,s)=>Wu(a).localeCompare(Wu(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>Jr(a.labels)===Jr(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>Jr(a.labels).localeCompare(Jr(s.labels))))}function TA(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function up(n,e,t){n.count+=1,t.winning_team_is_team_0==null?n.neutral_outcomes+=1:t.winning_team_is_team_0===e?n.wins+=1:n.losses+=1,t.possession_team_is_team_0==null?n.neutral_possession_after_count+=1:t.possession_team_is_team_0===e?n.possession_after_count+=1:n.opponent_possession_after_count+=1,t.is_kickoff&&(n.kickoff_count+=1,t.winning_team_is_team_0==null?n.kickoff_neutral_outcomes+=1:t.winning_team_is_team_0===e?n.kickoff_wins+=1:n.kickoff_losses+=1,t.possession_team_is_team_0==null?n.kickoff_neutral_possession_after_count+=1:t.possession_team_is_team_0===e?n.kickoff_possession_after_count+=1:n.kickoff_opponent_possession_after_count+=1)}function dp(n,e,t){MA(n,[SA(t.is_kickoff),xA(e,t.winning_team_is_team_0),wA(e,t.possession_team_is_team_0),EA(e,t)]),n.count+=1,t.winning_team_is_team_0==null?n.neutral_outcomes+=1:t.winning_team_is_team_0===e?n.wins+=1:n.losses+=1,t.possession_team_is_team_0===e&&(n.possession_after_count+=1),t.is_kickoff&&(n.kickoff_count+=1,t.winning_team_is_team_0==null?n.kickoff_neutral_outcomes+=1:t.winning_team_is_team_0===e?n.kickoff_wins+=1:n.kickoff_losses+=1,t.possession_team_is_team_0===e&&(n.kickoff_possession_after_count+=1))}function CA(n,e){Object.assign(n,e??$u()),e?.labeled_event_counts?n.labeled_event_counts=TA(e.labeled_event_counts):delete n.labeled_event_counts}function fp(n,e){Object.assign(n,e)}function AA(n){const e=zg(n);for(const t of n.frames)e.applyFrame(t);return n}function zg(n){const e=bA(n.events.fifty_fifty??[]);let t=0;const i=cp(),a=cp(),s=new Map;return{applyFrame(r){for(;t<e.length&&e[t].resolve_frame<=r.frame_number;){const o=e[t];if(up(i,!0,o),up(a,!1,o),o.team_zero_player!=null){const l=pc(o.team_zero_player),c=s.get(l)??$u();s.set(l,c),dp(c,!0,o)}if(o.team_one_player!=null){const l=pc(o.team_one_player),c=s.get(l)??$u();s.set(l,c),dp(c,!1,o)}t+=1}fp(r.team_zero.fifty_fifty,i),fp(r.team_one.fifty_fifty,a);for(const o of r.players)CA(o.fifty_fifty,s.get(pc(o.player_id)))}}}const RA=.8;function Ka(n){return Math.fround(n)}function mc(n,e){return Ka(Ka(n)+Ka(e))}function Hg(n,e){return Ka(Ka(n)-Ka(e))}function hp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Vg(){return{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0}}function PA(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function Xu(n){return`${n.key}\0${n.value}`}function Qr(n){return n.map(Xu).join("")}function LA(n,e){e.sort((a,s)=>Xu(a).localeCompare(Xu(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>Qr(a.labels)===Qr(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>Qr(a.labels).localeCompare(Qr(s.labels))))}function IA(n,e){return n.labeled_event_counts?.entries.filter(t=>t.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((t,i)=>t+i.count,0)??0}function NA(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function kA(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function DA(n,e,t,i){n.is_last_flick=i,n.time_since_last_flick=n.last_flick_time==null?null:Math.max(0,Hg(t,n.last_flick_time)),n.frames_since_last_flick=n.last_flick_frame==null?null:Math.max(0,e-n.last_flick_frame)}function FA(n,e,t,i){LA(n,[{key:"confidence_band",value:e.confidence>=RA?"high":"standard"}]),n.count=NA(n),n.high_confidence_count=IA(n,"high"),n.is_last_flick=!0,n.last_flick_time=e.time,n.last_flick_frame=e.frame,n.time_since_last_flick=Math.max(0,Hg(i,e.time)),n.frames_since_last_flick=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=mc(n.cumulative_confidence,e.confidence),n.cumulative_setup_duration=mc(n.cumulative_setup_duration,e.setup_duration),n.cumulative_ball_speed_change=mc(n.cumulative_ball_speed_change,e.ball_speed_change)}function OA(n,e){Object.assign(n,e??Vg()),e?.labeled_event_counts?n.labeled_event_counts=kA(e.labeled_event_counts):delete n.labeled_event_counts}function UA(n){const e=Gg(n);for(const t of n.frames)e.applyFrame(t);return n}function Gg(n){const e=PA(n.events.flick??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)DA(o,s.frame_number,s.time,r===i);for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=s.frame_number;){const r=e[t],o=hp(r.player),l=a.get(o)??Vg();a.set(o,l),FA(l,r,s.frame_number,s.time),i=o,t+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_flick=!0)}}else i=null;for(const r of s.players)OA(r.flick,a.get(hp(r.player_id)))}}}function qa(n){return Math.fround(n)}function $g(n,e){return qa(qa(n)+qa(e))}function Wg(n,e){return qa(qa(n)-qa(e))}function pp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Xg(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null}}function BA(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function zA(n,e,t,i){n.is_last_half_volley=i,n.time_since_last_half_volley=n.last_half_volley_time==null?null:Math.max(0,Wg(t,n.last_half_volley_time)),n.frames_since_last_half_volley=n.last_half_volley_frame==null?null:Math.max(0,e-n.last_half_volley_frame)}function HA(n,e,t,i){n.count+=1,n.total_ball_speed=$g(n.total_ball_speed,e.ball_speed),n.fastest_ball_speed=Math.max(n.fastest_ball_speed,e.ball_speed),n.last_half_volley_time=e.time,n.last_half_volley_frame=e.frame,n.time_since_last_half_volley=Math.max(0,Wg(i,e.time)),n.frames_since_last_half_volley=Math.max(0,t-e.frame)}function VA(n,e){Object.assign(n,e??Xg())}function mp(n,e){Object.assign(n,e)}function GA(n){const e=Kg(n);for(const t of n.frames)e.applyFrame(t);return n}function Kg(n){const e=BA(n.events.half_volley??[]);let t=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)zA(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=o.frame_number;){const c=e[t],u=pp(c.player),d=a.get(u)??Xg();a.set(u,d),HA(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed=$g(f.total_ball_speed,c.ball_speed),f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,t+=1}if(l)for(const c of a.values())c.is_last_half_volley=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_half_volley=!0)}}mp(o.team_zero.half_volley,s),mp(o.team_one.half_volley,r);for(const l of o.players)VA(l.half_volley,a.get(pp(l.player_id)))}}}const $A=.75,WA=.78,XA=.75;function Cn(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function _p(n){return[...n].sort((e,t)=>e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:Cn(e.player).localeCompare(Cn(t.player)))}function KA(n){return[...n].sort((e,t)=>e.resolved_frame!==t.resolved_frame?e.resolved_frame-t.resolved_frame:e.resolved_time!==t.resolved_time?e.resolved_time-t.resolved_time:e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:Cn(e.player).localeCompare(Cn(t.player)))}function _c(){return{count:0,highConfidenceCount:0,lastTime:null,lastFrame:null,lastResolvedTime:null,lastResolvedFrame:null,lastQuality:null,bestQuality:0,cumulativeQuality:0,labeledCounts:{entries:[]}}}function Ya(n){return Math.fround(n)}function qA(n,e){return Ya(Ya(n)+Ya(e))}function YA(n,e){return{key:"confidence_band",value:n>=e?"high":"standard"}}function jA(n,e){const t=e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key)),i=n.entries.find(a=>a.labels.length===t.length&&a.labels.every((s,r)=>s.key===t[r]?.key&&s.value===t[r]?.value));if(i){i.count+=1;return}n.entries.push({labels:t,count:1}),n.entries.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels)))}function us(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function gc(n,e,t,i,a){n.count+=1,e.confidence>=a&&(n.highConfidenceCount+=1),jA(n.labeledCounts,[YA(e.confidence,a)]),n.lastTime=e.time,n.lastFrame=e.frame,n.lastResolvedTime=i,n.lastResolvedFrame=t,n.lastQuality=e.confidence,n.bestQuality=Math.max(n.bestQuality,e.confidence),n.cumulativeQuality=qA(n.cumulativeQuality,e.confidence)}function qd(n,e){return n?.lastTime==null?null:n.lastResolvedFrame===e.frame_number?0:Math.max(0,Ya(Ya(e.time)-Ya(n.lastTime)))}function Yd(n,e){return n?.lastFrame==null?null:n.lastResolvedFrame===e.frame_number?0:Math.max(0,e.frame_number-n.lastFrame)}function qg(n,e,t,i){n.count=e?.count??0,n.high_confidence_count=e?.highConfidenceCount??0,n.is_last_speed_flip=i,n.last_speed_flip_time=e?.lastTime??null,n.last_speed_flip_frame=e?.lastFrame??null,n.time_since_last_speed_flip=qd(e,t),n.frames_since_last_speed_flip=Yd(e,t),n.last_quality=e?.lastQuality??null,n.best_quality=e?.bestQuality??0,n.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?n.labeled_event_counts=us(e.labeledCounts):delete n.labeled_event_counts}function Yg(n,e,t,i){n.count=e?.count??0,n.high_confidence_count=e?.highConfidenceCount??0,n.is_last_half_flip=i,n.last_half_flip_time=e?.lastTime??null,n.last_half_flip_frame=e?.lastFrame??null,n.time_since_last_half_flip=qd(e,t),n.frames_since_last_half_flip=Yd(e,t),n.last_quality=e?.lastQuality??null,n.best_quality=e?.bestQuality??0,n.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?n.labeled_event_counts=us(e.labeledCounts):delete n.labeled_event_counts}function jg(n,e,t,i){n.count=e?.count??0,n.high_confidence_count=e?.highConfidenceCount??0,n.is_last_wavedash=i,n.last_wavedash_time=e?.lastTime??null,n.last_wavedash_frame=e?.lastFrame??null,n.time_since_last_wavedash=qd(e,t),n.frames_since_last_wavedash=Yd(e,t),n.last_quality=e?.lastQuality??null,n.best_quality=e?.bestQuality??0,n.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?n.labeled_event_counts=us(e.labeledCounts):delete n.labeled_event_counts}function ZA(n){const e={...n};return n.labeled_event_counts?e.labeled_event_counts=us(n.labeled_event_counts):delete e.labeled_event_counts,e}function JA(n){const e={...n};return n.labeled_event_counts?e.labeled_event_counts=us(n.labeled_event_counts):delete e.labeled_event_counts,e}function QA(n){const e={...n};return n.labeled_event_counts?e.labeled_event_counts=us(n.labeled_event_counts):delete e.labeled_event_counts,e}function eR(n,e){if(e){Object.assign(n,e);return}qg(n,void 0,{frame_number:0,time:0},!1)}function tR(n,e){if(e){Object.assign(n,e);return}Yg(n,void 0,{frame_number:0,time:0},!1)}function nR(n,e){if(e){Object.assign(n,e);return}jg(n,void 0,{frame_number:0,time:0},!1)}function iR(n){return n.is_live_play||n.ball_has_been_hit===!1}function aR(n){const e=Zg(n);for(const t of n.frames)e.applyFrame(t);return n}function Zg(n){const e=KA(n.events.speed_flip??[]),t=_p(n.events.half_flip??[]),i=_p(n.events.wavedash??[]);let a=0,s=0,r=0,o=null,l=null,c=null;const u=new Map,d=new Map,f=new Map,h=new Map,_=new Map,g=new Map;return{applyFrame(m){if(iR(m)){for(;a<e.length&&e[a].resolved_frame<=m.frame_number;){const p=e[a],y=Cn(p.player),x=u.get(y)??_c();u.set(y,x),gc(x,p,p.resolved_frame,p.resolved_time,$A),o=y,a+=1}for(const p of m.players){const y=Cn(p.player_id);qg(p.speed_flip,u.get(y),m,y===o),h.set(y,ZA(p.speed_flip))}}else for(const p of m.players){const y=Cn(p.player_id);eR(p.speed_flip,h.get(y))}if(m.is_live_play){for(;s<t.length&&t[s].frame<=m.frame_number;){const p=t[s],y=Cn(p.player),x=d.get(y)??_c();d.set(y,x),gc(x,p,p.frame,p.time,WA),l=y,s+=1}for(;r<i.length&&i[r].frame<=m.frame_number;){const p=i[r],y=Cn(p.player),x=f.get(y)??_c();f.set(y,x),gc(x,p,p.frame,p.time,XA),c=y,r+=1}for(const p of m.players){const y=Cn(p.player_id);Yg(p.half_flip,d.get(y),m,y===l),_.set(y,JA(p.half_flip)),jg(p.wavedash,f.get(y),m,y===c),g.set(y,QA(p.wavedash))}}else{for(const p of m.players){const y=Cn(p.player_id);tR(p.half_flip,_.get(y)),nR(p.wavedash,g.get(y))}l=null,c=null}}}}const sR=["boost","slow","supersonic"],rR=["ground","high_air","low_air"];function Ri(n){return Math.fround(n)}function Un(n,e){return Ri(Ri(n)+Ri(e))}function oR(n,e){return Ri(Ri(n)*Ri(e))}function gp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function lR(){return{entries:rR.flatMap(n=>sR.map(e=>({labels:[{key:"height_band",value:n},{key:"speed_band",value:e}],value:0}))).sort((n,e)=>JSON.stringify(n.labels).localeCompare(JSON.stringify(e.labels)))}}function Eo(n=!1){return{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:n?lR():{entries:[]}}}function cR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function uR(n){return n.sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function dR(n,e,t){const i=uR(e),a=n.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=Un(a.value,t):(n.entries.push({labels:i,value:Ri(t)}),n.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function fR(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),value:e.value}))}}function vp(n,e){const t=Ri(e.dt);n.tracked_time=Un(n.tracked_time,t),n.total_distance=Un(n.total_distance,e.distance),n.speed_integral=Un(n.speed_integral,oR(e.speed,t)),e.speed_band==="slow"?n.time_slow_speed=Un(n.time_slow_speed,t):e.speed_band==="boost"?n.time_boost_speed=Un(n.time_boost_speed,t):e.speed_band==="supersonic"&&(n.time_supersonic_speed=Un(n.time_supersonic_speed,t)),e.height_band==="ground"?n.time_on_ground=Un(n.time_on_ground,t):e.height_band==="low_air"?n.time_low_air=Un(n.time_low_air,t):e.height_band==="high_air"&&(n.time_high_air=Un(n.time_high_air,t));const i=n.labeled_tracked_time??{entries:[]};n.labeled_tracked_time=i,dR(i,[{key:"speed_band",value:e.speed_band},{key:"height_band",value:e.height_band}],t)}function vc(n,e){const t=e??Eo(!0),i=t.labeled_tracked_time;Object.assign(n,t,{labeled_tracked_time:i?fR(i):void 0}),i?.entries.length||delete n.labeled_tracked_time}function hR(n){const e=Jg(n);for(const t of n.frames)e.applyFrame(t);return n}function Jg(n){const e=cR(n.events.movement??[]);let t=0;const i=new Map,a=Eo(),s=Eo();return{applyFrame(r){for(;t<e.length&&e[t].frame<=r.frame_number;){const o=e[t],l=gp(o.player),c=i.get(l)??Eo(!0);i.set(l,c),vp(c,o),vp(o.is_team_0?a:s,o),t+=1}vc(r.team_zero.movement,a),vc(r.team_one.movement,s);for(const o of r.players)vc(o.movement,i.get(gp(o.player_id)))}}}const pR=.8;function ja(n){return Math.fround(n)}function mR(n,e){return ja(ja(n)+ja(e))}function Qg(n,e){return ja(ja(n)-ja(e))}function yp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function ev(){return{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function _R(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.index-t.index}).map(({event:e})=>e)}function Ku(n){return`${n.key}\0${n.value}`}function eo(n){return n.map(Ku).join("")}function gR(n,e){e.sort((a,s)=>Ku(a).localeCompare(Ku(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>eo(a.labels)===eo(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>eo(a.labels).localeCompare(eo(s.labels))))}function bp(n,e,t){return n.labeled_event_counts?.entries.filter(i=>i.labels.some(a=>a.key===e&&a.value===t)).reduce((i,a)=>i+a.count,0)??0}function vR(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function yR(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function bR(n,e,t,i){n.is_last_musty=i,n.time_since_last_musty=n.last_musty_time==null?null:Math.max(0,Qg(t,n.last_musty_time)),n.frames_since_last_musty=n.last_musty_frame==null?null:Math.max(0,e-n.last_musty_frame)}function SR(n,e,t,i){gR(n,[{key:"vertical_state",value:e.aerial?"aerial":"grounded"},{key:"confidence_band",value:e.confidence>=pR?"high":"standard"}]),n.count=vR(n),n.aerial_count=bp(n,"vertical_state","aerial"),n.high_confidence_count=bp(n,"confidence_band","high"),n.is_last_musty=!0,n.last_musty_time=e.time,n.last_musty_frame=e.frame,n.time_since_last_musty=Math.max(0,Qg(i,e.time)),n.frames_since_last_musty=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=mR(n.cumulative_confidence,e.confidence)}function xR(n,e){Object.assign(n,e??ev()),e?.labeled_event_counts?n.labeled_event_counts=yR(e.labeled_event_counts):delete n.labeled_event_counts}function wR(n){const e=tv(n);for(const t of n.frames)e.applyFrame(t);return n}function tv(n){const e=_R(n.events.musty_flick??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[o,l]of a)bR(l,s.frame_number,s.time,i===o);let r=!1;for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=s.frame_number;){const o=e[t],l=yp(o.player),c=a.get(l)??ev();a.set(l,c),SR(c,o,s.frame_number,s.time),i=l,t+=1,r=!0}if(r)for(const o of a.values())o.is_last_musty=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_musty=!0)}}else i=null;for(const r of s.players)xR(r.musty_flick,a.get(yp(r.player_id)))}}}function Sp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function nv(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null}}function ER(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function MR(n,e,t,i){n.is_last_one_timer=i,n.time_since_last_one_timer=n.last_one_timer_time==null?null:Math.max(0,t-n.last_one_timer_time),n.frames_since_last_one_timer=n.last_one_timer_frame==null?null:Math.max(0,e-n.last_one_timer_frame)}function TR(n,e,t,i){n.count+=1,n.total_ball_speed+=e.ball_speed,n.fastest_ball_speed=Math.max(n.fastest_ball_speed,e.ball_speed),n.total_pass_distance+=e.pass_travel_distance,n.last_one_timer_time=e.time,n.last_one_timer_frame=e.frame,n.time_since_last_one_timer=Math.max(0,i-e.time),n.frames_since_last_one_timer=Math.max(0,t-e.frame)}function CR(n,e){Object.assign(n,e??nv())}function xp(n,e){Object.assign(n,e)}function AR(n){const e=iv(n);for(const t of n.frames)e.applyFrame(t);return n}function iv(n){const e=ER(n.events.one_timer??[]);let t=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)MR(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=Sp(c.player),d=a.get(u)??nv();a.set(u,d),TR(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed+=c.ball_speed,f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,t+=1}if(l)for(const c of a.values())c.is_last_one_timer=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_one_timer=!0)}}xp(o.team_zero.one_timer,s),xp(o.team_one.one_timer,r);for(const l of o.players)CR(l.one_timer,a.get(Sp(l.player_id)))}}}function to(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function qu(){return{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null}}function RR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.index-t.index}).map(({event:e})=>e)}function PR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function LR(n,e,t,i){n.is_last_completed_pass=i,n.time_since_last_completed_pass=n.last_completed_pass_time==null?null:Math.max(0,t-n.last_completed_pass_time),n.frames_since_last_completed_pass=n.last_completed_pass_frame==null?null:Math.max(0,e-n.last_completed_pass_frame)}function IR(n,e,t,i){n.completed_pass_count+=1,n.total_pass_distance+=e.ball_travel_distance,n.total_pass_advance+=e.ball_advance_distance,n.longest_pass_distance=Math.max(n.longest_pass_distance,e.ball_travel_distance),n.last_completed_pass_time=e.time,n.last_completed_pass_frame=e.frame,n.time_since_last_completed_pass=Math.max(0,i-e.time),n.frames_since_last_completed_pass=Math.max(0,t-e.frame)}function NR(n,e){Object.assign(n,e??qu())}function wp(n,e){Object.assign(n,e)}function kR(n){const e=av(n);for(const t of n.frames)e.applyFrame(t);return n}function av(n){const e=RR(n.events.pass??[]),t=PR(n.events.pass_last_completed??[]),i=t.length>0;let a=0,s=0,r=null;const o=new Map,l={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},c={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0};return{applyFrame(u){for(const[f,h]of o)LR(h,u.frame_number,u.time,u.is_live_play&&f===r);if(!u.is_live_play)r=null;else{let f=!1;for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=u.frame_number;){const h=e[a],_=to(h.passer),g=o.get(_)??qu();o.set(_,g),IR(g,h,u.frame_number,u.time);const m=to(h.receiver),p=o.get(m)??qu();o.set(m,p),p.received_pass_count+=1;const y=h.is_team_0?l:c;y.completed_pass_count+=1,y.total_pass_distance+=h.ball_travel_distance,y.total_pass_advance+=h.ball_advance_distance,y.longest_pass_distance=Math.max(y.longest_pass_distance,h.ball_travel_distance),r=_,f=!0,a+=1}if(!i&&f)for(const h of o.values())h.is_last_completed_pass=!1;if(!i&&r!=null){const h=o.get(r);h&&(h.is_last_completed_pass=!0)}}let d=!1;for(;s<t.length&&t[s].frame<=u.frame_number;){const f=t[s];r=f.player==null?null:to(f.player),s+=1,d=!0}if(d){for(const f of o.values())f.is_last_completed_pass=!1;if(r!=null){const f=o.get(r);f&&(f.is_last_completed_pass=!0)}}wp(u.team_zero.pass,l),wp(u.team_one.pass,c);for(const f of u.players)NR(f.pass,o.get(to(f.player_id)))}}}function Os(n){return Math.fround(n)}function Ts(n,e){return Os(Os(n)+Os(e))}function DR(){return{tracked_time:0,team_zero_time:0,team_one_time:0,neutral_time:0,labeled_time:{entries:[]}}}function FR(){return{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}}}function OR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function UR(n){return n.sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function sv(n,e,t){const i=UR(e),a=n.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=Ts(a.value,t):(n.entries.push({labels:i,value:Os(t)}),n.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function BR(n,e){return n.key==="possession_state"&&n.value==="team_zero"?{key:"possession_state",value:e?"own":"opponent"}:n.key==="possession_state"&&n.value==="team_one"?{key:"possession_state",value:e?"opponent":"own"}:n.key==="field_third"&&n.value==="team_zero_third"?{key:"field_third",value:e?"defensive_third":"offensive_third"}:n.key==="field_third"&&n.value==="team_one_third"?{key:"field_third",value:e?"offensive_third":"defensive_third"}:{...n}}function Ep(n,e){const t={entries:[]};for(const i of n.labeled_time.entries)sv(t,i.labels.map(a=>BR(a,e)),i.value);return{tracked_time:n.tracked_time,possession_time:e?n.team_zero_time:n.team_one_time,opponent_possession_time:e?n.team_one_time:n.team_zero_time,neutral_time:n.neutral_time,labeled_time:t}}function zR(n,e){n.active=e.active,n.possessionState=e.possession_state,n.fieldThird=e.field_third??null}function HR(n,e,t){if(!e.active)return;const i=Os(t.dt);n.tracked_time=Ts(n.tracked_time,i),e.possessionState==="team_zero"?n.team_zero_time=Ts(n.team_zero_time,i):e.possessionState==="team_one"?n.team_one_time=Ts(n.team_one_time,i):n.neutral_time=Ts(n.neutral_time,i);const a=[{key:"possession_state",value:e.possessionState}];e.fieldThird!=null&&a.push({key:"field_third",value:e.fieldThird}),sv(n.labeled_time,a,i)}function Mp(n,e){Object.assign(n,e??FR())}function VR(n){const e=rv(n);for(const t of n.frames)e.applyFrame(t);return n}function rv(n){const e=OR(n.events.possession??[]);let t=0;const i=DR(),a={active:!1,possessionState:"neutral",fieldThird:null};return{applyFrame(s){for(;t<e.length&&e[t].frame<=s.frame_number;)zR(a,e[t]),t+=1;HR(i,a,s),Mp(s.team_zero.possession,Ep(i,!0)),Mp(s.team_one.possession,Ep(i,!1))}}}function _t(n,e){return Math.fround(Math.fround(n)+Math.fround(e))}function Tp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function ov(){return{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0}}function GR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function $R(n,e){if(e.active&&(n.active_game_time=_t(n.active_game_time,e.duration)),e.tracked){if(n.tracked_time=_t(n.tracked_time,e.duration),e.distance_to_teammates!=null&&(n.sum_distance_to_teammates=_t(n.sum_distance_to_teammates,e.distance_to_teammates*e.duration)),e.distance_to_ball!=null){const t=e.distance_to_ball*e.duration;n.sum_distance_to_ball=_t(n.sum_distance_to_ball,t),e.possession_state==="has_possession"?n.sum_distance_to_ball_has_possession=_t(n.sum_distance_to_ball_has_possession,t):e.possession_state==="no_possession"&&(n.sum_distance_to_ball_no_possession=_t(n.sum_distance_to_ball_no_possession,t))}switch(e.possession_state==="has_possession"?n.time_has_possession=_t(n.time_has_possession,e.duration):e.possession_state==="no_possession"&&(n.time_no_possession=_t(n.time_no_possession,e.duration)),e.teammate_role){case"no_teammates":n.time_no_teammates=_t(n.time_no_teammates,e.duration);break;case"most_back":n.time_most_back=_t(n.time_most_back,e.duration);break;case"most_forward":n.time_most_forward=_t(n.time_most_forward,e.duration);break;case"mid":n.time_mid_role=_t(n.time_mid_role,e.duration);break;case"other":n.time_other_role=_t(n.time_other_role,e.duration);break}n.time_defensive_third=_t(n.time_defensive_third,e.duration*e.defensive_zone_fraction),n.time_neutral_third=_t(n.time_neutral_third,e.duration*e.neutral_zone_fraction),n.time_offensive_third=_t(n.time_offensive_third,e.duration*e.offensive_zone_fraction),n.time_defensive_half=_t(n.time_defensive_half,e.duration*e.defensive_half_fraction),n.time_offensive_half=_t(n.time_offensive_half,e.duration*e.offensive_half_fraction),e.closest_to_ball&&(n.time_closest_to_ball=_t(n.time_closest_to_ball,e.duration)),e.farthest_from_ball&&(n.time_farthest_from_ball=_t(n.time_farthest_from_ball,e.duration)),n.time_behind_ball=_t(n.time_behind_ball,e.duration*e.behind_ball_fraction),n.time_level_with_ball=_t(n.time_level_with_ball,e.duration*e.level_with_ball_fraction),n.time_in_front_of_ball=_t(n.time_in_front_of_ball,e.duration*e.in_front_of_ball_fraction)}e.demolished&&(n.time_demolished=_t(n.time_demolished,e.duration)),e.caught_ahead_of_play_on_conceded_goal&&(n.times_caught_ahead_of_play_on_conceded_goals+=1)}function WR(n,e){Object.assign(n,e??ov())}function XR(n){const e=lv(n);for(const t of n.frames)e.applyFrame(t);return n}function lv(n){const e=GR(n.events.positioning??[]);let t=0;const i=new Map;return{applyFrame(a){for(;t<e.length&&e[t].frame<=a.frame_number;){const s=e[t],r=Tp(s.player),o=i.get(r)??ov();i.set(r,o),$R(o,s),t+=1}for(const s of a.players)WR(s.positioning,i.get(Tp(s.player_id)))}}}function yc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Cs(){return{total_duration:0,press_count:0}}function KR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function qR(n){return n.gameplay_phase==="active_play"||n.gameplay_phase==="kickoff_waiting_for_touch"}function bc(n,e){Object.assign(n,e??Cs())}function YR(n){const e=cv(n);for(const t of n.frames)e.applyFrame(t);return n}function cv(n){const e=KR(n.events.powerslide??[]);let t=0;const i=new Map,a=new Map,s=Cs(),r=Cs();return{applyFrame(o){const l=qR(o);for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=yc(c.player),d=i.get(u)?.active??!1;if(i.set(u,{active:c.active,isTeamZero:c.is_team_0}),l&&c.active&&!d){const f=a.get(u)??Cs();a.set(u,f),f.press_count+=1;const h=c.is_team_0?s:r;h.press_count+=1}t+=1}if(l)for(const c of o.players){const u=yc(c.player_id);if(!i.get(u)?.active)continue;const f=a.get(u)??Cs();a.set(u,f),f.total_duration+=o.dt;const h=c.is_team_0?s:r;h.total_duration+=o.dt}bc(o.team_zero.powerslide,s),bc(o.team_one.powerslide,r);for(const c of o.players)bc(c.powerslide,a.get(yc(c.player_id)))}}}function Us(n){return Math.fround(n)}function As(n,e){return Us(Us(n)+Us(e))}function jR(){return{tracked_time:0,team_zero_side_time:0,team_one_side_time:0,neutral_time:0,labeled_time:{entries:[]}}}function ZR(){return{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}}}function JR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function QR(n){return n.sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function uv(n,e,t){const i=QR(e),a=n.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=As(a.value,t):(n.entries.push({labels:i,value:Us(t)}),n.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function eP(n,e){return n.key==="field_half"&&n.value==="team_zero_side"?{key:"field_half",value:e?"defensive_half":"offensive_half"}:n.key==="field_half"&&n.value==="team_one_side"?{key:"field_half",value:e?"offensive_half":"defensive_half"}:{...n}}function Cp(n,e){const t={entries:[]};for(const i of n.labeled_time.entries)uv(t,i.labels.map(a=>eP(a,e)),i.value);return{tracked_time:n.tracked_time,defensive_half_time:e?n.team_zero_side_time:n.team_one_side_time,offensive_half_time:e?n.team_one_side_time:n.team_zero_side_time,neutral_time:n.neutral_time,labeled_time:t}}function tP(n,e){n.active=e.active,n.fieldHalf=e.field_half}function nP(n,e,t){if(!e.active)return;const i=Us(t.dt);n.tracked_time=As(n.tracked_time,i),e.fieldHalf==="team_zero_side"?n.team_zero_side_time=As(n.team_zero_side_time,i):e.fieldHalf==="team_one_side"?n.team_one_side_time=As(n.team_one_side_time,i):n.neutral_time=As(n.neutral_time,i),uv(n.labeled_time,[{key:"field_half",value:e.fieldHalf}],i)}function Ap(n,e){Object.assign(n,e??ZR())}function iP(n){const e=dv(n);for(const t of n.frames)e.applyFrame(t);return n}function dv(n){const e=JR(n.events.pressure??[]);let t=0;const i=jR(),a={active:!1,fieldHalf:"neutral"};return{applyFrame(s){for(;t<e.length&&e[t].frame<=s.frame_number;)tP(a,e[t]),t+=1;nP(i,a,s),Ap(s.team_zero.pressure,Cp(i,!0)),Ap(s.team_one.pressure,Cp(i,!1))}}}function Mo(n){return Math.fround(n)}function no(n,e){return Mo(Mo(n)+Mo(e))}function Rp(){return{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0}}function aP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.end_frame!==t.event.end_frame?e.event.end_frame-t.event.end_frame:e.event.end_time!==t.event.end_time?e.event.end_time-t.event.end_time:e.index-t.index).map(({event:e})=>e)}function sP(n,e,t){n.session_count+=1,n.session_time=no(n.session_time,t.duration),n.offensive_half_time=no(n.offensive_half_time,t.offensive_half_time),n.offensive_third_time=no(n.offensive_third_time,t.offensive_third_time),n.longest_session_time=Math.max(n.longest_session_time,t.duration),n.average_session_time=n.session_count===0?0:Mo(n.session_time/n.session_count),e.opponent_session_count+=1,e.opponent_session_time=no(e.opponent_session_time,t.duration),e.opponent_longest_session_time=Math.max(e.opponent_longest_session_time,t.duration)}function Pp(n,e){Object.assign(n,e)}function rP(n){const e=fv(n);for(const t of n.frames)e.applyFrame(t);return n}function fv(n){const e=aP(n.events.territorial_pressure??[]);let t=0;const i=Rp(),a=Rp();return{applyFrame(s){for(;t<e.length&&s.frame_number>=e[t].end_frame;){const r=e[t];sP(r.team_is_team_0?i:a,r.team_is_team_0?a:i,r),t+=1}Pp(s.team_zero.territorial_pressure,i),Pp(s.team_one.territorial_pressure,a)}}}function En(n,e){return Math.fround(Math.fround(n)+Math.fround(e))}function hv(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function pv(){return{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"}}function Lp(){return{first_man_changes_for_team:0,rotation_count:0}}function Ip(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function oP(n,e){n.active=e.active,e.active||(n.firstManStintActive=!1,n.currentFirstManStintTime=0,n.nonFirstManSeconds=0);const t=n.stats;t.current_role_state=e.current_role_state,t.current_depth_state=e.current_depth_state}function lP(n,e,t){if(!n.active)return;const i=n.stats;switch(i.active_game_time=En(i.active_game_time,e.dt),i.tracked_time=En(i.tracked_time,e.dt),i.current_role_state){case"first_man":n.firstManStintActive||(n.firstManStintActive=!0,n.currentFirstManStintTime=0,i.first_man_stint_count+=1),n.currentFirstManStintTime=En(n.currentFirstManStintTime,e.dt),i.longest_first_man_stint_time=Math.max(i.longest_first_man_stint_time,n.currentFirstManStintTime),n.nonFirstManSeconds=0,i.time_first_man=En(i.time_first_man,e.dt);break;case"second_man":io(n,e,t),i.time_second_man=En(i.time_second_man,e.dt);break;case"third_man":io(n,e,t),i.time_third_man=En(i.time_third_man,e.dt);break;case"ambiguous":io(n,e,t),i.time_ambiguous_role=En(i.time_ambiguous_role,e.dt);break;default:io(n,e,t);break}switch(i.current_depth_state){case"behind_play":i.time_behind_play=En(i.time_behind_play,e.dt);break;case"level_with_play":i.time_level_with_play=En(i.time_level_with_play,e.dt);break;case"ahead_of_play":i.time_ahead_of_play=En(i.time_ahead_of_play,e.dt);break}}function io(n,e,t){n.firstManStintActive&&(n.nonFirstManSeconds=En(n.nonFirstManSeconds,e.dt),n.nonFirstManSeconds>t&&(n.firstManStintActive=!1,n.currentFirstManStintTime=0,n.nonFirstManSeconds=0))}function Yu(n,e){const t=hv(e),i=n.get(t)??{active:!1,firstManStintActive:!1,currentFirstManStintTime:0,nonFirstManSeconds:0,stats:pv()};return n.set(t,i),i}function cP(n,e,t){n.first_man_changes_for_team+=1,n.rotation_count+=1,Yu(e,t.previous_first_man).stats.lost_first_man_count+=1,Yu(e,t.next_first_man).stats.became_first_man_count+=1}function uP(n,e){Object.assign(n,e??pv())}function Np(n,e){Object.assign(n,e)}function dP(n){const e=mv(n);for(const t of n.frames)e.applyFrame(t);return n}function mv(n){const e=Ip(n.events.rotation_player??[]),t=Ip(n.events.rotation_team??[]),i=n.config.rotation_first_man_debounce_seconds;let a=0,s=0;const r=new Map,o=Lp(),l=Lp();return{applyFrame(c){for(;a<e.length&&e[a].frame<=c.frame_number;){const u=e[a],d=Yu(r,u.player);oP(d,u),a+=1}for(;s<t.length&&t[s].frame<=c.frame_number;){const u=t[s];cP(u.is_team_0?o:l,r,u),s+=1}Np(c.team_zero.rotation,o),Np(c.team_one.rotation,l);for(const u of c.players){const d=r.get(hv(u.player_id));d&&lP(d,c,i),uP(u.rotation,d?.stats)}}}}function kp(){return{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0}}function fP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.start_frame!==t.event.start_frame?e.event.start_frame-t.event.start_frame:e.event.start_time!==t.event.start_time?e.event.start_time-t.event.start_time:e.event.end_frame!==t.event.end_frame?e.event.end_frame-t.event.end_frame:e.index-t.index).map(({event:e})=>e)}function hP(n,e){n.count+=1,e.attackers===2&&e.defenders===1?n.two_v_one_count+=1:e.attackers===2&&e.defenders===2?n.two_v_two_count+=1:e.attackers===2&&e.defenders===3?n.two_v_three_count+=1:e.attackers===3&&e.defenders===1?n.three_v_one_count+=1:e.attackers===3&&e.defenders===2?n.three_v_two_count+=1:e.attackers===3&&e.defenders===3&&(n.three_v_three_count+=1)}function Dp(n,e){Object.assign(n,e)}function pP(n){const e=_v(n);for(const t of n.frames)e.applyFrame(t);return n}function _v(n){const e=fP(n.events.rush??[]);let t=0;const i=kp(),a=kp(),s=n.config.rush_min_possession_retained_seconds;return{applyFrame(r){for(;t<e.length&&r.frame_number>=e[t].start_frame&&r.time-e[t].start_time>=s;){const o=e[t];hP(o.is_team_0?i:a,o),t+=1}Dp(r.team_zero.rush,i),Dp(r.team_one.rush,a)}}}const mP=["control","hard_hit","medium_hit"],_P=["ground","high_air","low_air"],gP=["air","ground","wall"],vP=["dodge","no_dodge"];function Za(n){return Math.fround(n)}function To(n,e){return Za(Za(n)+Za(e))}function gv(n,e){return Za(Za(n)-Za(e))}function ao(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function yP(){return{entries:vP.flatMap(n=>_P.flatMap(e=>mP.flatMap(t=>gP.map(i=>({labels:[{key:"dodge_state",value:n},{key:"height_band",value:e},{key:"kind",value:t},{key:"surface",value:i}],count:0}))))).sort((n,e)=>JSON.stringify(n.labels).localeCompare(JSON.stringify(e.labels)))}}function vv(){return{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:yP()}}const bP=vv();function Fp(){return{stats:vv(),labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function Op(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function SP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function xP(n,e){e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key));const t=n.labeled_touch_counts?.entries??[];n.labeled_touch_counts={entries:t};const i=t.find(a=>a.labels.length===e.length&&a.labels.every((s,r)=>s.key===e[r]?.key&&s.value===e[r]?.value));i?i.count+=1:(t.push({labels:e,count:1}),t.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels))))}function wP(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function EP(n,e,t){const i=n.stats;i.touch_count+=1,e.kind==="control"?i.control_touch_count+=1:e.kind==="medium_hit"?i.medium_hit_count+=1:e.kind==="hard_hit"&&(i.hard_hit_count+=1),e.height_band==="low_air"?i.aerial_touch_count+=1:e.height_band==="high_air"&&(i.aerial_touch_count+=1,i.high_aerial_touch_count+=1),e.surface==="wall"&&(i.wall_touch_count+=1),xP(i,[{key:"kind",value:e.kind},{key:"height_band",value:e.height_band},{key:"surface",value:e.surface},{key:"dodge_state",value:e.dodge_state}]),n.labeledCountsVersion+=1,i.last_touch_time=e.time,i.last_touch_frame=e.frame,i.time_since_last_touch=Math.max(0,gv(t.time,e.time)),i.frames_since_last_touch=Math.max(0,t.frame_number-e.frame),i.last_ball_speed_change=e.ball_speed_change,i.max_ball_speed_change=Math.max(i.max_ball_speed_change,e.ball_speed_change),i.cumulative_ball_speed_change=To(i.cumulative_ball_speed_change,e.ball_speed_change)}function MP(n){return n.labeledCountsSnapshotVersion!==n.labeledCountsVersion&&(n.labeledCountsSnapshot=n.stats.labeled_touch_counts?wP(n.stats.labeled_touch_counts):void 0,n.labeledCountsSnapshotVersion=n.labeledCountsVersion),n.labeledCountsSnapshot}function TP(n,e){if(!e){Object.assign(n,bP);return}Object.assign(n,e.stats,{labeled_touch_counts:MP(e)})}function CP(n){const e=yv(n);for(const t of n.frames)e.applyFrame(t);return n}function yv(n){const e=Op(n.events.touch??[]),t=Op(n.events.touch_last_touch??[]),i=SP(n.events.touch_ball_movement??[]);let a=0,s=0,r=0,o=null;const l=new Map;return{applyFrame(c){if(!c.is_live_play)o=null;else{for(const u of l.values()){const d=u.stats;d.is_last_touch=!1,d.last_touch_time!=null&&(d.time_since_last_touch=Math.max(0,gv(c.time,d.last_touch_time))),d.last_touch_frame!=null&&(d.frames_since_last_touch=Math.max(0,c.frame_number-d.last_touch_frame))}for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=c.frame_number;){const u=e[a],d=ao(u.player),f=l.get(d)??Fp();l.set(d,f),EP(f,u,c),a+=1}for(;s<t.length&&(t[s].sample_frame??t[s].frame)<=c.frame_number;){const u=t[s];o=u.player==null?null:ao(u.player),s+=1}if(o!=null){const u=l.get(o);u&&(u.stats.is_last_touch=!0)}}for(;r<i.length&&i[r].frame<=c.frame_number;){const u=i[r],d=ao(u.player),f=l.get(d)??Fp();l.set(d,f);const h=f.stats;h.total_ball_travel_distance=To(h.total_ball_travel_distance,u.travel_distance),h.total_ball_advance_distance=To(h.total_ball_advance_distance,u.advance_distance),h.total_ball_retreat_distance=To(h.total_ball_retreat_distance,u.retreat_distance),r+=1}for(const u of c.players)TP(u.touch,l.get(ao(u.player_id)))}}}function Sc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function ju(){return{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0}}function AP(n){return{...n}}function RP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.resolved_frame!==t.event.resolved_frame?e.event.resolved_frame-t.event.resolved_frame:e.event.resolved_time!==t.event.resolved_time?e.event.resolved_time-t.event.resolved_time:e.index-t.index).map(({event:e})=>e)}function PP(n,e,t){n.is_last_whiff=!1,n.time_since_last_whiff=n.last_whiff_time==null?null:Math.max(0,t-n.last_whiff_time),n.frames_since_last_whiff=n.last_whiff_frame==null?null:Math.max(0,e-n.last_whiff_frame)}function LP(n,e,t,i){if((e.kind??"whiff")==="beaten_to_ball"){n.beaten_to_ball_count+=1;return}n.whiff_count+=1,e.aerial?n.aerial_whiff_count+=1:n.grounded_whiff_count+=1,e.dodge_active&&(n.dodge_whiff_count+=1),n.is_last_whiff=!0,n.last_whiff_time=e.time,n.last_whiff_frame=e.frame,n.time_since_last_whiff=Math.max(0,i-e.time),n.frames_since_last_whiff=Math.max(0,t-e.frame),n.last_closest_approach_distance=e.closest_approach_distance,n.best_closest_approach_distance=n.best_closest_approach_distance==null?e.closest_approach_distance:Math.min(n.best_closest_approach_distance,e.closest_approach_distance),n.cumulative_closest_approach_distance+=e.closest_approach_distance}function Up(n,e){Object.assign(n,e??ju())}function IP(n){const e=bv(n);for(const t of n.frames)e.applyFrame(t);return n}function bv(n){const e=RP(n.events.whiff??[]);let t=0,i=null;const a=new Map,s=new Map;return{applyFrame(r){if(r.is_live_play){for(const o of a.values())PP(o,r.frame_number,r.time);for(;t<e.length&&e[t].resolved_frame<=r.frame_number;){const o=e[t],l=Sc(o.player),c=a.get(l)??ju();a.set(l,c),LP(c,o,r.frame_number,r.time),(o.kind??"whiff")==="whiff"&&(i=l),t+=1}if(i!=null){const o=a.get(i);o&&(o.is_last_whiff=!0)}for(const o of r.players){const l=Sc(o.player_id),c=a.get(l);Up(o.whiff,c),s.set(l,AP(c??ju()))}}else{for(const o of r.players){const l=Sc(o.player_id);Up(o.whiff,s.get(l))}i=null}}}}const NP=.78;function Ja(n){return Math.fround(n)}function so(n,e){return Ja(Ja(n)+Ja(e))}function Sv(n,e){return Ja(Ja(n)-Ja(e))}function Bp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function xv(){return{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0}}function kP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function DP(n,e,t,i){n.is_last_wall_aerial=i,n.time_since_last_wall_aerial=n.last_wall_aerial_time==null?null:Math.max(0,Sv(t,n.last_wall_aerial_time)),n.frames_since_last_wall_aerial=n.last_wall_aerial_frame==null?null:Math.max(0,e-n.last_wall_aerial_frame)}function FP(n,e,t,i){n.count+=1,e.confidence>=NP&&(n.high_confidence_count+=1),n.is_last_wall_aerial=!0,n.last_wall_aerial_time=e.time,n.last_wall_aerial_frame=e.frame,n.time_since_last_wall_aerial=Math.max(0,Sv(i,e.time)),n.frames_since_last_wall_aerial=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=so(n.cumulative_confidence,e.confidence),n.cumulative_setup_duration=so(n.cumulative_setup_duration,e.setup_duration),n.cumulative_takeoff_to_touch_time=so(n.cumulative_takeoff_to_touch_time,e.time_since_takeoff),n.cumulative_touch_height=so(n.cumulative_touch_height,e.player_position[2]??0)}function OP(n,e){Object.assign(n,e??xv())}function UP(n){const e=wv(n);for(const t of n.frames)e.applyFrame(t);return n}function wv(n){const e=kP(n.events.wall_aerial??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)DP(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=s.frame_number;){const r=e[t],o=Bp(r.player),l=a.get(o)??xv();a.set(o,l),FP(l,r,s.frame_number,s.time),i=o,t+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_wall_aerial=!0)}}for(const r of s.players)OP(r.wall_aerial,a.get(Bp(r.player_id)))}}}const BP=.78;function Qa(n){return Math.fround(n)}function xc(n,e){return Qa(Qa(n)+Qa(e))}function Ev(n,e){return Qa(Qa(n)-Qa(e))}function zp(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Mv(){return{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0}}function zP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function HP(n,e,t,i){n.is_last_wall_aerial_shot=i,n.time_since_last_wall_aerial_shot=n.last_wall_aerial_shot_time==null?null:Math.max(0,Ev(t,n.last_wall_aerial_shot_time)),n.frames_since_last_wall_aerial_shot=n.last_wall_aerial_shot_frame==null?null:Math.max(0,e-n.last_wall_aerial_shot_frame)}function VP(n,e,t,i){n.count+=1,e.confidence>=BP&&(n.high_confidence_count+=1),n.is_last_wall_aerial_shot=!0,n.last_wall_aerial_shot_time=e.time,n.last_wall_aerial_shot_frame=e.frame,n.time_since_last_wall_aerial_shot=Math.max(0,Ev(i,e.time)),n.frames_since_last_wall_aerial_shot=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=xc(n.cumulative_confidence,e.confidence),n.cumulative_takeoff_to_shot_time=xc(n.cumulative_takeoff_to_shot_time,e.time_since_takeoff),n.cumulative_shot_height=xc(n.cumulative_shot_height,e.player_position[2]??0)}function GP(n,e){Object.assign(n,e??Mv())}function $P(n){const e=Tv(n);for(const t of n.frames)e.applyFrame(t);return n}function Tv(n){const e=zP(n.events.wall_aerial_shot??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)HP(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{let r=!1;for(;t<e.length&&e[t].frame<=s.frame_number;){const o=e[t],l=zp(o.player),c=a.get(l)??Mv();a.set(l,c),VP(c,o,s.frame_number,s.time),i=l,r=!0,t+=1}if(r)for(const o of a.values())o.is_last_wall_aerial_shot=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_wall_aerial_shot=!0)}}for(const r of s.players)GP(r.wall_aerial_shot,a.get(zp(r.player_id)))}}}function jd(n,e){if(!e)return n;const t={...n};for(const[i,a]of Object.entries(e)){if(i==="player_id"){t[i]=a;continue}if(Array.isArray(a)){t[i]=a;continue}const s=t[i];if(a&&typeof a=="object"&&s&&typeof s=="object"&&!Array.isArray(s)){t[i]=jd(s,a);continue}t[i]=a}return t}function Zs(n){return jd({event_counts:Wa(),fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},territorial_pressure:{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}},n)}function Cv(n){return jd({event_counts:Wa(),player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},wall_aerial:{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0},wall_aerial_shot:{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:Zs().boost,movement:Zs().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}},n)}const WP=300,XP=1200,KP=2,qP=[{id:"event-counts",playerModules:["event_counts"],teamModules:["event_counts"],apply:mg,createFrameAccumulator:_g},{id:"boost-ledger",playerModules:["boost"],teamModules:["boost"],apply:KC,createFrameAccumulator:Ag},{id:"core",playerModules:["core"],teamModules:["core"],apply:oA,createFrameAccumulator:Ng},{id:"possession",playerModules:[],teamModules:["possession"],apply:VR,createFrameAccumulator:rv},{id:"pressure",playerModules:[],teamModules:["pressure"],apply:iP,createFrameAccumulator:dv},{id:"territorial-pressure",playerModules:[],teamModules:["territorial_pressure"],apply:rP,createFrameAccumulator:fv},{id:"movement",playerModules:["movement"],teamModules:["movement"],apply:hR,createFrameAccumulator:Jg},{id:"positioning",playerModules:["positioning"],teamModules:[],apply:XR,createFrameAccumulator:lv},{id:"rotation",playerModules:["rotation"],teamModules:["rotation"],apply:dP,createFrameAccumulator:mv},{id:"mechanics",playerModules:["speed_flip","half_flip","wavedash"],teamModules:[],apply:aR,createFrameAccumulator:Zg},{id:"whiff",playerModules:["whiff"],teamModules:[],apply:IP,createFrameAccumulator:bv},{id:"backboard",playerModules:["backboard"],teamModules:["backboard"],apply:wC,createFrameAccumulator:vg},{id:"double-tap",playerModules:["double_tap"],teamModules:["double_tap"],apply:_A,createFrameAccumulator:Og},{id:"demo",playerModules:["demo"],teamModules:["demo"],apply:yA,createFrameAccumulator:Bg},{id:"fifty-fifty",playerModules:["fifty_fifty"],teamModules:["fifty_fifty"],apply:AA,createFrameAccumulator:zg},{id:"bump",playerModules:["bump"],teamModules:["bump"],apply:LC,createFrameAccumulator:wg},{id:"rush",playerModules:[],teamModules:["rush"],apply:pP,createFrameAccumulator:_v},{id:"pass",playerModules:["pass"],teamModules:["pass"],apply:kR,createFrameAccumulator:av},{id:"one-timer",playerModules:["one_timer"],teamModules:["one_timer"],apply:AR,createFrameAccumulator:iv},{id:"ball-carry",playerModules:["ball_carry","air_dribble"],teamModules:["ball_carry","air_dribble"],apply:MC,createFrameAccumulator:xg},{id:"wall-aerial",playerModules:["wall_aerial"],teamModules:[],apply:UP,createFrameAccumulator:wv},{id:"wall-aerial-shot",playerModules:["wall_aerial_shot"],teamModules:[],apply:$P,createFrameAccumulator:Tv},{id:"flick",playerModules:["flick"],teamModules:[],apply:UA,createFrameAccumulator:Gg},{id:"ceiling-shot",playerModules:["ceiling_shot"],teamModules:[],apply:aA,createFrameAccumulator:Lg},{id:"musty-flick",playerModules:["musty_flick"],teamModules:[],apply:wR,createFrameAccumulator:tv},{id:"dodge-reset",playerModules:["dodge_reset"],teamModules:[],apply:dA,createFrameAccumulator:Dg},{id:"powerslide",playerModules:["powerslide"],teamModules:["powerslide"],apply:YR,createFrameAccumulator:cv},{id:"touch",playerModules:["touch"],teamModules:[],apply:CP,createFrameAccumulator:yv},{id:"half-volley",playerModules:["half_volley"],teamModules:["half_volley"],apply:GA,createFrameAccumulator:Kg}];function YP(n,e,t={}){const i=n.frames,a=new Map(i.map((h,_)=>[h.frame_number,_])),s=new Map,r={...n,frames:[]},o=qP.flatMap(h=>h.createFrameAccumulator?[h.createFrameAccumulator(r)]:[]),l=Math.max(1,t.materializationChunkSize??WP),c=Math.max(l,t.maxMaterializationChunkSize??XP);let u=-1,d=l;const f=h=>{if(h<=u)return;const _=Math.min(i.length-1,Math.max(h,u+d));for(let g=u+1;g<=_;g+=1){const m=i[g],p=m?JP(ZP(m)):void 0;if(p){for(const y of o)y.applyFrame(p);s.set(p.frame_number,p)}}u=_,d=Math.min(c,i.length,d*KP)};return{get(h){const _=a.get(h);if(_!==void 0)return f(_),s.get(h)}}}function jP(n){return!n||typeof n!="object"?n:{...n}}function ZP(n){return{...n,team_zero:{...n.team_zero},team_one:{...n.team_one},players:n.players.map(e=>({...e,player_id:jP(e.player_id)}))}}function JP(n){return{...n,team_zero:Zs(n.team_zero??{}),team_one:Zs(n.team_one??{}),players:n.players.map(t=>Cv(t))}}const QP=new Set(["is_team_0","name","player_id"]);function Hp(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length===0}function e2(n){return!n||typeof n!="object"||Array.isArray(n)?!1:Object.keys(n).every(e=>QP.has(e))}function t2(n){return Hp(n.team_zero)&&Hp(n.team_one)&&n.players.every(e=>e2(e))}function n2(n){return new Map(mg(n).frames.map(e=>[e.frame_number,e]))}function i2(n,e,t){const i=n.frames.filter(a=>t2(a)).length;if(i===n.frames.length)return YP(n,e,t);if(i>0)throw new Error("stats timeline frames must be either all compact scaffolds or all materialized snapshots");return n2(n)}function yt(n,e){return n.get(e)??null}const Zd=[{stage:"validating",index:1,total:9,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:9,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:9,label:"Build stats events",start:.62,end:.7},{stage:"serializing-replay",index:4,total:9,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:9,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:9,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:9,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:9,label:"Decode stats chunks",start:.94,end:.96},{stage:"deriving-stats",index:9,total:9,label:"Derive stats snapshots",start:.96,end:1}];function Av(n){return Math.max(0,Math.min(1,n))}function wc(n,e,t){if(n!==void 0)return Av((n-e)/(t-e))}function Jd(n){if(n.stage!=="stats-timeline")return n;const e=n.progress;return e===void 0?{...n,stage:"building-stats"}:e<.35?{...n,stage:"building-stats",progress:wc(e,0,.35)}:e<.55?{...n,stage:"serializing-replay",progress:wc(e,.35,.55)}:{...n,stage:"serializing-stats",progress:wc(e,.55,.92)}}function Rv(n){const e=Jd(n);return Zd.find(t=>t.stage===e.stage)}function a2(){return Zd.map(({stage:n,index:e,total:t,label:i})=>({stage:n,index:e,total:t,label:i}))}function s2(n){const e=Rv(n);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function r2(n){const e=Jd(n),t=Rv(e);return Zd.map(({stage:i,index:a,total:s,label:r})=>{if(a<t.index)return{stage:i,index:a,total:s,label:r,state:"complete",completion:1,indeterminate:!1};if(a>t.index)return{stage:i,index:a,total:s,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:a,total:s,label:r,state:"active",completion:o?Av(e.progress??0):1,indeterminate:!o}})}function cl(n){const e=Jd(n),t=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return t!==null&&e.totalFrames!==void 0?`Processing replay frames... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return t!==null?e.totalFrames!==void 0?`Building stats events... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats events... ${t}%`:"Building stats events...";case"serializing-replay":return t!==null?`Serializing replay data... ${t}%`:"Serializing replay data...";case"serializing-stats":return t!==null?`Serializing stats timeline... ${t}%`:"Serializing stats timeline...";case"decoding-replay":return t!==null?`Decoding replay data... ${t}%`:"Decoding replay data...";case"decoding-stats":return t!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${t}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${t}%`:"Decoding stats chunks...";case"deriving-stats":return t!==null?`Deriving stats snapshots... ${t}%`:"Deriving stats snapshots...";case"normalizing":return t!==null?`Normalizing replay model... ${t}%`:"Normalizing replay model...";default:return"Loading replay..."}}function o2(n){return n instanceof Error?n:new Error(String(n))}function Rs(n,e){return JSON.parse(n.decode(new Uint8Array(e)))}async function l2(n,e,t){t?.({stage:"decoding-stats",progress:0});const i=Rs(n,e.configBuffer);t?.({stage:"decoding-stats",progress:.05}),await Fa();const a=Rs(n,e.replayMetaBuffer);t?.({stage:"decoding-stats",progress:.1}),await Fa();const s=Rs(n,e.eventsBuffer);t?.({stage:"decoding-stats",progress:.15}),await Fa();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...Rs(n,c)),t?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await Fa()}return o===0&&t?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:a,events:s,frames:r}}function Fa(n=100){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(e=>{let t=!1,i=null;const a=()=>{t||(t=!0,i!==null&&clearTimeout(i),e())};i=setTimeout(a,n),requestAnimationFrame(()=>a())})}async function Pv(n,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const t=new Worker(new URL(""+new URL("replayLoader.worker-MPFLLimF.js",import.meta.url).href,import.meta.url),{type:"module"}),i=n.slice(),a=e.reportEveryNFrames??100;return new Promise((s,r)=>{const o=()=>{t.terminate()};t.onmessage=async c=>{const u=c.data;if(u.type==="progress"){e.onProgress?.(u.progress);return}if(u.type==="error"){o(),r(new Error(u.error));return}o();try{const d=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await Fa();const f=Rs(d,u.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await Fa();const h=await l2(d,u.statsTimelineParts,e.onProgress),_=i2(h);s({replay:f,statsTimeline:h,statsFrameLookup:_})}catch(d){r(o2(d))}},t.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:a};t.postMessage(l,[i.buffer])})}function c2(n){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const t=document.createElement("div");t.className="replay-load-modal__dialog",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const a=document.createElement("h2");a.id="replay-load-modal-title",a.className="replay-load-modal__title",a.textContent="Preparing replay pipeline";const s=document.createElement("p");s.className="replay-load-modal__status",s.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const h of a2()){const _=document.createElement("div");_.className="replay-load-modal__phase-row",_.dataset.state="pending";const g=document.createElement("p");g.className="replay-load-modal__phase-label",g.textContent=`${h.index}. ${h.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const p=document.createElement("div");p.className="replay-load-modal__phase-fill",p.dataset.indeterminate="false",m.append(p),_.append(g,m),r.append(_),o.set(h.stage,{row:_,fill:p})}const l=document.createElement("p");l.className="replay-load-modal__meta",t.append(i,a,s,r,l),e.append(t),n.append(e);let c="";const u=()=>{for(const{row:h,fill:_}of o.values())h.dataset.state="pending",_.style.width="0%",_.dataset.indeterminate="false"},d=h=>{for(const _ of r2(h)){const g=o.get(_.stage);g&&(g.row.dataset.state=_.state,g.fill.dataset.indeterminate=_.indeterminate?"true":"false",g.fill.style.width=`${Math.round(_.completion*100)}%`)}},f=h=>{e.hidden=!h};return{show(h,_="Preparing replay..."){c=h,f(!0),u(),a.textContent="Preparing replay pipeline",s.textContent=_,l.textContent=`Loading ${h}`},update(h){f(!0);const _=s2(h);if(d(h),a.textContent=`Phase ${_.index} of ${_.total}: ${_.label}`,s.textContent=cl(h),h.stage==="processing"&&h.totalFrames!==void 0){l.textContent=`${h.processedFrames??0}/${h.totalFrames} frames`;return}if(h.stage==="decoding-stats"&&h.totalChunks!==void 0){l.textContent=`${h.processedChunks??0}/${h.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){f(!1)},destroy(){e.remove()}}}const u2=["free","follow"];class d2{constructor(e){this.options=e}lastFreeCameraPreset=null;get freeCameraPreset(){return this.lastFreeCameraPreset}set freeCameraPreset(e){this.lastFreeCameraPreset=e}get ballCamChecked(){return this.options.elements.ballCam.checked}installEventListeners(e){const{elements:t}=this.options;t.cameraDistance.addEventListener("input",()=>{this.options.getReplayPlayer()?.setCameraDistanceScale(Number(t.cameraDistance.value)),this.options.requestConfigSync()},{signal:e}),t.customCameraSettings.addEventListener("change",()=>{t.cameraSettingsControls.hidden=!t.customCameraSettings.checked,this.options.getReplayPlayer()?.setCustomCameraSettings(t.customCameraSettings.checked?this.readCustomCameraSettings():null),this.options.requestConfigSync()},{signal:e});for(const i of[t.customCameraFov,t.customCameraHeight,t.customCameraPitch,t.customCameraDistance,t.customCameraStiffness,t.customCameraSwivelSpeed,t.customCameraTransitionSpeed])i.addEventListener("input",()=>{const a=this.readCustomCameraSettings();this.syncCustomCameraSettingControls(a),this.options.getReplayPlayer()?.setCustomCameraSettings(a),this.options.requestConfigSync()},{signal:e});t.attachedPlayer.addEventListener("change",()=>{this.options.getReplayPlayer()?.setAttachedPlayer(t.attachedPlayer.value||null),this.lastFreeCameraPreset=null,this.options.requestConfigSync()},{signal:e}),t.cameraViewFreeButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setCameraViewMode("free"),this.lastFreeCameraPreset=null,this.options.requestConfigSync()},{signal:e}),t.cameraViewFollowButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setCameraViewMode("follow"),this.lastFreeCameraPreset=null,this.options.requestConfigSync()},{signal:e}),t.cameraViewOverheadButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setFreeCameraPreset("overhead"),this.lastFreeCameraPreset="overhead",this.options.requestConfigSync()},{signal:e}),t.cameraViewSideButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setFreeCameraPreset("side"),this.lastFreeCameraPreset="side",this.options.requestConfigSync()},{signal:e}),t.ballCam.addEventListener("change",()=>{this.options.getReplayPlayer()?.setBallCamEnabled(t.ballCam.checked),this.options.requestConfigSync()},{signal:e})}setTransportEnabled(e,t){this.options.elements.attachedPlayer.disabled=!e,this.syncModeButtons(e?t:void 0)}syncState(e){const{elements:t}=this.options;t.cameraDistance.value=`${e.cameraDistanceScale}`,t.cameraDistanceReadout.textContent=`${e.cameraDistanceScale.toFixed(2)}x`,t.customCameraSettings.checked=e.customCameraSettings!==null,t.cameraSettingsControls.hidden=!t.customCameraSettings.checked,this.syncCustomCameraSettingControls(this.getEffectiveCameraSettings(e)),t.ballCam.checked=e.ballCamEnabled,t.attachedPlayer.value=e.attachedPlayerId??"",this.syncAvailability(e),this.renderProfile(e)}syncAvailability(e){this.syncModeButtons(e);const i=this.options.getReplayPlayer()!==null&&e?.cameraViewMode==="follow"&&(e.attachedPlayerId??null)!==null;this.options.elements.cameraDistance.disabled=!i,this.options.elements.customCameraSettings.disabled=!i,this.setCameraSettingControlsEnabled(i&&e?.customCameraSettings!==null),this.options.elements.ballCam.disabled=!i}syncModeButtons(e){const t=e?.cameraViewMode??"free",i=this.options.getReplayPlayer()!==null&&e!==void 0,a=(e?.attachedPlayerId??null)!==null;for(const o of u2){const l=this.getCameraViewButton(o);l.disabled=!i||o==="follow"&&!a;const c=o===t;l.dataset.active=c?"true":"false",l.setAttribute("aria-pressed",c?"true":"false")}const{cameraViewOverheadButton:s,cameraViewSideButton:r}=this.options.elements;s.disabled=!i,r.disabled=!i,s.dataset.active="false",r.dataset.active="false",s.setAttribute("aria-pressed","false"),r.setAttribute("aria-pressed","false")}populateAttachedPlayerOptions(e){const{attachedPlayer:t}=this.options.elements;t.replaceChildren(),t.append(new Option("Free camera",""));for(const i of e)t.append(new Option(`${i.name} (${i.isTeamZero?"Blue":"Orange"})`,i.id))}renderProfile(e){const t=this.options.elements,i=this.options.getReplayPlayer(),a=e?.attachedPlayerId??null;if(!i||e?.cameraViewMode!=="follow"||a===null){this.renderEmptyProfile("Free camera");return}const s=i.replay.players.find(o=>o.id===a);if(!s){this.renderEmptyProfile("Unknown");return}const r=this.getEffectiveCameraSettings(e);t.cameraProfileReadout.textContent=e.customCameraSettings===null?s.name:`${s.name} custom`,t.cameraFovReadout.textContent=mn(r.fov,"",0),t.cameraHeightReadout.textContent=mn(r.height,"",0),t.cameraPitchReadout.textContent=mn(r.pitch,"",0),t.cameraBaseDistanceReadout.textContent=mn(r.distance,"",0),t.cameraStiffnessReadout.textContent=mn(r.stiffness,"",2)}getFallbackCameraSettings(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}getAttachedPlayerCameraSettings(e){const t=this.options.getReplayPlayer();return!t||e===null?null:t.replay.players.find(i=>i.id===e)?.cameraSettings??null}getEffectiveCameraSettings(e){return{...this.getFallbackCameraSettings(),...this.getAttachedPlayerCameraSettings(e.attachedPlayerId)??{},...e.customCameraSettings??{}}}readCustomCameraSettings(){const e=this.options.elements;return{fov:Number(e.customCameraFov.value),height:Number(e.customCameraHeight.value),pitch:Number(e.customCameraPitch.value),distance:Number(e.customCameraDistance.value),stiffness:Number(e.customCameraStiffness.value),swivelSpeed:Number(e.customCameraSwivelSpeed.value),transitionSpeed:Number(e.customCameraTransitionSpeed.value)}}setCameraSettingControlsEnabled(e){const t=this.options.elements;t.cameraSettingsControls.hidden=!t.customCameraSettings.checked,t.customCameraFov.disabled=!e,t.customCameraHeight.disabled=!e,t.customCameraPitch.disabled=!e,t.customCameraDistance.disabled=!e,t.customCameraStiffness.disabled=!e,t.customCameraSwivelSpeed.disabled=!e,t.customCameraTransitionSpeed.disabled=!e}syncCustomCameraSettingControls(e){const t=this.options.elements,i=this.getFallbackCameraSettings(),a=e.fov??i.fov,s=e.height??i.height,r=e.pitch??i.pitch,o=e.distance??i.distance,l=e.stiffness??i.stiffness,c=e.swivelSpeed??i.swivelSpeed,u=e.transitionSpeed??i.transitionSpeed;t.customCameraFov.value=`${a}`,t.customCameraHeight.value=`${s}`,t.customCameraPitch.value=`${r}`,t.customCameraDistance.value=`${o}`,t.customCameraStiffness.value=`${l}`,t.customCameraSwivelSpeed.value=`${c}`,t.customCameraTransitionSpeed.value=`${u}`,t.customCameraFovReadout.textContent=mn(a,"",0),t.customCameraHeightReadout.textContent=mn(s,"",0),t.customCameraPitchReadout.textContent=mn(r,"",0),t.customCameraDistanceReadout.textContent=mn(o,"",0),t.customCameraStiffnessReadout.textContent=mn(l,"",2),t.customCameraSwivelSpeedReadout.textContent=mn(c,"",1),t.customCameraTransitionSpeedReadout.textContent=mn(u,"",2)}getCameraViewButton(e){switch(e){case"free":return this.options.elements.cameraViewFreeButton;case"follow":return this.options.elements.cameraViewFollowButton}}renderEmptyProfile(e){const t=this.options.elements;t.cameraProfileReadout.textContent=e,t.cameraFovReadout.textContent="--",t.cameraHeightReadout.textContent="--",t.cameraPitchReadout.textContent="--",t.cameraBaseDistanceReadout.textContent="--",t.cameraStiffnessReadout.textContent="--"}}function mn(n,e="",t=0){return n===void 0||Number.isNaN(n)?"--":`${n.toFixed(t)}${e}`}function f2(n){return new d2(n)}const h2=236,Js=4120,p2=2300,m2=16185075,_2=.18,g2=1118481,Co=5882879,Ao=16761180,v2=.55,Ec=.12,Vp=.28,y2=3,b2=4,Gp=5,$p=2,S2=6,x2=856343,w2=.42,E2=18,M2=.24,T2=10,Wp=220,C2=200,Lv=140,A2=220,R2=100,P2=120;function L2(n){const e=C2/2;if(n){const a=-Js+Wp,s=-e;return{minX:a,maxX:s,centerX:(a+s)/2,width:s-a}}const t=e,i=Js-Wp;return{minX:t,maxX:i,centerX:(t+i)/2,width:i-t}}function I2(n,e,t){if(n.length<2)return[];const i=Math.min(...n),a=Math.max(...n),s=a-i,r=e?-1:1,o=-r;return s<=t?[{kind:"other",centerY:(i+a)/2,halfDepth:Math.max(t-s/2,t*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:a,halfDepth:t,directions:[r]},{kind:"forward",centerY:e?a:i,halfDepth:t,directions:[o]}]}function N2(n,e){const t=new Ud;return t.moveTo(0,e/2),t.lineTo(n/2,-e/2),t.lineTo(-n/2,-e/2),t.closePath(),new ol(t)}function Xp(n){const e=R2*n,t=new nt({color:g2,transparent:!0,opacity:.9,side:Ze,depthWrite:!1,depthTest:!1}),i=new ut;i.visible=!1;const a=new en(Lv*.55*n,1),s=new Be(a,t);s.position.z=Gp,s.renderOrder=22,i.add(s);const r=N2(P2*n,e),o=new Be(r,t);return o.position.z=Gp,o.renderOrder=23,i.add(o),{group:i,shaftGeom:a,shaftMesh:s,headGeom:r,headMesh:o,material:t,headLength:e}}function Mc(n,e,t,i){const a=Math.max(t-n.headLength,n.headLength*.2);n.group.position.x=e,n.group.rotation.z=i>0?0:Math.PI,n.shaftMesh.scale.y=a,n.shaftMesh.position.y=-n.headLength/2,n.headMesh.position.y=t/2-n.headLength/2,n.group.visible=!0}function Wo(n){n.group.visible=!1}function Ia(n,e){const t=new ut;t.visible=!1;const i=new nt({color:m2,transparent:!0,opacity:_2,side:Ze,depthWrite:!1,depthTest:!1}),a=new en(1,1),s=new Be(a,i);s.position.z=y2,s.renderOrder=20,t.add(s);const r=new nt({color:e,transparent:!0,opacity:v2,side:Ze,depthWrite:!1,depthTest:!1}),o=new en(1,1),l=new Be(o,r);l.position.z=b2,l.renderOrder=21,t.add(l);const c=Xp(n),u=Xp(n);return t.add(c.group),t.add(u.group),{group:t,floorGeom:a,floorMesh:s,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:u}}function k2(n){n.group.visible=!1,Wo(n.primaryMarker),Wo(n.secondaryMarker)}function D2(n,e,t,i){const a=e.halfDepth*2*i,s=Js*2*i,r=t.width*i,o=t.centerX*i,l=Lv*i,c=Math.max(a-32*i,n.primaryMarker.headLength*1.15),u=Math.min(c,Math.max(A2*i,a*.6));if(n.group.position.y=e.centerY*i,n.floorMesh.position.x=0,n.floorMesh.scale.set(s,a,1),n.stripeMesh.position.x=o,n.stripeMesh.scale.set(l,a,1),Wo(n.primaryMarker),Wo(n.secondaryMarker),e.directions.length===1)Mc(n.primaryMarker,o,u,e.directions[0]);else{const d=r*.18;Mc(n.primaryMarker,o-d,u,e.directions[0]),Mc(n.secondaryMarker,o+d,u,e.directions[1])}n.group.visible=!0}function Kp(n){n.group.removeFromParent(),n.shaftGeom.dispose(),n.headGeom.dispose(),n.material.dispose()}class F2{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,t,i){this.replay=t,this.blueBack=Ia(i,Co),this.blueForward=Ia(i,Co),this.blueOther=Ia(i,Co),this.orangeBack=Ia(i,Ao),this.orangeForward=Ia(i,Ao),this.orangeOther=Ia(i,Ao);for(const a of this.getZones())e.add(a.group)}update(e,t){const{frameIndex:i}=e,a=h2;for(const s of[!0,!1]){const r=this.replay.players.filter(d=>d.isTeamZero===s).length,o=[];for(const d of this.replay.players){if(d.isTeamZero!==s)continue;const f=d.frames[i];f?.position&&o.push(f.position.y)}const l=L2(s),c=this.getTeamZones(s);for(const d of c.values())k2(d);if(r<2||o.length!==r)continue;const u=I2(o,s,a);for(const d of u){const f=c.get(d.kind);f&&D2(f,d,l,t)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),Kp(e.primaryMarker),Kp(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function O2(n){return n==null||Number.isNaN(n)?null:n<0?"team-zero":"team-one"}class U2{group;teamZeroSide;teamOneSide;constructor(e,t){this.group=new ut,this.teamZeroSide=this.createHalfFieldSide(Co),this.teamOneSide=this.createHalfFieldSide(Ao);const i=Js*t,a=5120*t;this.teamZeroSide.mesh.position.set(0,-a/2,$p),this.teamZeroSide.mesh.scale.set(i*2,a,1),this.teamOneSide.mesh.position.set(0,a/2,$p),this.teamOneSide.mesh.scale.set(i*2,a,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const t=O2(e);this.teamZeroSide.material.opacity=t==="team-zero"?Vp:Ec,this.teamOneSide.material.opacity=t==="team-one"?Vp:Ec}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const t=new en(1,1),i=new nt({color:e,transparent:!0,opacity:Ec,side:Ze,depthWrite:!1,depthTest:!1}),a=new Be(t,i);return a.renderOrder=18,{mesh:a,material:i}}}function B2(n,e){const t=new ut,i=Js*2*e,a=(s,r,o)=>{const l=new en(i,r*e),c=new nt({color:x2,transparent:!0,opacity:o,side:Ze,depthWrite:!1,depthTest:!1}),u=new Be(l,c);return u.position.set(0,s,S2),u.renderOrder=24,u};for(const s of[-1,1]){const r=s*p2*e;t.add(a(r,E2,w2))}return t.add(a(0,T2,M2)),n.add(t),t}function Pt(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Zu(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Sn(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function z2(n,e){return`
      ${Sn("50s",Pt(n?.count))}
      ${Sn("Blue wins",`${Pt(n?.wins)} (${Zu(n?.wins,n?.count)})`)}
      ${Sn("Orange wins",`${Pt(n?.losses)} (${Zu(n?.losses,n?.count)})`)}
      ${Sn("Neutral",Pt(n?.neutral_outcomes))}
      ${Sn("Blue poss after",Pt(n?.possession_after_count))}
      ${Sn("Orange poss after",Pt(n?.opponent_possession_after_count))}
      ${Sn("Kickoff 50s",Pt(n?.kickoff_count))}
      ${Sn("Blue kickoff wins",Pt(n?.kickoff_wins))}
      ${Sn("Orange kickoff wins",Pt(n?.kickoff_losses))}
      ${Sn("Blue kickoff poss",Pt(n?.kickoff_possession_after_count))}
      ${Sn("Orange kickoff poss",Pt(n?.kickoff_opponent_possession_after_count))}
    `}function qp(n){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Pt(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Pt(n?.wins)} (${Zu(n?.wins,n?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Pt(n?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Pt(n?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Pt(n?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Pt(n?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Pt(n?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Pt(n?.kickoff_possession_after_count)}</span></div>
  `}function H2(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function V2(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Yp(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=V2(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function jp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ju(n,e){return`<div class="stat-row"><span class="label">${jp(n)}</span><span class="value">${jp(e)}</span></div>`}function G2(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Iv(n,e){return n==="neutral"?"Neutral":e.kind==="shared"?n==="own"?"Blue control":"Orange control":n==="own"?"Team control":"Opp control"}function Qu(n){return n.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function $2(n,e){return n==="neutral_third"?"Neutral third":e.kind==="shared"?n==="defensive_third"?"Blue third":"Orange third":n==="defensive_third"?"Own third":"Opp third"}function W2(n){return n.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function X2(n,e,t,i){for(const a of t){const s=a==="possession_state"?Qu(i):W2(i),r=s.indexOf(n[a]),o=s.indexOf(e[a]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function K2(n,e,t){const i=(a,s)=>a==="possession_state"?Iv(s,t):$2(s,t);if(e.length===1){const a=e[0];return i(a,n[a])}return e.map(a=>i(a,n[a])).join(" / ")}function q2(n,e,t,i){if(e.length===0)return"";const a=new Map;if(n?.labeled_time?.entries?.length)for(const s of n.labeled_time.entries){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=a.get(c);u?u.total+=s.value:a.set(c,{values:o,total:s.value})}if(a.size===0&&e.length===1&&e[0]==="possession_state"){const s=new Map;return n&&(s.set("own",n.possession_time),s.set("neutral",n.neutral_time??0),s.set("opponent",n.opponent_possession_time)),Qu(i).some(r=>(s.get(r)??0)>0)?Qu(i).filter(r=>s.has(r)).map(r=>Ju(Iv(r,i),Yp(s.get(r),t))).join(""):""}return[...a.values()].sort((s,r)=>X2(s.values,r.values,e,i)).map(s=>Ju(K2(s.values,e,i),Yp(s.total,t))).join("")}function Zp(n,e){const t=n?.tracked_time,i=G2(e.breakdownClasses),a=q2(n,i,t,e.labelPerspective);return`
    ${Ju("Tracked",H2(t,1,"s"))}
    ${a}
  `}function Y2(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function j2(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Z2(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=j2(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function Jp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Nv(n,e){return`<div class="stat-row"><span class="label">${Jp(n)}</span><span class="value">${Jp(e)}</span></div>`}function J2(n,e){return n==="neutral"?"Neutral zone":e.kind==="shared"?n==="defensive_half"?"Blue side":"Orange side":n==="defensive_half"?"Own half":"Opp half"}function Q2(n,e,t){const i=new Map;if(n&&(i.set("defensive_half",n.defensive_half_time),i.set("neutral",n.neutral_time??0),i.set("offensive_half",n.offensive_half_time)),n?.labeled_time?.entries?.length){i.clear();for(const s of n.labeled_time.entries){const r=s.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+s.value)}}const a=["defensive_half","neutral","offensive_half"];return a.some(s=>(i.get(s)??0)>0)?a.filter(s=>i.has(s)).map(s=>Nv(J2(s,t),Z2(i.get(s),e))).join(""):""}function Qp(n,e){const t=n?.tracked_time,i=Q2(n,t,e.labelPerspective);return`
    ${i.length===0?Nv("Tracked",Y2(t,1,"s")):""}
    ${i}
  `}function Wi(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Xi(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function Tc(n){return`
    ${Xi("Rushes",Wi(n?.count))}
    ${Xi("2v1",Wi(n?.two_v_one_count))}
    ${Xi("2v2",Wi(n?.two_v_two_count))}
    ${Xi("2v3",Wi(n?.two_v_three_count))}
    ${Xi("3v1",Wi(n?.three_v_one_count))}
    ${Xi("3v2",Wi(n?.three_v_two_count))}
    ${Xi("3v3",Wi(n?.three_v_three_count))}
  `}const em="subtr-actor-fifty-fifty-overlay-styles",eL=5882879,tL=16761180,nL=15988472,iL=180,aL=4;function ed(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function tm(n,e){const t=ed(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function sL(n,e){const t=tm(e,n.team_zero_player),i=tm(e,n.team_one_player),a=n.is_kickoff?"Kickoff 50/50":"50/50",s=n.winning_team_is_team_0===void 0?null:n.winning_team_is_team_0,r=n.possession_team_is_team_0===void 0?null:n.possession_team_is_team_0,o=s===null?"neutral":s?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=s===null?"sap-fifty-fifty-overlay-label-neutral":s?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${a}: ${t} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:s}}function kv(n,e){return n.events.fifty_fifty.map(t=>{const i=sL(t,e),a=new L(...t.team_zero_position),s=new L(...t.team_one_position),r=new L(...t.midpoint),o=e.frames[t.start_frame]?.time??t.start_time;return{id:`fifty-fifty:${t.start_frame}:${ed(t.team_zero_player)}:${ed(t.team_one_player)}`,time:o,frame:t.start_frame,label:i.text,labelClassName:i.className,axisStart:a,axisEnd:s,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function rL(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function oL(){if(document.getElementById(em))return;const n=document.createElement("style");n.id=em,n.textContent=`
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
  `,document.head.append(n)}function lL(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class cL{scene;container;group=new ut;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,iL);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=aL;constructor(e,t,i,a){oL(),this.scene=e,this.container=t,this.markers=kv(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const t=rL(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.line.removeFromParent(),s.line.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,a.axisStart.x,a.axisStart.y,a.axisStart.z+24),c.setXYZ(1,a.axisEnd.x,a.axisEnd.y,a.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(a.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),lL(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new Mt().setFromPoints([e.axisStart,e.axisEnd]),a=new rr({color:e.winnerIsTeamZero===null?nL:e.winnerIsTeamZero?eL:tL,transparent:!0,opacity:.9}),s=new al(i,a);s.renderOrder=3,this.group.add(s);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:s,material:a,label:r};return this.views.set(e.id,o),o}}const nm="subtr-actor-ceiling-shot-overlay-styles",uL=5882879,dL=16761180,fL=16185075,hL=140,pL=215,mL=220,_L=4.5;function Dv(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function gL(n,e){const t=Dv(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function vL(n,e){return n.events.ceiling_shot.map(t=>{const i=gL(e,t.player),a=Dv(t.player),s=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`ceiling-shot:${t.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:t.frame,isTeamZero:t.is_team_0,playerId:a,playerName:i,ceilingContactPosition:{x:t.ceiling_contact_position[0],y:t.ceiling_contact_position[1],z:t.ceiling_contact_position[2]},touchPosition:{x:t.touch_position[0],y:t.touch_position[1],z:t.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function yL(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function bL(){if(document.getElementById(nm))return;const n=document.createElement("style");n.id=nm,n.textContent=`
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
  `,document.head.append(n)}function SL(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class xL{scene;container;group=new ut;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,mL);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=_L;constructor(e,t,i,a){bL(),this.scene=e,this.container=t,this.markers=vL(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const t=yL(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.ringMaterial.dispose(),s.beam.removeFromParent(),s.beamGeometry.dispose(),s.beamMaterial.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z+12),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z).add(this.labelOffset);const u=SL(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=e.quality>=.8?fL:e.isTeamZero?uL:dL,a=new nt({color:i,transparent:!0,opacity:.8,side:Ze,depthWrite:!1,depthTest:!1}),s=new la(hL,pL,48),r=new Be(s,a);r.renderOrder=30,this.group.add(r);const o=new Mt().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new rr({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new al(o,l);c.renderOrder=29,this.group.add(c);const u=document.createElement("div");u.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,u.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(u);const d={marker:e,ring:r,ringMaterial:a,beam:c,beamGeometry:o,beamMaterial:l,label:u};return this.views.set(e.id,d),d}}const im="subtr-actor-touch-overlay-styles",am=5882879,sm=16761180,wL=120,EL=196,Cc=24,rm=210,om=5,ML=.1,TL=48;function Wt(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function Ac(n,e){return Math.max(0,n-e)}function CL(n,e){if(e==="markers")return n.playerName;const t=Math.round(n.totalBallAdvanceDistance),i=Math.round(n.totalBallRetreatDistance);return t>0&&i>0?`${n.playerName} +${t} / -${i} uu`:i>0?`${n.playerName} -${i} uu`:`${n.playerName} +${t} uu`}function Fv(n,e){const t=new Map,i=[],a=[...(n.events?.touch??[]).map((s,r)=>({kind:"touch",frame:s.frame,time:s.time,index:r,event:s})),...(n.events?.touch_ball_movement??[]).map((s,r)=>({kind:"movement",frame:s.frame,time:s.time,index:r,event:s}))].sort((s,r)=>s.frame!==r.frame?s.frame-r.frame:s.time!==r.time?s.time-r.time:s.kind!==r.kind?s.kind==="touch"?-1:1:s.index-r.index);for(const s of a){if(s.kind==="touch"){const d=s.event,f=Wt(d.player),h=e.ballFrames[d.frame]?.position;if(!h)continue;const _=i.length;i.push({id:`touch-stat:${d.frame}:${f}:${_+1}`,time:e.frames[d.frame]?.time??d.time,frame:d.frame,isTeamZero:d.is_team_0,playerId:f,playerName:e.players.find(g=>g.id===f)?.name??f,position:{x:h.x,y:h.y,z:h.z},endPosition:{x:h.x,y:h.y,z:h.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),t.set(f,_);continue}const r=s.event,o=Wt(r.player),l=t.get(o),c=e.ballFrames[r.frame]?.position;if(l===void 0||!c)continue;const u=i[l];u&&(u.totalBallTravelDistance+=Ac(r.travel_distance,0),u.totalBallAdvanceDistance+=Ac(r.advance_distance,0),u.totalBallRetreatDistance+=Ac(r.retreat_distance,0),u.endPosition={x:c.x,y:c.y,z:c.z})}return i}function AL(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function RL(){if(document.getElementById(im))return;const n=document.createElement("style");n.id=im,n.textContent=`
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
  `,document.head.append(n)}function PL(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}function Ov(n){return[n.line.material,n.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function lm(n,e){for(const t of Ov(n))t.transparent=!0,t.opacity=e,t.depthWrite=!1,t.depthTest=!1}function cm(n){n.removeFromParent(),n.line.geometry.dispose(),n.cone.geometry.dispose();for(const e of Ov(n))e.dispose()}class LL{scene;container;group=new ut;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,rm);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=om;mode="markers";constructor(e,t,i,a,s){RL(),this.scene=e,this.container=t,this.decaySeconds=Math.max(.1,s?.decaySeconds??om),this.mode=s?.mode??"markers",this.labelOffset.set(0,0,rm),this.markers=Fv(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const t=AL(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),cm(s.arrow),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+Cc),o.ring.scale.setScalar(c),o.label.textContent=CL(a,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,a,l),this.worldPosition.set(a.position.x,a.position.y,a.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),PL(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),cm(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new nt({color:e.isTeamZero?am:sm,transparent:!0,opacity:.7,side:Ze,depthWrite:!1,depthTest:!1}),a=new Be(new la(wL,EL,48),i);a.rotation.x=-Math.PI/2,a.renderOrder=40,this.group.add(a);const s=new eS(new L(0,1,0),new L,1,e.isTeamZero?am:sm,1,1);s.visible=!1,s.renderOrder=45,s.line.renderOrder=45,s.cone.renderOrder=45,lm(s,.7),this.group.add(s);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,arrow:s,label:r};return this.views.set(e.id,o),o}updateArrow(e,t,i){if(this.mode!=="advancement"||t.totalBallTravelDistance<=ML){e.arrow.visible=!1;return}this.arrowStart.set(t.position.x,t.position.y,t.position.z+Cc*2),this.arrowEnd.set(t.endPosition.x,t.endPosition.y,t.endPosition.z+Cc*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const a=this.arrowDirection.length();if(a<TL){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(a,Math.min(140,Math.max(42,a*.18)),Math.min(86,Math.max(24,a*.1))),lm(e.arrow,Math.min(.86,i+.12))}}const jn="#3b82f6",Zn="#f59e0b",IL="#d1d9e0",NL={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wall_aerial:"WA",wall_aerial_shot:"WS",wavedash:"WD"},kL=new Set(["wavedash"]);function DL(n,e){return n.players.find(t=>t.id===e)?.name??e}function Di(n,e,t){return n.frames[e??-1]?.time??t}function Ii(n){return n.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function Uv(n){return NL[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function Bv(n){return[...new Set((n?.events.mechanics??[]).filter(e=>ul(e.kind)).map(e=>e.kind))].sort((e,t)=>Ii(e).localeCompare(Ii(t)))}function ul(n){return!kL.has(n)}function FL(n){return n.replaceAll("_","-")}function OL(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>ul(s.kind)&&s.timing.type==="moment"&&(!i||i.has(s.kind))).map(s=>{const r=Wt(s.player_id),o=a.get(r)??r,l=Ii(s.kind);if(s.timing.type!=="moment")throw new Error("unreachable non-moment mechanic event");return{id:s.id,time:Di(e,s.timing.frame,s.timing.time),frame:s.timing.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:Uv(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?jn:Zn}})}function UL(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>ul(s.kind)&&(!i||i.has(s.kind))).map(s=>{const r=Wt(s.player_id),o=a.get(r)??r,l=Ii(s.kind),c=s.timing.type==="moment"?{frame:s.timing.frame,time:s.timing.time}:{frame:s.timing.end_frame,time:s.timing.end_time};return{id:`${s.id}:playlist`,time:Di(e,c.frame,c.time),frame:c.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:Uv(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?jn:Zn}})}function BL(n){const e=new Set(n),t=new Set(["goal"]);return e.has("core")&&(t.add("save"),t.add("shot"),t.add("assist")),e.has("demo")&&t.add("demo"),[...t]}function zL(n,e){const t=new Set(BL(e));return n.timelineEvents.filter(i=>t.has(i.kind))}function HL(n,e){return kv(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"fifty-fifty",label:t.label,shortLabel:t.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:t.winnerIsTeamZero,color:t.winnerIsTeamZero===null?IL:t.winnerIsTeamZero?jn:Zn}))}function VL(n,e){return Fv(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"touch",label:`${t.playerName} touch`,shortLabel:"T",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?jn:Zn}))}function GL(n,e){return n.events.backboard.map((t,i)=>{const a=Wt(t.player),s=e.players.find(r=>r.id===a)?.name??a;return{id:`backboard:${t.frame}:${a}:${i}`,time:Di(e,t.frame,t.time),frame:t.frame,kind:"backboard",label:`${s} backboard`,shortLabel:"BB",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?jn:Zn}})}function $L(n,e){return n.events.rush.map((t,i)=>{const a=Di(e,t.end_frame,t.end_time),s=`${t.attackers}v${t.defenders}`,r=t.is_team_0?"Blue":"Orange";return{id:`rush:${t.start_frame}:${t.end_frame}:${i}`,time:a,frame:t.end_frame,kind:"rush",label:`${r} rush ${s}`,shortLabel:"R",playerId:null,playerName:null,isTeamZero:t.is_team_0,color:t.is_team_0?jn:Zn}})}function WL(n,e){return(n.events?.powerslide??[]).filter(t=>t.active).map((t,i)=>{const a=Wt(t.player),s=DL(e,a);return{id:`powerslide:${t.frame}:${a}:${i+1}`,time:Di(e,t.frame,t.time),frame:t.frame,kind:"powerslide",label:`${s} powerslide`,shortLabel:"PS",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?jn:Zn}})}function XL(n,e){return n.events.wavedash.map((t,i)=>{const a=Wt(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=Di(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.horizontal_speed_gain);return{id:`wavedash:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"wavedash",label:`${s} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?jn:Zn}})}function KL(n,e){return n.events.bump.map((t,i)=>{const a=Wt(t.initiator),s=Wt(t.victim),r=e.players.find(u=>u.id===a)?.name??a,o=e.players.find(u=>u.id===s)?.name??s,l=Di(e,t.frame,t.time),c=Math.round(t.confidence*100);return{id:`bump:${t.frame}:${a}:${s}:${i}`,time:l,frame:t.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:a,playerName:r,isTeamZero:t.initiator_is_team_0,color:t.initiator_is_team_0?jn:Zn}})}function qL(n){return n.kind==="beaten_to_ball"?"BT":n.dodge_active?"DW":n.aerial?"AW":"W"}function YL(n){const e=[n.aerial?"aerial":"grounded"];return n.dodge_active&&e.push("dodge"),e.join(" ")}function jL(n){return n.kind==="beaten_to_ball"?"beaten to ball":"whiff"}function ZL(n,e){return n.events.whiff.map((t,i)=>{const a=Wt(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=Di(e,t.frame,t.time),o=Math.round(t.closest_approach_distance),l=Math.round(t.approach_speed);return{id:`whiff:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"whiff",label:`${s} ${YL(t)} ${jL(t)} | ${o}uu closest, ${l}uu/s`,shortLabel:qL(t),playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?jn:Zn}})}const zv=.02,cn=1e-4,JL=200,Hv=.08,QL="#3b82f6",eI="#f59e0b",td={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},um={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},tI={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function nI(n){const e=n.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):JL}function Xo(n,e,t){return n?.frames?.[e??-1]?.time??t}function Qd(n){return n===!0?QL:n===!1?eI:null}function iI(n){return tI[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function aI(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>ul(s.kind)&&s.timing.type==="span"&&(!i||i.has(s.kind))).map(s=>{if(s.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=nd(s.player_id),o=a.get(r)??r,l=Ii(s.kind),c=Xo(e,s.timing.start_frame,s.timing.start_time),u=Math.max(c,Xo(e,s.timing.end_frame,s.timing.end_time));return{id:s.id,startTime:c,endTime:u,lane:`mechanic:${s.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:iI(s.kind),isTeamZero:s.is_team_0,color:Qd(s.is_team_0)??void 0}}).sort((s,r)=>s.startTime!==r.startTime?s.startTime-r.startTime:(s.id??"").localeCompare(r.id??""))}function sI(n,e,t,i,a,s){const r=e?.ballFrames[n]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=t+cn||s>cn?"neutral":i>a+cn?"team_zero_side":a>i+cn?"team_one_side":null}function Vv(n,e,t){if(n==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=n==="team_zero_side";return{id:`half-control:${n}:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function ef(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function rI(n,e){const t=ef(n.events?.possession??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of n.frames){for(;a<t.length&&t[a].frame<=l.frame_number;){const f=t[a];s=f.active,r=f.possession_state,a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=ds(l,o,e);let d=null;s&&r==="team_zero"?d={id:`possession:team_zero:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:s&&r==="team_one"?d={id:`possession:team_one:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:s&&r==="neutral"&&(d={id:`possession:neutral:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),dl(i,d),o=l}return i}function oI(n,e){if((n.events?.possession?.length??0)>0)return rI(n,e);const t=[];let i=0,a=0,s=0,r=null;for(const o of n.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o,c=l.team_zero?.possession?.possession_time??0,u=l.team_one?.possession?.possession_time??0,d=l.team_zero?.possession?.neutral_time??0,f=c-i,h=u-a,_=d-s;i=c,a=u,s=d;let g=null;const{startTime:m,endTime:p}=ds(o,r,e);f>h+cn&&f>_+cn?g={id:`possession:team_zero:${m.toFixed(3)}`,startTime:m,endTime:p,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:h>f+cn&&h>_+cn?g={id:`possession:team_one:${m.toFixed(3)}`,startTime:m,endTime:p,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:_>cn&&(g={id:`possession:neutral:${m.toFixed(3)}`,startTime:m,endTime:p,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),dl(t,g),r=o}return t}function lI(n,e){const t=ef(n.events?.pressure??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of n.frames){for(;a<t.length&&t[a].frame<=l.frame_number;){const d=t[a];s=d.active,r=d.field_half==="team_zero_side"||d.field_half==="team_one_side"?d.field_half:"neutral",a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=ds(l,o,e);dl(i,s?Vv(r,c,u):null),o=l}return i}function cI(n,e){if((n.events?.pressure?.length??0)>0)return lI(n,e);const t=[];let i=0,a=0,s=0;const r=nI(n);let o=null;for(const l of n.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l,u=c.team_zero?.pressure?.defensive_half_time??0,d=c.team_one?.pressure?.defensive_half_time??0,f=c.team_zero?.pressure?.neutral_time??0,h=u-i,_=d-a,g=f-s;i=u,a=d,s=f;const{startTime:m,endTime:p}=ds(l,o,e),y=sI(l.frame_number,e,r,h,_,g),x=y?Vv(y,m,p):null;dl(t,x),o=l}return t}function uI(n,e){return n.events.rush.map((t,i)=>{const a=e?.frames[t.start_frame]?.time??t.start_time,s=e?.frames[t.end_frame]?.time??t.end_time,r=`${t.attackers}v${t.defenders}`,o=t.is_team_0;return{id:`rush-range:${t.start_frame}:${t.end_frame}:${i}`,startTime:a,endTime:Math.max(a,s),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function dI(n,e={}){const t=Gv(e),i=new Set(e.comparisons??["both"]),a=new Set(e.activities??["active","inactive","unknown"]),s=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(t.size===0||!i.has("both")||!a.has("unknown")||!s.has("unknown")||r?.size===0)return[];const o=new Map(n.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of n.boostPads)if(t.has(c.size))for(let u=0;u<c.events.length;u+=1){const d=c.events[u];if(d.available||!Number.isFinite(d.time)||r&&!d.playerId||d.playerId&&r&&!r.has(d.playerId))continue;const f=Math.max(0,Xo(n,d.frame,d.time)),h=c.size==="big"?"Big":"Small",_=d.playerName?`${d.playerName} `:"",g=d.playerId?o.get(d.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${d.frame}:${u}`,startTime:f,endTime:Math.max(f+Hv,f),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${_}picked up ${h.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:Qd(g)??td[c.size],isTeamZero:g})}return l.sort((c,u)=>c.startTime!==u.startTime?c.startTime-u.startTime:(c.id??"").localeCompare(u.id??""))}function Gv(n){if(n.padTypes)return new Set(n.padTypes);if(n.sizes){const e=new Set(n.sizes),t=new Set;return e.has("big")&&t.add("big"),e.has("small")&&t.add("small"),e.has("big")&&e.has("small")&&t.add("ambiguous"),t}return new Set(["big","small","ambiguous"])}function nd(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function fI(n){return{big:"big",small:"small",ambiguous:"ambiguous"}[n]}function hI(n){return{both:"counted",ghost:"ghost",missed:"missed"}[n]}function pI(n,e){return n==="ghost"?"G":n==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function mI(n,e,t={}){const i=n.events?.boost_pickups??[];if(i.length===0&&e)return dI(e,t);const a=Gv(t),s=new Set(t.comparisons??["both"]),r=new Set(t.activities??["active","inactive","unknown"]),o=new Set(t.fieldHalves??["own","opponent","unknown"]),l=t.playerIds?new Set(t.playerIds):null;if(a.size===0||s.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(u=>[u.id,u.name]));return i.filter(u=>{const d=nd(u.player_id);return a.has(u.pad_type)&&s.has(u.comparison)&&r.has(u.activity)&&o.has(u.field_half)&&(!l||l.has(d))}).map((u,d)=>{const f=nd(u.player_id),h=c.get(f)??f,_=Math.max(0,Xo(e,u.frame,u.time)),g=hI(u.comparison),m=fI(u.pad_type);return{id:`boost-pickup:${u.comparison}:${u.frame}:${f}:${d}`,startTime:_,endTime:Math.max(_+Hv,_),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${h} ${g} ${m} boost pickup`,shortLabel:pI(u.comparison,u.pad_type),color:Qd(u.is_team_0)??(u.comparison==="both"?u.pad_type==="big"?td.big:u.pad_type==="small"?td.small:um.both:um[u.comparison]),isTeamZero:u.is_team_0}}).sort((u,d)=>u.startTime!==d.startTime?u.startTime-d.startTime:(u.id??"").localeCompare(d.id??""))}const id=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function $v(n,e){return n.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(n.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function tf(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function _I(n,e){const t=n.positioning;if(!t)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const a=t[i];if(typeof a=="number"&&Number.isFinite(a))return a}return 0}function gI(n,e){return n.players.find(t=>tf(t.player_id)===e)?.name??e}function vI(n,e){for(const t of[e.fieldName,...e.aliases??[]]){const i=n[t];if(typeof i=="number"&&Number.isFinite(i))return i}return 0}function yI(n,e){const t=ef(n.events?.positioning??[]),i=[],a=new Map;let s=0,r=null;for(const o of n.frames){const l=new Map;for(;s<t.length&&t[s].frame<=o.frame_number;){const d=t[s],f=tf(d.player),h=l.get(f)??{event:d,zoneDeltas:new Map};h.event=d;for(const _ of id)h.zoneDeltas.set(_.fieldName,(h.zoneDeltas.get(_.fieldName)??0)+vI(d,_));l.set(f,h),s+=1}if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const{startTime:c,endTime:u}=ds(o,r,e);if(u-c<=cn){r=o;continue}for(const[d,{event:f,zoneDeltas:h}]of l){let _=null,g=0;for(const m of id){const p=h.get(m.fieldName)??0;p>g+cn&&(g=p,_=m)}_&&Wv(i,a,{id:`time-in-zone:${d}:${_.fieldName}:${c.toFixed(3)}`,startTime:c,endTime:u,lane:`time-in-zone:${d}`,laneLabel:gI(o,d),label:_.label,color:$v(_,f.is_team_0),isTeamZero:f.is_team_0})}r=o}return i}function bI(n,e){if((n.events?.positioning?.length??0)>0)return yI(n,e);const t=new Map,i=[],a=new Map;let s=null;for(const r of n.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){s=r;continue}const{startTime:o,endTime:l}=ds(r,s,e);if(l-o<=cn){s=r;continue}for(const c of r.players){const u=tf(c.player_id),d=t.get(u)??new Map;let f=null,h=0;for(const _ of id){const g=_I(c,_),m=g-(d.get(_.fieldName)??0);m>h+cn&&(h=m,f=_),d.set(_.fieldName,g)}t.set(u,d),f&&Wv(i,a,{id:`time-in-zone:${u}:${f.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${u}`,laneLabel:c.name,label:f.label,color:$v(f,c.is_team_0),isTeamZero:c.is_team_0})}s=r}return i}function ds(n,e,t){const i=t?.frames[n.frame_number]?.time??n.time,a=e?t?.frames[e.frame_number]?.time??e.time:Math.max(0,i-n.dt);return{startTime:Math.max(0,a),endTime:Math.max(a,i)}}function dl(n,e){if(!e)return;const t=n[n.length-1];if(t&&t.lane===e.lane&&t.label===e.label&&Math.abs(t.endTime-e.startTime)<=zv){t.endTime=e.endTime;return}n.push(e)}function Wv(n,e,t){if(!t)return;const i=t.lane??"",a=e.get(i);if(a&&a.label===t.label&&Math.abs(a.endTime-t.startTime)<=zv){a.endTime=t.endTime;return}n.push(t),e.set(i,t)}const Rc=236,Xv="relative-positioning",SI={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function Oa(n){return n?"team-blue":"team-orange"}function Kv(n,e,t){return`<div class="player-card ${t.tone==="shared"?"shared":t.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${n}</span>
      ${t.metaHtml??""}
    </div>
    ${e}
  </div>`}function Bt(n,e,t,i=""){return Kv(n,t,{metaHtml:i,tone:e?"blue":"orange"})}function jt(n,e){return`<div class="player-team-stack">${[!0,!1].map(t=>{const i=n.filter(s=>s.is_team_0===t);if(i.length===0)return"";const a=t?"Blue":"Orange";return`<section class="player-team-group ${Oa(t)}">
        <div class="player-team-header">
          <h3>${a} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function nf(n,e,t=""){return Kv(n,e,{metaHtml:t,tone:"shared"})}function Ut(n,e,t){const i=yt(n.statsFrameLookup,e);return i?i.players.find(a=>Wt(a.player_id)===t)??null:null}function xI(n,e,t){const i=n.players.find(_=>_.id===e);if(!i||!i.frames[t]?.position)return"mid";const s=i.isTeamZero,r=n.players.filter(_=>_.isTeamZero===s).length,o=[];let l=0;for(const _ of n.players){if(_.isTeamZero!==s)continue;const g=_.frames[t];if(!g?.position)continue;const m=s?g.position.y:-g.position.y;o.push(m),_.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),u=Math.max(...o);if(u-c<=Rc)return"level";const f=l-c<=Rc,h=u-l<=Rc;return f&&!h?"last":h&&!f?"upfield":"mid"}function wI(n){let e=null,t=null;const i=new Set,a=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){s()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return oI(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),n.rerenderCurrentState()},renderStats(o,l){const u=yt(l.statsFrameLookup,o)?.team_zero?.possession;return u?nf("Control State",Zp(u,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const u=yt(c.statsFrameLookup,l),d=Ut(c,l,o),f=d?.is_team_0?u?.team_zero?.possession:u?.team_one?.possession;return!f||!d?"":Zp(f,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Possession breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";const f=document.createElement("label");f.className="toggle";const h=document.createElement("input");h.type="checkbox",h.dataset.breakdownClass="possession_state",h.addEventListener("change",()=>{h.checked?i.add("possession_state"):i.delete("possession_state"),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const _=document.createElement("span");_.textContent="Control",f.append(h,_),d.append(f);const g=document.createElement("label");g.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const p=document.createElement("span");p.textContent="Third",g.append(m,p),d.append(g),e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=a.filter(l=>i.has(l));t.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return a.filter(o=>i.has(o))}}function EI(){let n=null;return{id:"fifty-fifty",label:"50/50",setup(e){n=new cL(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return HL(e.statsTimeline,e.replay)},renderStats(e,t){const i=yt(t.statsFrameLookup,e);if(!i)return"";const a=nf("Challenge Summary",z2(i.team_zero?.fifty_fifty)),s=jt(i.players,r=>Bt(r.name,r.is_team_0,qp(r.fifty_fifty)));return a+s},renderFocusedPlayerStats(e,t,i){const a=Ut(i,t,e);return a?qp(a.fifty_fifty):""}}}function MI(){let n=null,e=null;return{id:"pressure",label:"Half Control",setup(t){e=t.replay,n=new U2(t.player.sceneState.scene,t.fieldScale)},teardown(){n?.dispose(),n=null,e=null},onBeforeRender(t){const i=e?.ballFrames[t.frameIndex];n?.update(i?.position?.y??null)},getTimelineRanges(t){return cI(t.statsTimeline,t.replay)},renderStats(t,i){const s=yt(i.statsFrameLookup,t)?.team_zero?.pressure;return s?nf("Field State",Qp(s,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(t,i,a){const s=yt(a.statsFrameLookup,i),r=Ut(a,i,t),o=r?.is_team_0?s?.team_zero?.pressure:s?.team_one?.pressure;return!o||!r?"":Qp(o,{labelPerspective:{kind:"team"}})}}}function TI(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(n){return uI(n.statsTimeline,n.replay)},getTimelineEvents(n){return $L(n.statsTimeline,n.replay)},renderStats(n,e){const t=yt(e.statsFrameLookup,n),i=t?.team_zero?.rush,a=t?.team_one?.rush;return!i||!a?"":[Bt("Blue Team",!0,Tc(i)),Bt("Orange Team",!1,Tc(a))].join("")},renderFocusedPlayerStats(n,e,t){const i=yt(t.statsFrameLookup,e),a=Ut(t,e,n),s=a?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!s||!a?"":Tc(s)}}}const ad={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:n=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[n]??n},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function CI(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Pc(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function AI(n,e,t=1){return n===void 0||Number.isNaN(n)?"?":e===void 0||Number.isNaN(e)||e<=0?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${(n*100/e).toFixed(t)}%)`}function dm(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ro(n,e){return`<div class="stat-row"><span class="label">${dm(n)}</span><span class="value">${dm(e)}</span></div>`}function RI(n,e,t){for(const i of t){const{valueOrder:a}=ad[i],s=a.indexOf(n[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function PI(n,e){if(e.length===1){const t=e[0];return ad[t].formatValue(n[t])}return e.map(t=>ad[t].formatValue(n[t])).join(" / ")}function LI(n,e,t){if(e.length===0||!n?.labeled_tracked_time?.entries?.length)return"";const i=new Map,a=n?.labeled_tracked_time?.entries??[];for(const s of a){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=i.get(c);u?u.total+=s.value:i.set(c,{values:o,total:s.value})}return[...i.values()].sort((s,r)=>RI(s.values,r.values,e)).map(s=>Ro(PI(s.values,e),AI(s.total,t))).join("")}function fm(n,e={}){const t=n?.tracked_time,i=n&&t&&t>0?n.speed_integral/t:t===0?0:void 0,a=CI(e.breakdownClasses),s=LI(n,a,t);return`
    ${Ro("Tracked",Pc(t,1,"s"))}
    ${Ro("Distance",Pc(n?.total_distance,0," uu"))}
    ${Ro("Avg speed",Pc(i,0," uu/s"))}
    ${s}
  `}const hm="subtr-actor-speed-flip-overlay-styles",II=5882879,NI=16761180,kI=16185075,DI=150,FI=230,OI=220,UI=4;function qv(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function BI(n,e){const t=qv(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function zI(n,e){return n.events.speed_flip.map(t=>{const i=BI(e,t.player),a=qv(t.player),s=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`speed-flip:${t.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:t.frame,isTeamZero:t.is_team_0,playerId:a,playerName:i,position:{x:t.start_position[0],y:t.start_position[1],z:t.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function HI(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function VI(){if(document.getElementById(hm))return;const n=document.createElement("style");n.id=hm,n.textContent=`
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
  `,document.head.append(n)}function GI(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class $I{scene;container;group=new ut;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,OI);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=UI;constructor(e,t,i,a){VI(),this.scene=e,this.container=t,this.markers=zI(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const t=HI(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+14),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.position.x,a.position.y,a.position.z).add(this.labelOffset);const u=GI(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new nt({color:e.quality>=.75?kI:e.isTeamZero?II:NI,transparent:!0,opacity:.8,side:Ze,depthWrite:!1,depthTest:!1}),a=new la(DI,FI,48),s=new Be(a,i);s.renderOrder=30,this.group.add(s);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,label:r};return this.views.set(e.id,o),o}}const ro=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],Lc=[{value:"both",label:"Pickup events"}],oo=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],lo=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function WI(n,e){return n===e||n==="ambiguous"}function XI(n,e){const t=e?.events.boost_pickups??[];return t.length===0?null:t.find(i=>{const a=Wt(i.player_id),s=i.reported_frame??i.frame;return a===n.player.id&&i.comparison==="both"&&s===n.event.frame&&WI(i.pad_type,n.pad.size)})??null}function Yv(n={}){let e=null,t=null,i=null,a=null,s=null,r=null;const o=new Set(ro.map(T=>T.value)),l=new Set(Lc.map(T=>T.value)),c=new Set(oo.map(T=>T.value)),u=new Set(lo.map(T=>T.value));let d=null,f=!1;function h(T,A,b,v){const R=document.createElement("div");R.className="boost-pickup-filter-group";const N=document.createElement("p");N.className="module-settings-group-title",N.textContent=T;const z=document.createElement("div");z.className="boost-pickup-filter-options";for(const B of A){const G=document.createElement("label");G.className="toggle";const U=document.createElement("input");U.type="checkbox",U.dataset.boostPickupFilter=v,U.dataset.boostPickupValue=B.value,U.addEventListener("change",()=>{U.checked?b.add(B.value):b.delete(B.value),m(s),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const X=document.createElement("span");X.textContent=B.label,G.append(U,X),z.append(G)}return R.append(N,z),R}function _(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",a=document.createElement("div"),a.className="boost-pickup-filter-options",T.append(A,a),T}function g(T){if(a&&(a.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const A of T.players){const b=document.createElement("label");b.className="toggle";const v=document.createElement("input");v.type="checkbox",v.dataset.boostPickupPlayerId=A.id,v.addEventListener("change",()=>{d||(d=new Set(T.players.map(N=>N.id))),v.checked?d.add(A.id):d.delete(A.id),m(T),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,b.append(v,R),a.append(b)}}function m(T){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const b=A.dataset.boostPickupFilter,v=A.dataset.boostPickupValue;A.checked=p(b,v)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const b=A.dataset.boostPickupPlayerId;A.checked=b?d?.has(b)??!0:!1}t&&(t.textContent=y(T))}}function p(T,A){if(!A)return!1;switch(T){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return u.has(A);default:return!1}}function y(T){const A=T?.players.length??0,b=d?d.size:A;if(o.size===0||l.size===0||c.size===0||u.size===0||d!==null&&d.size===0)return"Hidden";const R=[o.size<ro.length,l.size<Lc.length,c.size<oo.length,u.size<lo.length,d!==null&&b<A].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function x(T){if(d&&!d.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&u.has("unknown");const A=XI(T,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&u.has(A.field_half):!1}function S(T,A,b){if(T.clear(),!Array.isArray(b)){for(const R of A)T.add(R.value);return}const v=new Set(A.map(R=>R.value));for(const R of b)typeof R=="string"&&v.has(R)&&T.add(R)}function C(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...u],playerIds:d?[...d]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const A=T;S(o,ro,A.padTypes),S(l,Lc,A.comparisons),S(c,oo,A.activities),S(u,lo,A.fieldHalves),d=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(b=>typeof b=="string")):null,f=s===null&&d!==null,m(s),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()}return{setup(T){s!==T.replay&&(s=T.replay,f?f=!1:d=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:C,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:u};return d&&(T.playerIds=d),T},includePickup:x,renderSettings(T,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const b=document.createElement("div");b.className="boost-pickup-filter-summary",t=document.createElement("strong"),t.className="metric-readout",b.append(t);const v=document.createElement("div");v.className="boost-pickup-filter-grid",v.append(h("Pad type",ro,o,"pad-type"),h("Activity",oo,c,"activity"),h("Field half",lo,u,"field-half"),_()),(A.showHeader??!1)&&e.append(b),e.append(v)}return g(T?.replay??null),m(T?.replay??null),e}}}function dn(n){return{id:n.id,label:n.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:n.getTimelineEvents,renderStats(e,t){const i=yt(t.statsFrameLookup,e);return i?jt(i.players,a=>Bt(a.name,a.is_team_0,n.render(n.select(a),a))):""},renderFocusedPlayerStats(e,t,i){const a=Ut(i,t,e);return a?n.render(n.select(a),a):""}}}const KI=255;function jv(n){return n*100/KI}function Mn(n){return n==null?"?":jv(n).toFixed(0)}function qI(n,e){const t=Mn(n);if(n==null||e==null)return t;const i=Mn(n+e);return`${t} (${i})`}function Ic(n){n&&typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&n.dispose()}function YI(n){n&&(n.removeFromParent(),n.traverse(e=>{const t="geometry"in e?e.geometry:null;Ic(t);const i="material"in e?e.material:null;if(Array.isArray(i))for(const a of i)Ic(a);else Ic(i)}))}function jI(){let n=0,e=null;return{acquire(t){e||(e=B2(t.player.sceneState.scene,t.fieldScale)),n+=1},release(){n<=0||(n-=1,n===0&&(YI(e),e=null))}}}const pm=jI();function Fe(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function _e(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function sd(n,e=0){return _e(n,e,"%")}function Zv(n,e,t=1,i=0){if(n===void 0||Number.isNaN(n))return sd(e,i);const a=_e(n,t,"s");return e===void 0||Number.isNaN(e)?a:`${a} (${sd(e,i)})`}function Yi(n,e,t=1,i=0){const a=n!==void 0&&e!==void 0&&!Number.isNaN(n)&&!Number.isNaN(e)&&e>0?n*100/e:void 0;return Zv(n,a,t,i)}function qe(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Wn(n){const e=qe(n);return e===void 0?void 0:e*100}function Jv(n){return qe(n?.tracked_time)}function ZI(n,e,t){const i=qe(n?.[e]);if(i!==void 0)return i;const a=Jv(n),s=qe(n?.[t]);if(!(a===void 0||a<=0||s===void 0))return s*100/a}function Qt(n,e,t){return Zv(qe(n?.[t]),ZI(n,e,t))}function mm(n,e,t){const i=qe(n?.[e]);if(i!==void 0)return i;const a=Jv(n),s=qe(n?.[t]);if(!(a===void 0||a<=0||s===void 0))return s/a}function _m(n){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${Qt(n,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${Qt(n,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${Qt(n,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${Qt(n,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${Qt(n,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${Qt(n,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${Qt(n,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${Qt(n,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${Qt(n,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function gm(n){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${Qt(n,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${Qt(n,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${Qt(n,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${Qt(n,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${Qt(n,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${_e(mm(n,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${_e(mm(n,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function Ki(n,e){return Yi(qe(n?.[e]),qe(n?.tracked_time))}function vm(n){return n?n.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function JI(n){const e=n&&n.first_man_stint_count>0?n.time_first_man/n.first_man_stint_count:void 0;return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${vm(n?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${vm(n?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${Ki(n,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">First stints</span><span class="value">${Fe(n?.first_man_stint_count)}</span></div>
    <div class="stat-row"><span class="label">Avg first stint</span><span class="value">${_e(e,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest first stint</span><span class="value">${_e(n?.longest_first_man_stint_time,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${Ki(n,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${Ki(n,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${Ki(n,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${Ki(n,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${Ki(n,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${Ki(n,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${Fe(n?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${Fe(n?.lost_first_man_count)}</span></div>
  `}function QI(n){const e=n&&n.shots>0?n.goals*100/n.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${Fe(n?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${Fe(n?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${Fe(n?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${Fe(n?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Fe(n?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${sd(e)}</span></div>
  `}function eN(n){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_backboard),2,"s")}</span></div>
  `}function tN(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_double_tap),2,"s")}</span></div>
  `}function nN(n){const e=n&&n.completed_pass_count>0?n.total_pass_distance/n.completed_pass_count:void 0,t=n&&n.completed_pass_count>0?n.total_pass_advance/n.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${Fe(n?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${Fe(n?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${_e(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${_e(t,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${_e(n?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function iN(n){const e=n&&n.count>0?n.total_ball_speed/n.count:void 0,t=n&&n.count>0?n.total_pass_distance/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${_e(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${_e(n?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${_e(t,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_one_timer),2,"s")}</span></div>
  `}function ym(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(qe(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(qe(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function bm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=Wn(e),i=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,a=n&&n.count>0?n.cumulative_takeoff_to_touch_time/n.count:void 0,s=n&&n.count>0?n.cumulative_touch_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Plays</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Wn(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${_e(i,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${_e(a,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${_e(s,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_wall_aerial),2,"s")}</span></div>
  `}function Sm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_takeoff_to_shot_time/n.count:void 0,i=n&&n.count>0?n.cumulative_shot_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Wn(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(Wn(e),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${_e(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${_e(i,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_wall_aerial_shot),2,"s")}</span></div>
  `}function aN(n){const e=n&&n.carry_count>0?n.average_horizontal_gap_sum/n.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${Fe(n?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${_e(n?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${_e(n?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${_e(n?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${_e(e,0)}</span></div>
  `}function sN(n){const e=n&&n.count>0?n.average_horizontal_gap_sum/n.count:void 0,t=n&&n.count>0?n.total_touch_count/n.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${Fe(n?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${Fe(n?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${_e(t,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${Fe(n?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${_e(n?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${_e(n?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${_e(n?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${_e(e,0)}</span></div>
  `}function rN(n){const e=n&&n.press_count>0?n.total_duration/n.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${Fe(n?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${_e(n?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${_e(e,2,"s")}</span></div>
  `}function oN(n){const e=n&&n.whiff_count>0?n.cumulative_closest_approach_distance/n.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${Fe(n?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Beaten to ball</span><span class="value">${Fe(n?.beaten_to_ball_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${Fe(n?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${Fe(n?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${Fe(n?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${_e(qe(n?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${_e(qe(n?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${_e(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_whiff),2,"s")}</span></div>
  `}function lN(n){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Fe(n?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Fe(n?.demos_taken)}</span></div>
  `}function cN(n){const e=n&&n.bumps_inflicted>0?n.cumulative_bump_strength/n.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Fe(n?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Fe(n?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${Fe(n?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${Fe(n?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${_e(qe(n?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${_e(qe(n?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${_e(e,0)}</span></div>
  `}function uN(n){return`
    <div class="stat-row"><span class="label">Refreshes</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Flip resets</span><span class="value">${Fe(n?.on_ball_count)}</span></div>
  `}function xm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(qe(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(qe(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_musty),2,"s")}</span></div>
  `}function wm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,i=n&&n.count>0?n.cumulative_ball_speed_change/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(qe(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${_e(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${_e(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_flick),2,"s")}</span></div>
  `}function Em(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(qe(n?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(qe(n?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function Mm(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=Wn(n?.last_quality),i=Wn(e),a=Wn(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_half_flip),2,"s")}</span></div>
  `}function Tm(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=Wn(n?.last_quality),i=Wn(e),a=Wn(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Fe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Fe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(qe(n?.time_since_last_wavedash),2,"s")}</span></div>
  `}function Cm(n){const e=n&&n.tracked_time>0?jv(n.boost_integral/n.tracked_time).toFixed(0):"?",t=qe(n?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${qI(n?.amount_collected,n?.amount_respawned)}</span></div>
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
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${Yi(qe(n?.time_zero_boost),t)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${Yi(qe(n?.time_boost_0_25),t)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${Yi(qe(n?.time_boost_25_50),t)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${Yi(qe(n?.time_boost_50_75),t)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${Yi(qe(n?.time_boost_75_100),t)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${Yi(qe(n?.time_hundred_boost),t)}</span></div>
  `}const rd={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:n=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[n]??n},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:n=>({ground:"Ground",air:"Air",wall:"Wall"})[n]??n},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:n=>({no_dodge:"No dodge",dodge:"Dodge"})[n]??n}};function dN(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function bi(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Nc(n,e=0,t=""){return n===void 0||!Number.isFinite(n)?"?":`${n.toFixed(e)}${t}`}function Am(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function An(n,e){return`<div class="stat-row"><span class="label">${Am(n)}</span><span class="value">${Am(e)}</span></div>`}function fN(n,e,t){for(const i of t){const{valueOrder:a}=rd[i],s=a.indexOf(n[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function hN(n,e){if(e.length===1){const t=e[0];return rd[t].formatValue(n[t])}return e.map(t=>rd[t].formatValue(n[t])).join(" / ")}function pN(n){return(n?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function mN(n,e){if(e.length===0||n.length===0)return"";const t=new Map;for(const i of n){const a=new Map(i.labels.map(c=>[c.key,c.value])),s={};let r=!0;for(const c of e){const u=a.get(c);if(u===void 0){r=!1;break}s[c]=u}if(!r)continue;const o=e.map(c=>`${c}:${s[c]}`).join("|"),l=t.get(o);l?l.count+=i.count:t.set(o,{values:s,count:i.count})}return[...t.values()].sort((i,a)=>fN(i.values,a.values,e)).map(i=>An(hN(i.values,e),bi(i.count))).join("")}function _N(n,e){if(!n||e.length!==1)return"";const[t]=e;if(t==="kind")return[An("Control",bi(n.control_touch_count)),An("Medium",bi(n.medium_hit_count)),An("Hard",bi(n.hard_hit_count))].join("");if(t==="height_band"){const i=n.high_aerial_touch_count??0,a=(n.aerial_touch_count??0)-i,s=(n.touch_count??0)-(n.aerial_touch_count??0);return[An("Ground",bi(s)),An("Low air",bi(a)),An("High air",bi(i))].join("")}return""}function Rm(n,e={}){const t=dN(e.breakdownClasses),i=pN(n),a=mN(i,t)||_N(n,t);return`
    ${An("Touches",bi(n?.touch_count))}
    ${An("Ball advanced",Nc(n?.total_ball_advance_distance,0," uu"))}
    ${An("Ball traveled",Nc(n?.total_ball_travel_distance,0," uu"))}
    ${An("Ball retreated",Nc(n?.total_ball_retreat_distance,0," uu"))}
    ${a}
  `}function gN(n){let e=null,t=5,i="advancement",a=null,s=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(f){e=new LL(f.player.sceneState,f.player.container,f.replay,f.statsTimeline,{mode:i}),e.setDecaySeconds(t),u()},teardown(){e?.dispose(),e=null},onBeforeRender(f){e?.update(f.currentTime)},getTimelineEvents(f){return VL(f.statsTimeline,f.replay)},getConfig(){return{decaySeconds:t,overlayMode:i,breakdownClasses:d()}},applyConfig(f){if(f&&typeof f=="object"&&!Array.isArray(f)){const h=f;if(typeof h.decaySeconds=="number"&&Number.isFinite(h.decaySeconds)&&(t=Math.max(1,Math.min(10,h.decaySeconds)),e?.setDecaySeconds(t)),(h.overlayMode==="markers"||h.overlayMode==="advancement")&&(i=h.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(h.breakdownClasses))for(const _ of h.breakdownClasses)c.includes(_)&&l.add(_)}u(),n.rerenderCurrentState()},renderStats(f,h){const _=yt(h.statsFrameLookup,f);return _?jt(_.players,g=>Bt(g.name,g.is_team_0,Rm(g.touch,{breakdownClasses:d()}),g.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(f,h,_){const g=Ut(_,h,f);return g?Rm(g.touch,{breakdownClasses:d()}):""},renderSettings(){if(!a){a=document.createElement("div"),a.className="module-settings-card";const f=document.createElement("div");f.className="module-settings-header";const h=document.createElement("div"),_=document.createElement("p");_.className="module-settings-eyebrow",_.textContent="Touch markers";const g=document.createElement("h3");g.textContent="Touch decay",h.append(_,g),s=document.createElement("strong"),s.className="metric-readout",f.append(h,s);const m=document.createElement("label"),p=document.createElement("span");p.className="label",p.textContent="Keep each marker visible after the touch";const y=document.createElement("input");y.type="range",y.min="1",y.max="10",y.step="0.5",y.value=`${t}`,y.addEventListener("input",()=>{const G=Number(y.value);t=Number.isFinite(G)?Math.max(1,Math.min(10,G)):t,e?.setDecaySeconds(t),u(t),n.requestConfigSync?.()}),m.append(p,y);const x=document.createElement("div");x.className="module-settings-subgroup";const S=document.createElement("div");S.className="module-settings-header";const C=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",C.append(M,T),r=document.createElement("strong"),r.className="metric-readout",S.append(C,r);const A=document.createElement("div");A.className="module-settings-options";for(const G of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const U=document.createElement("label");U.className="toggle";const X=document.createElement("input");X.type="radio",X.name="touch-overlay-mode",X.dataset.overlayMode=G.mode,X.addEventListener("change",()=>{X.checked&&(i=G.mode,e?.setMode(i),u(),n.requestConfigSync?.())});const V=document.createElement("span");V.textContent=G.label,U.append(X,V),A.append(U)}x.append(S,A);const b=document.createElement("div");b.className="module-settings-subgroup";const v=document.createElement("div");v.className="module-settings-header";const R=document.createElement("div"),N=document.createElement("p");N.className="module-settings-eyebrow",N.textContent="Stat display";const z=document.createElement("h3");z.textContent="Touch breakdown",R.append(N,z),o=document.createElement("strong"),o.className="metric-readout",v.append(R,o);const B=document.createElement("div");B.className="module-settings-options";for(const G of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const U=document.createElement("label");U.className="toggle";const X=document.createElement("input");X.type="checkbox",X.dataset.breakdownClass=G.className,X.addEventListener("change",()=>{X.checked?l.add(G.className):l.delete(G.className),u(),n.rerenderCurrentState(),n.requestConfigSync?.()});const V=document.createElement("span");V.textContent=G.label,U.append(X,V),B.append(U)}b.append(v,B),a.append(f,m,x,b)}return u(),a}};function u(f){if(!a)return;const h=f??t,_=a.querySelector("input");_ instanceof HTMLInputElement&&(_.value=`${h}`),s&&(s.textContent=`${h.toFixed(1)}s`);for(const g of a.querySelectorAll("input[data-overlay-mode]"))g.checked=g.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const g of a.querySelectorAll("input[data-breakdown-class]")){const m=g.dataset.breakdownClass;g.checked=m?l.has(m):!1}if(o){const g=d();o.textContent=g.length>0?g.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function d(){return c.filter(f=>l.has(f))}}function vN(n,e=Yv({refreshTimelineRanges:n.refreshTimelineRanges,rerenderCurrentState:n.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(t){e.setup(t)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(t){return mI(t.statsTimeline,t.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(t){e.applyConfig(t)},includeBoostPickupAnimationPickup(t){return e.includePickup(t)},renderStats(t,i){const a=yt(i.statsFrameLookup,t);return a?jt(a.players,s=>Bt(s.name,s.is_team_0,Cm(s.boost))):""},renderFocusedPlayerStats(t,i,a){const s=Ut(a,i,t);return s?Cm(s.boost):""},renderSettings(t){return e.renderSettings(t,{showHeader:!0})}}}function yN(){return dn({id:"core",label:"Core",select:n=>n.core,render:n=>QI(n)})}function bN(){return dn({id:"backboard",label:"Backboard",select:n=>n.backboard,render:n=>eN(n),getTimelineEvents(n){return GL(n.statsTimeline,n.replay)}})}function SN(){let n=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){n=new xL(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},renderStats(e,t){const i=yt(t.statsFrameLookup,e);return i?jt(i.players,a=>Bt(a.name,a.is_team_0,ym(a.ceiling_shot),a.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,t,i){const a=Ut(i,t,e);return a?ym(a.ceiling_shot):""}}}function xN(){return{id:"wall-aerial",label:"Wall-to-Air Setup",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,bm(i.wall_aerial),i.wall_aerial?.is_last_wall_aerial?'<span class="role-indicator role-forward">Last Wall-to-Air Setup</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?bm(i.wall_aerial):""}}}function wN(){return{id:"wall-aerial-shot",label:"Wall Aerial Shot",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,Sm(i.wall_aerial_shot),i.wall_aerial_shot?.is_last_wall_aerial_shot?'<span class="role-indicator role-forward">Last Wall Aerial Shot</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?Sm(i.wall_aerial_shot):""}}}function EN(){return dn({id:"ball-carry",label:"Ball Carry",select:n=>n.ball_carry,render:n=>aN(n)})}function MN(){return dn({id:"air-dribble",label:"Air Dribble",select:n=>n.air_dribble,render:n=>sN(n)})}function TN(){return dn({id:"dodge-reset",label:"Dodge Refresh",select:n=>n.dodge_reset,render:n=>uN(n)})}function CN(){return dn({id:"double-tap",label:"Double Tap",select:n=>n.double_tap,render:n=>tN(n)})}function AN(){return dn({id:"pass",label:"Pass",select:n=>n.pass,render:n=>nN(n)})}function RN(){return dn({id:"one-timer",label:"One-timer",select:n=>n.one_timer,render:n=>iN(n)})}function PN(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,xm(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?xm(i.musty_flick):""}}}function LN(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,wm(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?wm(i.flick):""}}}function IN(){let n=null;return{id:"speed-flip",label:"Speed Flip",setup(e){n=new $I(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},renderStats(e,t){const i=yt(t.statsFrameLookup,e);return i?jt(i.players,a=>Bt(a.name,a.is_team_0,Em(a.speed_flip),a.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,t,i){const a=Ut(i,t,e);return a?Em(a.speed_flip):""}}}function NN(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,Mm(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?Mm(i.half_flip):""}}}function kN(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return XL(n.statsTimeline,n.replay)},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,Tm(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?Tm(i.wavedash):""}}}function DN(){return dn({id:"whiff",label:"Whiff",select:n=>n.whiff,render:n=>oN(n),getTimelineEvents(n){return ZL(n.statsTimeline,n.replay)}})}function FN(n){let e=null,t=null;const i=new Set,a=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){s()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),n.rerenderCurrentState()},renderStats(o,l){const c=yt(l.statsFrameLookup,o);return c?jt(c.players,u=>Bt(u.name,u.is_team_0,fm(u.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const u=Ut(c,l,o);return u?fm(u.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Movement breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";for(const f of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const h=document.createElement("label");h.className="toggle";const _=document.createElement("input");_.type="checkbox",_.dataset.breakdownClass=f.className,_.addEventListener("change",()=>{_.checked?i.add(f.className):i.delete(f.className),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const g=document.createElement("span");g.textContent=f.label,h.append(_,g),d.append(h)}e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=r();t.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return a.filter(o=>i.has(o))}}function ON(){return dn({id:"powerslide",label:"Powerslide",select:n=>n.powerslide,render:n=>rN(n),getTimelineEvents(n){return WL(n.statsTimeline,n.replay)}})}function UN(){return dn({id:"rotation",label:"Rotation",select:n=>n.rotation,render:n=>JI(n)})}function BN(){return dn({id:"demo",label:"Demo",select:n=>n.demo,render:n=>lN(n)})}function zN(){return dn({id:"bump",label:"Bump",select:n=>n.bump,render:n=>cN(n),getTimelineEvents(n){return KL(n.statsTimeline,n.replay)}})}function HN(){let n=null,e=1;return{id:Xv,label:"Relative Positioning",setup(t){e=t.fieldScale,n=new F2(t.player.sceneState.scene,t.replay,e)},teardown(){n?.dispose(),n=null},onBeforeRender(t){n?.update(t,e)},renderStats(t,i){const a=yt(i.statsFrameLookup,t);return a?jt(a.players,s=>{const r=xI(i.replay,Wt(s.player_id),t),o=SI[r];return Bt(s.name,s.is_team_0,_m(s.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(t,i,a){const s=Ut(a,i,t);return s?_m(s.positioning):""}}}function VN(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(n){pm.acquire(n)},teardown(){pm.release()},onBeforeRender(){},getTimelineRanges(n){return bI(n.statsTimeline,n.replay)},renderStats(n,e){const t=yt(e.statsFrameLookup,n);return t?jt(t.players,i=>Bt(i.name,i.is_team_0,gm(i.positioning))):""},renderFocusedPlayerStats(n,e,t){const i=Ut(t,e,n);return i?gm(i.positioning):""}}}function GN(n,e={}){return[yN(),bN(),SN(),xN(),wN(),CN(),RN(),AN(),wI(n),EI(),MI(),TI(),HN(),VN(),UN(),IN(),NN(),kN(),gN(n),DN(),LN(),PN(),TN(),MN(),vN(n,e.boostPickupFilters),EN(),FN(n),ON(),BN(),zN()]}const $N=new Set(["player_id","name","is_team_0"]),WN=["is_last_","time_since_last_","frames_since_last_"];function XN(n){return n===null||typeof n=="number"||typeof n=="string"||typeof n=="boolean"||Array.isArray(n)}function KN(n,e){let t=n;for(const i of e){if(!t||typeof t!="object"||Array.isArray(t))return;t=t[i]}return t}function qN(n){return n==null?"--":typeof n=="number"?Number.isFinite(n)?Number.isInteger(n)?`${n}`:`${Number(n.toFixed(3))}`:"--":typeof n=="boolean"?n?"true":"false":Array.isArray(n)?n.length===0?"[]":JSON.stringify(n):`${n}`}function YN(n,e){if(WN.some(s=>n.startsWith(s)))return!0;const t=n.match(/^last_(.+)_time$/),i=n.match(/^last_(.+)_frame$/),a=t?.[1]??i?.[1];return a?`is_last_${a}`in e||`time_since_last_${a}`in e||`frames_since_last_${a}`in e:!1}function od(n,e,t,i){if(!n||typeof n!="object"||Array.isArray(n))return;const a=n;for(const[s,r]of Object.entries(a)){if(e==="player"&&t.length===0&&$N.has(s)||YN(s,a))continue;const o=[...t,s];if(XN(r)){const l=`${e}:${o.join(".")}`;i.push({id:l,label:o.join("."),category:o[0]??e,scope:e,path:o,read(c){return KN(c,o)},format:qN});continue}od(r,e,o,i)}}function jN(n){const e=new Set;return n.filter(t=>e.has(t.id)?!1:(e.add(t.id),!0))}function ZN(n,e){const t=[];return n&&od(n,"player",[],t),e&&od(e,"team",[],t),jN(t).sort((i,a)=>i.label.localeCompare(a.label))}function JN(){return ZN(Cv(),Zs())}function Ko(n){return JN()}function Qv(n){return n.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function QN(n){return Qv(n).split(" ").filter(Boolean)}function ek(n,e){const t=QN(e);if(t.length===0)return 0;const i=Qv([n.scope,n.category,n.label,n.id,...n.path].join(" "));let a=0;for(const s of t){const r=i.indexOf(s);if(r<0)return null;a+=r}return a+i.length/1e3}function tk(n,e){return n.map((t,i)=>({definition:t,index:i,score:ek(t,e)})).filter(t=>t.score!==null).sort((t,i)=>t.score-i.score||t.index-i.index).map(t=>t.definition)}function e0(n){if(!Number.isFinite(n))return"--";const e=Math.floor(Math.max(0,n)/60),t=Math.max(0,n)-e*60;return`${e}:${t.toFixed(1).padStart(4,"0")}`}class nk{constructor(e){this.options=e}statsWindows=new Map;nextStatsWindowId=1;getConfigs(){return[...this.statsWindows.values()].map(e=>({id:e.id,kind:e.kind,placement:this.options.readWindowPlacement(e.element),playerId:e.playerId,team:e.team,entries:e.entries.map(t=>({statId:t.statId,targetId:t.targetId}))}))}clear(){for(const e of this.statsWindows.values())e.element.remove();this.statsWindows.clear(),this.nextStatsWindowId=1}replaceFromConfig(e){this.clear();for(const t of e)this.create(t.kind,t)}render(e=this.options.getReplayPlayer()?.getState().frameIndex??0,t={}){for(const i of this.statsWindows.values())t.preserveOpenPickers&&(i.pickerOpen||i.element.contains(document.activeElement))||this.renderStatsWindow(i,e)}create(e,t){const i=t?.id??`stats-${this.nextStatsWindowId++}`,a=Number.parseInt(i.replace(/^stats-/,""),10);Number.isFinite(a)&&(this.nextStatsWindowId=Math.max(this.nextStatsWindowId,a+1));const{x:s,y:r}=this.getStatsWindowDefaultPosition(),o=document.createElement("section");o.className="stats-window",o.dataset.windowId=i,o.style.setProperty("--window-x",`${s}px`),o.style.setProperty("--window-y",`${r}px`),t&&this.options.applyWindowPlacement(o,t.placement);const l=document.createElement("header");l.className="stats-window-header";const c=document.createElement("div");c.className="stats-window-actions";const u=document.createElement("button");if(u.type="button",u.className="stats-window-action",u.textContent="Hide",c.append(u),this.hasStatsWindowScopeSelector(e))l.classList.add("stats-window-header-actions-only"),l.append(c);else{const h=document.createElement("h2");h.textContent=this.getStatsWindowTitle(e),l.append(h,c)}const d=document.createElement("div");d.className="stats-window-body",o.append(l,d),this.options.layer.append(o);const f={id:i,kind:e,entries:t?.entries.map(h=>({key:`${i}:${h.statId}:${h.targetId??"scope"}`,statId:h.statId,targetId:h.targetId}))??[],playerId:t?.playerId??this.options.getReplayPlayer()?.replay.players[0]?.id??null,team:t?.team??"blue",pickerOpen:!1,query:"",element:o,body:d};return u.addEventListener("click",()=>{o.hidden=!0,this.options.requestConfigSync()}),this.statsWindows.set(i,f),t||this.options.bringWindowToFront(o),this.options.setLauncherOpen(!1),this.renderStatsWindow(f),this.options.requestConfigSync(),f}getStatById(e){return this.options.getStatRegistry().find(t=>t.id===e)??null}getCurrentStatsFrame(e){const t=this.options.getStatsFrameLookup();return t?yt(t,e):null}getTeamSnapshot(e,t){return t==="blue"?e.team_zero??null:e.team_one??null}getTeamLabel(e){return e==="blue"?"Blue":"Orange"}getPlayerTeamClass(e){const t=this.options.getReplayPlayer()?.replay.players.find(i=>i.id===e);return t?Oa(t.isTeamZero):null}getTeamScopeClass(e){return Oa(e==="blue")}appendGroupedPlayerOptions(e,t){const i=this.options.getReplayPlayer()?.replay.players??[];for(const a of["blue","orange"]){const s=i.filter(o=>o.isTeamZero===(a==="blue"));if(s.length===0)continue;const r=document.createElement("optgroup");r.label=`${this.getTeamLabel(a)} team`;for(const o of s)r.append(new Option(o.name,o.id,o.id===t,o.id===t));e.append(r)}}getStatsWindowScopeTeamClass(e){return e.kind==="player"?this.getPlayerTeamClass(e.playerId):e.kind==="team"?this.getTeamScopeClass(e.team??"blue"):null}getStatTargetTeamClass(e,t){return e.scope==="player"?this.getPlayerTeamClass(t):this.getTeamScopeClass(t==="orange"?"orange":"blue")}getStatsWindowTitle(e){switch(e){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}hasStatsWindowScopeSelector(e){return e==="player"||e==="team"}hasStatsWindowStatPicker(e){return e!=="goals-overview"}getStatsWindowAllowedScope(e){switch(e){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}getStatsWindowDefaultPosition(){const e=this.statsWindows.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+e)),y:Math.max(64,Math.min(window.innerHeight-240,96+e))}}renderStatsWindow(e,t=this.options.getReplayPlayer()?.getState().frameIndex??0){const i=document.activeElement,a=i instanceof HTMLInputElement&&i.dataset.statsWindowSearch===e.id,s=a?i.selectionStart:null,r=a?i.selectionEnd:null,o=a?i.selectionDirection:null;if(e.body.replaceChildren(),this.renderStatsWindowScope(e),this.hasStatsWindowStatPicker(e.kind)&&(this.renderStatsWindowAddControl(e),this.renderStatsWindowPicker(e)),this.renderStatsWindowEntries(e,t),a){const l=e.body.querySelector(`input[data-stats-window-search="${e.id}"]`);l?.focus({preventScroll:!0}),l&&s!==null&&r!==null&&l.setSelectionRange(s,r,o??"none")}}renderStatsWindowScope(e){if(e.kind!=="player"&&e.kind!=="team")return;const t=document.createElement("div");t.className="stats-window-scope-row";const i=document.createElement("select");i.className="stats-window-scope-select";const a=this.getStatsWindowScopeTeamClass(e);a&&i.classList.add(a),i.setAttribute("aria-label",e.kind==="player"?"Player stats target":"Team stats target"),e.kind==="player"?(this.appendGroupedPlayerOptions(i,e.playerId),i.value=e.playerId??"",i.addEventListener("change",()=>{e.playerId=i.value||null,this.renderStatsWindow(e),this.options.requestConfigSync()})):(i.append(new Option("Blue","blue",e.team==="blue",e.team==="blue"),new Option("Orange","orange",e.team==="orange",e.team==="orange")),i.value=e.team??"blue",i.addEventListener("change",()=>{e.team=i.value==="orange"?"orange":"blue",this.renderStatsWindow(e),this.options.requestConfigSync()})),t.append(i),e.body.append(t)}renderStatsWindowAddControl(e){const t=document.createElement("button");if(t.type="button",t.className="stats-window-add-button",t.textContent="+",t.title="Add stat",t.setAttribute("aria-label","Add stat"),t.setAttribute("aria-expanded",String(e.pickerOpen)),this.activateButton(t,()=>{e.pickerOpen=!e.pickerOpen,this.renderStatsWindow(e)}),this.hasStatsWindowScopeSelector(e.kind)){e.body.querySelector(".stats-window-scope-row")?.append(t);return}const i=document.createElement("div");i.className="stats-window-toolbar",i.append(t),e.body.append(i)}activateButton(e,t){let i=!1;e.addEventListener("pointerdown",a=>{e.disabled||(i=!0,a.preventDefault(),t())}),e.addEventListener("click",()=>{if(i){i=!1;return}e.disabled||t()})}renderStatsWindowPicker(e){const t=document.createElement("div");if(t.className="stats-window-picker",t.hidden=!e.pickerOpen,t.hidden){e.body.append(t);return}const i=this.getStatsWindowAllowedScope(e.kind),a=document.createElement("input");a.type="search",a.placeholder="Search stats",a.value=e.query,a.dataset.statsWindowSearch=e.id;const s=document.createElement("div");s.className="stats-window-picker-list",a.addEventListener("input",()=>{e.query=a.value,this.renderStatsWindowPickerList(e,s,i)}),this.renderStatsWindowPickerList(e,s,i),t.append(a,s),e.body.append(t)}renderStatsWindowPickerList(e,t,i){t.replaceChildren();const a=this.options.getStatRegistry(),s=i?a.filter(l=>l.scope===i):a,r=tk(s,e.query),o=new Map;for(const l of r){const c=o.get(l.category)??[];c.push(l),o.set(l.category,c)}for(const[l,c]of o){if(c.length<2)continue;const u=document.createElement("button");u.type="button",u.className="stats-window-picker-item",u.innerHTML=`<span>Add all ${l}</span><strong>${c.length}</strong>`,this.activateButton(u,()=>{for(const d of c)this.addStatToWindow(e,d);this.renderStatsWindow(e),this.options.requestConfigSync()}),t.append(u)}for(const l of r){const c=document.createElement("button");c.type="button",c.className="stats-window-picker-item",c.innerHTML=`<span>${l.label}</span><strong>${l.scope}</strong>`,c.disabled=e.kind!=="ad-hoc"&&e.entries.some(u=>u.statId===l.id),this.activateButton(c,()=>{this.addStatToWindow(e,l),this.renderStatsWindow(e),this.options.requestConfigSync()}),t.append(c)}if(r.length===0){const l=document.createElement("p");l.className="stat-window-empty",l.textContent=a.length===0?"No stats available.":"No matching stats.",t.append(l)}}addStatToWindow(e,t){const i=e.kind==="ad-hoc"?this.getDefaultAdHocTargetId(t):void 0;e.entries.some(a=>a.statId===t.id&&a.targetId===i)||e.entries.push({key:`${e.id}:${t.id}:${i??"scope"}`,statId:t.id,targetId:i})}getDefaultAdHocTargetId(e){return e.scope==="player"?this.options.getReplayPlayer()?.replay.players[0]?.id??"":"blue"}removeStatFromWindow(e,t){const i=e.entries.findIndex(a=>a.key===t);i>=0&&e.entries.splice(i,1)}renderStatsWindowEntries(e,t){if(e.kind==="goals-overview"){this.renderGoalLabelsOverview(e);return}const i=this.getStatsWindowAllowedScope(e.kind),a=e.entries.map(r=>({entry:r,definition:this.getStatById(r.statId)})).filter(r=>r.definition!==null&&(!i||r.definition.scope===i));if(a.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent="No stats added.",e.body.append(r);return}const s=this.getCurrentStatsFrame(t);if(!s){const r=document.createElement("p");r.className="stat-window-empty",r.textContent="Load a replay to show stats.",e.body.append(r);return}if(e.kind==="all-players"){this.renderAllPlayersStats(e,s,a);return}if(e.kind==="all-teams"){this.renderAllTeamsStats(e,s,a);return}if(e.kind==="player"){const r=e.playerId?s.players.find(o=>Wt(o.player_id)===e.playerId)??null:null;this.renderScopedStatList(e,r,a);return}if(e.kind==="team"){this.renderScopedStatList(e,this.getTeamSnapshot(s,e.team??"blue"),a);return}e.kind==="ad-hoc"&&this.renderAdHocStats(e,s,a)}renderGoalLabelsOverview(e){const t=this.options.getStatsTimeline(),i=this.options.getReplayPlayer()?.replay??null;if(!t||!i){this.appendStatsWindowEmpty(e,"Load a replay to show goal labels.");return}const a=[...t.events.goal_context??[]].sort((o,l)=>o.time-l.time),s=a.map((o,l)=>l);if(s.length===0){this.appendStatsWindowEmpty(e,"No goals loaded.");return}const r=document.createElement("div");r.className="goal-label-list";for(const o of s){const l=a[o]??null,c=[...l?.tags??[]].sort((T,A)=>T.kind.localeCompare(A.kind)||A.metadata.confidence-T.metadata.confidence),u=l?.time??0,d=l?.scorer??null,f=d?Wt(d):null,h=d?i.players.find(T=>T.id===f)?.name??f:"Unknown scorer",_=l?.scoring_team_is_team_0??null,g=document.createElement("section");g.className="goal-label-item",_!==null&&g.classList.add(Oa(_));const m=document.createElement("header"),p=document.createElement("h3");p.textContent=`Goal ${o+1}`;const y=document.createElement("span");y.textContent=`${e0(u)} · ${h}`,m.append(p,y);const x=document.createElement("div");if(x.className="goal-label-tags",c.length===0){const T=document.createElement("span");T.className="goal-label-tag goal-label-tag-empty",T.textContent="Unlabeled",x.append(T)}else for(const T of c){const A=document.createElement("span");A.className="goal-label-tag",A.textContent=`${Ii(T.kind)} ${Math.round(T.metadata.confidence*100)}%`,x.append(A)}const S=document.createElement("div");S.className="goal-label-actions";const C=document.createElement("button");C.type="button",C.className="goal-label-watch",C.textContent="Watch",C.addEventListener("click",()=>{this.options.watchGoalReplay(u,f)});const M=document.createElement("button");M.type="button",M.textContent="Cue",M.addEventListener("click",()=>{this.options.cueGoalReplay(u)}),S.append(C,M),g.append(m,x,S),r.append(g)}e.body.append(r)}appendStatsWindowEmpty(e,t){const i=document.createElement("p");i.className="stat-window-empty",i.textContent=t,e.body.append(i)}renderScopedStatList(e,t,i){const a=document.createElement("div");a.className="stats-window-stat-list";for(const{entry:s,definition:r}of i)a.append(this.renderStatRow(e,s,r,t?r.format(r.read(t)):"--"));e.body.append(a)}renderAllPlayersStats(e,t,i){const a=document.createElement("div");a.className="stats-window-team-list";for(const s of["blue","orange"]){const r=t.players.filter(f=>f.is_team_0===(s==="blue"));if(r.length===0)continue;const o=document.createElement("section");o.className=`stats-window-team-group ${this.getTeamScopeClass(s)}`;const l=document.createElement("header");l.className="stats-window-team-header";const c=document.createElement("h3");c.textContent=`${this.getTeamLabel(s)} team`;const u=document.createElement("span");u.textContent=`${r.length} player${r.length===1?"":"s"}`,l.append(c,u),o.append(l);const d=document.createElement("div");d.className="stats-window-entity-list";for(const f of r){const h=document.createElement("section");h.className=`stats-window-entity ${Oa(f.is_team_0)}`;const _=document.createElement("h4");_.className="stats-window-entity-title",_.textContent=f.name,h.append(_);for(const{entry:g,definition:m}of i)h.append(this.renderStatRow(e,g,m,m.format(m.read(f))));d.append(h)}o.append(d),a.append(o)}e.body.append(a)}renderAllTeamsStats(e,t,i){const a=document.createElement("div");a.className="stats-window-entity-list";for(const s of["blue","orange"]){const r=this.getTeamSnapshot(t,s),o=document.createElement("section");o.className=`stats-window-entity ${this.getTeamScopeClass(s)}`;const l=document.createElement("h3");l.className="stats-window-entity-title",l.textContent=this.getTeamLabel(s),o.append(l);for(const{entry:c,definition:u}of i)o.append(this.renderStatRow(e,c,u,r?u.format(u.read(r)):"--"));a.append(o)}e.body.append(a)}renderAdHocStats(e,t,i){const a=document.createElement("div");a.className="stats-window-stat-list";for(const{entry:s,definition:r}of i){const o=this.getAdHocTarget(t,r,s.targetId);a.append(this.renderStatRow(e,s,r,o?r.format(r.read(o)):"--"))}e.body.append(a)}getAdHocTarget(e,t,i){return t.scope==="player"?e.players.find(a=>Wt(a.player_id)===i)??e.players[0]??null:this.getTeamSnapshot(e,i==="orange"?"orange":"blue")}renderStatRow(e,t,i,a){const s=document.createElement("div");s.className="stats-window-stat-row";const r=document.createElement("span");if(r.className="stats-window-stat-name",r.textContent=i.label,e.kind==="ad-hoc"){const c=document.createElement("select");c.className="stats-window-stat-target";const u=this.getStatTargetTeamClass(i,t.targetId);u&&c.classList.add(u),i.scope==="player"?this.appendGroupedPlayerOptions(c,t.targetId):c.append(new Option("Blue","blue",t.targetId==="blue",t.targetId==="blue"),new Option("Orange","orange",t.targetId==="orange",t.targetId==="orange")),c.value=t.targetId??"",c.addEventListener("change",()=>{const d=c.value;if(e.entries.some(h=>h!==t&&h.statId===t.statId&&h.targetId===d)){this.renderStatsWindow(e);return}const f=e.entries.findIndex(h=>h.key===t.key);f>=0&&(e.entries[f]={key:`${e.id}:${t.statId}:${d}`,statId:t.statId,targetId:d}),this.renderStatsWindow(e),this.options.requestConfigSync()}),r.append(" ",c)}const o=document.createElement("span");o.className="stats-window-stat-value",o.textContent=a;const l=document.createElement("button");return l.type="button",l.className="stats-window-stat-remove",l.textContent="x",l.addEventListener("click",()=>{this.removeStatFromWindow(e,t.key),this.renderStatsWindow(e),this.options.requestConfigSync()}),s.append(r,o,l),s}}function ik(n){return new nk(n)}const ak=new Set(["module:touch","module:powerslide"]),Pm=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],sk="#d1d9e0",rk=[{id:"core",label:"Shots, saves, assists",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="demo")}}],ok=[];function lk({ctx:n,modules:e,activeTimelineEventSourceIds:t,activeMechanicTimelineKinds:i,toggleEventSource:a,setMechanicTimelineKind:s}){if(!n)return[];const r=[];for(const o of rk){const l=o.buildEvents(n),c=l.length;c!==0&&r.push({id:o.id,playlistId:`replay:${o.id}`,timelineKey:`events:${o.id}`,timelineId:`events:${o.id}`,group:"Replay",label:o.label,count:c,active:t.has(o.id),buildTimelineEvents(){return l},buildPlaylistEvents(){return l},setActive(u){a(o.id,u)}})}for(const o of e.filter(l=>l.getTimelineEvents)){const l=o.getTimelineEvents?.(n)??[],c=l.length;c!==0&&r.push({id:o.id,playlistId:`module:${o.id}`,timelineKey:`module:${o.id}`,timelineId:`module:${o.id}`,group:"Stats",label:o.label,count:c,active:t.has(o.id),buildTimelineEvents(){return l},buildPlaylistEvents(){return l},setActive(u){a(o.id,u)}})}for(const o of ok){const l=o.buildEvents(n),c=l.length;c!==0&&r.push({id:o.id,playlistId:`extra:${o.id}`,timelineKey:`extra:${o.id}`,timelineId:`extra:${o.id}`,group:"Stats",label:o.label,count:c,active:t.has(o.id),buildTimelineEvents(){return l},buildPlaylistEvents(){return l},setActive(u){a(o.id,u)}})}for(const o of Bv(n.statsTimeline)){const l=OL(n.statsTimeline,n.replay,[o]),c=UL(n.statsTimeline,n.replay,[o]),u=aI(n.statsTimeline,n.replay,[o]),d=l.length+u.length;d!==0&&r.push({id:`mechanic:${o}`,playlistId:`mechanic:${o}`,timelineKey:`mechanic:${o}`,timelineId:`mechanic:${o}`,group:"Event types",label:Ii(o),count:d,active:i.has(o),buildTimelineEvents(){return l},buildPlaylistEvents(){return c},buildTimelineRanges(){return u},setActive(f){s(o,f)}})}return r.sort((o,l)=>o.label.localeCompare(l.label))}function ck(n,e){if(!n)return[];const t=[{id:"replay:goals",group:"Replay",label:"Goals",events:n.replay.timelineEvents.filter(a=>a.kind==="goal")}].filter(a=>a.events.length>0),i=e.map(a=>({id:a.playlistId,group:a.group,label:a.label,events:a.buildPlaylistEvents()})).filter(a=>a.events.length>0);return[...t,...i]}function ld(n,e){const t=n.map(i=>i.id);return e===null?new Set(t.filter(i=>!ak.has(i))):new Set(t.filter(i=>e.has(i)))}function uk(n,e){const t=n.playerId??null,i=t?e.findIndex(a=>a.id===t):-1;return i>=0?Pm[i%Pm.length]:n.color??sk}function dk({sources:n,activeSourceIds:e,replayPlayers:t}){const i=ld(n,e);return n.filter(a=>i.has(a.id)).flatMap(a=>a.events.map((s,r)=>({key:`${a.id}:${s.id??`${s.kind}:${s.time}:${r}`}`,sourceId:a.id,sourceLabel:a.label,event:s,color:uk(s,t)}))).sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:(a.event.label??a.sourceLabel).localeCompare(s.event.label??s.sourceLabel))}class fk{constructor(e){this.options=e}getSources(e=this.options.getContext()){return lk({ctx:e,modules:this.options.modules,activeTimelineEventSourceIds:this.options.getActiveTimelineEventSourceIds(),activeMechanicTimelineKinds:this.options.getActiveMechanicTimelineKinds(),toggleEventSource:this.options.toggleEventSource,setMechanicTimelineKind:this.options.setMechanicTimelineKind})}countVisibleSources(e){return e.replay.timelineEvents.filter(i=>i.kind==="goal").length+this.getSources(e).filter(i=>i.active).reduce((i,a)=>i+a.count,0)}render(){const{body:e}=this.options;e.replaceChildren();const t=this.getSources();if(t.length===0){const d=document.createElement("p");d.className="stat-window-empty",d.textContent="No events loaded.",e.append(d);return}const i=document.createElement("div");i.className="mechanics-actions";const a=document.createElement("button");a.type="button",a.className="module-summary-item",a.addEventListener("click",()=>{for(const d of t)d.setActive(!0);this.options.setupActiveModules(),this.options.syncTimelineEvents(),this.options.syncTimelineRanges(),this.render(),this.options.renderModuleSummary(),this.options.renderModuleSettings(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()});const s=document.createElement("span");s.textContent="All events";const r=document.createElement("strong");r.textContent=`${t.length}`,a.append(s,r);const o=document.createElement("button");o.type="button",o.className="module-summary-item",o.addEventListener("click",()=>{for(const d of t)d.setActive(!1);this.options.setupActiveModules(),this.options.syncTimelineEvents(),this.options.syncTimelineRanges(),this.render(),this.options.renderModuleSummary(),this.options.renderModuleSettings(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()});const l=document.createElement("span");l.textContent="No events";const c=document.createElement("strong");c.textContent="Off",o.append(l,c),i.append(a,o),e.append(i);const u=this.renderSourceList(t);u&&e.append(u)}renderSourceList(e){if(e.length===0)return null;const t=document.createElement("div");t.className="module-list mechanics-list mechanics-event-list",t.style.setProperty("--event-source-columns",`${hk(e.length)}`);for(const i of e){const a=document.createElement("button");a.type="button",a.className="module-summary-item",a.dataset.active=i.active?"true":"false",a.setAttribute("aria-pressed",i.active?"true":"false"),a.addEventListener("click",()=>{i.setActive(!i.active),this.options.syncTimelineEvents(),this.options.syncTimelineRanges(),this.render(),this.options.renderTimelineEventCount()});const s=document.createElement("span");s.textContent=i.label;const r=document.createElement("strong");r.textContent=`${i.active?"On":"Off"} ${i.count}`,a.append(s,r),t.append(a)}return t}}function hk(n){return window.innerWidth<640?1:window.innerWidth<900?n>=7?2:1:n>=13?3:n>=7?2:1}function pk(n){return new fk(n)}const mk=new Set(["ceiling-shot","fifty-fifty","pressure",Xv,"absolute-positioning","speed-flip","touch"]),Lm="touch";class _k{constructor(e){this.options=e}renderSummary(){const{summary:e}=this.options.elements;e.replaceChildren();const t=[],i=[];for(const a of this.options.modules){const s=mk.has(a.id);!a.getTimelineEvents&&!a.getTimelineRanges&&!s||(a.getTimelineEvents&&t.push(this.renderCapabilityToggle(a.id,kc(a,"events"),"events")),a.getTimelineRanges&&t.push(this.renderCapabilityToggle(a.id,kc(a,"ranges"),"ranges")),s&&i.push(this.renderCapabilityToggle(a.id,kc(a,"effects"),"effects")))}i.push(this.renderBoostPickupAnimationToggle()),i.push(this.renderBoostPadOverlayToggle()),e.append(Im("Timeline visualizations",t),Im("In-game visualizations",i))}renderSettings(){const{settings:e}=this.options.elements;e.replaceChildren();const t=this.options.getContext(),i=this.options.getActiveModules().filter(a=>a.id!=="boost"&&a.id!==Lm).map(a=>a.renderSettings?.(t)??null).filter(a=>a instanceof HTMLElement);if(i.length===0){e.hidden=!0,this.renderBoostPickupFiltersWindow(),this.renderTouchControlsWindow();return}e.hidden=!1,e.append(...i),this.renderBoostPickupFiltersWindow(),this.renderTouchControlsWindow()}renderBoostPickupAnimationToggle(){const e=this.options.getBoostPickupAnimationEnabled(),t=document.createElement("button");t.type="button",t.className="module-summary-item",t.dataset.active=e?"true":"false",t.setAttribute("aria-pressed",e?"true":"false"),t.addEventListener("click",this.options.toggleBoostPickupAnimation);const i=document.createElement("span");i.textContent="Boost pickup animation";const a=document.createElement("strong");return a.textContent=e?"On":"Off",t.append(i,a),t}renderBoostPadOverlayToggle(){const e=this.options.getBoostPadOverlayEnabled(),t=document.createElement("button");t.type="button",t.className="module-summary-item",t.dataset.active=e?"true":"false",t.setAttribute("aria-pressed",e?"true":"false"),t.addEventListener("click",this.options.toggleBoostPadOverlay);const i=document.createElement("span");i.textContent="Boost pad locations";const a=document.createElement("strong");return a.textContent=e?"On":"Off",t.append(i,a),t}renderCapabilityToggle(e,t,i){const s=this.options.getActiveCapabilityIds(i).has(e),r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=s?"true":"false",r.setAttribute("aria-pressed",s?"true":"false"),r.addEventListener("click",()=>{this.options.toggleCapability(e,i,!this.options.getActiveCapabilityIds(i).has(e))});const o=document.createElement("span");o.textContent=t;const l=document.createElement("strong");return l.textContent=s?"On":"Off",r.append(o,l),r}renderBoostPickupFiltersWindow(){const e=this.options.getContext(),t=this.options.boostPickupFilters.renderSettings(e,{showHeader:!1});this.options.elements.boostPickupFilters.replaceChildren(t)}renderTouchControlsWindow(){const e=this.options.getContext(),i=this.options.modules.find(a=>a.id===Lm)?.renderSettings?.(e)??null;this.options.elements.touchControls.replaceChildren(),i instanceof HTMLElement&&this.options.elements.touchControls.append(i)}}function Im(n,e){const t=document.createElement("section");t.className="module-summary-group";const i=document.createElement("h3");i.textContent=n;const a=document.createElement("div");return a.className="module-list",a.append(...e),t.append(i,a),t}function kc(n,e){const t={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge refresh","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[n.id]??n.label:t[`${n.id}:${e}`]??`${n.label} timeline`}function gk(n){return new _k(n)}var Ot=Uint8Array,un=Uint16Array,af=Int32Array,fl=new Ot([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),hl=new Ot([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),cd=new Ot([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),t0=function(n,e){for(var t=new un(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var a=new af(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)a[s]=s-t[i]<<5|i;return{b:t,r:a}},n0=t0(fl,2),i0=n0.b,ud=n0.r;i0[28]=258,ud[258]=28;var a0=t0(hl,0),vk=a0.b,Nm=a0.r,dd=new un(32768);for(var pt=0;pt<32768;++pt){var vi=(pt&43690)>>1|(pt&21845)<<1;vi=(vi&52428)>>2|(vi&13107)<<2,vi=(vi&61680)>>4|(vi&3855)<<4,dd[pt]=((vi&65280)>>8|(vi&255)<<8)>>1}var Xn=(function(n,e,t){for(var i=n.length,a=0,s=new un(e);a<i;++a)n[a]&&++s[n[a]-1];var r=new un(e);for(a=1;a<e;++a)r[a]=r[a-1]+s[a-1]<<1;var o;if(t){o=new un(1<<e);var l=15-e;for(a=0;a<i;++a)if(n[a])for(var c=a<<4|n[a],u=e-n[a],d=r[n[a]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)o[dd[d]>>l]=c}else for(o=new un(i),a=0;a<i;++a)n[a]&&(o[a]=dd[r[n[a]-1]++]>>15-n[a]);return o}),Ni=new Ot(288);for(var pt=0;pt<144;++pt)Ni[pt]=8;for(var pt=144;pt<256;++pt)Ni[pt]=9;for(var pt=256;pt<280;++pt)Ni[pt]=7;for(var pt=280;pt<288;++pt)Ni[pt]=8;var Qs=new Ot(32);for(var pt=0;pt<32;++pt)Qs[pt]=5;var yk=Xn(Ni,9,0),bk=Xn(Ni,9,1),Sk=Xn(Qs,5,0),xk=Xn(Qs,5,1),Dc=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},xn=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},Fc=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},sf=function(n){return(n+7)/8|0},pl=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new Ot(n.subarray(e,t))},wk=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Bn=function(n,e,t){var i=new Error(e||wk[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Bn),!t)throw i;return i},Ek=function(n,e,t,i){var a=n.length,s=0;if(!a||e.f&&!e.l)return t||new Ot(0);var r=!t,o=r||e.i!=2,l=e.i;r&&(t=new Ot(a*3));var c=function(ke){var at=t.length;if(ke>at){var I=new Ot(Math.max(at*2,ke));I.set(t),t=I}},u=e.f||0,d=e.p||0,f=e.b||0,h=e.l,_=e.d,g=e.m,m=e.n,p=a*8;do{if(!h){u=xn(n,d,1);var y=xn(n,d+1,3);if(d+=3,y)if(y==1)h=bk,_=xk,g=9,m=5;else if(y==2){var M=xn(n,d,31)+257,T=xn(n,d+10,15)+4,A=M+xn(n,d+5,31)+1;d+=14;for(var b=new Ot(A),v=new Ot(19),R=0;R<T;++R)v[cd[R]]=xn(n,d+R*3,7);d+=T*3;for(var N=Dc(v),z=(1<<N)-1,B=Xn(v,N,1),R=0;R<A;){var G=B[xn(n,d,z)];d+=G&15;var x=G>>4;if(x<16)b[R++]=x;else{var U=0,X=0;for(x==16?(X=3+xn(n,d,3),d+=2,U=b[R-1]):x==17?(X=3+xn(n,d,7),d+=3):x==18&&(X=11+xn(n,d,127),d+=7);X--;)b[R++]=U}}var V=b.subarray(0,M),Q=b.subarray(M);g=Dc(V),m=Dc(Q),h=Xn(V,g,1),_=Xn(Q,m,1)}else Bn(1);else{var x=sf(d)+4,S=n[x-4]|n[x-3]<<8,C=x+S;if(C>a){l&&Bn(0);break}o&&c(f+S),t.set(n.subarray(x,C),f),e.b=f+=S,e.p=d=C*8,e.f=u;continue}if(d>p){l&&Bn(0);break}}o&&c(f+131072);for(var de=(1<<g)-1,K=(1<<m)-1,ce=d;;ce=d){var U=h[Fc(n,d)&de],Se=U>>4;if(d+=U&15,d>p){l&&Bn(0);break}if(U||Bn(2),Se<256)t[f++]=Se;else if(Se==256){ce=d,h=null;break}else{var ve=Se-254;if(Se>264){var R=Se-257,he=fl[R];ve=xn(n,d,(1<<he)-1)+i0[R],d+=he}var O=_[Fc(n,d)&K],q=O>>4;O||Bn(3),d+=O&15;var Q=vk[q];if(q>3){var he=hl[q];Q+=Fc(n,d)&(1<<he)-1,d+=he}if(d>p){l&&Bn(0);break}o&&c(f+131072);var ee=f+ve;if(f<Q){var be=s-Q,ge=Math.min(Q,ee);for(be+f<0&&Bn(3);f<ge;++f)t[f]=i[be+f]}for(;f<ee;++f)t[f]=t[f-Q]}}e.l=h,e.p=ce,e.b=f,e.f=u,h&&(u=1,e.m=g,e.d=_,e.n=m)}while(!u);return f!=t.length&&r?pl(t,0,f):t.subarray(0,f)},ai=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},Ss=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},Oc=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var a=t.length,s=t.slice();if(!a)return{t:r0,l:0};if(a==1){var r=new Ot(t[0].s+1);return r[t[0].s]=1,{t:r,l:1}}t.sort(function(C,M){return C.f-M.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,u=1,d=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=a-1;)o=t[t[c].f<t[d].f?c++:d++],l=t[c!=u&&t[c].f<t[d].f?c++:d++],t[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var f=s[0].s,i=1;i<a;++i)s[i].s>f&&(f=s[i].s);var h=new un(f+1),_=fd(t[u-1],h,0);if(_>e){var i=0,g=0,m=_-e,p=1<<m;for(s.sort(function(M,T){return h[T.s]-h[M.s]||M.f-T.f});i<a;++i){var y=s[i].s;if(h[y]>e)g+=p-(1<<_-h[y]),h[y]=e;else break}for(g>>=m;g>0;){var x=s[i].s;h[x]<e?g-=1<<e-h[x]++-1:++i}for(;i>=0&&g;--i){var S=s[i].s;h[S]==e&&(--h[S],++g)}_=e}return{t:new Ot(h),l:_}},fd=function(n,e,t){return n.s==-1?Math.max(fd(n.l,e,t+1),fd(n.r,e,t+1)):e[n.s]=t},km=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new un(++e),i=0,a=n[0],s=1,r=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==a&&o!=e)++s;else{if(!a&&s>2){for(;s>138;s-=138)r(32754);s>2&&(r(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(r(a),--s;s>6;s-=6)r(8304);s>2&&(r(s-3<<5|8208),s=0)}for(;s--;)r(a);s=1,a=n[o]}return{c:t.subarray(0,i),n:e}},xs=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},s0=function(n,e,t){var i=t.length,a=sf(e+2);n[a]=i&255,n[a+1]=i>>8,n[a+2]=n[a]^255,n[a+3]=n[a+1]^255;for(var s=0;s<i;++s)n[a+s+4]=t[s];return(a+4+i)*8},Dm=function(n,e,t,i,a,s,r,o,l,c,u){ai(e,u++,t),++a[256];for(var d=Oc(a,15),f=d.t,h=d.l,_=Oc(s,15),g=_.t,m=_.l,p=km(f),y=p.c,x=p.n,S=km(g),C=S.c,M=S.n,T=new un(19),A=0;A<y.length;++A)++T[y[A]&31];for(var A=0;A<C.length;++A)++T[C[A]&31];for(var b=Oc(T,7),v=b.t,R=b.l,N=19;N>4&&!v[cd[N-1]];--N);var z=c+5<<3,B=xs(a,Ni)+xs(s,Qs)+r,G=xs(a,f)+xs(s,g)+r+14+3*N+xs(T,v)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&z<=B&&z<=G)return s0(e,u,n.subarray(l,l+c));var U,X,V,Q;if(ai(e,u,1+(G<B)),u+=2,G<B){U=Xn(f,h,0),X=f,V=Xn(g,m,0),Q=g;var de=Xn(v,R,0);ai(e,u,x-257),ai(e,u+5,M-1),ai(e,u+10,N-4),u+=14;for(var A=0;A<N;++A)ai(e,u+3*A,v[cd[A]]);u+=3*N;for(var K=[y,C],ce=0;ce<2;++ce)for(var Se=K[ce],A=0;A<Se.length;++A){var ve=Se[A]&31;ai(e,u,de[ve]),u+=v[ve],ve>15&&(ai(e,u,Se[A]>>5&127),u+=Se[A]>>12)}}else U=yk,X=Ni,V=Sk,Q=Qs;for(var A=0;A<o;++A){var he=i[A];if(he>255){var ve=he>>18&31;Ss(e,u,U[ve+257]),u+=X[ve+257],ve>7&&(ai(e,u,he>>23&31),u+=fl[ve]);var O=he&31;Ss(e,u,V[O]),u+=Q[O],O>3&&(Ss(e,u,he>>5&8191),u+=hl[O])}else Ss(e,u,U[he]),u+=X[he]}return Ss(e,u,U[256]),u+X[256]},Mk=new af([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),r0=new Ot(0),Tk=function(n,e,t,i,a,s){var r=s.z||n.length,o=new Ot(i+r+5*(1+Math.ceil(r/7e3))+a),l=o.subarray(i,o.length-a),c=s.l,u=(s.r||0)&7;if(e){u&&(l[0]=s.r>>3);for(var d=Mk[e-1],f=d>>13,h=d&8191,_=(1<<t)-1,g=s.p||new un(32768),m=s.h||new un(_+1),p=Math.ceil(t/3),y=2*p,x=function(st){return(n[st]^n[st+1]<<p^n[st+2]<<y)&_},S=new af(25e3),C=new un(288),M=new un(32),T=0,A=0,b=s.i||0,v=0,R=s.w||0,N=0;b+2<r;++b){var z=x(b),B=b&32767,G=m[z];if(g[B]=G,m[z]=B,R<=b){var U=r-b;if((T>7e3||v>24576)&&(U>423||!c)){u=Dm(n,l,0,S,C,M,A,v,N,b-N,u),v=T=A=0,N=b;for(var X=0;X<286;++X)C[X]=0;for(var X=0;X<30;++X)M[X]=0}var V=2,Q=0,de=h,K=B-G&32767;if(U>2&&z==x(b-K))for(var ce=Math.min(f,U)-1,Se=Math.min(32767,b),ve=Math.min(258,U);K<=Se&&--de&&B!=G;){if(n[b+V]==n[b+V-K]){for(var he=0;he<ve&&n[b+he]==n[b+he-K];++he);if(he>V){if(V=he,Q=K,he>ce)break;for(var O=Math.min(K,he-2),q=0,X=0;X<O;++X){var ee=b-K+X&32767,be=g[ee],ge=ee-be&32767;ge>q&&(q=ge,G=ee)}}}B=G,G=g[B],K+=B-G&32767}if(Q){S[v++]=268435456|ud[V]<<18|Nm[Q];var ke=ud[V]&31,at=Nm[Q]&31;A+=fl[ke]+hl[at],++C[257+ke],++M[at],R=b+V,++T}else S[v++]=n[b],++C[n[b]]}}for(b=Math.max(b,R);b<r;++b)S[v++]=n[b],++C[n[b]];u=Dm(n,l,c,S,C,M,A,v,N,b-N,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=m,s.p=g,s.i=b,s.w=R)}else{for(var b=s.w||0;b<r+c;b+=65535){var I=b+65535;I>=r&&(l[u/8|0]=c,I=r),u=s0(l,u+1,n.subarray(b,I))}s.i=r}return pl(o,0,i+sf(u)+a)},Ck=function(n,e,t,i,a){if(!a&&(a={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),r=new Ot(s.length+n.length);r.set(s),r.set(n,s.length),n=r,a.w=s.length}return Tk(n,e.level==null?6:e.level,e.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,a)};function Ak(n,e){return Ck(n,e||{},0,0)}function o0(n,e){return Ek(n,{i:2},e,e)}var Fm=typeof TextEncoder<"u"&&new TextEncoder,hd=typeof TextDecoder<"u"&&new TextDecoder,Rk=0;try{hd.decode(r0,{stream:!0}),Rk=1}catch{}var Pk=function(n){for(var e="",t=0;;){var i=n[t++],a=(i>127)+(i>223)+(i>239);if(t+a>n.length)return{s:e,r:pl(n,t-1)};a?a==3?(i=((i&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):a&1?e+=String.fromCharCode((i&31)<<6|n[t++]&63):e+=String.fromCharCode((i&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(i)}};function Lk(n,e){var t;if(Fm)return Fm.encode(n);for(var i=n.length,a=new Ot(n.length+(n.length>>1)),s=0,r=function(c){a[s++]=c},t=0;t<i;++t){if(s+5>a.length){var o=new Ot(s+8+(i-t<<1));o.set(a),a=o}var l=n.charCodeAt(t);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return pl(a,0,s)}function l0(n,e){var t;if(hd)return hd.decode(n);var i=Pk(n),a=i.s,t=i.r;return t.length&&Bn(8),a}const pd=1,md="cfg",Om="cfgDebug";function Ik(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function Nk(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function kk(n){return Ik(Ak(Lk(JSON.stringify(n)),{level:9}))}function Dk(n){let e;try{e=JSON.parse(l0(o0(Nk(n))))}catch(t){try{e=JSON.parse(n)}catch{throw new Error(`Invalid stats player config: ${t instanceof Error?t.message:String(t)}`)}}return zk(e)}function Fk(n){const e=c0(n);return e.selectedValue?Dk(e.selectedValue):null}function c0(n){const e=new URLSearchParams(rf(n.hash)),t=new URLSearchParams(n.search),i=e.getAll(md),a=t.getAll(md),s=i[0]?"hash":a[0]?"search":null,r=s==="hash"?i[0]:s==="search"?a[0]:null;return{search:n.search,hash:n.hash,searchParams:[...t.entries()],hashParams:[...e.entries()],searchValues:a,hashValues:i,selectedSource:s,selectedValue:r}}function Ok(n){const e=new URLSearchParams(n.search),t=new URLSearchParams(rf(n.hash)),i=e.get(Om)??t.get(Om);return i===""||i==="1"||i==="true"}function Uk(n,e){const t=new URL(n.href),i=new URLSearchParams(rf(t.hash));return i.set(md,kk(e)),t.hash=i.toString(),t}function rf(n){return n.startsWith("#")?n.slice(1):n}function Bk(n,e,t=120,i=100){const a=qo(n.viewport.width)??e.width,s=qo(n.viewport.height)??e.height,r=e.width/Math.max(1,a),o=e.height/Math.max(1,s),l=Math.max(8,e.width-t),c=Math.max(8,e.height-i);return{x:Um(n.x*r,8,l),y:Um(n.y*o,8,c)}}function zk(n){if(!gn(n)||n.version!==pd)throw new Error("Unsupported stats player config version");return{version:pd,playback:Vk(n.playback),camera:Gk(n.camera),overlays:Wk(n.overlays),recording:Hk(n.recording),singletonWindows:Xk(n.singletonWindows),statsWindows:Kk(n.statsWindows),moduleConfigs:gn(n.moduleConfigs)?n.moduleConfigs:{}}}function Hk(n){return gn(n)?{fps:$t(n.fps),playbackRate:$t(n.playbackRate)}:{}}function Vk(n){return gn(n)?{currentTime:$t(n.currentTime),playing:Rn(n.playing),rate:$t(n.rate),skipPostGoalTransitions:Rn(n.skipPostGoalTransitions),skipKickoffs:Rn(n.skipKickoffs)}:{}}function Gk(n){if(!gn(n))return{};const e={},t=n.mode==="follow"?"follow":n.mode==="free"?"free":void 0,i=n.freePreset==="overhead"?"overhead":n.freePreset==="side"?"side":n.freePreset===null?null:void 0,a=d0(n.attachedPlayerId),s=$t(n.distanceScale),r=Rn(n.ballCam),o=$k(n.customSettings);return t!==void 0&&(e.mode=t),i!==void 0&&(e.freePreset=i),a!==void 0&&(e.attachedPlayerId=a),s!==void 0&&(e.distanceScale=s),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function $k(n){if(n===null)return null;if(!gn(n))return;const e={},t=$t(n.fov),i=$t(n.height),a=$t(n.pitch),s=$t(n.distance),r=$t(n.stiffness),o=$t(n.swivelSpeed),l=$t(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function Wk(n){const e=gn(n)?n:{},t=Object.hasOwn(e,"pluginRenderEffects"),i=Object.hasOwn(e,"pluginHudOverlay");return{timelineEvents:ws(e.timelineEvents),timelineRanges:ws(e.timelineRanges),mechanics:ws(e.mechanics),renderEffects:ws(e.renderEffects),...t?{pluginRenderEffects:ws(e.pluginRenderEffects)}:{},...i?{pluginHudOverlay:Rn(e.pluginHudOverlay)??!1}:{},followedPlayerHud:Rn(e.followedPlayerHud)??!1,boostPads:Rn(e.boostPads)??!0,boostPickupAnimation:Rn(e.boostPickupAnimation)??!1,hitboxWireframes:Rn(e.hitboxWireframes)??!1,hitboxOnlyMode:Rn(e.hitboxOnlyMode)??!1}}function Xk(n){return Array.isArray(n)?n.map(e=>!gn(e)||!Yk(e.id)?null:{id:e.id,placement:u0(e.placement)}).filter(e=>e!==null):[]}function Kk(n){return Array.isArray(n)?n.map(e=>!gn(e)||typeof e.id!="string"||!jk(e.kind)?null:{id:e.id,kind:e.kind,placement:u0(e.placement),playerId:d0(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:qk(e.entries)}).filter(e=>e!==null):[]}function qk(n){return Array.isArray(n)?n.map(e=>!gn(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function u0(n){const e=gn(n)?n:{},t=gn(e.viewport)?e.viewport:{};return{x:$t(e.x)??8,y:$t(e.y)??8,viewport:{width:qo(t.width)??1,height:qo(t.height)??1},zIndex:$t(e.zIndex),visible:Rn(e.visible)??!0}}function Yk(n){return n==="camera"||n==="scoreboard"||n==="playback"||n==="recording"||n==="mechanics"||n==="event-playlist"||n==="mechanics-review"||n==="replay-loading"||n==="boost-pickups"||n==="touch-controls"}function jk(n){return n==="player"||n==="team"||n==="all-players"||n==="all-teams"||n==="goals-overview"||n==="ad-hoc"}function gn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function $t(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function qo(n){const e=$t(n);return e!==void 0&&e>0?e:void 0}function Rn(n){return typeof n=="boolean"?n:void 0}function d0(n){return n===null?null:typeof n=="string"?n:void 0}function ws(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function Um(n,e,t){return Math.min(t,Math.max(e,n))}const Zk=["camera","scoreboard","playback","recording","mechanics","event-playlist","mechanics-review","replay-loading","boost-pickups","touch-controls"];class Jk{constructor(e){this.options=e}nextZIndex=30;reset(){this.nextZIndex=30}bringToFront(e){e.style.zIndex=`${this.nextZIndex++}`}show(e){const t=this.mustWindow(e);t.hidden=!1,this.bringToFront(t),this.options.requestConfigSync()}toggle(e){const t=this.mustWindow(e);t.hidden=!t.hidden,t.hidden||this.bringToFront(t),this.options.requestConfigSync()}hide(e){const t=this.mustWindow(e);t.hidden=!0,this.options.requestConfigSync()}readPlacement(e){const t=Number.parseInt(e.style.zIndex,10);return{x:this.readCoordinate(e,"--window-x"),y:this.readCoordinate(e,"--window-y"),viewport:Bm(),zIndex:Number.isFinite(t)?t:void 0,visible:!e.hidden}}applyPlacement(e,t){const i=Bk(t,Bm());e.style.setProperty("--window-x",`${i.x}px`),e.style.setProperty("--window-y",`${i.y}px`),e.hidden=!t.visible,t.zIndex!==void 0&&(e.style.zIndex=`${t.zIndex}`,this.nextZIndex=Math.max(this.nextZIndex,t.zIndex+1))}getSingletonConfigs(){const e=[],t=this.options.getRoot();for(const i of Zk){const a=t.querySelector(`[data-window-id="${i}"]`);a&&e.push({id:i,placement:this.readPlacement(a)})}return e}applySingletonConfigs(e){const t=this.options.getRoot();for(const i of e){const a=t.querySelector(`[data-window-id="${i.id}"]`);a&&this.applyPlacement(a,i.placement)}}installDragging(e,t){e.addEventListener("pointerdown",i=>{if(!(i.target instanceof HTMLElement)||Qk(i.target))return;const a=i.target.closest("[data-window-id]");if(!a||a.hidden)return;this.bringToFront(a);const s=i.clientX,r=i.clientY,o=a.getBoundingClientRect(),l=i.pointerId;a.setPointerCapture(l),i.preventDefault();const c=d=>{const f=Math.max(8,Math.min(window.innerWidth-120,o.left+d.clientX-s)),h=Math.max(8,Math.min(window.innerHeight-100,o.top+d.clientY-r));a.style.setProperty("--window-x",`${f}px`),a.style.setProperty("--window-y",`${h}px`)},u=()=>{a.releasePointerCapture(l),a.removeEventListener("pointermove",c),a.removeEventListener("pointerup",u),a.removeEventListener("pointercancel",u),this.options.requestConfigSync()};a.addEventListener("pointermove",c),a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u)},{signal:t})}mustWindow(e){const t=this.options.getRoot().querySelector(`[data-window-id="${e}"]`);if(!t)throw new Error(`Missing window for id: ${e}`);return t}readCoordinate(e,t){const i=e.style.getPropertyValue(t).trim(),a=getComputedStyle(e).getPropertyValue(t).trim(),s=i||a,r=Number.parseFloat(s);if(Number.isFinite(r))return r;const o=e.getBoundingClientRect();return t==="--window-y"?o.top:o.left}}function Bm(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function Qk(n){return n instanceof Element&&!!n.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function eD(n){return new Jk(n)}class tD{constructor(e){this.options=e}activeSourceIds=null;autoFollow=!0;lastActiveKey=null;reset(){this.activeSourceIds=null,this.lastActiveKey=null}render(){this.options.body.replaceChildren();const e=this.options.getSources();if(e.length===0){const m=document.createElement("p");m.className="stat-window-empty",m.textContent=this.options.getReplayPlayer()?"No events loaded.":"Load a replay to see events.",this.options.body.append(m);return}const t=ld(e,this.activeSourceIds),i=dk({sources:e,activeSourceIds:this.activeSourceIds,replayPlayers:this.options.getReplayPlayer()?.replay.players??[]}),a=document.createElement("div");a.className="event-playlist-toolbar";const s=document.createElement("details");s.className="event-playlist-filter",s.dataset.noDrag="true";const r=document.createElement("summary");r.textContent=`Filters ${t.size}/${e.length}`,s.append(r);const o=document.createElement("div");o.className="event-playlist-filter-panel";const l=document.createElement("div");l.className="event-playlist-filter-actions";const c=document.createElement("button");c.type="button",c.textContent="All",c.addEventListener("click",()=>{this.activeSourceIds=new Set(e.map(p=>p.id)),this.lastActiveKey=null,this.render();const m=this.options.getReplayPlayer()?.getState();m&&this.syncTimeline(m)});const u=document.createElement("button");u.type="button",u.textContent="None",u.addEventListener("click",()=>{this.activeSourceIds=new Set,this.lastActiveKey=null,this.render()}),l.append(c,u),o.append(l);const d=new Map;for(const m of e){const p=d.get(m.group)??[];p.push(m),d.set(m.group,p)}for(const[m,p]of d){const y=document.createElement("section");y.className="event-playlist-filter-group";const x=document.createElement("h3");x.textContent=m,y.append(x);for(const S of p){const C=document.createElement("label");C.className="toggle event-playlist-filter-option";const M=document.createElement("input");M.type="checkbox",M.checked=t.has(S.id),M.addEventListener("change",()=>{this.setSourceSelection(e,A=>{M.checked?A.add(S.id):A.delete(S.id)})});const T=document.createElement("span");T.textContent=`${S.label} (${S.events.length})`,C.append(M,T),y.append(C)}o.append(y)}s.append(o);const f=document.createElement("label");f.className="toggle event-playlist-follow";const h=document.createElement("input");h.type="checkbox",h.checked=this.autoFollow,h.addEventListener("change",()=>{this.autoFollow=h.checked;const m=this.options.getReplayPlayer()?.getState();m&&this.syncTimeline(m,{forceScroll:!0})});const _=document.createElement("span");_.textContent="Auto-follow",f.append(h,_),a.append(s,f);const g=document.createElement("div");if(g.className="event-playlist-list",g.dataset.noDrag="true",i.length===0){const m=document.createElement("p");m.className="stat-window-empty",m.textContent="No event types selected.",g.append(m)}else for(const m of i){const p=document.createElement("button");p.type="button",p.className="event-playlist-item",p.dataset.eventKey=m.key,p.dataset.eventTime=`${m.event.time}`,p.style.setProperty("--event-color",m.color),p.addEventListener("click",()=>{this.options.cueTimelineEvent(m.event)});const y=document.createElement("span");y.className="event-playlist-time",y.textContent=this.options.formatTime(m.event.time);const x=document.createElement("span");x.className="event-playlist-main";const S=document.createElement("strong");S.textContent=m.event.label??m.sourceLabel;const C=document.createElement("span");C.textContent=[m.event.playerName??null,m.event.frame!==void 0?`frame ${m.event.frame}`:null,m.sourceLabel].filter(M=>!!M).join(" · "),x.append(S,C),p.append(y,x),g.append(p)}this.options.body.append(a,g)}syncTimeline(e,t={}){const i=this.options.body.querySelector(".event-playlist-list");if(!i)return;const a=this.getActiveItem(i,e.currentTime),s=a?.dataset.eventKey??null;s===this.lastActiveKey&&!t.forceScroll||(i.querySelectorAll(".event-playlist-item[data-active='true']").forEach(r=>{r.dataset.active="false"}),a&&(a.dataset.active="true",(this.autoFollow||t.forceScroll)&&a.scrollIntoView({block:"nearest"})),this.lastActiveKey=s)}setSourceSelection(e,t){const i=ld(e,this.activeSourceIds);t(i),this.activeSourceIds=i,this.lastActiveKey=null,this.render();const a=this.options.getReplayPlayer()?.getState();a&&this.syncTimeline(a)}getActiveItem(e,t){const i=[...e.querySelectorAll(".event-playlist-item")];if(i.length===0)return null;let a=i[0]??null,s=Number.POSITIVE_INFINITY;for(const r of i){const o=Number(r.dataset.eventTime);if(!Number.isFinite(o))continue;const l=Math.abs(o-t);l<s&&(s=l,a=r)}return a}}function nD(n){return new tD(n)}function iD(n){return{name:n.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await n.arrayBuffer())}}}function aD(n,e){return{name:n.name,preparingStatus:"Fetching replay...",async readBytes(){const t=await fetch(n.url,{...n.fetchInit,signal:e});if(!t.ok){const i=t.statusText?` ${t.statusText}`:"",a=n.kind==="ballchasing"&&[401,403,404].includes(t.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${n.url.href} (${t.status}${i})${a}`)}return new Uint8Array(await t.arrayBuffer())}}}async function sD(n,e){const t=await n.readBytes();return Pv(t,{reportEveryNFrames:100,onProgress:e})}async function rD(n,e,t){const{elements:i}=t;i.statusReadout.textContent=n.preparingStatus,i.fileInput.disabled=!0,t.getReplayLoadModal()?.show(n.name,n.preparingStatus),t.setTransportEnabled(!1),t.getCameraControlsController()?.syncAvailability(),i.emptyState.hidden=!1;const a=t.getUnsubscribe();a&&(a(),t.setUnsubscribe(null)),t.teardownActiveModules(),t.getReplayPlayer()?.destroy(),t.setReplayPlayer(null),t.setCanvasRecorder(null),t.setLoadedReplayName(null),t.setTimelineOverlay(null),t.setStatsTimeline(null),t.setStatsFrameLookup(null),t.setStatRegistry(Ko()),t.clearTimelineEventSources(),t.clearTimelineRangeSources(),t.clearStandalonePlugins(),t.clearRenderCaches(),t.resetEventPlaylistWindow(),t.renderScoreboard(),t.renderTimelineEventCount(),t.renderMechanicsTimelineControls(),t.renderEventPlaylistWindow(),t.renderModuleSettings(),t.syncRecordingWindow();try{i.statusReadout.textContent="Parsing replay...",t.getReplayLoadModal()?.show(n.name,"Parsing replay...");const s=await e,{replay:r}=s;t.setStatsTimeline(s.statsTimeline),t.setStatsFrameLookup(s.statsFrameLookup),t.setStatRegistry(Ko(null)),t.migrateMechanicBackedTimelineEventSelections();const o=uC({replayEventsLabel:"Replay",replayEvents:d=>t.withTimelineEventSeekTimes(t.getReplayTimelineEvents(d.replay))}),l=W1({onStatusChange:t.syncRecordingWindow});t.setCanvasRecorder(l);const c=t.getInitialConfig(),u=new a1(i.viewport,r,{initialPlaybackRate:c?.playback.rate,initialCameraDistanceScale:c?.camera.distanceScale??t.defaultCameraDistanceScale,initialCustomCameraSettings:c?.camera.customSettings??null,initialAttachedPlayerId:c?.camera.attachedPlayerId??null,initialCameraViewMode:c?.camera.mode,initialBallCamEnabled:c?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:c?.overlays.boostPickupAnimation??!1,initialHitboxWireframesEnabled:c?.overlays.hitboxWireframes??i.hitboxWireframes.checked,initialHitboxOnlyModeEnabled:c?.overlays.hitboxOnlyMode??i.hitboxOnlyMode.checked,initialSkipPostGoalTransitionsEnabled:i.skipPostGoalTransitions.checked,initialSkipKickoffsEnabled:i.skipKickoffs.checked,plugins:[m1(),z1({includePickup:t.includeBoostPickupAnimationPickup}),l,o]});if(t.setTimelineOverlay(o),t.setReplayPlayer(u),t.syncBoostPadOverlayPlugin(),t.setupActiveModules(),t.setUnsubscribe(u.subscribe(t.renderSnapshot)),c){t.setApplyingConfig(!0);try{t.applyConfigToReplayPlayer(c)}finally{t.setApplyingConfig(!1)}}t.getCameraControlsController()?.populateAttachedPlayerOptions(r.players),i.emptyState.hidden=!0,i.statusReadout.textContent=`Loaded ${n.name}`,t.setLoadedReplayName(n.name),i.playersReadout.textContent=r.players.map(d=>d.name).join(", "),i.framesReadout.textContent=`${r.frameCount}`,t.renderTimelineEventCount(),t.renderMechanicsTimelineControls(),t.resetEventPlaylistWindow(),t.renderEventPlaylistWindow(),t.setTransportEnabled(!0),t.getCameraControlsController()?.syncAvailability(u.getState()),t.renderSnapshot(u.getState()),t.renderStatsWindows(u.getState().frameIndex),t.renderScoreboard(u.getState().frameIndex),t.syncEventPlaylistTimeline(u.getState(),{forceScroll:!0}),t.renderModuleSettings(),t.syncRecordingWindow(),t.getReplayLoadModal()?.hide()}catch(s){throw t.getReplayLoadModal()?.hide(),t.getReplayPlayer()?.destroy(),t.setReplayPlayer(null),t.setCanvasRecorder(null),t.syncRecordingWindow(),s}finally{i.fileInput.disabled=!1}}function oD(n){if(n<=0)return"--";const e=["B","KB","MB","GB"];let t=n,i=0;for(;t>=1024&&i<e.length-1;)t/=1024,i+=1;const a=i===0?0:t>=10?1:2;return`${t.toFixed(a)} ${e[i]}`}function lD(n){if(!n)return"No replay";if(n.error)return n.error;switch(n.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function cD({fpsValue:n,playbackRateValue:e}){const t=Number(n),i=Number(e);return{fps:Number.isFinite(t)?Math.max(1,Math.min(120,Math.trunc(t))):60,playbackRate:Number.isFinite(i)?Math.max(.1,i):1}}function uD(n,e=new Date){const i=(n?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),a=e.toISOString().replace(/[:.]/g,"-");return`${i||"replay"}-${a}.webm`}function dD(n,e){const t=URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=e,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),0)}class fD{constructor(e){this.options=e}getConfigSnapshot(){const{elements:e}=this.options;return{fps:Number(e.fps.value),playbackRate:Number(e.playbackRate.value)}}applyConfig(e){const{elements:t}=this.options;e.fps!==void 0&&(t.fps.value=`${e.fps}`),e.playbackRate!==void 0&&(t.playbackRate.value=`${e.playbackRate}`)}sync(e=this.options.getCanvasRecorder()?.getStatus()??null){const{elements:t}=this.options,i=this.options.getCanvasRecorder()!==null&&this.options.getReplayPlayer()!==null,a=e?.state??"idle",s=a==="recording"||a==="stopping",r=(this.options.getCanvasRecorder()?.getRecording()??null)!==null;t.status.textContent=lD(e),t.elapsed.textContent=`${(e?.elapsedSeconds??0).toFixed(1)}s`,t.size.textContent=oD(e?.sizeBytes??0),t.type.textContent=e?.mimeType||"WebM",t.start.disabled=!i||s,t.fullReplay.disabled=!i||s,t.stop.disabled=!i||!s,t.download.disabled=!r||s,t.clear.disabled=!r||s,t.fps.disabled=s,t.playbackRate.disabled=s}installEventListeners(e){const{elements:t}=this.options;t.start.addEventListener("click",()=>{const i=this.options.getCanvasRecorder();if(i)try{const{fps:a}=this.getRecordingOptions();i.start({fps:a}),this.sync()}catch(a){console.error("Failed to start recording:",a),this.options.setStatus(a instanceof Error?a.message:"Failed to start recording"),this.sync(i.getStatus())}},{signal:e}),t.fullReplay.addEventListener("click",()=>{const i=this.options.getCanvasRecorder();if(!i)return;const{fps:a,playbackRate:s}=this.getRecordingOptions();i.recordFullReplay({fps:a,playbackRate:s,restorePlaybackState:!0}).catch(r=>{console.error("Failed to record replay:",r),this.options.setStatus(r instanceof Error?r.message:"Failed to record replay"),this.sync(this.options.getCanvasRecorder()?.getStatus()??null)}),this.sync()},{signal:e}),t.stop.addEventListener("click",()=>{this.options.getCanvasRecorder()?.stop().catch(i=>{console.error("Failed to stop recording:",i),this.options.setStatus(i instanceof Error?i.message:"Failed to stop recording")}),this.sync()},{signal:e}),t.download.addEventListener("click",()=>{const i=this.options.getCanvasRecorder()?.getRecording();i&&dD(i,uD(this.options.getLoadedReplayName()))},{signal:e}),t.clear.addEventListener("click",()=>{try{this.options.getCanvasRecorder()?.clear(),this.sync()}catch(i){console.error("Failed to clear recording:",i)}},{signal:e}),t.fps.addEventListener("change",this.options.requestConfigSync,{signal:e}),t.playbackRate.addEventListener("change",this.options.requestConfigSync,{signal:e})}getRecordingOptions(){const{elements:e}=this.options;return cD({fpsValue:e.fps.value,playbackRateValue:e.playbackRate.value})}}function hD(n){return new fD(n)}class pD{constructor(e){this.options=e}render(e=this.options.getReplayPlayer()?.getState().frameIndex??0){const{body:t}=this.options;t.replaceChildren();const i=this.options.getStatsFrameLookup(),a=i?yt(i,e):null,s=this.options.getReplayPlayer()?.replay??null;if(!a||!s){const o=document.createElement("p");o.className="scoreboard-empty",o.textContent="Load a replay to show the scoreboard.",t.append(o);return}const r=document.createElement("div");r.className="scoreboard-scoreline",r.append(zm(a.team_zero?.core.goals,!0),_D(),zm(a.team_one?.core.goals,!1)),t.append(r)}}function mD(n){return typeof n=="number"&&Number.isFinite(n)?`${Math.round(n)}`:"--"}function _D(){const n=document.createElement("span");return n.className="scoreboard-divider",n.textContent="-",n}function zm(n,e){const t=document.createElement("strong");return t.className=`scoreboard-goal-value ${Oa(e)}`,t.textContent=mD(n),t}function gD(n){return new pD(n)}class vD{constructor(e){this.options=e}setTransportEnabled(e,t){const{elements:i}=this.options;i.togglePlayback.disabled=!e,i.playbackRate.disabled=!e,i.skipPostGoalTransitions.disabled=!e,i.skipKickoffs.disabled=!e,i.hitboxWireframes.disabled=!e,i.hitboxOnlyMode.disabled=!e,this.options.getCameraControlsController()?.setTransportEnabled(e,t)}renderSnapshot(e){const{elements:t}=this.options;t.timeReadout.textContent=`${e.currentTime.toFixed(2)}s`,t.frameReadout.textContent=`${e.frameIndex}`,t.durationReadout.textContent=`${e.duration.toFixed(2)}s`,t.playbackStatusReadout.textContent=e.playing?"Playing":"Paused",t.togglePlayback.textContent=e.playing?"Pause":"Play",t.playbackRate.value=`${e.speed}`,this.options.getCameraControlsController()?.syncState(e),t.skipPostGoalTransitions.checked=e.skipPostGoalTransitionsEnabled,t.skipKickoffs.checked=e.skipKickoffsEnabled,t.hitboxWireframes.checked=e.hitboxWireframesEnabled,t.hitboxOnlyMode.checked=e.hitboxOnlyModeEnabled,t.emptyState.hidden=!0}}function yD(n){return new vD(n)}function bD({elements:n,signal:e,setLauncherOpen:t,openReplayFilePicker:i,getElementWindowId:a,toggleWindow:s,hideWindow:r,createStatsWindow:o,loadReplayFile:l,togglePlayback:c,setPlaybackRate:u,setSkipPostGoalTransitionsEnabled:d,setSkipKickoffsEnabled:f,setHitboxWireframesEnabled:h,setHitboxOnlyModeEnabled:_}){n.launcherToggle.addEventListener("click",()=>{t(n.launcherMenu.hidden)},{signal:e}),n.root.addEventListener("click",g=>{g.target instanceof Element&&(g.target.closest(".top-chrome")||t(!1))},{signal:e}),n.loadReplayAction.addEventListener("click",i,{signal:e}),n.emptyLoadReplay.addEventListener("click",i,{signal:e}),n.root.querySelectorAll("[data-window-toggle]").forEach(g=>{g.addEventListener("click",()=>{const m=g.dataset.windowToggle;m&&(s(m),t(!1))},{signal:e})}),n.root.querySelectorAll("[data-window-hide]").forEach(g=>{g.addEventListener("click",()=>{const m=g.dataset.windowHide??a(g);m&&r(m)},{signal:e})}),n.root.querySelectorAll("[data-create-stats-window]").forEach(g=>{g.addEventListener("click",()=>{o(g.dataset.createStatsWindow)},{signal:e})}),n.fileInput.addEventListener("change",()=>{const g=n.fileInput.files?.[0];g&&l(g)},{signal:e}),n.togglePlayback.addEventListener("click",c,{signal:e}),n.playbackRate.addEventListener("change",()=>{u(Number(n.playbackRate.value))},{signal:e}),n.skipPostGoalTransitions.addEventListener("change",()=>{d(n.skipPostGoalTransitions.checked)},{signal:e}),n.skipKickoffs.addEventListener("change",()=>{f(n.skipKickoffs.checked)},{signal:e}),n.hitboxWireframes.addEventListener("change",()=>{h(n.hitboxWireframes.checked)},{signal:e}),n.hitboxOnlyMode.addEventListener("change",()=>{_(n.hitboxOnlyMode.checked)},{signal:e})}class SD{constructor(e){this.options=e}activeModules=[];activeTimelineEventSourceIds=new Set;activeTimelineRangeModuleIds=new Set;activeMechanicTimelineKinds=new Set;activeRenderEffectModuleIds=new Set;removeRenderHook=null;timelineSourceRemovers=new Map;timelineRangeSourceRemovers=new Map;standalonePluginRemovers=new Map;boostPadOverlayEnabled=!0;getActiveModules(){return this.activeModules}getActiveTimelineEventSourceIds(){return this.activeTimelineEventSourceIds}getActiveTimelineRangeModuleIds(){return this.activeTimelineRangeModuleIds}getActiveMechanicTimelineKinds(){return this.activeMechanicTimelineKinds}getActiveRenderEffectModuleIds(){return this.activeRenderEffectModuleIds}getActiveCapabilityIds(e){return e==="events"?this.activeTimelineEventSourceIds:e==="ranges"?this.activeTimelineRangeModuleIds:this.activeRenderEffectModuleIds}getBoostPadOverlayEnabled(){return this.boostPadOverlayEnabled}getTimelineEventSourceIds(){return[...this.activeTimelineEventSourceIds]}getTimelineRangeModuleIds(){return[...this.activeTimelineRangeModuleIds]}getMechanicTimelineKinds(){return[...this.activeMechanicTimelineKinds]}getRenderEffectModuleIds(){return[...this.activeRenderEffectModuleIds]}applyOverlayConfig({timelineEvents:e,timelineRanges:t,mechanics:i,renderEffects:a,boostPads:s}){this.activeTimelineEventSourceIds=new Set(e),this.activeTimelineRangeModuleIds=new Set(t),this.activeMechanicTimelineKinds=new Set(i),this.migrateMechanicBackedTimelineEventSelections(),this.activeRenderEffectModuleIds=new Set(a),this.boostPadOverlayEnabled=s}reset(){this.teardownActiveModules(),this.clearStandalonePlugins(),this.activeModules=[],this.activeTimelineEventSourceIds=new Set,this.activeTimelineRangeModuleIds=new Set,this.activeMechanicTimelineKinds=new Set,this.activeRenderEffectModuleIds=new Set,this.boostPadOverlayEnabled=!0,this.removeRenderHook=null}setupActiveModules(){this.teardownActiveModules();const e=this.options.getContext();if(!e)return;const t=this.getActiveModuleIds();this.activeModules=this.options.modules.filter(i=>t.has(i.id)),this.options.boostPickupFilters.setup(e);for(const i of this.activeModules)i.setup(e);this.removeRenderHook=e.player.onBeforeRender(i=>{for(const a of this.activeModules)this.activeRenderEffectModuleIds.has(a.id)&&a.onBeforeRender(i)}),this.syncTimelineEvents(),this.syncTimelineRanges()}teardownActiveModules(){this.removeRenderHook?.(),this.removeRenderHook=null,this.clearTimelineEventSources(),this.clearTimelineRangeSources();for(const e of this.activeModules)e.teardown();this.activeModules=[]}toggleCapability(e,t,i){const a=this.getMutableActiveCapabilityIds(t);i?a.add(e):a.delete(e),this.setupActiveModules(),this.options.renderModuleSummary(),this.options.renderModuleSettings(),this.options.renderStatsWindows(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()}setMechanicTimelineKind(e,t){t?this.activeMechanicTimelineKinds.add(e):this.activeMechanicTimelineKinds.delete(e),this.options.requestConfigSync()}activateMechanicTimelineKind(e){this.activeMechanicTimelineKinds.add(e),this.syncTimelineEvents(),this.syncTimelineRanges(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()}migrateMechanicBackedTimelineEventSelections(){const e=this.options.getContext();for(const t of Bv(e?.statsTimeline??null)){const i=FL(t);this.activeTimelineEventSourceIds.delete(i)&&this.activeMechanicTimelineKinds.add(t)}}clearTimelineEventSources(){for(const e of this.timelineSourceRemovers.values())e();this.timelineSourceRemovers.clear()}clearTimelineRangeSources(){for(const e of this.timelineRangeSourceRemovers.values())e();this.timelineRangeSourceRemovers.clear()}clearStandalonePlugins(){for(const e of this.standalonePluginRemovers.values())e();this.standalonePluginRemovers.clear()}syncBoostPadOverlayPlugin(){this.standalonePluginRemovers.get("boost-pad-overlay")?.(),this.standalonePluginRemovers.delete("boost-pad-overlay");const e=this.options.getReplayPlayer();!e||!this.boostPadOverlayEnabled||this.standalonePluginRemovers.set("boost-pad-overlay",e.addPlugin(w1()))}toggleBoostPadOverlay(){this.boostPadOverlayEnabled=!this.boostPadOverlayEnabled,this.syncBoostPadOverlayPlugin(),this.options.renderModuleSummary(),this.options.requestConfigSync()}syncTimelineEvents(){this.clearTimelineEventSources();const e=this.options.getContext(),t=this.options.getTimelineOverlay();if(!(!t||!e)){for(const i of this.options.getEventTimelineSources(e)){if(!i.active)continue;const a=i.buildTimelineEvents();a.length!==0&&this.timelineSourceRemovers.set(i.timelineKey,t.addEventSource(this.options.withTimelineEventSeekTimes(a),{id:i.timelineId,label:i.label}))}t.refreshEvents()}}syncTimelineRanges(){this.clearTimelineRangeSources();const e=this.options.getContext(),t=this.options.getTimelineOverlay();if(!(!t||!e)){for(const i of this.activeModules)!this.activeTimelineRangeModuleIds.has(i.id)||!i.getTimelineRanges||this.timelineRangeSourceRemovers.set(i.id,t.addRangeSource(()=>i.getTimelineRanges?.(e)??[]));for(const i of this.options.getEventTimelineSources(e)){if(!i.active||!i.buildTimelineRanges)continue;const a=i.buildTimelineRanges();a.length!==0&&this.timelineRangeSourceRemovers.set(i.timelineKey,t.addRangeSource(a))}t.refreshRanges()}}getActiveModuleIds(){return new Set([...this.activeTimelineEventSourceIds,...this.activeTimelineRangeModuleIds,...this.activeRenderEffectModuleIds])}getMutableActiveCapabilityIds(e){return e==="events"?this.activeTimelineEventSourceIds:e==="ranges"?this.activeTimelineRangeModuleIds:this.activeRenderEffectModuleIds}}function xD(n){return new SD(n)}function on(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Hm(n){return on(n)&&(n.kind==="time"||n.kind==="frame")&&typeof n.value=="number"&&Number.isFinite(n.value)?{kind:n.kind,value:n.value}:null}function co(n,e){if(n!=null){if(typeof n!="number"||!Number.isInteger(n)||!Number.isFinite(n)||n<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return n}}function Vm(n,e){if(n!=null){if(typeof n!="string")throw new Error(`Review playlist page ${e} must be a string.`);return n}}function wD(n){if(n!=null){if(!on(n))throw new Error("Review playlist page must be an object.");return{next:Vm(n.next,"next"),previous:Vm(n.previous,"previous"),total:co(n.total,"total"),count:co(n.count,"count"),limit:co(n.limit,"limit"),offset:co(n.offset,"offset")}}}function ED(n){if(n!=null){if(!on(n))throw new Error("Review playlist playback must be an object.");if(n.timeBase!==void 0&&n.timeBase!=="playback"&&n.timeBase!=="rawReplay")throw new Error('Review playlist playback timeBase must be "playback" or "rawReplay".');return{...n,timeBase:n.timeBase}}}function MD(n){if(!on(n)||!Array.isArray(n.items))throw new Error("Review playlist must contain an items array.");const e=n.items.map((i,a)=>{if(!on(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${a}.`);const s=Hm(i.start),r=Hm(i.end);if(!s||!r)throw new Error(`Review item ${a+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:s,end:r,label:typeof i.label=="string"?i.label:void 0,meta:on(i.meta)?i.meta:void 0}}),t=Array.isArray(n.replays)?n.replays.map(i=>!on(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:on(i.locator)?i.locator:void 0,meta:on(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof n.label=="string"?n.label:void 0,replays:t,items:e,page:wD(n.page),playback:ED(n.playback),meta:n.meta}}function Gm(n){let e;try{e=JSON.parse(n)}catch(t){throw new Error(`Invalid review playlist JSON: ${t instanceof Error?t.message:String(t)}`)}return MD(e)}function TD(){const n=new URLSearchParams(window.location.search);return n.get("reviewPlaylist")?.trim()||n.get("review")?.trim()||n.get("playlist")?.trim()||n.get("playlistUrl")?.trim()||null}function CD(n){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(n)}function f0(n,e){const t=n.startsWith("path:")?n.slice(5):n;if(/^https?:\/\//i.test(t)||t.startsWith("/@fs/"))return t;if(t.startsWith("/")){if(CD(t))return`/@fs${t}`;if(e){const i=new URL(e,window.location.href);if(i.origin!==window.location.origin)return new URL(t,i.origin).href}return t}return e?new URL(t,e).href:t}function Po(n,e){const t=e.replaysById.get(n.replay);if(t?.path)return t.path;if(on(t?.locator)&&t.locator.kind==="path"&&typeof t.locator.path=="string")return t.locator.path;if(/^https?:\/\//i.test(n.replay)||n.replay.startsWith("/")||n.replay.startsWith("/@fs/")||n.replay.startsWith("path:"))return n.replay;throw new Error(`Review replay "${n.replay}" does not include a loadable path.`)}function $m(n,e){const t=e.replaysById.get(n.replay),a=(t?.path??Po(n,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return t?.label??a??"review replay"}function Lo(n){return typeof n=="number"&&Number.isFinite(n)?`${n.toFixed(2)}s`:"--"}function Wm(n){return n.kind==="time"?Lo(n.value):`frame ${Math.trunc(n.value)}`}function In(n,e){if(!on(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?t:null}function Io(n,e){if(!on(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?Math.trunc(t):null}function AD(n,e){for(const[t,i]of[["eventTime","eventFrame"],["startTime","startFrame"],["endTime","endFrame"]]){const a=In(n,t),s=Io(n,i),r=s===null?null:e.frames[s]?.time;if(a!==null&&typeof r=="number"&&Number.isFinite(r))return a-r}return 0}function h0(n,e,t){return t==="playback"?0:t==="rawReplay"&&typeof e.rawStartTime=="number"&&Number.isFinite(e.rawStartTime)?e.rawStartTime:AD(n,e)}function _d(n,e){return Math.min(Math.max(0,n),Math.max(0,e))}function RD(n,e,t,i){if(e.kind==="frame"){const s=Math.max(0,Math.trunc(e.value));return _d(t.frames[s]?.time??0,t.duration)}const a=h0(n,t,i);return _d(e.value-a,t.duration)}function PD(n,e,t){const i=kD(n);return i===null?null:_d(i-h0(n,e,t),e.duration)}function LD(n){const e=n.start.kind==="time"?n.start.value:null,t=n.end.kind==="time"?n.end.value:null,i=[`${Wm(n.start)} to ${Wm(n.end)}`];e!==null&&t!==null&&i.push(`${Math.max(0,t-e).toFixed(1)}s clip`);const a=In(n,"startTime")??In(n,"eventTime"),s=In(n,"endTime")??In(n,"eventTime");return e!==null&&a!==null&&i.push(`${Math.max(0,a-e).toFixed(1)}s preroll`),t!==null&&s!==null&&i.push(`${Math.max(0,t-s).toFixed(1)}s postroll`),i.join(" · ")}function ID(n){const e=In(n,"eventTime"),t=In(n,"startTime"),i=In(n,"endTime"),a=Io(n,"eventFrame"),s=Io(n,"startFrame"),r=Io(n,"endFrame"),o=t!==null&&i!==null&&Math.abs(i-t)>.001?`${Lo(t)} to ${Lo(i)}`:Lo(e??t??i),l=s!==null&&r!==null&&r!==s?`frames ${s}-${r}`:a!==null?`frame ${a}`:s!==null?`frame ${s}`:null;return[o,l].filter(c=>c&&c!=="--").join(" · ")||"--"}function Uc(n,e){return n.label??n.meta?.eventTypeLabel??n.meta?.mechanicLabel??`Review item ${e+1}`}function Xm(n){return typeof n.meta?.playerId=="string"?n.meta.playerId:on(n.meta?.target)&&typeof n.meta.target.playerId=="string"?n.meta.target.playerId:null}function Km(n){if(typeof n.meta?.eventTypeLabel=="string"&&n.meta.eventTypeLabel.trim())return n.meta.eventTypeLabel;if(typeof n.meta?.mechanicLabel=="string"&&n.meta.mechanicLabel.trim())return n.meta.mechanicLabel;const e=n.meta?.eventType??n.meta?.mechanic;return typeof e=="string"?Ii(e):"--"}function ND(n){const e=n.meta?.eventType??n.meta?.mechanic;return typeof e=="string"&&e.trim()?e.trim().replaceAll("-","_"):null}function kD(n){return In(n,"eventTime")??In(n,"startTime")??In(n,"endTime")}class DD{constructor(e){this.options=e}createReplaySource(e,t,i){const a=Po(e,t),s=f0(a,t.sourceUrl);return{name:$m(e,t),preparingStatus:"Loading review replay...",async readBytes(){const r=await fetch(s,{signal:i});if(!r.ok){const o=r.statusText?` ${r.statusText}`:"";throw new Error(`Failed to fetch review replay from ${s} (${r.status}${o})`)}return new Uint8Array(await r.arrayBuffer())}}}initialize(e){const t=this.getReplayClipCounts(e);for(const[i,a]of this.getReplayItems(e)){let s="",r=i;try{s=Po(a,e),r=$m(a,e)}catch{r=e.replaysById.get(i)?.label??i}e.replayLoadStates.set(i,{replayId:i,label:r,path:s,clipCount:t.get(i)??0,status:"idle",progress:null,error:null})}}preload(e,t){if(e.preloading)return;const i=this.getNextReplayItems(e,t);i.length!==0&&(e.preloading=!0,(async()=>{try{for(const a of i){const s=a.replay,r=e.replayLoadStates.get(s);if(!(r?.status==="loaded"||r?.status==="loading"))try{await this.loadBundle(a,e)}catch{}}}finally{e.preloading=!1}})())}loadBundle(e,t){const i=t.replayLoadCache.get(e.replay);if(i)return i;const a=this.createReplaySource(e,t);this.updateLoadState(t,e.replay,{label:a.name,path:Po(e,t),status:"loading",progress:null,error:null});const s=Promise.resolve().then(async()=>{const r=await a.readBytes();return Pv(r,{reportEveryNFrames:100,onProgress:o=>{this.updateLoadState(t,e.replay,{status:"loading",progress:o,error:null})}})}).then(r=>(this.updateLoadState(t,e.replay,{status:"loaded",progress:null,error:null}),r)).catch(r=>{throw t.replayLoadCache.delete(e.replay),this.updateLoadState(t,e.replay,{status:"error",error:r instanceof Error?r.message:String(r)}),r});return t.replayLoadCache.set(e.replay,s),s}render(e){const{reviewSummary:t,loadingSummary:i,loadingActive:a,loadingList:s}=this.options.elements,r=e?Array.from(e.replayLoadStates.values()):[],o=r.filter(f=>f.status==="loaded").length,l=r.filter(f=>f.status==="loading").length,c=r.filter(f=>f.status==="error").length,u=r.filter(f=>f.status==="idle").length,d=r.length===0?"0 replays":`${o}/${r.length} loaded${l>0?`, ${l} loading`:""}${c>0?`, ${c} failed`:""}`;if(t.textContent=d,i.textContent=d,a.textContent=r.length===0?"No playlist":l>0?`${l} active, ${u} pending`:c>0?`${c} failed`:e?.preloading?`Background queue, ${u} pending`:o===r.length?"Complete":`${u} pending`,s.replaceChildren(),!e||r.length===0){const f=document.createElement("p");f.className="stat-window-empty",f.textContent="No replay sources.",s.append(f);return}for(const f of r){const h=document.createElement("div");h.className=`mechanics-review-replay-load ${f.status}`;const _=document.createElement("div");_.className="mechanics-review-replay-load-main";const g=document.createElement("span");g.className="mechanics-review-replay-load-title",g.textContent=f.label;const m=document.createElement("span");m.className="mechanics-review-replay-load-meta",m.textContent=[f.replayId,`${f.clipCount} ${f.clipCount===1?"clip":"clips"}`,f.path].filter(Boolean).join(" · "),_.append(g,m);const p=document.createElement("strong");p.className="mechanics-review-replay-load-status",p.textContent=this.replayLoadStatusText(f);const y=document.createElement("div");y.className="mechanics-review-replay-load-progress";const x=document.createElement("span");x.style.width=`${Math.round(this.replayLoadProgressValue(f)*100)}%`,y.append(x),h.append(_,p,y),s.append(h)}}updateLoadState(e,t,i){const a=e.replayLoadStates.get(t)??{replayId:t,label:t,path:"",clipCount:0,status:"idle",progress:null,error:null};e.replayLoadStates.set(t,{...a,...i});const s=e.manifest.items[e.currentIndex];e.loading&&s?.replay===t&&i.progress&&this.options.onActiveLoadProgress(i.progress),this.options.isActiveReview(e)&&this.render(e)}getReplayItems(e){const t=new Map;for(const i of e.manifest.items)t.has(i.replay)||t.set(i.replay,i);return t}getReplayClipCounts(e){const t=new Map;for(const i of e.manifest.items)t.set(i.replay,(t.get(i.replay)??0)+1);return t}getNextReplayItems(e,t){const i=e.manifest.items[t]?.replay,a=new Set(i?[i]:[]),s=[];for(let r=t+1;r<e.manifest.items.length;r+=1){const o=e.manifest.items[r];if(!(!o||a.has(o.replay))){a.add(o.replay),s.push(o);break}}return s}replayLoadStatusText(e){return e.status==="idle"?"Pending":e.status==="loading"?this.replayLoadStateProgress(e.progress)||"Loading":e.status==="loaded"?"Loaded":e.error?`Failed: ${e.error}`:"Failed"}replayLoadStateProgress(e){if(!e)return"";const t=cl(e);if(e.processedFrames!==void 0){const i=e.totalFrames!==void 0?` / ${e.totalFrames}`:"";return`${t} (${e.processedFrames}${i} frames)`}if(e.processedChunks!==void 0){const i=e.totalChunks!==void 0?` / ${e.totalChunks}`:"";return`${t} (${e.processedChunks}${i} chunks)`}return t}replayLoadProgressValue(e){if(e.status==="loaded")return 1;const t=e.progress?.progress;return typeof t=="number"&&Number.isFinite(t)?Math.max(0,Math.min(1,t)):0}}function FD(n){return new DD(n)}class OD{constructor(e){this.options=e}activeReview=null;boundaryGuard=!1;get review(){return this.activeReview}reset(){this.activeReview=null,this.boundaryGuard=!1}setUrl(e){this.options.elements.url.value=e}clearCurrentClip({resetReplayId:e=!1,render:t=!1}={}){this.activeReview&&(this.activeReview.currentClip=null,e&&(this.activeReview.currentReplayId=null),t&&this.render())}setStatus(e){this.options.elements.status.textContent=e}installEventListeners(e){const{elements:t}=this.options;t.file.addEventListener("change",async()=>{const i=t.file.files?.[0];if(i)try{const a=Gm(await i.text());await this.loadPlaylist(a,null)}catch(a){console.error("Failed to load review playlist:",a),this.setStatus(a instanceof Error?a.message:"Failed to load review playlist")}finally{t.file.value=""}},{signal:e}),t.loadUrl.addEventListener("click",()=>{this.loadPlaylistFromUrl(t.url.value.trim()).catch(i=>{console.error("Failed to load review playlist URL:",i),this.setStatus(i instanceof Error?i.message:"Failed to load review playlist URL")})},{signal:e}),t.previous.addEventListener("click",()=>{const i=this.activeReview;i&&this.activateItem(Math.max(0,i.currentIndex-1))},{signal:e}),t.replay.addEventListener("click",()=>this.replayClip(),{signal:e}),t.next.addEventListener("click",()=>{const i=this.activeReview;i&&this.activateItem(Math.min(i.manifest.items.length-1,i.currentIndex+1))},{signal:e}),t.confirm.addEventListener("click",()=>{this.submitDecision("confirmed")},{signal:e}),t.reject.addEventListener("click",()=>{this.submitDecision("rejected")},{signal:e}),t.uncertain.addEventListener("click",()=>{this.submitDecision("uncertain")},{signal:e})}render(){const{elements:e}=this.options,t=this.activeReview,i=t?.manifest.items??[],a=t?i[t.currentIndex]??null:null,s=i.length>0;e.count.textContent=`${i.length} item${i.length===1?"":"s"}`,e.index.textContent=s&&t?`${t.currentIndex+1} / ${i.length}`:"0 / 0",e.title.textContent=a?Uc(a,t?.currentIndex??0):"No candidate selected",e.mechanic.textContent=a?Km(a):"--",e.player.textContent=a?this.getPlayerName(a):"--",e.clip.textContent=a?LD(a):"--",e.event.textContent=a?ID(a):"--",e.reason.textContent=a?.meta?.reason??"--",e.previous.disabled=!t||t.loading||t.currentIndex<=0,e.replay.disabled=!t||t.loading||!t.currentClip,e.next.disabled=!t||t.loading||t.currentIndex>=i.length-1;const r=!t||t.loading||qm(a)===null;if(e.confirm.disabled=r,e.reject.disabled=r,e.uncertain.disabled=r,this.options.replayLoads.render(t),e.list.replaceChildren(),!t||i.length===0){const o=document.createElement("p");o.className="stat-window-empty",o.textContent="No review playlist loaded.",e.list.append(o);return}i.forEach((o,l)=>{const c=document.createElement("button");c.type="button",c.className="mechanics-review-item",c.dataset.active=l===t.currentIndex?"true":"false",c.disabled=t.loading,c.addEventListener("click",()=>{this.activateItem(l)});const u=document.createElement("span");u.textContent=Uc(o,l);const d=document.createElement("strong");d.textContent=[Km(o),this.getPlayerName(o),Bc(o.meta?.reviewStatus)].filter(f=>f&&f!=="--").join(" · ")||"--",c.append(u,d),e.list.append(c)})}async loadPlaylist(e,t){const i=new Map;for(const a of e.replays??[])i.set(a.id,a);this.activeReview={manifest:e,sourceUrl:t,replaysById:i,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,preloading:!1,currentReplayId:null,currentClip:null},this.options.replayLoads.initialize(this.activeReview),this.options.showReplayLoadingWindow(),this.setStatus(e.label?`Loaded ${e.label}.`:"Loaded review playlist."),this.render(),e.items.length>0&&await this.activateItem(0)}async loadPlaylistFromUrl(e){if(!e){this.setStatus("Enter a review playlist URL.");return}const t=f0(e,window.location.href);this.setStatus("Loading review playlist...");const i=await fetch(t);if(!i.ok){const s=i.statusText?` ${i.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${t} (${i.status}${s})`)}const a=Gm(await i.text());await this.loadPlaylist(a,i.url||t)}async activateItem(e){const t=this.activeReview,i=t?.manifest.items[e];if(!(!t||!i||t.loading)){t.loading=!0,t.currentIndex=e,this.render(),this.setStatus(`Loading ${Uc(i,e)}...`);try{if(!this.options.getReplayPlayer()||t.currentReplayId!==i.replay){const d=this.options.replayLoads.createReplaySource(i,t),f=this.options.replayLoads.loadBundle(i,t);await this.options.loadReplayBundleForDisplay(d,f),t.currentReplayId=i.replay}this.options.replayLoads.preload(t,e);const s=t.manifest.playback?.timeBase,r=Math.max(0,this.getBoundTime(i,i.start,s)),o=Math.min(this.options.getReplayPlayer()?.getState().duration??Number.POSITIVE_INFINITY,Math.max(r,this.getBoundTime(i,i.end,s)));if(!Number.isFinite(r)||!Number.isFinite(o)||o<=r)throw new Error("Review item has an empty playback range.");const l=Xm(i),c=this.options.getReplayPlayer();l&&c?.replay.players.some(d=>d.id===l)&&(c.setAttachedPlayer(l),c.setCameraViewMode("follow"),this.options.clearFreeCameraPreset()),this.options.resetReplayTransitionControls();const u=c===null?null:PD(i,c.replay,s);t.currentClip={startTime:r,endTime:o,targetTime:u},this.options.activateTimelineSource(i),this.options.getReplayPlayer()?.setState({currentTime:r,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),this.setStatus(u===null?`Playing ${r.toFixed(2)}s to ${o.toFixed(2)}s`:`Playing ${r.toFixed(2)}s to ${o.toFixed(2)}s; target ${u.toFixed(2)}s`)}catch(a){console.error("Failed to activate mechanics review item:",a),t.currentClip=null,this.setStatus(a instanceof Error?a.message:"Failed to load review item")}finally{t.loading=!1,this.render()}}}replayClip(){const e=this.activeReview?.currentClip,t=this.options.getReplayPlayer();!e||!t||t.setState({currentTime:e.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1})}async submitDecision(e){const t=this.activeReview,i=t?.manifest.items[t.currentIndex]??null,a=qm(i);if(!t||!i||!a){this.setStatus("Current review item has no review endpoint.");return}this.setStatus(`Submitting ${Bc(e)}...`);const s=await fetch(a,{method:"POST",headers:{"content-type":"application/json",...UD()},credentials:"same-origin",body:JSON.stringify({status:e})});if(!s.ok){let r=`${s.status}${s.statusText?` ${s.statusText}`:""}`;try{const o=await s.json();typeof o.error=="string"&&(r=o.error)}catch{}this.setStatus(`Review failed: ${r}`);return}i.meta=i.meta??{},i.meta.reviewStatus=e,this.setStatus(`Marked ${Bc(e)}.`),this.render()}enforceClipBoundary(e){const t=this.activeReview?.currentClip,i=this.options.getReplayPlayer();if(!t||!i||this.boundaryGuard)return!1;const a=e.currentTime<t.startTime-.1,s=e.playing&&e.currentTime>=t.endTime-.025;if(!a&&!s)return!1;this.boundaryGuard=!0;try{i.setState({currentTime:a?t.startTime:t.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),s&&this.setStatus(`Finished clip at ${t.endTime.toFixed(2)}s`)}finally{this.boundaryGuard=!1}return!0}getBoundTime(e,t,i){const a=this.options.getReplayPlayer();return a?RD(e,t,a.replay,i):t.kind==="time"?t.value:0}getPlayerName(e){if(typeof e.meta?.playerName=="string"&&e.meta.playerName.trim())return e.meta.playerName;const t=Xm(e);return t?this.options.getReplayPlayer()?.replay.players.find(i=>i.id===t)?.name??t:"--"}}function Bc(n){return typeof n=="string"&&n.trim()?n.replaceAll("_"," "):"unreviewed"}function qm(n){if(!n)return null;if(typeof n.meta?.reviewEndpoint=="string"&&n.meta.reviewEndpoint)return n.meta.reviewEndpoint;const e=typeof n.meta?.eventId=="string"&&n.meta.eventId?n.meta.eventId:n.id;return e?`/api/v1/events/${encodeURIComponent(e)}/reviews`:null}function UD(){const n=new URLSearchParams(window.location.search),e=n.get("reviewToken")??n.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function BD(n){return new OD(n)}const zD=["replayUrl","replay_url","replay"],HD=["r","replayUrlZ","replay_url_z"],VD=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function GD(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function $D(n){try{return l0(o0(GD(n)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function WD(n,e){const t=new URLSearchParams(n);for(const i of zD){const a=t.get(i)?.trim();if(!a)continue;const s=new URL(a,e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}for(const i of HD){const a=t.get(i)?.trim();if(!a)continue;const s=new URL($D(a),e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}return null}function XD(n,e){for(const t of e){const i=n.get(t)?.trim();if(i)return i}return null}function KD(n,e){const t=new URLSearchParams(n),i=XD(t,VD);if(i){const s=Wd(i);return{kind:"ballchasing",url:c1(s),name:l1(s),fetchInit:{method:"POST"}}}const a=WD(n,e);return a?{kind:"url",url:a,name:qD(a)}:null}function qD(n){const t=n.pathname.replace(/\/+$/,"").split("/").pop();if(!t)return n.hostname||"remote replay";try{return decodeURIComponent(t)}catch{return t}}function YD(n){let e;try{e=KD(n.location.search,n.location.href)}catch(t){console.error("Invalid replay URL:",t),n.statusReadout.textContent=t instanceof Error?t.message:"Invalid replay URL";return}e&&n.loadReplay(aD(e,n.signal)).catch(t=>{n.signal.aborted||(console.error("Failed to load replay URL:",t),n.statusReadout.textContent=t instanceof Error?t.message:"Failed to load replay URL")})}function jD(n){n.initialBundle?n.loadReplayBundleForDisplay({name:n.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(n.initialBundle)).catch(i=>{n.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",i),n.statusReadout.textContent=i instanceof Error?i.message:"Failed to load preprocessed replay bundle")}):n.loadFromLocation!==!1&&YD(n);const e=TD();if(!e)return;const t=n.getMechanicsReviewController();t?.setUrl(e),n.showMechanicsReviewWindow(),t?.loadPlaylistFromUrl(e).catch(i=>{n.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",i),t?.setStatus(i instanceof Error?i.message:"Failed to load mechanics review playlist from URL"))})}function ZD(n){const e={};for(const t of n)if(t.getConfig){if(Object.hasOwn(e,t.id))throw new Error(`Duplicate stats player config adapter id: ${t.id}`);e[t.id]=t.getConfig()}return e}function JD(n,e){for(const t of n)if(t.applyConfig){if(Object.hasOwn(e,t.id)){t.applyConfig(e[t.id]);continue}for(const i of t.aliases??[])if(Object.hasOwn(e,i)){t.applyConfig(e[i]);break}}}function p0(n){return n.filter(e=>e.getConfig||e.applyConfig).map(e=>{const t={id:e.id};return e.id==="boost"&&(t.aliases=["boost-pickup-animation"]),e.getConfig&&(t.getConfig=()=>e.getConfig?.()),e.applyConfig&&(t.applyConfig=i=>e.applyConfig?.(i)),t})}function QD(n){return ZD(p0(n))}function eF({replayPlayer:n,playbackRate:e,skipPostGoalTransitions:t,skipKickoffs:i}){const a=n?.getState();return{currentTime:a?.currentTime,playing:a?.playing,rate:a?.speed??Number(e?.value??1),skipPostGoalTransitions:n?a?.skipPostGoalTransitionsEnabled:t.checked,skipKickoffs:n?a?.skipKickoffsEnabled:i.checked}}function tF({replayPlayer:n,cameraControlsController:e}){const t=n?.getState();return{mode:t?.cameraViewMode,freePreset:e?.freeCameraPreset??null,attachedPlayerId:t?.attachedPlayerId,distanceScale:t?.cameraDistanceScale,ballCam:t?.ballCamEnabled??e?.ballCamChecked,customSettings:t?.customCameraSettings}}function nF({playback:n,camera:e,activeTimelineEventSourceIds:t,activeTimelineRangeModuleIds:i,activeMechanicTimelineKinds:a,activeRenderEffectModuleIds:s,initialConfig:r,replayPlayer:o,boostPadOverlayEnabled:l,recording:c,singletonWindows:u,statsWindows:d,moduleConfigs:f}){return{version:pd,playback:n,camera:e,overlays:{timelineEvents:[...t],timelineRanges:[...i],mechanics:[...a],renderEffects:[...s],...r?.overlays.pluginRenderEffects!==void 0?{pluginRenderEffects:[...r.overlays.pluginRenderEffects]}:{},...r?.overlays.pluginHudOverlay!==void 0?{pluginHudOverlay:r.overlays.pluginHudOverlay}:{},followedPlayerHud:!1,boostPads:l,boostPickupAnimation:o?.getState().boostPickupAnimationEnabled??!1,hitboxWireframes:o?.getState().hitboxWireframesEnabled??!1,hitboxOnlyMode:o?.getState().hitboxOnlyModeEnabled??!1},recording:c,singletonWindows:u,statsWindows:d,moduleConfigs:f}}function iF(n,e,t){return{currentTime:n.currentTime,playing:n.playing,speed:n.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:t.overlays.boostPickupAnimation,hitboxWireframesEnabled:t.overlays.hitboxWireframes,hitboxOnlyModeEnabled:t.overlays.hitboxOnlyMode,skipPostGoalTransitionsEnabled:n.skipPostGoalTransitions,skipKickoffsEnabled:n.skipKickoffs}}function aF(n,e,t){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",n.search||"(empty)"),console.log("location.hash",n.hash||"(empty)"),console.table([...n.searchParams.map(([i,a])=>({source:"search",name:i,value:a})),...n.hashParams.map(([i,a])=>({source:"hash",name:i,value:a}))]),console.log("cfg selected source",n.selectedSource??"(none)"),console.log("cfg selected raw text",n.selectedValue??"(none)"),console.log("cfg selected raw length",n.selectedValue?.length??0),console.log("cfg search values",n.searchValues),console.log("cfg hash values",n.hashValues),n.hashValues.length>0&&n.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),t&&console.error("cfg decode/apply error",t),console.groupEnd()}function sF(n){const e=()=>{n.getSkipPostGoalTransitions().checked=!1,n.getSkipKickoffs().checked=!1},t=(i,a)=>{const s=n.getReplayPlayer();!s||!Number.isFinite(i)||(n.getMechanicsReviewController()?.clearCurrentClip(),e(),s.setState({currentTime:Math.max(0,i-n.goalWatchLeadSeconds),playing:a,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),n.scheduleConfigUrlUpdate())};return{watchGoalReplay(i,a){const s=n.getReplayPlayer();if(!s||!Number.isFinite(i))return;if(n.getMechanicsReviewController()?.clearCurrentClip(),a!==null&&s.replay.players.some(o=>o.id===a)){s.setAttachedPlayer(a),s.setCameraViewMode("follow");const o=n.getCameraControlsController();o&&(o.freeCameraPreset=null)}e(),s.setState({currentTime:Math.max(0,i-n.goalWatchLeadSeconds),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),n.scheduleConfigUrlUpdate()},cueGoalReplay(i){t(i,!1)},cueTimelineEvent(i){const a=n.getReplayPlayer();a&&(n.getMechanicsReviewController()?.clearCurrentClip(),e(),a.setState({currentTime:Xd(i),skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),n.scheduleConfigUrlUpdate())},applyConfigToReplayPlayer(i){const a=n.getReplayPlayer();if(!a)return;a.setState(iF(i.playback,i.camera,i));const s=n.getCameraControlsController();s&&(s.freeCameraPreset=i.camera.freePreset??null),i.camera.mode==="free"&&i.camera.freePreset&&a.setFreeCameraPreset(i.camera.freePreset),n.syncBoostPadOverlayPlugin(),n.setupActiveModules(),n.renderModuleSummary(),n.renderModuleSettings(),n.renderStatsWindows(a.getState().frameIndex)}}}function rF(n){let e=!1,t=null;const i=()=>n.getFloatingWindowController()?.getSingletonConfigs()??[],a=()=>n.getStatsWindowsController()?.getConfigs()??[],s=()=>{const o=n.getActiveModulesRuntime(),l=n.getReplayPlayer();return nF({playback:eF({replayPlayer:l,playbackRate:n.playbackRate,skipPostGoalTransitions:n.skipPostGoalTransitions,skipKickoffs:n.skipKickoffs}),camera:tF({replayPlayer:l,cameraControlsController:n.getCameraControlsController()}),activeTimelineEventSourceIds:o.getActiveTimelineEventSourceIds(),activeTimelineRangeModuleIds:o.getActiveTimelineRangeModuleIds(),activeMechanicTimelineKinds:o.getActiveMechanicTimelineKinds(),activeRenderEffectModuleIds:o.getActiveRenderEffectModuleIds(),initialConfig:n.getInitialConfig(),replayPlayer:l,boostPadOverlayEnabled:o.getBoostPadOverlayEnabled(),recording:n.getRecordingWindowController()?.getConfigSnapshot()??{},singletonWindows:i(),statsWindows:a(),moduleConfigs:QD(n.modules)})},r=o=>{JD(p0(n.modules),o)};return{setApplyingConfig(o){e=o},reset(){t!==null&&(window.clearTimeout(t),t=null),e=!1},scheduleConfigUrlUpdate(){e||(t!==null&&window.clearTimeout(t),t=window.setTimeout(()=>{t=null;const o=Uk(new URL(window.location.href),s());window.history.replaceState(window.history.state,"",o)},150))},applyConfigToStaticControls(o){n.getActiveModulesRuntime().applyOverlayConfig(o.overlays),n.skipPostGoalTransitions.checked=o.playback.skipPostGoalTransitions??n.skipPostGoalTransitions.checked,n.skipKickoffs.checked=o.playback.skipKickoffs??n.skipKickoffs.checked,n.hitboxWireframes.checked=o.overlays.hitboxWireframes,n.hitboxOnlyMode.checked=o.overlays.hitboxOnlyMode,o.playback.rate!==void 0&&(n.playbackRate.value=`${o.playback.rate}`),n.getRecordingWindowController()?.applyConfig(o.recording),r(o.moduleConfigs),n.getFloatingWindowController()?.applySingletonConfigs(o.singletonWindows),n.getStatsWindowsController()?.replaceFromConfig(o.statsWindows),n.renderModuleSummary(),n.renderModuleSettings(),n.renderTimelineEventCount()}}}function oF(n){const e=t=>{const i=n.getLauncherToggle();n.getLauncherMenu().hidden=!t,i.setAttribute("aria-label",t?"Close menu":"Open menu"),i.setAttribute("aria-expanded",t?"true":"false")};return{bringWindowToFront(t){n.getFloatingWindowController()?.bringToFront(t)},showWindow(t){n.getFloatingWindowController()?.show(t)},toggleWindow(t){n.getFloatingWindowController()?.toggle(t)},hideWindow(t){n.getFloatingWindowController()?.hide(t)},setLauncherOpen:e,openReplayFilePicker(){n.getFileInput().click(),e(!1)},installWindowDragging(t,i){n.getFloatingWindowController()?.installDragging(t,i)},getElementWindowId(t){return t.closest("[data-window-id]")?.dataset.windowId??null}}}const m0=2.25,lF=4,cF=100;let je=null,of=null,Yo=null,er=null,es=null,jo=null,Ym=0;const ml=Yv({refreshTimelineRanges(){lf()},rerenderCurrentState(){je&&je.setBoostPickupAnimationEnabled(je.getState().boostPickupAnimationEnabled)},requestConfigSync(){Vt()}}),No=GN({rerenderCurrentState(){if(!je)return;const n=je.getState();lr(n.frameIndex)},refreshTimelineRanges(){lf()},requestConfigSync(){Vt()}},{boostPickupFilters:ml}),Ct=xD({modules:No,boostPickupFilters:ml,getContext:ir,getReplayPlayer:()=>je,getTimelineOverlay:()=>of,getEventTimelineSources:w0,withTimelineEventSeekTimes:S0,renderModuleSummary:Ba,renderModuleSettings:ia,renderStatsWindows(){je&&lr(je.getState().frameIndex)},renderTimelineEventCount:Bs,requestConfigSync:Vt}),ko=sF({goalWatchLeadSeconds:lF,getReplayPlayer:()=>je,getCameraControlsController:()=>Tn,getMechanicsReviewController:()=>zn,getSkipPostGoalTransitions:()=>Qi,getSkipKickoffs:()=>ea,syncBoostPadOverlayPlugin:b0,setupActiveModules:el,renderModuleSummary:Ba,renderModuleSettings:ia,renderStatsWindows(n){lr(n)},scheduleConfigUrlUpdate:Vt}),wn=oF({getFloatingWindowController:()=>Ei,getLauncherMenu:()=>yd,getLauncherToggle:()=>vd,getFileInput:()=>Zo});let uo=null,Zo,_0,gd,jm,vd,yd,Zm,Jm,Qm,e_,t_,n_,zc,Hc,fo,i_,a_,s_,r_,Si,g0,v0,bd,Qi,Ua=null,ea,Ps,Ls,ho=null,Sd=Ko(),Tn=null,Is=null,ts=null,tr=null,nr=null,Jo=null,zn=null,Ei=null,xd=null,Qo=null,wi=null,wd=null,oi=null;function uF(n){return Ct.getActiveCapabilityIds(n)}function dF(){}function ir(){return!je||!er||!es?null:{player:je,replay:je.replay,statsTimeline:er,statsFrameLookup:es,fieldScale:je.options.fieldScale??1}}function el(){Ct.setupActiveModules()}function fF(){Ct.migrateMechanicBackedTimelineEventSelections()}function y0(){Ct.teardownActiveModules()}function o_(n,e,t){Ct.toggleCapability(n,e,t)}function hF(){Ct.clearTimelineEventSources()}function pF(){Ct.clearTimelineRangeSources()}function mF(){Ct.clearStandalonePlugins()}function b0(){Ct.syncBoostPadOverlayPlugin()}function _F(){Ct.toggleBoostPadOverlay()}function gF(){Ct.syncTimelineEvents()}function lf(){Ct.syncTimelineRanges()}function Bs(){const n=ir();if(!n){bd.textContent="--";return}bd.textContent=`${vF(n)}`}function vF(n){return nr?.countVisibleSources(n)??0}function te(n,e){const t=n.querySelector(e);if(!(t instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return t}function yF(n){if(!Ei)throw new Error("Floating windows are not initialized.");return Ei.readPlacement(n)}function bF(n,e){Ei?.applyPlacement(n,e)}function lr(n=je?.getState().frameIndex??0,e={}){ts?.render(n,e)}function SF(n){ts?.create(n)}function xF(){ts?.clear()}function Vt(){wi?.scheduleConfigUrlUpdate()}function wF(n){wi?.applyConfigToStaticControls(n)}function S0(n){return n.map(e=>({...e,seekTime:Xd(e)}))}function Ba(){Jo?.renderSummary()}function x0(){nr?.render()}function w0(n){return nr?.getSources(n)??[]}function EF(){const n=ir();return ck(n,w0(n))}function E0(){tr?.render()}function M0(n,e={}){tr?.syncTimeline(n,e)}function T0(){tr?.reset()}function MF(n){const e=ND(n);e&&(Ct.activateMechanicTimelineKind(e),x0())}function TF(n){return zn?.enforceClipBoundary(n)??!1}function ia(){Jo?.renderSettings()}function cf(n=je?.getState().frameIndex??0){xd?.render(n)}function CF(n){Qo?.setTransportEnabled(n,je?.getState())}function C0(n=Yo?.getStatus()??null){Is?.sync(n)}function AF(n){if(TF(n))return;const e=performance.now();n.playing&&e-Ym<cF||(Ym=e,Qo?.renderSnapshot(n),lr(n.frameIndex,{preserveOpenPickers:!0}),cf(n.frameIndex),M0(n))}function RF(n){return ml.includePickup(n)}async function l_(n){await Ed(n,Promise.resolve().then(()=>sD(n,e=>{Si.textContent=cl(e),Ua?.update(e)})))}async function Ed(n,e){await rD(n,e,{elements:{fileInput:Zo,viewport:_0,emptyState:gd,statusReadout:Si,playersReadout:g0,framesReadout:v0,skipPostGoalTransitions:Qi,skipKickoffs:ea,hitboxWireframes:Ps,hitboxOnlyMode:Ls},defaultCameraDistanceScale:m0,getReplayLoadModal:()=>Ua,getReplayPlayer:()=>je,setReplayPlayer(t){je=t},getUnsubscribe:()=>jo,setUnsubscribe(t){jo=t},setCanvasRecorder(t){Yo=t},setLoadedReplayName(t){wd=t},setTimelineOverlay(t){of=t},setStatsTimeline(t){er=t},setStatsFrameLookup(t){es=t},setStatRegistry(t){Sd=t},getInitialConfig:()=>oi,setApplyingConfig(t){wi?.setApplyingConfig(t)},getReplayTimelineEvents(t){return zL(t,Ct.getActiveTimelineEventSourceIds())},withTimelineEventSeekTimes:S0,includeBoostPickupAnimationPickup:RF,syncRecordingWindow:C0,setTransportEnabled:CF,teardownActiveModules:y0,clearTimelineEventSources:hF,clearTimelineRangeSources:pF,clearStandalonePlugins:mF,clearRenderCaches:dF,resetEventPlaylistWindow:T0,renderScoreboard:cf,renderTimelineEventCount:Bs,renderMechanicsTimelineControls:x0,renderEventPlaylistWindow:E0,renderModuleSettings:ia,migrateMechanicBackedTimelineEventSelections:fF,syncBoostPadOverlayPlugin:b0,setupActiveModules:el,renderSnapshot:AF,applyConfigToReplayPlayer:ko.applyConfigToReplayPlayer,renderStatsWindows:lr,syncEventPlaylistTimeline:M0,getCameraControlsController:()=>Tn})}function PF(n,e={}){ho?.(),n.innerHTML=dC(m0),uo=n,Ua=c2(n),Ei=eD({getRoot:()=>uo??document,requestConfigSync:Vt}),Zo=te(n,"#replay-file"),_0=te(n,"#viewport"),gd=te(n,"#empty-state"),jm=te(n,"#empty-load-replay"),vd=te(n,"#launcher-toggle"),yd=te(n,"#launcher-menu"),Zm=te(n,"#load-replay-action"),Jm=te(n,"#floating-window-layer"),xd=gD({body:te(n,"#scoreboard-window-body"),getReplayPlayer:()=>je,getStatsFrameLookup:()=>es});const t=te(n,"#mechanics-timeline-window-body");nr=pk({body:t,modules:No,getContext:ir,getActiveTimelineEventSourceIds:()=>Ct.getActiveTimelineEventSourceIds(),getActiveMechanicTimelineKinds:()=>Ct.getActiveMechanicTimelineKinds(),toggleEventSource(d,f){o_(d,"events",f)},setMechanicTimelineKind(d,f){Ct.setMechanicTimelineKind(d,f)},setupActiveModules:el,syncTimelineEvents:gF,syncTimelineRanges:lf,renderModuleSummary:Ba,renderModuleSettings:ia,renderTimelineEventCount:Bs,requestConfigSync:Vt}),Qm=te(n,"#event-playlist-window-body"),tr=nD({body:Qm,getReplayPlayer:()=>je,getSources:EF,cueTimelineEvent:ko.cueTimelineEvent,formatTime:e0}),e_=te(n,"#replay-loading-summary"),t_=te(n,"#replay-loading-active"),n_=te(n,"#replay-loading-list");const i=FD({elements:{reviewSummary:te(n,"#mechanics-review-replay-load-summary"),loadingSummary:e_,loadingActive:t_,loadingList:n_},isActiveReview(d){return zn?.review===d},onActiveLoadProgress(d){Si.textContent=cl(d),Ua?.update(d)}});zn=BD({elements:{file:te(n,"#mechanics-review-file"),url:te(n,"#mechanics-review-url"),loadUrl:te(n,"#mechanics-review-load-url"),status:te(n,"#mechanics-review-status"),index:te(n,"#mechanics-review-index"),title:te(n,"#mechanics-review-title"),mechanic:te(n,"#mechanics-review-mechanic"),player:te(n,"#mechanics-review-player"),clip:te(n,"#mechanics-review-clip"),event:te(n,"#mechanics-review-event"),reason:te(n,"#mechanics-review-reason"),previous:te(n,"#mechanics-review-prev"),replay:te(n,"#mechanics-review-replay"),next:te(n,"#mechanics-review-next"),confirm:te(n,"#mechanics-review-confirm"),reject:te(n,"#mechanics-review-reject"),uncertain:te(n,"#mechanics-review-uncertain"),count:te(n,"#mechanics-review-count"),list:te(n,"#mechanics-review-list")},replayLoads:i,getReplayPlayer:()=>je,clearFreeCameraPreset(){Tn&&(Tn.freeCameraPreset=null)},resetReplayTransitionControls(){Qi.checked=!1,ea.checked=!1},activateTimelineSource:MF,loadReplayBundleForDisplay:Ed,showReplayLoadingWindow(){wn.showWindow("replay-loading")}});const a=te(n,"#boost-pickup-filters-window-body"),s=te(n,"#touch-controls-window-body");zc=te(n,"#stats-window-layer"),ts=ik({layer:zc,getReplayPlayer:()=>je,getStatsTimeline:()=>er,getStatsFrameLookup:()=>es,getStatRegistry:()=>Sd,readWindowPlacement:yF,applyWindowPlacement:bF,bringWindowToFront:wn.bringWindowToFront,setLauncherOpen:wn.setLauncherOpen,requestConfigSync:Vt,watchGoalReplay:ko.watchGoalReplay,cueGoalReplay:ko.cueGoalReplay}),Hc=te(n,"#toggle-playback"),fo=te(n,"#playback-rate"),Tn=f2({elements:{attachedPlayer:te(n,"#attached-player"),cameraViewFreeButton:te(n,"#camera-view-free"),cameraViewFollowButton:te(n,"#camera-view-follow"),cameraViewOverheadButton:te(n,"#camera-view-overhead"),cameraViewSideButton:te(n,"#camera-view-side"),cameraDistance:te(n,"#camera-distance"),cameraDistanceReadout:te(n,"#camera-distance-readout"),customCameraSettings:te(n,"#custom-camera-settings"),cameraSettingsControls:te(n,"#camera-settings-controls"),customCameraFov:te(n,"#custom-camera-fov"),customCameraHeight:te(n,"#custom-camera-height"),customCameraPitch:te(n,"#custom-camera-pitch"),customCameraDistance:te(n,"#custom-camera-distance"),customCameraStiffness:te(n,"#custom-camera-stiffness"),customCameraSwivelSpeed:te(n,"#custom-camera-swivel-speed"),customCameraTransitionSpeed:te(n,"#custom-camera-transition-speed"),customCameraFovReadout:te(n,"#custom-camera-fov-readout"),customCameraHeightReadout:te(n,"#custom-camera-height-readout"),customCameraPitchReadout:te(n,"#custom-camera-pitch-readout"),customCameraDistanceReadout:te(n,"#custom-camera-distance-readout"),customCameraStiffnessReadout:te(n,"#custom-camera-stiffness-readout"),customCameraSwivelSpeedReadout:te(n,"#custom-camera-swivel-speed-readout"),customCameraTransitionSpeedReadout:te(n,"#custom-camera-transition-speed-readout"),ballCam:te(n,"#ball-cam"),cameraProfileReadout:te(n,"#camera-profile-readout"),cameraFovReadout:te(n,"#camera-fov-readout"),cameraHeightReadout:te(n,"#camera-height-readout"),cameraPitchReadout:te(n,"#camera-pitch-readout"),cameraBaseDistanceReadout:te(n,"#camera-base-distance-readout"),cameraStiffnessReadout:te(n,"#camera-stiffness-readout")},getReplayPlayer:()=>je,requestConfigSync:Vt}),Jo=gk({elements:{summary:te(n,"#module-summary"),settings:te(n,"#module-settings"),boostPickupFilters:a,touchControls:s},modules:No,boostPickupFilters:ml,getContext:ir,getActiveModules:()=>Ct.getActiveModules(),getActiveCapabilityIds:uF,getBoostPickupAnimationEnabled:()=>je?.getState().boostPickupAnimationEnabled??!1,getBoostPadOverlayEnabled:()=>Ct.getBoostPadOverlayEnabled(),toggleCapability:o_,toggleBoostPickupAnimation(){const d=!(je?.getState().boostPickupAnimationEnabled??!1);je?.setBoostPickupAnimationEnabled(d),el(),Ba(),ia(),Vt()},toggleBoostPadOverlay:_F}),i_=te(n,"#time-readout"),a_=te(n,"#frame-readout"),s_=te(n,"#duration-readout"),r_=te(n,"#playback-status-readout"),Si=te(n,"#status-readout"),g0=te(n,"#players-readout"),v0=te(n,"#frames-readout"),bd=te(n,"#events-readout"),Qi=te(n,"#skip-post-goal-transitions"),ea=te(n,"#skip-kickoffs"),Ps=te(n,"#hitbox-wireframes"),Ls=te(n,"#hitbox-only-mode"),Qo=yD({elements:{togglePlayback:Hc,playbackRate:fo,skipPostGoalTransitions:Qi,skipKickoffs:ea,hitboxWireframes:Ps,hitboxOnlyMode:Ls,emptyState:gd,timeReadout:i_,frameReadout:a_,durationReadout:s_,playbackStatusReadout:r_},getCameraControlsController:()=>Tn}),Is=hD({elements:{fps:te(n,"#recording-fps"),playbackRate:te(n,"#recording-playback-rate"),start:te(n,"#recording-start"),fullReplay:te(n,"#recording-full-replay"),stop:te(n,"#recording-stop"),download:te(n,"#recording-download"),clear:te(n,"#recording-clear"),status:te(n,"#recording-status"),elapsed:te(n,"#recording-elapsed"),size:te(n,"#recording-size"),type:te(n,"#recording-type")},getCanvasRecorder:()=>Yo,getReplayPlayer:()=>je,getLoadedReplayName:()=>wd,setStatus(d){Si.textContent=d},requestConfigSync:Vt}),wi=rF({modules:No,playbackRate:fo,skipPostGoalTransitions:Qi,skipKickoffs:ea,hitboxWireframes:Ps,hitboxOnlyMode:Ls,getReplayPlayer:()=>je,getCameraControlsController:()=>Tn,getRecordingWindowController:()=>Is,getFloatingWindowController:()=>Ei,getStatsWindowsController:()=>ts,getActiveModulesRuntime:()=>Ct,getInitialConfig:()=>oi,renderModuleSummary:Ba,renderModuleSettings:ia,renderTimelineEventCount:Bs});const r=c0(window.location),o=Ok(window.location);let l=null;if(e.initialConfig!==void 0)oi=e.initialConfig;else{try{oi=Fk(window.location)}catch(d){l=d,console.error("Invalid stats player config:",d),Si.textContent=d instanceof Error?d.message:"Invalid stats player config",oi=null}o&&aF(r,oi,l)}const c=new AbortController;wn.installWindowDragging(Jm,c.signal),wn.installWindowDragging(zc,c.signal);const u=()=>{c.abort(),jo?.(),jo=null,y0(),je?.destroy(),je=null,Yo=null,of=null,er=null,es=null,Sd=Ko(),xF(),ts=null,Ct.reset(),Ua?.destroy(),Ua=null,T0(),nr=null,tr=null,zn?.reset(),zn=null,wd=null,Tn=null,Is=null,Jo=null,xd=null,Qo=null,oi=null,wi?.reset(),wi=null,Ei?.reset(),Ei=null,uo===n&&(uo=null,n.replaceChildren()),ho===u&&(ho=null)};if(ho=u,oi){wi?.setApplyingConfig(!0);try{wF(oi)}finally{wi?.setApplyingConfig(!1)}}return bD({elements:{root:n,launcherToggle:vd,launcherMenu:yd,loadReplayAction:Zm,emptyLoadReplay:jm,fileInput:Zo,togglePlayback:Hc,playbackRate:fo,skipPostGoalTransitions:Qi,skipKickoffs:ea,hitboxWireframes:Ps,hitboxOnlyMode:Ls},signal:c.signal,setLauncherOpen:wn.setLauncherOpen,openReplayFilePicker:wn.openReplayFilePicker,getElementWindowId:wn.getElementWindowId,toggleWindow:wn.toggleWindow,hideWindow:wn.hideWindow,createStatsWindow:SF,async loadReplayFile(d){try{zn?.clearCurrentClip({resetReplayId:!0,render:!0}),await l_(iD(d))}catch(f){console.error("Failed to load replay:",f),Si.textContent=f instanceof Error?f.message:"Failed to load replay"}},togglePlayback(){je?.togglePlayback(),Vt()},setPlaybackRate(d){je?.setPlaybackRate(d),Vt()},setSkipPostGoalTransitionsEnabled(d){je?.setSkipPostGoalTransitionsEnabled(d),Vt()},setSkipKickoffsEnabled(d){je?.setSkipKickoffsEnabled(d),Vt()},setHitboxWireframesEnabled(d){je?.setHitboxWireframesEnabled(d),Vt()},setHitboxOnlyModeEnabled(d){je?.setHitboxOnlyModeEnabled(d),Vt()}}),zn?.installEventListeners(c.signal),Is?.installEventListeners(c.signal),Tn?.installEventListeners(c.signal),Ba(),ia(),cf(),Tn?.renderProfile(),Tn?.syncModeButtons(),C0(),Bs(),zn?.render(),E0(),jD({signal:c.signal,location:window.location,statusReadout:Si,initialBundle:e.initialBundle,initialReplayName:e.initialReplayName,loadFromLocation:e.loadFromLocation,loadReplay:l_,loadReplayBundleForDisplay:Ed,getMechanicsReviewController:()=>zn,showMechanicsReviewWindow(){wn.showWindow("mechanics-review")}}),{root:n,destroy:u}}export{PF as mountStatEvaluationPlayer};
