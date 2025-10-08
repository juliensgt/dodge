import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  faFileContract,
  faShield,
  faGavel,
  faQuestionCircle,
  faDownload,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LegalSection = "terms" | "privacy" | "cookies" | "refund" | "contact";

interface LegalDocument {
  id: LegalSection;
  title: string;
  icon: React.ReactNode;
  lastUpdated: string;
  content: string;
}

export default function RulesTab() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<LegalSection>("terms");

  const legalDocuments: LegalDocument[] = [
    {
      id: "terms",
      title: t("Conditions d'utilisation"),
      icon: <FontAwesomeIcon icon={faFileContract} />,
      lastUpdated: "15 décembre 2024",
      content: `
        <h3>1. Acceptation des conditions</h3>
        <p>En utilisant notre service, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.</p>
        
        <h3>2. Description du service</h3>
        <p>Dodge est un jeu multijoueur en ligne qui permet aux utilisateurs de jouer ensemble en temps réel. Le service est fourni "tel quel" sans garantie d'aucune sorte.</p>
        
        <h3>3. Comptes utilisateur</h3>
        <p>Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe. Vous acceptez de nous notifier immédiatement toute utilisation non autorisée de votre compte.</p>
        
        <h3>4. Comportement des utilisateurs</h3>
        <p>Vous vous engagez à ne pas :</p>
        <ul>
          <li>Utiliser le service à des fins illégales ou non autorisées</li>
          <li>Transmettre des virus ou tout autre code malveillant</li>
          <li>Harceler, abuser ou nuire à d'autres utilisateurs</li>
          <li>Essayer d'obtenir un accès non autorisé au service</li>
        </ul>
        
        <h3>5. Propriété intellectuelle</h3>
        <p>Le service et son contenu original, ses fonctionnalités et sa fonctionnalité sont et resteront la propriété exclusive de Dodge et de ses concédants de licence.</p>
        
        <h3>6. Limitation de responsabilité</h3>
        <p>En aucun cas Dodge ne sera responsable de dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation du service.</p>
        
        <h3>7. Modification des conditions</h3>
        <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur cette page.</p>
      `,
    },
    {
      id: "privacy",
      title: t("Politique de confidentialité"),
      icon: <FontAwesomeIcon icon={faShield} />,
      lastUpdated: "15 décembre 2024",
      content: `
        <h3>1. Informations que nous collectons</h3>
        <p>Nous collectons les informations que vous nous fournissez directement, telles que :</p>
        <ul>
          <li>Nom d'utilisateur et adresse e-mail</li>
          <li>Données de profil et préférences</li>
          <li>Communications avec notre service client</li>
        </ul>
        
        <h3>2. Comment nous utilisons vos informations</h3>
        <p>Nous utilisons les informations collectées pour :</p>
        <ul>
          <li>Fournir et maintenir notre service</li>
          <li>Personnaliser votre expérience de jeu</li>
          <li>Communiquer avec vous</li>
          <li>Améliorer nos services</li>
        </ul>
        
        <h3>3. Partage d'informations</h3>
        <p>Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les cas suivants :</p>
        <ul>
          <li>Avec votre consentement explicite</li>
          <li>Pour se conformer à la loi</li>
          <li>Pour protéger nos droits et notre sécurité</li>
        </ul>
        
        <h3>4. Sécurité des données</h3>
        <p>Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès, la modification, la divulgation ou la destruction non autorisés.</p>
        
        <h3>5. Vos droits</h3>
        <p>Vous avez le droit de :</p>
        <ul>
          <li>Accéder à vos informations personnelles</li>
          <li>Corriger des informations inexactes</li>
          <li>Demander la suppression de vos données</li>
          <li>Retirer votre consentement</li>
        </ul>
      `,
    },
    {
      id: "cookies",
      title: t("Politique des cookies"),
      icon: <FontAwesomeIcon icon={faGavel} />,
      lastUpdated: "15 décembre 2024",
      content: `
        <h3>1. Qu'est-ce qu'un cookie ?</h3>
        <p>Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site web. Ils nous aident à améliorer votre expérience de navigation.</p>
        
        <h3>2. Types de cookies que nous utilisons</h3>
        <p><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement de base du site</p>
        <p><strong>Cookies de performance :</strong> Nous aident à comprendre comment les visiteurs utilisent notre site</p>
        <p><strong>Cookies de fonctionnalité :</strong> Permettent au site de se souvenir de vos choix</p>
        <p><strong>Cookies de ciblage :</strong> Utilisés pour diffuser des publicités pertinentes</p>
        
        <h3>3. Gestion des cookies</h3>
        <p>Vous pouvez contrôler et gérer les cookies dans les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter le fonctionnement du site.</p>
        
        <h3>4. Cookies tiers</h3>
        <p>Nous utilisons également des cookies de services tiers pour l'analyse et la publicité. Ces services ont leurs propres politiques de cookies.</p>
      `,
    },
    {
      id: "refund",
      title: t("Politique de remboursement"),
      icon: <FontAwesomeIcon icon={faQuestionCircle} />,
      lastUpdated: "15 décembre 2024",
      content: `
        <h3>1. Achat de contenu virtuel</h3>
        <p>Les achats de contenu virtuel (coins, skins, thèmes) sont considérés comme des achats finaux et ne sont généralement pas remboursables.</p>
        
        <h3>2. Exceptions au remboursement</h3>
        <p>Nous pouvons accorder un remboursement dans les cas suivants :</p>
        <ul>
          <li>Erreur technique empêchant l'utilisation du contenu acheté</li>
          <li>Achat accidentel effectué par un mineur</li>
          <li>Problème de facturation non résolu</li>
        </ul>
        
        <h3>3. Processus de demande de remboursement</h3>
        <p>Pour demander un remboursement :</p>
        <ol>
          <li>Contactez notre service client dans les 48 heures</li>
          <li>Fournissez votre numéro de commande</li>
          <li>Décrivez le problème rencontré</li>
        </ol>
        
        <h3>4. Délais de traitement</h3>
        <p>Les demandes de remboursement sont traitées dans un délai de 5 à 10 jours ouvrables. Les remboursements sont effectués sur le mode de paiement original.</p>
      `,
    },
  ];

  const renderContent = () => {
    const document = legalDocuments.find((doc) => doc.id === activeSection);
    if (!document) return null;

    return (
      <div className="prose prose-invert max-w-none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {document.icon}
            {document.title}
          </h2>
          <span className="text-white/60 text-sm">
            {t("Dernière mise à jour")} : {document.lastUpdated}
          </span>
        </div>
        <div
          className="text-white/90 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: document.content }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-8">
            <h3 className="text-lg font-bold text-white mb-4">
              {t("Documents légaux")}
            </h3>
            <nav className="space-y-2">
              {legalDocuments.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveSection(doc.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === doc.id
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg">{doc.icon}</span>
                  <span className="text-sm font-medium">{doc.title}</span>
                </button>
              ))}
            </nav>

            {/* Download Section */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <h4 className="text-white font-medium mb-3">
                {t("Téléchargements")}
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <FontAwesomeIcon icon={faDownload} />
                  <span className="text-sm">{t("Télécharger les CGU")}</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <FontAwesomeIcon icon={faDownload} />
                  <span className="text-sm">
                    {t("Télécharger la politique de confidentialité")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            {renderContent()}

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                {t("Besoin d'aide ?")}
              </h3>
              <p className="text-white/80 mb-4">
                {t(
                  "Si vous avez des questions concernant ces documents ou notre service, n'hésitez pas à nous contacter."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  <span>{t("Contacter le support")}</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <span>{t("FAQ")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
