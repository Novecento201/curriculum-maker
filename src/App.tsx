import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import './index.css';

const curriculumData = {
  name: 'Marco Lovato',
  title: 'FRONT-END DEVELOPER',
  profile: `Sono uno sviluppatore Front-End con una forte passione per il design funzionale e l'esperienza utente. Ho contribuito a progetti web innovativi, spesso integrando soluzioni di intelligenza artificiale, e sono costantemente alla ricerca di approcci semplici a problemi complessi. Lavoro efficacemente in team dinamici, puntando su codice pulito, componenti riutilizzabili e attenzione ai dettagli per favorire la crescita del prodotto.`,
  contact: [
    { icon: '📞', text: '329 202 7244', link: 'tel:3292027244' },
    {
      icon: '📧',
      text: 'marcolovatowork@gmail.com',
      link: 'mailto:marcolovatowork@gmail.com',
    },
    {
      icon: '🌐',
      text: 'Portfolio',
      link: 'https://marcolovato-portfolio.netlify.app/',
    },
  ],
  skills: ['JavaScript', 'React', 'Next.js', 'Git'],
  languages: [
    { name: 'Italiano', level: 'madrelingua' },
    { name: 'Inglese', level: 'B2' },
    { name: 'Spagnolo', level: 'B1' },
  ],
  education: [
    {
      school: 'Start2Impact University',
      degree: 'Master in Front End Development',
      period: '15/11/2021 - 15/11/2022',
      description:
        'Approfondimento pratico su progetti reali utilizzando JavaScript, React e metodologie di sviluppo front-end.',
      link: 'https://drive.google.com/file/d/1vbsg-QjUdkIDRsIjo8zfuYfczjTVFDy7/view',
    },
  ],
  experience: [
    {
      company: 'Asters',
      role: 'Front-End Developer',
      period: 'Luglio 2023 – Agosto 2024',
      description: `Sviluppo front-end di una web app basata su AI per ottimizzare il lavoro dei social media manager, automatizzando la gestione dei contenuti e migliorando l'efficienza delle campagne.`,
    },
    {
      company: 'Taskymind',
      role: 'Co-founder & Front-End Developer',
      period: 'Agosto 2024 – Marzo 2025',
      description: `Co-fondatore e sviluppatore di Taskymind, una piattaforma AI agent per la gestione automatica degli ordini e del customer service. La piattaforma riceve ordini telefonici, organizza calendari clienti e fornisce analisi avanzate sulle performance aziendali.`,
    },
    {
      company: 'Asters',
      role: 'Front-End Developer',
      period: 'Marzo 2025 – Giugno 2025',
      description: `Rientro nel team per il miglioramento della web app AI, con focus su ottimizzazione del front-end, refactoring e sviluppo di nuove funzionalità per l'automazione dei flussi di lavoro dei social media manager.`,
    },
  ],
};

const Curriculum = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="cv-container"
  >
    <div className="cv-header">
      <div style={{ flex: 1 }}>
        <h1>{curriculumData.name}</h1>
        <h2>{curriculumData.title}</h2>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div className="cv-profile-pic-placeholder">
          <img
            src="../public/personal_photo.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          />
        </div>
      </div>
    </div>

    <div className="cv-main">
      <div className="cv-left">
        <section>
          <h3>PROFILO</h3>
          <p>{curriculumData.profile}</p>
        </section>
        <section>
          <h3>CONTATTO</h3>
          <ul className="cv-contact">
            {curriculumData.contact.map((c, i) => (
              <li
                key={i}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                {c.icon} {c.link ? <a href={c.link}>{c.text}</a> : c.text}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>COMPETENZE</h3>
          <ul>
            {curriculumData.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>LINGUA</h3>
          <ul>
            {curriculumData.languages.map((lang, i) => (
              <li key={i}>
                {lang.name}: {lang.level}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cv-right">
        <section>
          <h3>FORMAZIONE</h3>
          {curriculumData.education.map((edu, i) => (
            <div
              key={i}
              className="cv-edu"
            >
              <strong>{edu.school}</strong>
              <br />
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {edu.degree}
              </a>
              <br />
              <span className="cv-period">{edu.period}</span>
              <p>{edu.description}</p>
            </div>
          ))}
        </section>

        <div
          style={{
            borderBottom: '2px solid #1a365d',
            margin: '2rem 0',
          }}
        />

        <section>
          <h3>ESPERIENZE LAVORATIVE</h3>
          {curriculumData.experience.map((exp, i) => (
            <div
              key={i}
              className="cv-exp"
            >
              <strong>{exp.company}</strong> - {exp.role}
              <br />
              <span className="cv-period">{exp.period}</span>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>

    <div className="cv-footer">
      <small>
        Autorizzo il trattamento dei miei dati personali ai sensi del Decreto
        Legislativo 30 giugno 2003, n. 196 e del GDPR (Regolamento UE 2016/679).
      </small>
    </div>
  </div>
));

Curriculum.displayName = 'Curriculum';

function App() {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;

    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      // Calcola la posizione relativa del container rispetto alla finestra
      const containerRect = componentRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Offset del container rispetto alla pagina
      const containerTop = containerRect.top + scrollTop;
      const containerLeft = containerRect.left + scrollLeft;

      // Scala per convertire da pixel del canvas a mm del PDF
      const pdfScale = imgWidth / canvas.width;

      // Aggiungi i link come annotazioni
      const links = componentRef.current.getElementsByTagName('a');
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const linkRect = link.getBoundingClientRect();

        // Calcola la posizione del link relativa al container
        const linkTop = linkRect.top + scrollTop;
        const linkLeft = linkRect.left + scrollLeft;

        // Posizione relativa al container
        const relativeX = (linkLeft - containerLeft) * 2; // * 2 per il scale di html2canvas
        const relativeY = (linkTop - containerTop) * 2; // * 2 per il scale di html2canvas
        const linkWidth = linkRect.width * 2;
        const linkHeight = linkRect.height * 2;

        // Converti in coordinate PDF (mm)
        const x = relativeX * pdfScale;
        const y = relativeY * pdfScale;
        const width = linkWidth * pdfScale;
        const height = linkHeight * pdfScale;

        // Aggiungi il link al PDF
        pdf.link(x, y, width, height, { url: link.href });
      }

      pdf.save('Marco_Lovato_CV.pdf');
    } catch (error) {
      console.error('Errore durante la generazione del PDF:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#f5f7fa', minHeight: '100vh' }}>
      <button
        onClick={handleDownloadPDF}
        className="cv-download-btn"
      >
        Scarica PDF
      </button>
      <Curriculum ref={componentRef} />
    </div>
  );
}

export default App;
