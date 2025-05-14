import { useGraph } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

//@ts-ignore
export function Boy(props) {
  const group = useRef<any>(null);
  const { progress, total } = useProgress();
  const [isIntroAnimationDone, setIsIntroAnimationDone] = useState(false);

  const { scene } = useGLTF("/models/boy-transformed.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const mouse = useRef(new THREE.Vector2());

  useGSAP(() => {
    if (total === 20 && progress === 100) {
      gsap.from(group?.current?.rotation, {
        y: Math.PI,
        duration: 1.5,
        ease: "power1.inOut",
        onComplete: () => {
          setIsIntroAnimationDone(true);
        },
      });
    }
  }, [progress]);

  useEffect(() => {
    if (isIntroAnimationDone) {
      const handleMouseMove = (event: any) => {
        const { innerWidth, innerHeight } = window;
        mouse.current.x = (event.clientX / innerWidth) * 2 - 1; // Normalize between -1 and 1
        mouse.current.y = -(event.clientY / innerHeight) * 2 + 1; // Normalize between -1 and 1

        const target = new THREE.Vector3(mouse.current.x, mouse.current.y, 1);
        group.current.getObjectByName("Head").lookAt(target);
        group.current.rotation.y = target.x * 0.5;
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isIntroAnimationDone]);

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
