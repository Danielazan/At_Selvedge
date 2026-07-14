"use client"
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
import * as THREE from 'three'

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh
  }
  materials: {
    [name: string]: THREE.Material
  }
}

/* ------------------------------------------------------------------ */
// 1. Jacket
export const JacketModel = forwardRef<THREE.Group>(function JacketModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/HeroModels/watch.glb') as unknown as GLTFResult

  return (
    <group  dispose={null}>
      <group position={[-0.062, 0, 0]} scale={0.875}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['ASSET_MAT_MR.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials['ASSET_MAT_MR.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials['ASSET_MAT_MR.007']}
        />
      </group>
    </group>
  )
})
useGLTF.preload('/Models/HeroModels/watch.glb')

/* ------------------------------------------------------------------ */
// 2. Shirt
export const ShirtModel = forwardRef<THREE.Group>(function ShirtModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/HeroModels/gucci.glb') as unknown as GLTFResult

  return (
    <group  dispose={null}>
      <group scale={0.01}>
        <group scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.GUCCI_RHYTON2_lambert1_0_1.geometry}
            material={materials.lambert1}
            scale={0.01}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/Models/HeroModels/gucci.glb')

/* ------------------------------------------------------------------ */
// 3. Pants
export const PantsModel = forwardRef<THREE.Group>(function PantsModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/HeroModels/redCloth.glb') as unknown as GLTFResult

  return (
    <group dispose={null}>
      <group
        position={[-0.50626659, 0.78400493, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.0174928}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-0.03786278, 7.72039413, -0.58454233]}
            scale={[3.5430119, 3.54301167, 3.54301167]}>
            <group
              position={[0.24957561, 0.25967789, 0.02754687]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[-1.07360709, 1.07360661, 1.07360661]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_9.geometry}
                material={materials['Material.031']}
                position={[-7.38914919, -0.34777755, 0.2396563]}
              />
            </group>
            <group
              position={[-0.2622366, 0.25967789, 0.2473397]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[1.07360709, 1.07360661, 1.07360661]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_12.geometry}
                material={materials['Material.031']}
                position={[7.87623596, -0.26655236, 0.23965634]}
              />
            </group>
          </group>
          <group
            position={[0.0911274, 10.91518784, -4.44528961]}
            scale={[13.2454052, 13.24540424, 13.24540424]}>
            <group position={[2.05882502, 0.11041594, 0.24161208]} scale={0.00094263}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16.geometry}
                material={materials['Material.032']}
                position={[0, -0.00048828, 0.00001526]}
              />
            </group>
            <group position={[0.00155258, 0, 0.12425545]} scale={0.001}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_19.geometry}
                material={materials['Material.032']}
                position={[2201.54174805, 65.16943359, 117.68376923]}
              />
            </group>
          </group>
        </group>
      </group>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_21.geometry}
          material={materials['Material.033']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_22.geometry}
          material={materials['Material.034']}
        />
      </group>
    </group>
  )
})

useGLTF.preload('/Models/HeroModels/redCloth.glb')

/* ------------------------------------------------------------------ */
// 4. Shoes
export const ShoesModel = forwardRef<THREE.Group>(function ShoesModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/HeroModels/shampoo_bottle.glb') as unknown as GLTFResult

  return (
    <group  dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SM_Shampoo_bottle_T_Shampoo_bottle_0.geometry}
          material={materials.T_Shampoo_bottle}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  )
})

useGLTF.preload('/Models/HeroModels/shampoo_bottle.glb')
/* ------------------------------------------------------------------ */
// 5. Coat
export const CoatModel = forwardRef<THREE.Group>(function CoatModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/HeroModels/converseShoe.glb') as unknown as GLTFResult

 return (
    <group  dispose={null}>
      <group position={[-0.7831251, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['exterior.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials['cordones.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials['suela.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials['suela.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials['ojetes.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials['interior.002']}
        />
      </group>
    </group>
  )
})

useGLTF.preload('/Models/HeroModels/converseShoe.glb')



export const Global = forwardRef<THREE.Group>(function CoatModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/LandingModels/glo.glb') as unknown as GLTFResult

 return (
    <group dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Globe_World_0.geometry}
            material={materials.Globe_World}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Globe_World_0_1.geometry}
            material={materials.Globe_World}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/Models/LandingModels/glo.glb')




export const G_cloth = forwardRef<THREE.Group>(function CoatModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/LandingModels/gold_dress.glb') as unknown as GLTFResult

 return (
    <group  dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials.material_0}
        />
      </group>
    </group>
  )
})

useGLTF.preload('/Models/LandingModels/gold_dress.glb')


export const Inno = forwardRef<THREE.Group>(function CoatModel(_, ref) {
  const { nodes, materials } = useGLTF('/Models/LandingModels/inno.glb') as unknown as GLTFResult

 return (
    <group dispose={null}>
      <group scale={0.001}>
        <group position={[0.25, 0.005, -5.923]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Afrecan_head_Material_#141_0'].geometry}
            material={materials.Material_141}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Afrecan_head_Material_#141_0_1'].geometry}
            material={materials.Material_141}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/Models/LandingModels/inno.glb')
