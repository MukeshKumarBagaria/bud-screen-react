import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InputFieldDemo from './pages/InputFieldDemo';
import {
    CreateDemandMaster,
    VerifyDemandMaster,
    ApproveDemandMaster,
} from './processes/DemandMaster';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Demo page */}
                <Route path="/demo" element={<InputFieldDemo />} />

                {/* Demand Master — Creator / Verifier / Approver */}
                <Route path="/demand-master/create" element={<CreateDemandMaster />} />
                <Route path="/demand-master/verify" element={<VerifyDemandMaster />} />
                <Route path="/demand-master/approve" element={<ApproveDemandMaster />} />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/demand-master/create" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
