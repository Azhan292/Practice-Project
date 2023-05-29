import React from "react";
import { useParams } from "react-router-dom";

// components
import ProposalListings from "../../../../Components/Client/MyJobs/Proposals/ProposalListings";
import Footer from "../../../../Components/Footer/Footer";
import Navbar from "../../../../Components/Headers/Navbar";

// firebase
import useProposals from "../../../../hooks/useProposals";

const Proposals = () => {
  const { jobId } = useParams();
  const { proposals } = useProposals(jobId);
  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="container">
        <ProposalListings proposals={proposals} />
      </div>
      <Footer />
    </div>
  );
};

export default Proposals;
