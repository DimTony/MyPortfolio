import React, { useEffect, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

//@ts-ignore
export function Alien(props) {
  const group = useRef<any>(null);
  const { scene, animations } = useGLTF("/models/alien-transformed.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Armature|ArmatureAction"]?.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes._rootJoint} />
        <skinnedMesh
          name="Object_9"
          //@ts-ignore
          geometry={nodes.Object_9.geometry}
          material={materials.material}
          //@ts-ignore
          skeleton={nodes.Object_9.skeleton}
          position={[0.218, 0.978, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <skinnedMesh
          name="Object_10"
          //@ts-ignore
          geometry={nodes.Object_10.geometry}
          material={materials.Outline}
          //@ts-ignore
          skeleton={nodes.Object_10.skeleton}
          position={[0.218, 0.978, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/alien-transformed.glb");
