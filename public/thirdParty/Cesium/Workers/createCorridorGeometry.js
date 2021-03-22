define(["./GeometryOffsetAttribute-def3b741","./arrayRemoveDuplicates-0f62a181","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./ComponentDatatype-9204e9f6","./PolylineVolumeGeometryLibrary-0881a44a","./CorridorGeometryLibrary-0814cf87","./when-208fe5b0","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6","./Math-4e53b694","./PolygonPipeline-bfd1975b","./VertexFormat-e8cbf5b3","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1","./EllipsoidTangentPlane-9123a53b","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./PolylinePipeline-6c0541b0","./EllipsoidGeodesic-691360b8","./EllipsoidRhumbLine-8cb2e5a4"],function(G,h,m,ot,t,nt,f,st,lt,dt,ut,mt,ht,V,E,e,a,r,i,o,n,s,l){"use strict";var ft=new ot.Cartesian3,ct=new ot.Cartesian3,yt=new ot.Cartesian3,pt=new ot.Cartesian3,x=new ot.Cartesian3,gt=new ot.Cartesian3,Ct=new ot.Cartesian3,bt=new ot.Cartesian3;function c(t,e){for(var a=0;a<t.length;a++)t[a]=e.scaleToGeodeticSurface(t[a],t[a]);return t}function vt(t,e,a,r,i,o){var n=t.normals,s=t.tangents,l=t.bitangents,t=ot.Cartesian3.normalize(ot.Cartesian3.cross(a,e,Ct),Ct);o.normal&&st.CorridorGeometryLibrary.addAttribute(n,e,r,i),o.tangent&&st.CorridorGeometryLibrary.addAttribute(s,t,r,i),o.bitangent&&st.CorridorGeometryLibrary.addAttribute(l,a,r,i)}function F(t,e,a,r){var i,o=t.positions,n=t.corners,s=t.endPositions,l=t.lefts,d=t.normals,u=new ut.GeometryAttributes,m=0,h=0,f=0;for(D=0;D<o.length;D+=2)m+=i=o[D].length-3,f+=2*i,h+=o[D+1].length-3;for(m+=3,h+=3,D=0;D<n.length;D++){var c=n[D],y=n[D].leftPositions;lt.defined(y)?m+=i=y.length:h+=i=n[D].rightPositions.length,f+=i}var p,g=lt.defined(s);g&&(m+=p=s[0].length-3,h+=p,f+=6*(p/=3));var C,b,v,A,t=m+h,_=new Float64Array(t),w={normals:e.normal?new Float32Array(t):void 0,tangents:e.tangent?new Float32Array(t):void 0,bitangents:e.bitangent?new Float32Array(t):void 0},M=0,T=t-1,G=ft,V=ct,E=p/2,x=mt.IndexDatatype.createTypedArray(t/3,f),F=0;if(g)for(var L=yt,P=pt,N=s[0],G=ot.Cartesian3.fromArray(d,0,G),V=ot.Cartesian3.fromArray(l,0,V),D=0;D<E;D++)L=ot.Cartesian3.fromArray(N,3*(E-1-D),L),P=ot.Cartesian3.fromArray(N,3*(E+D),P),st.CorridorGeometryLibrary.addAttribute(_,P,M),st.CorridorGeometryLibrary.addAttribute(_,L,void 0,T),vt(w,G,V,M,T,e),A=(b=M/3)+1,v=(C=(T-2)/3)-1,x[F++]=C,x[F++]=b,x[F++]=v,x[F++]=v,x[F++]=b,x[F++]=A,M+=3,T-=3;var O,I,R=0,S=0,k=o[R++],z=o[R++];for(_.set(k,M),_.set(z,T-z.length+1),V=ot.Cartesian3.fromArray(l,S,V),i=z.length-3,D=0;D<i;D+=3)O=a.geodeticSurfaceNormal(ot.Cartesian3.fromArray(k,D,Ct),Ct),I=a.geodeticSurfaceNormal(ot.Cartesian3.fromArray(z,i-D,bt),bt),vt(w,G=ot.Cartesian3.normalize(ot.Cartesian3.add(O,I,G),G),V,M,T,e),A=(b=M/3)+1,v=(C=(T-2)/3)-1,x[F++]=C,x[F++]=b,x[F++]=v,x[F++]=v,x[F++]=b,x[F++]=A,M+=3,T-=3;for(O=a.geodeticSurfaceNormal(ot.Cartesian3.fromArray(k,i,Ct),Ct),I=a.geodeticSurfaceNormal(ot.Cartesian3.fromArray(z,i,bt),bt),G=ot.Cartesian3.normalize(ot.Cartesian3.add(O,I,G),G),S+=3,D=0;D<n.length;D++){var H,U,B,Y=(c=n[D]).leftPositions,W=c.rightPositions,q=gt,J=yt,j=pt;if(G=ot.Cartesian3.fromArray(d,S,G),lt.defined(Y)){for(vt(w,G,V,void 0,T,e),T-=3,U=A,B=v,H=0;H<Y.length/3;H++)q=ot.Cartesian3.fromArray(Y,3*H,q),x[F++]=U,x[F++]=B-H-1,x[F++]=B-H,st.CorridorGeometryLibrary.addAttribute(_,q,void 0,T),J=ot.Cartesian3.fromArray(_,3*(B-H-1),J),j=ot.Cartesian3.fromArray(_,3*U,j),vt(w,G,V=ot.Cartesian3.normalize(ot.Cartesian3.subtract(J,j,V),V),void 0,T,e),T-=3;q=ot.Cartesian3.fromArray(_,3*U,q),J=ot.Cartesian3.subtract(ot.Cartesian3.fromArray(_,3*B,J),q,J),j=ot.Cartesian3.subtract(ot.Cartesian3.fromArray(_,3*(B-H),j),q,j),vt(w,G,V=ot.Cartesian3.normalize(ot.Cartesian3.add(J,j,V),V),M,void 0,e),M+=3}else{for(vt(w,G,V,M,void 0,e),M+=3,U=v,B=A,H=0;H<W.length/3;H++)q=ot.Cartesian3.fromArray(W,3*H,q),x[F++]=U,x[F++]=B+H,x[F++]=B+H+1,st.CorridorGeometryLibrary.addAttribute(_,q,M),J=ot.Cartesian3.fromArray(_,3*U,J),j=ot.Cartesian3.fromArray(_,3*(B+H),j),vt(w,G,V=ot.Cartesian3.normalize(ot.Cartesian3.subtract(J,j,V),V),M,void 0,e),M+=3;q=ot.Cartesian3.fromArray(_,3*U,q),J=ot.Cartesian3.subtract(ot.Cartesian3.fromArray(_,3*(B+H),J),q,J),j=ot.Cartesian3.subtract(ot.Cartesian3.fromArray(_,3*B,j),q,j),vt(w,G,V=ot.Cartesian3.normalize(ot.Cartesian3.negate(ot.Cartesian3.add(j,J,V),V),V),void 0,T,e),T-=3}for(k=o[R++],z=o[R++],k.splice(0,3),z.splice(z.length-3,3),_.set(k,M),_.set(z,T-z.length+1),i=z.length-3,S+=3,V=ot.Cartesian3.fromArray(l,S,V),H=0;H<z.length;H+=3)O=a.geodeticSurfaceNormal(ot.Cartesian3.fromArray(k,H,Ct),Ct),I=a.geodeticSurfaceNormal(ot.Cartesian3.fromArray(z,i-H,bt),bt),vt(w,G=ot.Cartesian3.normalize(ot.Cartesian3.add(O,I,G),G),V,M,T,e),b=(A=M/3)-1,C=(v=(T-2)/3)+1,x[F++]=C,x[F++]=b,x[F++]=v,x[F++]=v,x[F++]=b,x[F++]=A,M+=3,T-=3;M-=3,T+=3}if(vt(w,G=ot.Cartesian3.fromArray(d,d.length-3,G),V,M,T,e),g){M+=3,T-=3,L=yt,P=pt;var K=s[1];for(D=0;D<E;D++)L=ot.Cartesian3.fromArray(K,3*(p-D-1),L),P=ot.Cartesian3.fromArray(K,3*D,P),st.CorridorGeometryLibrary.addAttribute(_,L,void 0,T),st.CorridorGeometryLibrary.addAttribute(_,P,M),vt(w,G,V,M,T,e),b=(A=M/3)-1,C=(v=(T-2)/3)+1,x[F++]=C,x[F++]=b,x[F++]=v,x[F++]=v,x[F++]=b,x[F++]=A,M+=3,T-=3}if(u.position=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:_}),e.st){var Q=new Float32Array(t/3*2),X=0,r=lt.defaultValue(r,void 0);if(g){m/=3,h/=3;var Z=Math.PI/(p+1),$=1/(m-p+1),tt=1/(h-p+1),et=p/2;for(D=1+et;D<p+1;D++){var at,rt,it=ht.CesiumMath.PI_OVER_TWO+Z*D;Q[X++]=tt*(1+Math.cos(it)),Q[X++]=.5*(1+Math.sin(it)),lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt)}for(D=1;D<h-p+1;D++)Q[X++]=D*tt,Q[X++]=0,lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt);for(D=p;et<D;D--)it=ht.CesiumMath.PI_OVER_TWO-D*Z,Q[X++]=1-tt*(1+Math.cos(it)),Q[X++]=.5*(1+Math.sin(it)),lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt);for(D=et;0<D;D--)it=ht.CesiumMath.PI_OVER_TWO-Z*D,Q[X++]=1-$*(1+Math.cos(it)),Q[X++]=.5*(1+Math.sin(it)),lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt);for(D=m-p;0<D;D--)Q[X++]=D*$,Q[X++]=1,lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt);for(D=1;D<1+et;D++)it=ht.CesiumMath.PI_OVER_TWO+Z*D,Q[X++]=$*(1+Math.cos(it)),Q[X++]=.5*(1+Math.sin(it)),lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt)}else{for($=1/((m/=3)-1),tt=1/((h/=3)-1),D=0;D<h;D++)Q[X++]=D*tt,Q[X++]=0,lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt);for(D=m;0<D;D--)Q[X++]=(D-1)*$,Q[X++]=1,lt.defined(r)&&0!=r&&(at=(Q[X-2]-.5)*Math.cos(-r)-(Q[X-1]-.5)*Math.sin(-r)+.5,rt=(Q[X-2]-.5)*Math.sin(-r)+(Q[X-1]-.5)*Math.cos(-r)+.5,Q[X-2]=at,Q[X-1]=rt)}u.st=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:Q})}return e.normal&&(u.normal=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w.normals})),e.tangent&&(u.tangent=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w.tangents})),e.bitangent&&(u.bitangent=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w.bitangents})),{attributes:u,indices:x}}function L(t,e,a){a[e++]=t[0],a[e++]=t[1],a[e++]=t[2];for(var r=3;r<t.length;r+=3){var i=t[r],o=t[r+1],n=t[r+2];a[e++]=i,a[e++]=o,a[e++]=n,a[e++]=i,a[e++]=o,a[e++]=n}return a[e++]=t[0],a[e++]=t[1],a[e++]=t[2],a}function y(t,e){var a=new E.VertexFormat({position:e.position,normal:e.normal||e.bitangent||t.shadowVolume,tangent:e.tangent,bitangent:e.normal||e.bitangent,st:e.st}),r=t.ellipsoid,i=F(st.CorridorGeometryLibrary.computePositions(t),a,r,lt.defaultValue(t.stRotation,void 0)),o=t.height,n=t.extrudedHeight,s=i.attributes,l=i.indices,d=s.position.values,u=d.length,m=new Float64Array(6*u),a=new Float64Array(u);a.set(d);i=new Float64Array(4*u),i=L(d=V.PolygonPipeline.scaleToGeodeticHeight(d,o,r),0,i);i=L(a=V.PolygonPipeline.scaleToGeodeticHeight(a,n,r),2*u,i),m.set(d),m.set(a,u),m.set(i,2*u),s.position.values=m;var s=function(t,e){if(!(e.normal||e.tangent||e.bitangent||e.st))return t;var a,r=t.position.values;(e.normal||e.bitangent)&&(a=t.normal.values,l=t.bitangent.values);var i=t.position.values.length/18,o=3*i,n=2*i,s=2*o;if(e.normal||e.bitangent||e.tangent){for(var l,d=e.normal?new Float32Array(6*o):void 0,u=e.tangent?new Float32Array(6*o):void 0,m=e.bitangent?new Float32Array(6*o):void 0,h=ft,f=ct,c=yt,y=pt,p=x,g=gt,C=s,b=0;b<o;b+=3){var v=C+s,h=ot.Cartesian3.fromArray(r,b,h),f=ot.Cartesian3.fromArray(r,b+o,f),c=ot.Cartesian3.fromArray(r,(b+3)%o,c);f=ot.Cartesian3.subtract(f,h,f),c=ot.Cartesian3.subtract(c,h,c),y=ot.Cartesian3.normalize(ot.Cartesian3.cross(f,c,y),y),e.normal&&(st.CorridorGeometryLibrary.addAttribute(d,y,v),st.CorridorGeometryLibrary.addAttribute(d,y,v+3),st.CorridorGeometryLibrary.addAttribute(d,y,C),st.CorridorGeometryLibrary.addAttribute(d,y,C+3)),(e.tangent||e.bitangent)&&(g=ot.Cartesian3.fromArray(a,b,g),e.bitangent&&(st.CorridorGeometryLibrary.addAttribute(m,g,v),st.CorridorGeometryLibrary.addAttribute(m,g,v+3),st.CorridorGeometryLibrary.addAttribute(m,g,C),st.CorridorGeometryLibrary.addAttribute(m,g,C+3)),e.tangent&&(p=ot.Cartesian3.normalize(ot.Cartesian3.cross(g,y,p),p),st.CorridorGeometryLibrary.addAttribute(u,p,v),st.CorridorGeometryLibrary.addAttribute(u,p,v+3),st.CorridorGeometryLibrary.addAttribute(u,p,C),st.CorridorGeometryLibrary.addAttribute(u,p,C+3))),C+=6}if(e.normal){for(d.set(a),b=0;b<o;b+=3)d[b+o]=-a[b],d[b+o+1]=-a[b+1],d[b+o+2]=-a[b+2];t.normal.values=d}else t.normal=void 0;e.bitangent?(m.set(l),m.set(l,o),t.bitangent.values=m):t.bitangent=void 0,e.tangent&&(l=t.tangent.values,u.set(l),u.set(l,o),t.tangent.values=u)}if(e.st){var A=t.st.values,_=new Float32Array(6*n);_.set(A),_.set(A,n);for(var w=2*n,M=0;M<2;M++){for(_[w++]=A[0],_[w++]=A[1],b=2;b<n;b+=2){var T=A[b],G=A[b+1];_[w++]=T,_[w++]=G,_[w++]=T,_[w++]=G}_[w++]=A[0],_[w++]=A[1]}t.st.values=_}return t}(s,e),h=u/3;if(t.shadowVolume){for(var f=s.normal.values,u=f.length,i=new Float32Array(6*u),c=0;c<u;c++)f[c]=-f[c];i.set(f,u),i=L(f,4*u,i),s.extrudeDirection=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:i}),e.normal||(s.normal=void 0)}lt.defined(t.offsetAttribute)&&(e=new Uint8Array(6*h),e=t.offsetAttribute===G.GeometryOffsetAttribute.TOP?(e=G.arrayFill(e,1,0,h),G.arrayFill(e,1,2*h,4*h)):(t=t.offsetAttribute===G.GeometryOffsetAttribute.NONE?0:1,G.arrayFill(e,t)),s.applyOffset=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e}));var y=l.length,p=h+h,g=mt.IndexDatatype.createTypedArray(m.length/3,2*y+3*p);g.set(l);var C,b,v,A,_=y;for(c=0;c<y;c+=3){var w=l[c],M=l[c+1],T=l[c+2];g[_++]=T+h,g[_++]=M+h,g[_++]=w+h}for(c=0;c<p;c+=2)v=(C=c+p)+1,A=(b=C+p)+1,g[_++]=C,g[_++]=b,g[_++]=v,g[_++]=v,g[_++]=b,g[_++]=A;return{attributes:s,indices:g}}var p=new ot.Cartesian3,g=new ot.Cartesian3,C=new ot.Cartographic;function b(t,e,a,r,i,o){var n=ot.Cartesian3.subtract(e,t,p);ot.Cartesian3.normalize(n,n);var s=a.geodeticSurfaceNormal(t,g),l=ot.Cartesian3.cross(n,s,p);ot.Cartesian3.multiplyByScalar(l,r,l);var d=i.latitude,u=i.longitude,e=o.latitude,n=o.longitude;ot.Cartesian3.add(t,l,g),a.cartesianToCartographic(g,C);s=C.latitude,r=C.longitude,d=Math.min(d,s),u=Math.min(u,r),e=Math.max(e,s),n=Math.max(n,r);ot.Cartesian3.subtract(t,l,g),a.cartesianToCartographic(g,C),s=C.latitude,r=C.longitude,d=Math.min(d,s),u=Math.min(u,r),e=Math.max(e,s),n=Math.max(n,r),i.latitude=d,i.longitude=u,o.latitude=e,o.longitude=n}var v=new ot.Cartesian3,A=new ot.Cartesian3,_=new ot.Cartographic,w=new ot.Cartographic;function d(t,e,a,r,i){t=c(t,e);var o=h.arrayRemoveDuplicates(t,ot.Cartesian3.equalsEpsilon),n=o.length;if(n<2||a<=0)return new ot.Rectangle;var s,l,d=.5*a;_.latitude=Number.POSITIVE_INFINITY,_.longitude=Number.POSITIVE_INFINITY,w.latitude=Number.NEGATIVE_INFINITY,w.longitude=Number.NEGATIVE_INFINITY,r===f.CornerType.ROUNDED&&(m=o[0],ot.Cartesian3.subtract(m,o[1],v),ot.Cartesian3.normalize(v,v),ot.Cartesian3.multiplyByScalar(v,d,v),ot.Cartesian3.add(m,v,A),e.cartesianToCartographic(A,C),s=C.latitude,l=C.longitude,_.latitude=Math.min(_.latitude,s),_.longitude=Math.min(_.longitude,l),w.latitude=Math.max(w.latitude,s),w.longitude=Math.max(w.longitude,l));for(var u=0;u<n-1;++u)b(o[u],o[u+1],e,d,_,w);var m=o[n-1];ot.Cartesian3.subtract(m,o[n-2],v),ot.Cartesian3.normalize(v,v),ot.Cartesian3.multiplyByScalar(v,d,v),ot.Cartesian3.add(m,v,A),b(m,A,e,d,_,w),r===f.CornerType.ROUNDED&&(e.cartesianToCartographic(A,C),s=C.latitude,l=C.longitude,_.latitude=Math.min(_.latitude,s),_.longitude=Math.min(_.longitude,l),w.latitude=Math.max(w.latitude,s),w.longitude=Math.max(w.longitude,l));i=lt.defined(i)?i:new ot.Rectangle;return i.north=w.latitude,i.south=_.latitude,i.east=w.longitude,i.west=_.longitude,i}function M(t){var e=(t=lt.defaultValue(t,lt.defaultValue.EMPTY_OBJECT)).positions,a=t.width,r=lt.defaultValue(t.height,0),i=lt.defaultValue(t.extrudedHeight,r);this._positions=e,this._ellipsoid=ot.Ellipsoid.clone(lt.defaultValue(t.ellipsoid,ot.Ellipsoid.WGS84)),this._vertexFormat=E.VertexFormat.clone(lt.defaultValue(t.vertexFormat,E.VertexFormat.DEFAULT)),this._width=a,this._height=Math.max(r,i),this._extrudedHeight=Math.min(r,i),this._cornerType=lt.defaultValue(t.cornerType,f.CornerType.ROUNDED),this._granularity=lt.defaultValue(t.granularity,ht.CesiumMath.RADIANS_PER_DEGREE),this._shadowVolume=lt.defaultValue(t.shadowVolume,!1),this._workerName="createCorridorGeometry",this._offsetAttribute=t.offsetAttribute,this._rectangle=void 0,this._stRotation=lt.defaultValue(t.stRotation,void 0),this.packedLength=1+e.length*ot.Cartesian3.packedLength+ot.Ellipsoid.packedLength+E.VertexFormat.packedLength+7+1}M.pack=function(t,e,a){a=lt.defaultValue(a,0);var r=t._positions,i=r.length;e[a++]=i;for(var o=0;o<i;++o,a+=ot.Cartesian3.packedLength)ot.Cartesian3.pack(r[o],e,a);return ot.Ellipsoid.pack(t._ellipsoid,e,a),a+=ot.Ellipsoid.packedLength,E.VertexFormat.pack(t._vertexFormat,e,a),a+=E.VertexFormat.packedLength,e[a++]=t._width,e[a++]=t._height,e[a++]=t._extrudedHeight,e[a++]=t._cornerType,e[a++]=t._granularity,e[a++]=t._shadowVolume?1:0,e[a]=lt.defaultValue(t._offsetAttribute,-1),e[a+1]=lt.defaultValue(t._stRotation,void 0),e};var T=ot.Ellipsoid.clone(ot.Ellipsoid.UNIT_SPHERE),P=new E.VertexFormat,N={positions:void 0,ellipsoid:T,vertexFormat:P,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,shadowVolume:void 0,offsetAttribute:void 0,stRotation:void 0};return M.unpack=function(t,e,a){e=lt.defaultValue(e,0);for(var r=t[e++],i=new Array(r),o=0;o<r;++o,e+=ot.Cartesian3.packedLength)i[o]=ot.Cartesian3.unpack(t,e);var n=ot.Ellipsoid.unpack(t,e,T);e+=ot.Ellipsoid.packedLength;var s=E.VertexFormat.unpack(t,e,P);e+=E.VertexFormat.packedLength;var l=t[e++],d=t[e++],u=t[e++],m=t[e++],h=t[e++],f=1===t[e++],c=t[e],y=t[e+1];return lt.defined(a)?(a._positions=i,a._ellipsoid=ot.Ellipsoid.clone(n,a._ellipsoid),a._vertexFormat=E.VertexFormat.clone(s,a._vertexFormat),a._width=l,a._height=d,a._extrudedHeight=u,a._cornerType=m,a._granularity=h,a._shadowVolume=f,a._offsetAttribute=-1===c?void 0:c,a._stRotation=y,a):(N.positions=i,N.width=l,N.height=d,N.extrudedHeight=u,N.cornerType=m,N.granularity=h,N.shadowVolume=f,N.offsetAttribute=-1===c?void 0:c,N.stRotation=y,new M(N))},M.computeRectangle=function(t,e){var a=(t=lt.defaultValue(t,lt.defaultValue.EMPTY_OBJECT)).positions,r=t.width;return d(a,lt.defaultValue(t.ellipsoid,ot.Ellipsoid.WGS84),r,lt.defaultValue(t.cornerType,f.CornerType.ROUNDED),e)},M.createGeometry=function(t){var e=t._positions,a=t._width,r=t._ellipsoid,e=c(e,r),i=h.arrayRemoveDuplicates(e,ot.Cartesian3.equalsEpsilon);if(!(i.length<2||a<=0)){var o,n=t._height,s=t._extrudedHeight,l=!ht.CesiumMath.equalsEpsilon(n,s,0,ht.CesiumMath.EPSILON2),e=t._vertexFormat,a={ellipsoid:r,positions:i,width:a,cornerType:t._cornerType,granularity:t._granularity,saveAttributes:!0};l?(a.height=n,a.extrudedHeight=s,a.shadowVolume=t._shadowVolume,a.offsetAttribute=t._offsetAttribute,o=y(a,e)):((o=F(st.CorridorGeometryLibrary.computePositions(a),e,r,t._stRotation)).attributes.position.values=V.PolygonPipeline.scaleToGeodeticHeight(o.attributes.position.values,n,r),lt.defined(t._offsetAttribute)&&(d=t._offsetAttribute===G.GeometryOffsetAttribute.NONE?0:1,u=o.attributes.position.values.length,u=new Uint8Array(u/3),G.arrayFill(u,d),o.attributes.applyOffset=new dt.GeometryAttribute({componentDatatype:nt.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:u})));var d=o.attributes,u=m.BoundingSphere.fromVertices(d.position.values,void 0,3);return e.position||(o.attributes.position.values=void 0),new dt.Geometry({attributes:d,indices:o.indices,primitiveType:dt.PrimitiveType.TRIANGLES,boundingSphere:u,offsetAttribute:t._offsetAttribute})}},M.createShadowVolume=function(t,e,a){var r=t._granularity,i=t._ellipsoid,e=e(r,i),a=a(r,i);return new M({positions:t._positions,width:t._width,cornerType:t._cornerType,ellipsoid:i,granularity:r,extrudedHeight:e,height:a,vertexFormat:E.VertexFormat.POSITION_ONLY,shadowVolume:!0,stRotation:t._stRotation})},M.erase=function(t,e){var a=[];if(lt.defined(t)){for(var a=[t[0].clone()],r=t[0].clone(),i=1;i<t.length;i++){var o=t[i];1e-6<ot.Cartesian3.distance(r,o)-e&&(a.push(o.clone()),r=o.clone())}a.splice(a.length-1,1),a.push(t[t.length-1].clone())}return a},M.recomputeCenterPositions=function(t,e){var a=[];if(lt.defined(t)){for(var r=0;r<t.length-1;r++){var i=t[r],o=t[r+1];a.push(i.clone());var n=ot.Cartesian3.distance(i,o),s=n/e;if(0<s&&s<.5)for(var l=Math.ceil(n/(e/(e/111319.55))),d=(o.x-i.x)/l,u=(o.y-i.y)/l,m=(o.z-i.z)/l,h=1;h<l;h++){var f=new ot.Cartesian3(i.x+h*d,i.y+h*u,i.z+h*m);a.push(f)}}a.push(t[t.length-1].clone())}return M.erase(a,.5*e)},Object.defineProperties(M.prototype,{rectangle:{get:function(){return lt.defined(this._rectangle)||(this._rectangle=d(this._positions,this._ellipsoid,this._width,this._cornerType)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return[0,0,0,1,1,0]}}}),function(t,e){return(t=lt.defined(e)?M.unpack(t,e):t)._ellipsoid=ot.Ellipsoid.clone(t._ellipsoid),M.createGeometry(t)}});
