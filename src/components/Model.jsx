import React, { Suspense, useContext, useState } from "react";
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
  const { modelType, setModelType, showAnnotations, setShowAnnotations } =
    useContext(ModelContext);

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
          {showAnnotations && (
            <>
              <Annotation position={[-15, 5, -30]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">
                      URA - Business 2 (Industrial) Handbook
                    </p>
                    <p className="font-bold text-xxs">
                      Boundary Setback Requirements
                    </p>
                    <p className="text-xxs text-justify leading-tight">
                      To ensure adequate Road Buffer (inclusive of Green Buffer)
                      depending on the public road category.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/Non-Residential/B2/Setback"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to URA Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[-10, 5, -80]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">SCDF - Fire Code</p>
                    <p className="font-bold text-xxs">Clause 8.2.4</p>
                    <p className="text-xxs text-justify leading-tight">
                      To provide the Fire Command Centre (FCC) in any building
                      (exluding PG I and II buildings), which requires any of
                      the following installations:
                    </p>
                    <ol type="1" className="text-xxs">
                      <li>1. Fire Lift</li>
                      <li>2. Emergency voice communication system</li>
                      <li>3. Engineered smoke control system</li>
                    </ol>
                    <a
                      href="https://www.scdf.gov.sg/firecode/table-of-content/chapter-8-emergency-lighting-voice-communicarion-systems/clause-8.2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to SCDF Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[210, 10, 3]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">SCDF - Fire Code</p>
                    <p className="font-bold text-xxs">Clause 3.5.3</p>
                    <p className="text-justify leading-tight">
                      To ensure compliance with the permitted limits of the
                      extent of unprotected openings in any external side of a
                      building.
                    </p>
                    <a
                      href="https://www.scdf.gov.sg/firecode/table-of-content/chapter-3-structural-fire-precuations/clause-3.5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to SCDF Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[50, 5, 10]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">
                      URA - Business 2 (Industrial) Handbook
                    </p>
                    <p className="font-bold text-xxs">
                      Boundary Setback Requirements
                    </p>
                    <p className="text-xxs text-justify leading-tight">
                      To ensure adequate common boundary setback with
                      non-industrial development.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/Non-Residential/B2/Setback"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to URA Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[20, 10, -50]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">
                      BCA - Code on Accessibility
                    </p>
                    <p className="font-bold text-xxs">Clause 3.3</p>
                    <p className="text-xxs text-justify leading-tight">
                      At least one alighting and boarding point to be sheltered.
                    </p>
                    <p className="text-xxs text-justify leading-tight mt-2">
                      Proper provisions to be made when there is a level
                      difference at the alighting and boarding point.
                    </p>
                    <p className="text-xxs mt-2 underline">
                      Pg 18 of Code Document
                    </p>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[70, 10, -100]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">
                      BCA - Approved Document
                    </p>
                    <p className="font-bold text-xxs">Clause E.3.3</p>
                    <p className="text-xxs text-justify leading-tight">
                      The clear width of every staircase shall not be less than
                      1000 mm.
                    </p>
                    <p className="text-xxs mt-2 underline">
                      Pg 23 of Code Document
                    </p>
                  </div>
                </div>
                <div className="text-xs w-[200px] grid grid-cols-6 mt-3">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">SCDF - Fire Code</p>
                    <p className="font-bold text-xxs">Clause 2.3.3.b</p>
                    <p className="text-xxs text-justify leading-tight">
                      No unprotected opening, or combustible material/
                      construction within 3m horizontally or vertically or
                      adjacent or facing the external exit staricase.
                    </p>
                    <a
                      href="https://www.scdf.gov.sg/firecode/table-of-content/chapter-2-means-of-escape/clause-2.3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to SCDF Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[180, 5, -100]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">SCDF - Fire Code</p>
                    <p className="font-bold text-xxs">Clause 4.2.2</p>
                    <p className="text-xxs text-justify leading-tight">
                      A fire engine accessway shall be provided for firefighting
                      appliances.
                    </p>
                    <a
                      href="https://www.scdf.gov.sg/firecode/table-of-content/chapter-4---site-planning-external-firefighting-provision/clause-4.2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to SCDF Website!
                    </a>
                  </div>
                </div>
              </Annotation>
            </>
          )}
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
          {showAnnotations && (
            <>
              <Annotation position={[-10, 0, -10]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">
                      URA - Bungalows or Detached Houses Handbook
                    </p>
                    <p className="font-bold">
                      Retaining and Boundary Walls
                    </p>
                    <p className="text-justify leading-tight">
                      Boundary walls shall not exceed 1.8m high.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/Residential/Bungalows/Retaining-Walls"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800"
                    >
                      Go to URA Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[90, -15, -60]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">
                      URA - Bungalows or Detached Houses Handbook
                    </p>
                    <p className="font-bold">
                      Building Setback from Boundary
                    </p>
                    <p className="text-justify leading-tight">
                      Depending on the public road category, to comply with the
                      road buffer and green buffer. For Category 5 roads, width
                      of road buffer (no need for green buffer) to be 7.5m.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/Residential/Bungalows/Setbacks-from-boundaries"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to URA Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[90, 70, 200]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">
                      URA - Bungalows or Detached Houses Handbook
                    </p>
                    <p className="font-bold">
                      Envelope Control Guidelines
                    </p>
                    <p className="text-justify leading-tight">
                      All landed housing shall follow the envelope control
                      guidelines which define an allowable building envelope
                      based on storey height and building setbacks.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/Residential/Bungalows/EC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to URA Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[170, 50, 120]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">URA - GFA Handbook</p>
                    <p className="font-bold text-xxs">Balconies</p>
                    <p className="text-xxs text-justify leading-tight">
                      Balconies are included as GFA.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/gross-floor-area/GFA/Balconies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800 text-xxs"
                    >
                      Go to URA Website!
                    </a>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[10, 30, 150]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">URA - GFA Handbook</p>
                    <p className="font-bold">Entrance Canopy</p>
                    <p className="text-justify leading-tight">
                      For every development, only one entrance canopy is
                      excluded from GFA.
                    </p>
                    <a
                      href="https://www.ura.gov.sg/Corporate/Guidelines/Development-Control/gross-floor-area/GFA/EntranceCanopy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800"
                    >
                      Go to URA Website!
                    </a>
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
            </>
          )}
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
          {showAnnotations && (
            <>
              <Annotation position={[0, 0, -20]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">SCDF - Fire Code</p>
                    <p className="font-bold">Clause</p>
                    <p>Basement</p>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[-30, 20, -20]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">URA - GFA Handbook</p>
                    <p className="font-bold">Clause</p>
                    <p>Entrance canopy not computed in GFA</p>
                  </div>
                  <WarningOutlined />
                  <div className="col-span-5 mt-4">
                    <p className="font-bold">BCA - Accessibility</p>
                    <p className="font-bold">Clause</p>
                    <p>No drastic floor level change</p>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[-130, 40, -10]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">SCDF - Fire Code</p>
                    <p className="font-bold">Clause</p>
                    <p>Atrium area</p>
                  </div>
                  <WarningOutlined />
                  <div className="col-span-5 mt-4">
                    <p className="font-bold">BCA - Approved Document</p>
                    <p className="font-bold">Clause</p>
                    <p>Glass reflectance - ETTV</p>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[-200, 40, -10]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold">URA - Handbook</p>
                    <p className="font-bold">Clause</p>
                    <p>Building height</p>
                  </div>
                </div>
              </Annotation>
              <Annotation position={[-180, 40, -100]}>
                <div className="text-xs w-[200px] grid grid-cols-6">
                  <WarningOutlined />
                  <div className="col-span-5">
                    <p className="font-bold text-xxs">
                      BCA - Approved Document
                    </p>
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
            </>
          )}
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
