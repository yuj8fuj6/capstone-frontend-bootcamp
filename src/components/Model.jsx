import React, { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  PresentationControls,
} from "@react-three/drei";
import { ModelContext } from "../contexts/ModelContext";
import Annotation from "./ModelAnnotation";
import { WarningOutlined } from "@ant-design/icons";

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
          <hemisphereLight intensity={0.8} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-500, 2000, 500]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive
            object={industrialModel.scene}
            position={[-20, 0, 10]}
            scale={0.75}
          />
          <Annotation position={[-20, 5, -30]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">URA - Handbook</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Green buffer/ road reserve</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[-10, 5, -80]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">SCDF - Fire Code</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Fire command center</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[210, 10, 3]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">SCDF - Fire Code</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Unprotected opening calculation</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[50, 5, 10]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">URA - Handbook</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Peripheral planting</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[20, 10, -50]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">
                  BCA - Code in Accessibility
                </p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Sheltered no floor level change</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[70, 10, -100]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">BCA - Approved Document</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Staircase</p>
              </div>
            </div>
            <div className="text-xs w-[200px] grid grid-cols-6 mt-3">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">SCDF - Fire Code</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Staircase</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[180, 5, -100]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold text-xxs">SCDF - Fire Code</p>
                <p className="font-bold text-xxs">Clause</p>
                <p>Fire Engine Accessway</p>
              </div>
            </div>
          </Annotation>
        </mesh>
      )}
      {modelType === "Residential" && (
        <mesh>
          <hemisphereLight intensity={0.5} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-500, 5000, 500]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive
            object={houseModel.scene}
            position={[0, -3.25, -1.5]}
            scale={15.0}
          />
          <Annotation position={[-10, 0, -10]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">URA - Handbook</p>
                <p className="font-bold">Clause</p>
                <p>Boundary wall height</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[90, -15, -60]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">URA - Handbook</p>
                <p className="font-bold">Clause</p>
                <p>Green buffer/ road reserve setback</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[90, 70, 200]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">URA - Handbook</p>
                <p className="font-bold">Clause</p>
                <p>Envelope control</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[170, 50, 120]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">URA - GFA Handbook</p>
                <p className="font-bold">Clause</p>
                <p>Balcony included in GFA tabulation</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[10, 30, 150]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">URA - GFA Handbook</p>
                <p className="font-bold">Clause</p>
                <p>Entrance canopy not included in GFA tabulation</p>
              </div>
              <WarningOutlined />
              <div className="col-span-5 mt-3">
                <p className="font-bold">URA - Handbook</p>
                <p className="font-bold">Clause</p>
                <p>Roof setback</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[100, 30, 140]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">BCA - Approved Document</p>
                <p className="font-bold">Clause</p>
                <p>Safety glass at height</p>
                <p className="font-bold">Clause</p>
                <p>Glass reflectance</p>
              </div>
            </div>
          </Annotation>
          <Annotation position={[170, 70, 200]}>
            <div className="text-xs w-[200px] grid grid-cols-6">
              <WarningOutlined />
              <div className="col-span-5">
                <p className="font-bold">BCA - Approved Document</p>
                <p className="font-bold">Clause</p>
                <p>Roof ETTV value</p>
              </div>
            </div>
          </Annotation>
        </mesh>
      )}
      {modelType === "Recreation" && (
        <mesh>
          <hemisphereLight intensity={0.2} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-500, 5000, 500]}
            angle={0.12}
            penumbra={1}
            intensity={3}
            castShadow
            shadow-mapSize={1024}
          />
          <primitive
            object={communityModel.scene}
            position={[-400, 0, 20]}
            scale={4.0}
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
      camera={{ position: [-50, 100, 100], fov: 50 }}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          minDistance={50}
          maxDistance={500}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        <PresentationControls snap global>
          <Model />
        </PresentationControls>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ModelCanvas;
