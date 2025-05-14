import { useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useMemo, useRef } from "react";

//@ts-ignore
export function ContactBoy(props) {
  const group = useRef<any>(null);

  const { scene } = useGLTF("/models/boy-transformed.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations } = useFBX("/models/Wave Hip Hop Dance.fbx");
  animations[0].name = "Dance";
  const action = useAnimations(animations, group);

  useEffect(() => {
    action?.actions["Dance"]?.play();
  }, []);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
      //@ts-ignore
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
      //@ts-ignore
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
      //@ts-ignore
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
      //@ts-ignore
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
      //@ts-ignore
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        //@ts-ignore
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        //@ts-ignore
        skeleton={nodes.EyeLeft.skeleton}
        //@ts-ignore
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        //@ts-ignore
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        //@ts-ignore
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        //@ts-ignore
        skeleton={nodes.EyeRight.skeleton}
        //@ts-ignore
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        //@ts-ignore
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        //@ts-ignore
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Head.skeleton}
        //@ts-ignore
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        //@ts-ignore
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        //@ts-ignore
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        //@ts-ignore
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        //@ts-ignore
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        //@ts-ignore
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/boy-transformed.glb");
