import { useGLTF } from '@react-three/drei'
import { useRef, useState,forwardRef } from 'react'
import * as THREE from 'three'


type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh
  }
  materials: {
    [name: string]: THREE.Material
  }
}

export const HouseMdel = forwardRef<THREE.Group>(function HouseMdel(_, ref) {
  const { nodes, materials } = useGLTF('Models/HeroModels/free_london_skyscraper.glb') as unknown as GLTFResult
 
  return (
    // <group dispose={null} position={position} rotation={rotation} scale={scale}>
    <group ref={ref} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.98}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Elements_Trim_Building_Elements_Trim_0.geometry}
            material={materials.Building_Elements_Trim}
            position={[108.324, 588.095, -78.948]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[98.13, -220.294, -1887.838]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade001_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-572.978, -220.295, -129.91]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade002_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[105.032, 136.246, -168.347]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade003_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[102.293, 8071.725, -953.067]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade004_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[89.303, 367.696, -626.037]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade005_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[107.655, 671.458, -287.627]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade006_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[101.35, 15838.356, -325.522]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade007_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-6.021, 4677.116, -919.95]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade008_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[92.939, 8244.643, -491.979]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade009_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[760.593, 8292.936, 1440.221]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade010_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[1426.734, 8369.185, -2501.686]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade011_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[1445.367, 8307.975, -382.054]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade012_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[696.336, 11411.19, 1443.278]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade013_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[1409.397, 11498.044, -2402.049]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade014_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[1414.249, 11426.116, -357.771]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade015_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[95.302, 8414.797, -3198.016]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade016_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-514.18, 8292.947, 1492.078]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade017_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-1231.914, 8369.406, -2502.906]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade018_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-1228.331, 8306.272, -309.776]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade019_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[96.249, 11551.461, -3067.23]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade020_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-499.945, 11411.19, 1443.277]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade021_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-1213.006, 11498.044, -2402.049]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Facade022_Building_Facade_0.geometry}
            material={materials.Building_Facade}
            position={[-1202.239, 11423.557, -293.142]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Building_Maintenance_Unit_Building_Maintenance_Unit_0.geometry}
            material={materials.Building_Maintenance_Unit}
            position={[94.528, 16465.502, 282.457]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Color_Pallete_Color_Pallete_0.geometry}
            material={materials.Color_Pallete}
            position={[47.155, 377.427, 530.236]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Concrete_Pillar_Concrete_Pillar_0.geometry}
            material={materials.Concrete_Pillar}
            position={[797.318, -34.262, -798.611]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Concrete_Pillar001_Concrete_Pillar_0.geometry}
            material={materials.Concrete_Pillar}
            position={[-601.056, -34.262, -798.611]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Concrete_Pillar002_Concrete_Pillar_0.geometry}
            material={materials.Concrete_Pillar}
            position={[91.538, -34.108, 1069.365]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[760.667, 8305.099, 1440.139]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red001_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[1426.682, 8381.35, -2501.785]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red002_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[1445.398, 8320.137, -382.161]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red003_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[696.421, 11423.357, 1443.349]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red004_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[1409.444, 11510.211, -2402.149]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red005_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[1414.276, 11438.279, -357.878]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red006_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[95.413, 8426.965, -3198.019]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red007_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[-514.259, 8305.116, 1492]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red008_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[-1231.866, 8381.573, -2503.006]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red009_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[-1228.36, 8318.438, -309.884]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red010_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[96.36, 11563.624, -3067.233]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red011_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[-500.029, 11423.357, 1443.205]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red012_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[-1212.957, 11510.211, -2402.148]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flare_Red013_Flare_Red_0.geometry}
            material={materials.Flare_Red}
            position={[-1202.259, 11435.724, -293.251]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Furniture_Furniture_0.geometry}
            material={materials.Furniture}
            position={[107.111, 5299.021, -795.639]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Generic_Glass_Generic_0.geometry}
            material={materials.Glass_Generic}
            position={[93.817, 8198.055, -951.684]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Generic001_Glass_Generic_0.geometry}
            material={materials.Glass_Generic}
            position={[94.252, 378.903, -718.611]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Generic_More_Opaque_Glass_Generic_More_Opaque_0.geometry}
            material={materials.Glass_Generic_More_Opaque}
            position={[101.575, 15882.636, -297.065]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Lobby_Glass_Lobby_0.geometry}
            material={materials.Glass_Lobby}
            position={[-574.427, -233.522, -129.319]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Lobby001_Glass_Lobby_0.geometry}
            material={materials.Glass_Lobby}
            position={[98.131, -233.52, -1889.424]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Lobby002_Glass_Lobby_0.geometry}
            material={materials.Glass_Lobby}
            position={[106.181, 138.134, -188.236]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Railing_Glass_Railing_0.geometry}
            material={materials.Glass_Railing}
            position={[208.925, -11.988, 331.412]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Interior_Blinds_Interior_Blinds_0.geometry}
            material={materials.Interior_Blinds}
            position={[95.501, 5752.186, -471.198]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Interior_Top_Interior_Top_0.geometry}
            material={materials.Interior_Top}
            position={[101.464, 7845.565, -742.783]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lobby_Curtains_Lobby_Curtains_0.geometry}
            material={materials.Lobby_Curtains}
            position={[106.271, 67.013, 133.515]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lobby_Floor_Lobby_Floor_0.geometry}
            material={materials.Lobby_Floor}
            position={[354.714, -238.454, -258.914]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lobby_Furniture_Lobby_Furniture_0.geometry}
            material={materials.Lobby_Furniture}
            position={[100.041, -215.259, -184.838]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lobby_Interior_1_Lobby_Interior_1_0.geometry}
            material={materials.Lobby_Interior_1}
            position={[145.469, 28.47, -368.802]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sidewalk_01_Sidewalk_01_0.geometry}
            material={materials.Sidewalk_01}
            position={[-85.671, -423.993, -602.43]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sidewalk_02_Sidewalk_02_0.geometry}
            material={materials.Sidewalk_02}
            position={[-110.042, -421.679, -617.363]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Top_Piece_Top_Piece_0.geometry}
            material={materials.Top_Piece}
            position={[98.248, 15514.64, -212.118]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('Models/HeroModels/free_london_skyscraper.glb')
