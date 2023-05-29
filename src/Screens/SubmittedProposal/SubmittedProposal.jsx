import React from "react";

// components
import ProposalListings from "../../Components/Client/MyJobs/Proposals/ProposalListings";
import Navbar from "../../Components/Headers/Navbar";
import Footer from "../../Components/Footer/Footer";
import Loading from "../Loader/Loading";

// firebase
import useSubmittedProposals from "../../hooks/useSubmittedProposals";

const SubmittedProposal = () => {
  const { loading, submittedProposals } = useSubmittedProposals();

  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="main__section container">
        {loading ? (
          <Loading />
        ) : (
          <ProposalListings proposals={submittedProposals} freelancer={true} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SubmittedProposal;
