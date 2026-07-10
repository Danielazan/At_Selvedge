
import React, { useRef } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'


type GLTFResult = {
    nodes: {
        [name: string]: THREE.Mesh
    }
    materials: {
        [name: string]: THREE.Material
    }
}


export function Suit() {
    const { nodes, materials } = useGLTF('/Models/SelvéModels/modelsuit.glb') as unknown as GLTFResult
    return (
        <Center>
            <group dispose={null}>
                <group scale={0.001}>
                    <group scale={10}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Denim_Raw_FRONT_53505_0.geometry}
                            material={materials.Denim_Raw_FRONT_53505}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Denim_Raw_FRONT_53500_0.geometry}
                            material={materials.Denim_Raw_FRONT_53500}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Cotton_40s_Stretch_Poplin_FRONT_53480_0.geometry}
                            material={materials.Cotton_40s_Stretch_Poplin_FRONT_53480}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Rib_1X1_486gsm_FRONT_53510_0.geometry}
                            material={materials.Rib_1X1_486gsm_FRONT_53510}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Wool_Melton_FRONT_53490_0.geometry}
                            material={materials.Wool_Melton_FRONT_53490}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Denim_Raw_FRONT_53495_0.geometry}
                            material={materials.Denim_Raw_FRONT_53495}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cloth_Cotton_Sateen_FRONT_53485_0.geometry}
                            material={materials.Cotton_Sateen_FRONT_53485}
                        />
                    </group>
                </group>
            </group>
        </Center>
    )
}

useGLTF.preload('/Models/SelvéModels/modelsuit.glb')