// "use client"
// import { useGLTF } from '@react-three/drei'
// import { forwardRef } from 'react'
// import * as THREE from 'three'

// type GLTFResult = {
//   nodes: {
//     [name: string]: THREE.Mesh
//   }
//   materials: {
//     [name: string]: THREE.Material
//   }
// }

// /* ------------------------------------------------------------------ */
// // 1. Jacket
// export const JacketModel = forwardRef<THREE.Group>(function JacketModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/HeroModels/watch.glb') as unknown as GLTFResult

//   return (
//     <group  dispose={null}>
//       <group position={[-0.062, 0, 0]} scale={0.875}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_5.geometry}
//           material={materials['ASSET_MAT_MR.006']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_6.geometry}
//           material={materials['ASSET_MAT_MR.006']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_7.geometry}
//           material={materials['ASSET_MAT_MR.007']}
//         />
//       </group>
//     </group>
//   )
// })
// useGLTF.preload('/Models/HeroModels/watch.glb')

// /* ------------------------------------------------------------------ */
// // 2. Shirt
// export const ShirtModel = forwardRef<THREE.Group>(function ShirtModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/HeroModels/gucci.glb') as unknown as GLTFResult

//   return (
//     <group  dispose={null}>
//       <group scale={0.01}>
//         <group scale={100}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.GUCCI_RHYTON2_lambert1_0_1.geometry}
//             material={materials.lambert1}
//             scale={0.01}
//           />
//         </group>
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/HeroModels/gucci.glb')

// /* ------------------------------------------------------------------ */
// // 3. Pants
// export const PantsModel = forwardRef<THREE.Group>(function PantsModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/HeroModels/redCloth.glb') as unknown as GLTFResult

//   return (
//     <group dispose={null}>
//       <group
//         position={[-0.50626659, 0.78400493, 0]}
//         rotation={[-Math.PI / 2, 0, 0]}
//         scale={0.0174928}>
//         <group rotation={[Math.PI / 2, 0, 0]}>
//           <group
//             position={[-0.03786278, 7.72039413, -0.58454233]}
//             scale={[3.5430119, 3.54301167, 3.54301167]}>
//             <group
//               position={[0.24957561, 0.25967789, 0.02754687]}
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={[-1.07360709, 1.07360661, 1.07360661]}>
//               <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Object_9.geometry}
//                 material={materials['Material.031']}
//                 position={[-7.38914919, -0.34777755, 0.2396563]}
//               />
//             </group>
//             <group
//               position={[-0.2622366, 0.25967789, 0.2473397]}
//               rotation={[Math.PI / 2, 0, 0]}
//               scale={[1.07360709, 1.07360661, 1.07360661]}>
//               <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Object_12.geometry}
//                 material={materials['Material.031']}
//                 position={[7.87623596, -0.26655236, 0.23965634]}
//               />
//             </group>
//           </group>
//           <group
//             position={[0.0911274, 10.91518784, -4.44528961]}
//             scale={[13.2454052, 13.24540424, 13.24540424]}>
//             <group position={[2.05882502, 0.11041594, 0.24161208]} scale={0.00094263}>
//               <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Object_16.geometry}
//                 material={materials['Material.032']}
//                 position={[0, -0.00048828, 0.00001526]}
//               />
//             </group>
//             <group position={[0.00155258, 0, 0.12425545]} scale={0.001}>
//               <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Object_19.geometry}
//                 material={materials['Material.032']}
//                 position={[2201.54174805, 65.16943359, 117.68376923]}
//               />
//             </group>
//           </group>
//         </group>
//       </group>
//       <group rotation={[Math.PI / 2, 0, 0]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_21.geometry}
//           material={materials['Material.033']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_22.geometry}
//           material={materials['Material.034']}
//         />
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/HeroModels/redCloth.glb')

// /* ------------------------------------------------------------------ */
// // 4. Shoes
// export const ShoesModel = forwardRef<THREE.Group>(function ShoesModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/HeroModels/shampoo_bottle.glb') as unknown as GLTFResult

