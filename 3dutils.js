enclosing=function(bb1,bb2){return bb1.max.x>bb2.max.x && bb1.max.y>bb2.max.y && bb1.max.z>bb2.max.z && bb1.min.x<bb2.min.x && bb1.min.y<bb2.min.y && bb1.min.z<bb2.min.z}
outside=function(p,bb){return p.x>bb.max.x || p.y>bb.max.y || p.z>bb.max.z || p.x<bb.min.x || p.y<bb.min.y || p.z<bb.min.z}
overlapped=function(bb1,bb2){return bb1.max.x>bb2.min.x && bb1.max.y>bb2.min.y && bb1.max.z>bb2.min.z && bb1.min.x<bb2.max.x && bb1.min.y<bb2.max.y && bb1.min.z<bb2.max.z}
