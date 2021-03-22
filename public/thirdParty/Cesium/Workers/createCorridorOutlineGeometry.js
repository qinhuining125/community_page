define(["./GeometryOffsetAttribute-def3b741","./arrayRemoveDuplicates-0f62a181","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./ComponentDatatype-9204e9f6","./PolylineVolumeGeometryLibrary-0881a44a","./CorridorGeometryLibrary-0814cf87","./when-208fe5b0","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6","./Math-4e53b694","./PolygonPipeline-bfd1975b","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1","./EllipsoidTangentPlane-9123a53b","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./PolylinePipeline-6c0541b0","./EllipsoidGeodesic-691360b8","./EllipsoidRhumbLine-8cb2e5a4"],function(v,u,p,M,e,R,B,U,F,Y,q,W,f,A,t,i,r,o,a,n,s,l){"use strict";var J=new M.Cartesian3,j=new M.Cartesian3,z=new M.Cartesian3;function _(e,t){var i,r=[],o=e.positions,a=e.corners,n=e.endPositions,s=new q.GeometryAttributes,l=0,d=0,u=0;for(L=0;L<o.length;L+=2)l+=i=o[L].length-3,u+=i/3*4,d+=o[L+1].length-3;for(l+=3,d+=3,L=0;L<a.length;L++){var p=a[L],f=a[L].leftPositions;F.defined(f)?l+=i=f.length:d+=i=a[L].rightPositions.length,u+=i/3*2}var h,y=F.defined(n);y&&(l+=h=n[0].length-3,d+=h,u+=4*(h/=3));var c,b,g,m,e=l+d,v=new Float64Array(e),A=0,_=e-1,E=h/2,C=W.IndexDatatype.createTypedArray(e/3,u+4),G=0;if(C[G++]=A/3,C[G++]=(_-2)/3,y){r.push(A/3);for(var T=J,P=j,w=n[0],L=0;L<E;L++)T=M.Cartesian3.fromArray(w,3*(E-1-L),T),P=M.Cartesian3.fromArray(w,3*(E+L),P),U.CorridorGeometryLibrary.addAttribute(v,P,A),U.CorridorGeometryLibrary.addAttribute(v,T,void 0,_),m=(b=A/3)+1,g=(c=(_-2)/3)-1,C[G++]=c,C[G++]=g,C[G++]=b,C[G++]=m,A+=3,_-=3}var D=0,k=o[D++],N=o[D++];for(v.set(k,A),v.set(N,_-N.length+1),i=N.length-3,r.push(A/3,(_-2)/3),L=0;L<i;L+=3)m=(b=A/3)+1,g=(c=(_-2)/3)-1,C[G++]=c,C[G++]=g,C[G++]=b,C[G++]=m,A+=3,_-=3;for(L=0;L<a.length;L++){var O,V,x=(p=a[L]).leftPositions,H=p.rightPositions,I=z;if(F.defined(x)){for(_-=3,V=g,r.push(m),O=0;O<x.length/3;O++)I=M.Cartesian3.fromArray(x,3*O,I),C[G++]=V-O-1,C[G++]=V-O,U.CorridorGeometryLibrary.addAttribute(v,I,void 0,_),_-=3;r.push(V-Math.floor(x.length/6)),t===B.CornerType.BEVELED&&r.push((_-2)/3+1),A+=3}else{for(A+=3,V=m,r.push(g),O=0;O<H.length/3;O++)I=M.Cartesian3.fromArray(H,3*O,I),C[G++]=V+O,C[G++]=V+O+1,U.CorridorGeometryLibrary.addAttribute(v,I,A),A+=3;r.push(V+Math.floor(H.length/6)),t===B.CornerType.BEVELED&&r.push(A/3-1),_-=3}for(k=o[D++],N=o[D++],k.splice(0,3),N.splice(N.length-3,3),v.set(k,A),v.set(N,_-N.length+1),i=N.length-3,O=0;O<N.length;O+=3)b=(m=A/3)-1,c=(g=(_-2)/3)+1,C[G++]=c,C[G++]=g,C[G++]=b,C[G++]=m,A+=3,_-=3;A-=3,_+=3,r.push(A/3,(_-2)/3)}if(y){A+=3,_-=3,T=J,P=j;var S=n[1];for(L=0;L<E;L++)T=M.Cartesian3.fromArray(S,3*(h-L-1),T),P=M.Cartesian3.fromArray(S,3*L,P),U.CorridorGeometryLibrary.addAttribute(v,T,void 0,_),U.CorridorGeometryLibrary.addAttribute(v,P,A),b=(m=A/3)-1,c=(g=(_-2)/3)+1,C[G++]=c,C[G++]=g,C[G++]=b,C[G++]=m,A+=3,_-=3;r.push(A/3)}else r.push(A/3,(_-2)/3);return C[G++]=A/3,C[G++]=(_-2)/3,s.position=new Y.GeometryAttribute({componentDatatype:R.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:v}),{attributes:s,indices:C,wallIndices:r}}function h(e){var t=(e=F.defaultValue(e,F.defaultValue.EMPTY_OBJECT)).positions,i=e.width,r=F.defaultValue(e.height,0),o=F.defaultValue(e.extrudedHeight,r);this._positions=t,this._ellipsoid=M.Ellipsoid.clone(F.defaultValue(e.ellipsoid,M.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(r,o),this._extrudedHeight=Math.min(r,o),this._cornerType=F.defaultValue(e.cornerType,B.CornerType.ROUNDED),this._granularity=F.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*M.Cartesian3.packedLength+M.Ellipsoid.packedLength+6}h.pack=function(e,t,i){i=F.defaultValue(i,0);var r=e._positions,o=r.length;t[i++]=o;for(var a=0;a<o;++a,i+=M.Cartesian3.packedLength)M.Cartesian3.pack(r[a],t,i);return M.Ellipsoid.pack(e._ellipsoid,t,i),i+=M.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=F.defaultValue(e._offsetAttribute,-1),t};var y=M.Ellipsoid.clone(M.Ellipsoid.UNIT_SPHERE),c={positions:void 0,ellipsoid:y,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return h.unpack=function(e,t,i){t=F.defaultValue(t,0);for(var r=e[t++],o=new Array(r),a=0;a<r;++a,t+=M.Cartesian3.packedLength)o[a]=M.Cartesian3.unpack(e,t);var n=M.Ellipsoid.unpack(e,t,y);t+=M.Ellipsoid.packedLength;var s=e[t++],l=e[t++],d=e[t++],u=e[t++],p=e[t++],f=e[t];return F.defined(i)?(i._positions=o,i._ellipsoid=M.Ellipsoid.clone(n,i._ellipsoid),i._width=s,i._height=l,i._extrudedHeight=d,i._cornerType=u,i._granularity=p,i._offsetAttribute=-1===f?void 0:f,i):(c.positions=o,c.width=s,c.height=l,c.extrudedHeight=d,c.cornerType=u,c.granularity=p,c.offsetAttribute=-1===f?void 0:f,new h(c))},h.createGeometry=function(e){var t=e._positions,i=e._width,r=e._ellipsoid,t=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(t,r),o=u.arrayRemoveDuplicates(t,M.Cartesian3.equalsEpsilon);if(!(o.length<2||i<=0)){var a,n=e._height,s=e._extrudedHeight,t=!f.CesiumMath.equalsEpsilon(n,s,0,f.CesiumMath.EPSILON2),i={ellipsoid:r,positions:o,width:i,cornerType:e._cornerType,granularity:e._granularity,saveAttributes:!1};t?(i.height=n,i.extrudedHeight=s,i.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.ellipsoid,i=(l=_(U.CorridorGeometryLibrary.computePositions(e),e.cornerType)).wallIndices,r=e.height,o=e.extrudedHeight,a=l.attributes,n=l.indices,s=(d=a.position.values).length;(u=new Float64Array(s)).set(d);var l=new Float64Array(2*s),d=A.PolygonPipeline.scaleToGeodeticHeight(d,r,t),u=A.PolygonPipeline.scaleToGeodeticHeight(u,o,t);l.set(d),l.set(u,s),a.position.values=l,s/=3,F.defined(e.offsetAttribute)&&(u=new Uint8Array(2*s),u=e.offsetAttribute===v.GeometryOffsetAttribute.TOP?v.arrayFill(u,1,0,s):(e=e.offsetAttribute===v.GeometryOffsetAttribute.NONE?0:1,v.arrayFill(u,e)),a.applyOffset=new Y.GeometryAttribute({componentDatatype:R.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:u}));var p=n.length,f=W.IndexDatatype.createTypedArray(l.length/3,2*(p+i.length));f.set(n);for(var h,y,c=p,b=0;b<p;b+=2){var g=n[b],m=n[b+1];f[c++]=g+s,f[c++]=m+s}for(b=0;b<i.length;b++)y=(h=i[b])+s,f[c++]=h,f[c++]=y;return{attributes:a,indices:f}}(i)):((a=_(U.CorridorGeometryLibrary.computePositions(i),i.cornerType)).attributes.position.values=A.PolygonPipeline.scaleToGeodeticHeight(a.attributes.position.values,n,r),F.defined(e._offsetAttribute)&&(l=a.attributes.position.values.length,d=new Uint8Array(l/3),l=e._offsetAttribute===v.GeometryOffsetAttribute.NONE?0:1,v.arrayFill(d,l),a.attributes.applyOffset=new Y.GeometryAttribute({componentDatatype:R.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:d})));var l=a.attributes,d=p.BoundingSphere.fromVertices(l.position.values,void 0,3);return new Y.Geometry({attributes:l,indices:a.indices,primitiveType:Y.PrimitiveType.LINES,boundingSphere:d,offsetAttribute:e._offsetAttribute})}},function(e,t){return(e=F.defined(t)?h.unpack(e,t):e)._ellipsoid=M.Ellipsoid.clone(e._ellipsoid),h.createGeometry(e)}});
