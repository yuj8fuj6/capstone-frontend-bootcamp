import React, { Suspense, useContext } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { ModelContext } from "../contexts/ModelContext";

import CanvasLoader from "./CanvasLoader";

const Model = () => {
  const { modelType, setModelType } = useContext(ModelContext);

  const industrialModel = useGLTF("./models/Industrial.glb");
  const houseModel = useGLTF("./models/House.glb");
  const communityModel = useGLTF("./models/Community.glb");

  return (
    <>
      {modelType === "Industrial" && (
        <mesh>
          <hemisphereLight intensity={0.15} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive
            object={industrialModel.scene}
            position={[0, -3.25, -1.5]}
            scale={0.75}
          />
        </mesh>
      )}
      {modelType === "Residential" && (
        <mesh>
          <hemisphereLight intensity={0.15} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive
            object={houseModel.scene}
            position={[0, -3.25, -1.5]}
            scale={0.75}
          />
        </mesh>
      )}
      {modelType === "Recreation" && (
        <mesh>
          <hemisphereLight intensity={0.15} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive
            object={communityModel.scene}
            position={[0, -3.25, -1.5]}
            scale={0.75}
          />
        </mesh>
      )}
    </>
  );
};

const ModelCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        />
        <Model />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ModelCanvas;
