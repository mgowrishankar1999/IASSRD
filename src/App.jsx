import { useState } from 'react'
import './App.css'


// frontend imports-------------
import Home from './components/frontend/home'
import Listofjournals from './components/frontend/listofjournals/journalList'
import Articledetail from './components/frontend/articleDetail'
import Archive from './components/frontend/archive'
import ArchiveMaincontent from './components/frontend/archiveMaincontent'
import CurrentIssue from './components/frontend/currentIssue'
import ArticleSubmit from './components/frontend/articleSubmission'
import ApcFrontend from './components/frontend/Apc'
import FellowMembership from './components/frontend/fellowMembership'
import ContactUsFrontend from './components/frontend/contactusFrontend'
import JoinUsEditorial from './components/frontend/joinUsEditorial'
import JoinUsFellowmember from './components/frontend/joinUsFellowMember'
import EditorialBoard from './components/frontend/listofjournals/EditorialBoard'
import Subjectarea from './components/frontend/listofjournals/subjectarea'
import AuthorguideLines from './components/frontend/listofjournals/authorGuidelines'




// search results routes-------------

import SearchResults from './components/frontend/searchResults'

//listof journals imports--------------
import JournalDetail from './components/frontend/listofjournals/journaldetail'
import Aboutjournal from './components/frontend/listofjournals/aboutJournal'
import ApcFrontned from './components/frontend/listofjournals/apc'


//context journal api






//backend imports
import Login from './components/admin/login'
import Dashboard from './components/admin/dashboard';
import DisciplineList from './components/admin/disciplines/disciplines';
import AddNewDisciplines from './components/admin/disciplines/disciplinesadd';
import UserManagement from './components/admin/usermanagement';
import Journals from './components/admin/journals/journals';
import JournalsAddNew from "./components/admin/journals/journalsaddnew"
import Disciplines from './components/admin/disciplines/disciplines';
import JournalIssues from './components/admin/journalsissues/journalissues';
import AddNewJournalIssues from './components/admin/journalsissues/addnewjournalissues';
import Editorial from './components/admin/editorialboard/Editorial';
import AddNewEditorial from './components/admin/editorialboard/AddNewEditorial';
import Apc from './components/admin/apc/Apc';
import AddNewApc from './components/admin/apc/AddNewApc';
import Affiliation from './components/admin/affiliation/Affiliation';
import AddNewAffiliation from './components/admin/affiliation/AddNewAffiliation';
import Author from './components/admin/authors/Author';
import AddNewAuthor from './components/admin/authors/AddNewAuthor';
import Articles from './components/admin/Articles/Articles';
import AddNewArticle from './components/admin/Articles/AddNewArticle';
import Memberships from './components/admin/memberships/membership';
import AddNewMembership from './components/admin/memberships/addnewmembership';
import Awards from './components/admin/awards/awards';
import AddNewAward from './components/admin/awards/addnewaward';
import CallForPaper from './components/admin/CallForPaper/CallForPaper';
import AddCallForPaper from './components/admin/CallForPaper/AddCallForPaper';
import CallForPapers from './components/admin/CallForPaper/CallForPaper';
import AddNewCallForPapers from './components/admin/CallForPaper/AddCallForPaper';
import Joinuss from './components/admin/JoinUs/JoinUs';
import ArticleSubmission from './components/admin/ArticleSubmission/ArticleSubmission';
import ContactUss from './components/admin/ContactUs/ContactUs';
import JoinEditorialBoards from './components/admin/JoinEditorialBoard/JoinEditorialBoards';
import ImpactFactorstab from './components/admin/ImpactFactors/ImpactFactors';
import AddNewImpactFactors from './components/admin/ImpactFactors/AddNewImpactFactors';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// imports 

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        {/* frontend routes */}

        <Route path="/" element={<Home />} />
        {/* <Route path="/articledetail" element={<Articledetail />} /> */}
        <Route path="/journal" element={<Listofjournals />} />


        <Route path="/articles/:volume/:issue/:articleKey" element={<Articledetail />} />
        <Route path="/submitarticle" element={<ArticleSubmit />} />
        <Route path="/contactus" element={<ContactUsFrontend />} />
        <Route path="/apcs" element={<ApcFrontend />} />
        <Route path="/fellowmembers" element={<FellowMembership />} />
        <Route path="/joinus-editorial" element={<JoinUsEditorial />} />
        <Route path="/joinus-fellowmember" element={<JoinUsFellowmember />} />




        {/* <Route path="/articles/:journalAbbrevation/volume_:volume_issue_:issue/:articleKey" element={<Articledetail />} /> */}


        {/* lsit of journals routes*/}

        <Route path="/journal/:journalAbbrevation" element={<JournalDetail />} />
        <Route path="/journal/:journalAbbrevation/aboutjournal" element={<Aboutjournal />} />
        <Route path="/journal/:journalAbbrevation/subjectarea" element={<Subjectarea />} />

        <Route path="/journal/:journalAbbrevation/apc" element={<ApcFrontned />} />
        <Route path="/journal/:journalAbbrevation/archive" element={<Archive />} />
        <Route path="/journal/:journalAbbrevation/:volume/:issue" element={<ArchiveMaincontent />} />
        <Route path="/journal/:journalAbbrevation/currentissue" element={<CurrentIssue />} />
        <Route path="/journal/:journalAbbrevation/editorial-board" element={<EditorialBoard />} />
        <Route path="/journal/:journalAbbrevation/author-guidelines" element={<AuthorguideLines />} />


        {/* search results routes */}
        <Route path="/search-results" element={<SearchResults />} />




        {/* backedn routes---------- */}
        {/* backend routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/disciplines" element={<Disciplines />} />
        <Route path="/addnewdisciplines" element={<AddNewDisciplines />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/journalsaddnew" element={<JournalsAddNew />} />
        <Route path="/journalissues" element={<JournalIssues />} />
        <Route path="/journalissuesaddnew" element={<AddNewJournalIssues />} />
        <Route path="/editorial" element={<Editorial />} />
        <Route path="/addneweditorial" element={<AddNewEditorial />} />
        <Route path="/apc" element={<Apc />} />
        <Route path="/addnewapc" element={<AddNewApc />} />
        <Route path="/affiliation" element={<Affiliation />} />
        <Route path="/addnewaffiliation" element={<AddNewAffiliation />} />
        <Route path="/author" element={<Author />} />
        <Route path="/addnewauthor" element={<AddNewAuthor />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/addnewarticle" element={<AddNewArticle />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/addnewmembership" element={<AddNewMembership />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/addnewaward" element={<AddNewAward />} />
        <Route path="/callforpapers" element={<CallForPapers />} />
        <Route path="/addnewcallforpapers" element={<AddNewCallForPapers />} />
        <Route path="/joinus" element={<Joinuss />} />
        <Route path="/articlesubmission" element={<ArticleSubmission />} />
        <Route path="/contact" element={<ContactUss />} />
        <Route path="/joineditorial" element={<JoinEditorialBoards />} />
        <Route path="/impactfactorstab" element={<ImpactFactorstab />} />
        <Route path="/addnewimpactfactors" element={<AddNewImpactFactors />} />

      </>
    )
  )

  return (
    <>

      <RouterProvider router={router} />
    </>
  )
}

export default App