//   return (
//     <group  dispose={null}>
//       <group scale={0.01}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.SM_Shampoo_bottle_T_Shampoo_bottle_0.geometry}
//           material={materials.T_Shampoo_bottle}
//           rotation={[-Math.PI / 2, 0, 0]}
//           scale={100}
//         />
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/HeroModels/shampoo_bottle.glb')
// /* ------------------------------------------------------------------ */
// // 5. Coat
// export const CoatModel = forwardRef<THREE.Group>(function CoatModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/HeroModels/converseShoe.glb') as unknown as GLTFResult

//  return (
//     <group  dispose={null}>
//       <group position={[-0.7831251, 0, 0]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_5.geometry}
//           material={materials['exterior.002']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_6.geometry}
//           material={materials['cordones.002']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_7.geometry}
//           material={materials['suela.002']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_8.geometry}
//           material={materials['suela.002']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_9.geometry}
//           material={materials['ojetes.002']}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_10.geometry}
//           material={materials['interior.002']}
//         />
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/HeroModels/converseShoe.glb')



// export const Global = forwardRef<THREE.Group>(function CoatModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/LandingModels/glo.glb') as unknown as GLTFResult

//  return (
//     <group dispose={null}>
//       <group scale={0.01}>
//         <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Cylinder_Globe_World_0.geometry}
//             material={materials.Globe_World}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Cylinder_Globe_World_0_1.geometry}
//             material={materials.Globe_World}
//           />
//         </group>
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/LandingModels/glo.glb')




// export const G_cloth = forwardRef<THREE.Group>(function CoatModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/LandingModels/gold_dress.glb') as unknown as GLTFResult

//  return (
//     <group  dispose={null}>
//       <group rotation={[-Math.PI / 2, 0, 0]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_2.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_3.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_4.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_5.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_6.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_7.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_8.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_9.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_10.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_11.geometry}
//           material={materials.material_0}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_12.geometry}
//           material={materials.material_0}
//         />
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/LandingModels/gold_dress.glb')


// export const Inno = forwardRef<THREE.Group>(function CoatModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/LandingModels/inno.glb') as unknown as GLTFResult

//  return (
//     <group dispose={null}>
//       <group scale={0.001}>
//         <group position={[0.25, 0.005, -5.923]} rotation={[-Math.PI / 2, 0, 0]}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes['Afrecan_head_Material_#141_0'].geometry}
//             material={materials.Material_141}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes['Afrecan_head_Material_#141_0_1'].geometry}
//             material={materials.Material_141}
//           />
//         </group>
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/LandingModels/inno.glb')


// export const Perfumee = forwardRef<THREE.Group>(function CoatModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/LandingModels/perfume__bottle.glb') as unknown as GLTFResult

//  return (
//     <group  dispose={null}>
//       <group scale={0.01}>
//         <group position={[0, 2.922, -0.082]} scale={0.1}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Cap__0.geometry}
//             material={materials['Scene_-_Root']}
//             position={[0, 87.657, -2.449]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Bottle__0.geometry}
//             material={materials['Scene_-_Root']}
//             position={[0, -29.363, 0.816]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Spray__0.geometry}
//             material={materials['Scene_-_Root']}
//             position={[0, 97.514, 0.816]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Top__0.geometry}
//             material={materials['Scene_-_Root']}
//             position={[0, 82.475, 0.816]}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Tube__0.geometry}
//             material={materials['Scene_-_Root']}
//             position={[0, -10.766, 0.816]}
//             scale={10}
//           />
//         </group>
//       </group>
//     </group>
//   )
// })

// useGLTF.preload('/Models/LandingModels/perfume__bottle.glb')



// export const PerfumeList = forwardRef<THREE.Group>(function CoatModel(_, ref) {
//   const { nodes, materials } = useGLTF('/Models/LandingModels/aesop_perfumes.glb') as unknown as GLTFResult

