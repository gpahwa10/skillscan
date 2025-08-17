import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, type Key } from "react";
import { resumes } from "constants/index";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillScan" },
    { name: "description", content: "A Smart feedback for your dream job!" },
  ];
}

export default function Home() {

  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!auth.isAuthenticated){
        navigate('/auth?next=/');
    }
  },[auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1> Track your Applications & Resume Ratings</h1>
          <h2>Review your submissions and AI Powered feedback.</h2>
        </div>
        {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
