"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto bg-white rounded shadow p-6 mt-6">
      <header className="flex flex-col items-center mb-6">
        <div className="mb-2">
          <Image
            src="/photo.png"
            alt="Photo de MOUADILI Abdelmounim"
            width={120}
            height={120}
            className="rounded-md border-2 border-blue-300"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold">MOUADILI Abdelmounim</h1>
        <div className="mt-2 text-center space-y-1">
          <p>
            <strong>Adresse:</strong>{" "}
            <a
              href="https://www.google.com/maps/place/Berrechid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              Berrechid, Maroc
            </a>
          </p>
          <p>
            <strong>Tél:</strong>{" "}
            <a
              href="tel:+212652182486"
              className="text-blue-300 hover:underline"
            >
              +212 652 182 486
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:momonaim01@gmail.com"
              className="text-blue-300 hover:underline"
            >
              momonaim01@gmail.com
            </a>
          </p>
          <p>
            <strong>Portfolio:</strong>{" "}
            <a
              href="https://momonaim-portfolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              momonaim-portfolio.netlify.app
            </a>
          </p>
        </div>
      </header>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Profil</h2>
        <p>
          Étudiant en Master Réseaux et Systèmes Informatiques, passionné par
          l&apos;informatique. Enthousiaste de la programmation et déterminé à
          exceller dans la résolution de problèmes.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Formation</h2>
        <ul className="list-disc pl-5">
          <li>
            <strong>Master Sciences et Techniques (MST)</strong> - Réseaux et
            Systèmes Informatiques,{" "}
            <a
              href="https://www.fsts.ac.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              FST Settat
            </a>{" "}
            (2024 - En cours)
          </li>
          <li>
            <strong>Licence Sciences et Techniques (LST)</strong> - Génie
            Informatique,{" "}
            <a
              href="https://www.fsts.ac.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              FST Settat
            </a>{" "}
            (2023 - 2024)
          </li>
          <li>
            <strong>DEUST</strong> - Mathématiques, Informatique, Physique
            (MIP),{" "}
            <a
              href="https://www.fsts.ac.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              FST Settat
            </a>{" "}
            (2020 - 2023)
          </li>
          <li>
            <strong>Baccalauréat Sciences Mathématiques A</strong> - Lycée
            El-Feth, Taourirt (2019 - 2020)
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Projets et Expériences</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>
              Stage PFE -{" "}
              <a
                href="https://www.one.org.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                Office National de l&apos;Électricité et de l&apos;Eau Potable
                (ONEE-BE)
              </a>
            </strong>
            <ul className="list-disc pl-5 italic">
              <li>
                Réalisation d&apos;une solution complète pour optimiser la
                gestion des relevés et des ressources associées.
              </li>
              <li>
                Développement d&apos;une application mobile en Flutter pour
                simplifier et optimiser la saisie des relevés par les agents
                releveurs, assurant une facturation précise et correcte.
              </li>
              <li>
                Conception d&apos;une application web pour la gestion des
                ressources, incluant les agents releveurs et l&apos;équipement
                (appareils mobiles).
              </li>
              <li>
                <strong>Objectif :</strong> Améliorer l&apos;efficacité et la
                gestion des opérations sur le terrain et en back-office.
              </li>
              <li>
                <strong>Durée :</strong> 2 mois
              </li>
            </ul>
          </li>
          <li>
            <strong>
              <a
                href="https://github.com/momonaim/mst-rsi-poo-flight-booking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                Application de réservation de billets d&apos;avion
              </a>
            </strong>
            <p>React + Spring Boot avec paiement et gestion avancée.</p>
          </li>
          <li>
            <strong>
              <a
                href="https://github.com/momonaim/webp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                Système de gestion de recrutement
              </a>
            </strong>
            <p>JS, PHP, MySQL avec suivi complet des candidatures.</p>
          </li>
          <li>
            <strong>
              <a
                href="https://github.com/momonaim/moto6809byASKA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                Simulateur microprocesseur Motorola MOTO6809
              </a>
            </strong>
            <p>Java Swing avec interface interactive de simulation.</p>
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Compétences</h2>
        <ul className="list-disc pl-5">
          <li>
            <strong>Langages :</strong> Java, JS, React, Flutter, PHP, C, C++,
            Bash, PL-SQL
          </li>
          <li>
            <strong>Systèmes :</strong> Linux, Windows, CentOS, Windows Server
          </li>
          <li>
            <strong>Réseaux :</strong> TCP/IP, DNS, VPN, SSH, HTTP/HTTPS,
            SSL-TLS
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Langues</h2>
        <ul className="list-disc pl-5">
          <li>Arabe (Natif)</li>
          <li>Français (Courant)</li>
          <li>Anglais (Intermédiaire)</li>
        </ul>
      </section>

      <footer className="text-center mt-8">
        <div className="mt-2">
          <Link href="/" className="text-blue-300 hover:underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </footer>
    </section>
  );
}