//  return (
//     <group  dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_4.geometry}
//         material={materials['Material.004']}
//         position={[-14.726, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_6.geometry}
//         material={materials['Material.005']}
//         position={[-14.726, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_8.geometry}
//         material={materials['Material.008']}
//         position={[-14.726, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_10.geometry}
//         material={materials['Material.006']}
//         position={[-14.726, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_12.geometry}
//         material={materials['Material.014']}
//         position={[-14.726, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_14.geometry}
//         material={materials['Material.004']}
//         position={[-11.626, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_16.geometry}
//         material={materials['Material.005']}
//         position={[-11.626, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_18.geometry}
//         material={materials['Material.006']}
//         position={[-11.626, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_20.geometry}
//         material={materials['Material.014']}
//         position={[-11.626, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_22.geometry}
//         material={materials['Material.017']}
//         position={[-11.626, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_24.geometry}
//         material={materials['Material.004']}
//         position={[-5.888, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_26.geometry}
//         material={materials['Material.005']}
//         position={[-5.888, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_28.geometry}
//         material={materials['Material.006']}
//         position={[-5.888, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_30.geometry}
//         material={materials['Material.014']}
//         position={[-5.888, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_32.geometry}
//         material={materials['Material.022']}
//         position={[-5.916, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_34.geometry}
//         material={materials['Material.023']}
//         position={[-5.916, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_36.geometry}
//         material={materials['Material.024']}
//         position={[-5.888, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_38.geometry}
//         material={materials['Material.004']}
//         position={[0.026, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_40.geometry}
//         material={materials['Material.005']}
//         position={[0.026, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_42.geometry}
//         material={materials['Material.006']}
//         position={[0.026, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_44.geometry}
//         material={materials['Material.014']}
//         position={[0.026, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_46.geometry}
//         material={materials['Material.004']}
//         position={[-8.849, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_48.geometry}
//         material={materials['Material.005']}
//         position={[-8.849, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_50.geometry}
//         material={materials['Material.006']}
//         position={[-8.849, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_52.geometry}
//         material={materials['Material.014']}
//         position={[-8.849, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_54.geometry}
//         material={materials['Material.004']}
//         position={[-2.923, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_56.geometry}
//         material={materials['Material.005']}
//         position={[-2.923, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_58.geometry}
//         material={materials['Material.006']}
//         position={[-2.923, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_60.geometry}
//         material={materials['Material.014']}
//         position={[-2.923, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_62.geometry}
//         material={materials['Material.027']}
//         position={[0.004, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_64.geometry}
//         material={materials['Material.028']}
//         position={[0.004, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_66.geometry}
//         material={materials['Material.029']}
//         position={[0.026, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_68.geometry}
//         material={materials['Material.030']}
//         position={[-8.864, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_70.geometry}
//         material={materials['Material.031']}
//         position={[-8.864, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_72.geometry}
//         material={materials['Material.032']}
//         position={[-8.849, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_74.geometry}
//         material={materials['Material.033']}
//         position={[-2.949, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_76.geometry}
//         material={materials['Material.034']}
//         position={[-2.949, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_78.geometry}
//         material={materials['Material.035']}
//         position={[-2.923, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_80.geometry}
//         material={materials['Material.038']}
//         position={[-11.641, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_82.geometry}
//         material={materials['Material.039']}
//         position={[-11.641, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_84.geometry}
//         material={materials['Material.042']}
//         position={[-14.76, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_86.geometry}
//         material={materials['Material.043']}
//         position={[-14.76, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_88.geometry}
//         material={materials['Material.004']}
//         position={[2.785, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_90.geometry}
//         material={materials['Material.005']}
//         position={[2.785, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_92.geometry}
//         material={materials['Material.006']}
//         position={[2.785, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_94.geometry}
//         material={materials['Material.014']}
//         position={[2.785, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_96.geometry}
//         material={materials['Material.004']}
//         position={[11.558, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_98.geometry}
//         material={materials['Material.005']}
//         position={[11.558, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_100.geometry}
//         material={materials['Material.006']}
//         position={[11.558, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_102.geometry}
//         material={materials['Material.014']}
//         position={[11.558, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_104.geometry}
//         material={materials['Material.004']}
//         position={[14.424, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_106.geometry}
//         material={materials['Material.005']}
//         position={[14.424, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_108.geometry}
//         material={materials['Material.006']}
//         position={[14.424, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_110.geometry}
//         material={materials['Material.014']}
//         position={[14.424, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_112.geometry}
//         material={materials['Material.004']}
//         position={[17.296, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_114.geometry}
//         material={materials['Material.005']}
//         position={[17.296, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_116.geometry}
//         material={materials['Material.006']}
//         position={[17.296, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_118.geometry}
//         material={materials['Material.014']}
//         position={[17.296, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_120.geometry}
//         material={materials['Material.044']}
//         position={[2.796, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_122.geometry}
//         material={materials['Material.045']}
//         position={[2.796, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_124.geometry}
//         material={materials['Material.046']}
//         position={[2.785, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_126.geometry}
//         material={materials['Material.047']}
//         position={[11.535, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_128.geometry}
//         material={materials['Material.048']}
//         position={[11.535, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_130.geometry}
//         material={materials['Material.049']}
//         position={[11.558, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_132.geometry}
//         material={materials['Material.050']}
//         position={[14.409, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_134.geometry}
//         material={materials['Material.051']}
//         position={[14.409, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_136.geometry}
//         material={materials['Material.052']}
//         position={[14.424, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_138.geometry}
//         material={materials['Material.053']}
//         position={[17.269, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_140.geometry}
//         material={materials['Material.054']}
//         position={[17.269, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_142.geometry}
//         material={materials['Material.055']}
//         position={[17.296, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_144.geometry}
//         material={materials['Material.063']}
//         position={[5.586, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_146.geometry}
//         material={materials['Material.064']}
//         position={[5.586, 0, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_148.geometry}
//         material={materials['Material.014']}
//         position={[5.576, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_150.geometry}
//         material={materials['Material.006']}
//         position={[5.576, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_152.geometry}
//         material={materials['Material.067']}
//         position={[5.576, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_154.geometry}
//         material={materials['Material.005']}
//         position={[5.576, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_156.geometry}
//         material={materials['Material.004']}
//         position={[5.576, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_158.geometry}
//         material={materials['Material.070']}
//         position={[8.499, -0.008, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_160.geometry}
//         material={materials['Material.071']}
//         position={[8.499, -0.008, -2.228]}
//         rotation={[0, Math.PI / 2, 0]}
//         scale={1.148}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_162.geometry}
//         material={materials['Material.072']}
//         position={[8.508, 0.989, 0.648]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_164.geometry}
//         material={materials['Material.014']}
//         position={[8.508, 1.003, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.982}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_166.geometry}
//         material={materials['Material.006']}
//         position={[8.508, 0.989, 0.638]}
//         rotation={[0, -1.058, 0]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_168.geometry}
//         material={materials['Material.005']}
//         position={[8.508, 3.447, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.059}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_170.geometry}
//         material={materials['Material.004']}
//         position={[8.508, 4.208, 0.638]}
//         rotation={[0, -1.058, 0]}
//         scale={0.563}
//       />
//     </group>
//   )
// })

// useGLTF.preload('//Models/LandingModels/aesop_perfumes.glb')



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

/* ------------------------------------------------------------------ */
// 6. Global (for Philosophy - heritage pillar)
export const Global = forwardRef<THREE.Group>(function Global(_, ref) {
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

/* ------------------------------------------------------------------ */
// 7. G_cloth (for Philosophy - craft pillar AND FourHouses - ATELION)
export const G_cloth = forwardRef<THREE.Group>(function G_cloth(_, ref) {
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

/* ------------------------------------------------------------------ */
// 8. Inno (for Philosophy - innovation pillar)
export const Inno = forwardRef<THREE.Group>(function Inno(_, ref) {
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

/* ------------------------------------------------------------------ */
// 9. Perfumee (for FourHouses - LURÈ)
export const Perfumee = forwardRef<THREE.Group>(function Perfumee(_, ref) {
  const { nodes, materials } = useGLTF('/Models/LandingModels/perfume__bottle.glb') as unknown as GLTFResult

 return (
    <group  dispose={null}>
      <group scale={0.01}>
        <group position={[0, 2.922, -0.082]} scale={0.1}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cap__0.geometry}
            material={materials['Scene_-_Root']}
            position={[0, 87.657, -2.449]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bottle__0.geometry}
            material={materials['Scene_-_Root']}
            position={[0, -29.363, 0.816]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Spray__0.geometry}
            material={materials['Scene_-_Root']}
            position={[0, 97.514, 0.816]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Top__0.geometry}
            material={materials['Scene_-_Root']}
            position={[0, 82.475, 0.816]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tube__0.geometry}
            material={materials['Scene_-_Root']}
            position={[0, -10.766, 0.816]}
            scale={10}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/Models/LandingModels/perfume__bottle.glb')

/* ------------------------------------------------------------------ */
// 10. PerfumeList
export const PerfumeList = forwardRef<THREE.Group>(function PerfumeList(_, ref) {
  const { nodes, materials } = useGLTF('/Models/LandingModels/aesop_perfumes.glb') as unknown as GLTFResult

 return (
    <group  dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials['Material.004']}
        position={[-14.726, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials['Material.005']}
        position={[-14.726, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_8.geometry}
        material={materials['Material.008']}
        position={[-14.726, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_10.geometry}
        material={materials['Material.006']}
        position={[-14.726, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials['Material.014']}
        position={[-14.726, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_14.geometry}
        material={materials['Material.004']}
        position={[-11.626, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={materials['Material.005']}
        position={[-11.626, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_18.geometry}
        material={materials['Material.006']}
        position={[-11.626, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_20.geometry}
        material={materials['Material.014']}
        position={[-11.626, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_22.geometry}
        material={materials['Material.017']}
        position={[-11.626, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_24.geometry}
        material={materials['Material.004']}
        position={[-5.888, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_26.geometry}
        material={materials['Material.005']}
        position={[-5.888, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_28.geometry}
        material={materials['Material.006']}
        position={[-5.888, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_30.geometry}
        material={materials['Material.014']}
        position={[-5.888, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_32.geometry}
        material={materials['Material.022']}
        position={[-5.916, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_34.geometry}
        material={materials['Material.023']}
        position={[-5.916, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_36.geometry}
        material={materials['Material.024']}
        position={[-5.888, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_38.geometry}
        material={materials['Material.004']}
        position={[0.026, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_40.geometry}
        material={materials['Material.005']}
        position={[0.026, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_42.geometry}
        material={materials['Material.006']}
        position={[0.026, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_44.geometry}
        material={materials['Material.014']}
        position={[0.026, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_46.geometry}
        material={materials['Material.004']}
        position={[-8.849, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_48.geometry}
        material={materials['Material.005']}
        position={[-8.849, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_50.geometry}
        material={materials['Material.006']}
        position={[-8.849, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_52.geometry}
        material={materials['Material.014']}
        position={[-8.849, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_54.geometry}
        material={materials['Material.004']}
        position={[-2.923, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_56.geometry}
        material={materials['Material.005']}
        position={[-2.923, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_58.geometry}
        material={materials['Material.006']}
        position={[-2.923, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_60.geometry}
        material={materials['Material.014']}
        position={[-2.923, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_62.geometry}
        material={materials['Material.027']}
        position={[0.004, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_64.geometry}
        material={materials['Material.028']}
        position={[0.004, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_66.geometry}
        material={materials['Material.029']}
        position={[0.026, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_68.geometry}
        material={materials['Material.030']}
        position={[-8.864, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_70.geometry}
        material={materials['Material.031']}
        position={[-8.864, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_72.geometry}
        material={materials['Material.032']}
        position={[-8.849, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_74.geometry}
        material={materials['Material.033']}
        position={[-2.949, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_76.geometry}
        material={materials['Material.034']}
        position={[-2.949, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_78.geometry}
        material={materials['Material.035']}
        position={[-2.923, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_80.geometry}
        material={materials['Material.038']}
        position={[-11.641, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_82.geometry}
        material={materials['Material.039']}
        position={[-11.641, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_84.geometry}
        material={materials['Material.042']}
        position={[-14.76, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_86.geometry}
        material={materials['Material.043']}
        position={[-14.76, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_88.geometry}
        material={materials['Material.004']}
        position={[2.785, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_90.geometry}
        material={materials['Material.005']}
        position={[2.785, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_92.geometry}
        material={materials['Material.006']}
        position={[2.785, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_94.geometry}
        material={materials['Material.014']}
        position={[2.785, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_96.geometry}
        material={materials['Material.004']}
        position={[11.558, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_98.geometry}
        material={materials['Material.005']}
        position={[11.558, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_100.geometry}
        material={materials['Material.006']}
        position={[11.558, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_102.geometry}
        material={materials['Material.014']}
        position={[11.558, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_104.geometry}
        material={materials['Material.004']}
        position={[14.424, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_106.geometry}
        material={materials['Material.005']}
        position={[14.424, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_108.geometry}
        material={materials['Material.006']}
        position={[14.424, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_110.geometry}
        material={materials['Material.014']}
        position={[14.424, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_112.geometry}
        material={materials['Material.004']}
        position={[17.296, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_114.geometry}
        material={materials['Material.005']}
        position={[17.296, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_116.geometry}
        material={materials['Material.006']}
        position={[17.296, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_118.geometry}
        material={materials['Material.014']}
        position={[17.296, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_120.geometry}
        material={materials['Material.044']}
        position={[2.796, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_122.geometry}
        material={materials['Material.045']}
        position={[2.796, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_124.geometry}
        material={materials['Material.046']}
        position={[2.785, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_126.geometry}
        material={materials['Material.047']}
        position={[11.535, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_128.geometry}
        material={materials['Material.048']}
        position={[11.535, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_130.geometry}
        material={materials['Material.049']}
        position={[11.558, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_132.geometry}
        material={materials['Material.050']}
        position={[14.409, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_134.geometry}
        material={materials['Material.051']}
        position={[14.409, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_136.geometry}
        material={materials['Material.052']}
        position={[14.424, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_138.geometry}
        material={materials['Material.053']}
        position={[17.269, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_140.geometry}
        material={materials['Material.054']}
        position={[17.269, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_142.geometry}
        material={materials['Material.055']}
        position={[17.296, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_144.geometry}
        material={materials['Material.063']}
        position={[5.586, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_146.geometry}
        material={materials['Material.064']}
        position={[5.586, 0, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_148.geometry}
        material={materials['Material.014']}
        position={[5.576, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_150.geometry}
        material={materials['Material.006']}
        position={[5.576, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_152.geometry}
        material={materials['Material.067']}
        position={[5.576, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_154.geometry}
        material={materials['Material.005']}
        position={[5.576, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_156.geometry}
        material={materials['Material.004']}
        position={[5.576, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_158.geometry}
        material={materials['Material.070']}
        position={[8.499, -0.008, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_160.geometry}
        material={materials['Material.071']}
        position={[8.499, -0.008, -2.228]}
        rotation={[0, Math.PI / 2, 0]}
        scale={1.148}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_162.geometry}
        material={materials['Material.072']}
        position={[8.508, 0.989, 0.648]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_164.geometry}
        material={materials['Material.014']}
        position={[8.508, 1.003, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.982}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_166.geometry}
        material={materials['Material.006']}
        position={[8.508, 0.989, 0.638]}
        rotation={[0, -1.058, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_168.geometry}
        material={materials['Material.005']}
        position={[8.508, 3.447, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_170.geometry}
        material={materials['Material.004']}
        position={[8.508, 4.208, 0.638]}
        rotation={[0, -1.058, 0]}
        scale={0.563}
      />
    </group>
  )
})

useGLTF.preload('/Models/LandingModels/aesop_perfumes.glb')