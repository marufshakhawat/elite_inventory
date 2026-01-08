
import React from 'react';

type LegalType = 'privacy' | 'terms' | 'faq' | 'shipping' | 'returns' | 'cookies';

const Legal: React.FC<{ type: LegalType }> = ({ type }) => {
  const getHeader = () => {
    switch(type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms & Conditions';
      case 'faq': return 'Frequently Asked Questions';
      case 'shipping': return 'Fulfillment Logistics';
      case 'returns': return 'Refund Policy';
      case 'cookies': return 'Cookie Policy';
      default: return 'Information';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white p-12 md:p-20 rounded-[3.5rem] border border-slate-100 shadow-2xl space-y-12">
        <header className="space-y-4 border-b border-slate-100 pb-12">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Legal Framework / V2.4.0</p>
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">{getHeader()}</h1>
          <p className="text-slate-500 text-sm">Last Revision: March 2024</p>
        </header>

        <article className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed text-base font-light">
          {type === 'privacy' && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">1. Data Architecture</h2>
                <p>Elite Inventory utilizes high-encryption protocols to protect your transaction metadata. We collect email addresses strictly for license delivery and account verification purposes.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">2. Third-Party Interfaces</h2>
                <p>We do not share your data with external marketing entities. Your information is processed through secure manual channels for MFS verification.</p>
              </section>
            </>
          )}

          {type === 'terms' && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">1. Agreement of Service</h2>
                <p>By accessing the Elite Inventory marketplace, you agree to abide by our fulfillment protocols. Digital assets are provided as-is, subject to the vendor's End User License Agreement (EULA).</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">2. Account Responsibility</h2>
                <p>Users are responsible for maintaining the security of their digital licenses once delivered. Elite Inventory is not liable for lost credentials post-delivery.</p>
              </section>
            </>
          )}

          {type === 'faq' && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">How do I receive my key?</h2>
                <p>Post-verification of your manual payment, the license key is automatically added to your dashboard and emailed to your registered address.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Is support included?</h2>
                <p>Yes. All premium assets come with lifetime technical support from the Elite Inventory infrastructure team.</p>
              </section>
            </>
          )}

          {type === 'shipping' && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Instant Digital Fulfillment</h2>
                <p>All items are digital. No physical shipping is required. Delivery occurs via our encrypted email dispatch system.</p>
              </section>
            </>
          )}

          {type === 'returns' && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">1. Refund Eligibility</h2>
                <p>Due to the nature of digital license keys, refunds are only issued if a key is proven defective and a functional replacement cannot be provided within 24 hours.</p>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">2. Exchange Policy</h2>
                <p>Incorrect purchases can be exchanged for store credit if the digital key has not been accessed or revealed in the user dashboard.</p>
              </section>
            </>
          )}

          {type === 'cookies' && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Cookie Implementation</h2>
                <p>We use essential cookies to manage your authentication session and shopping cart state. No tracking or advertising cookies are deployed.</p>
              </section>
            </>
          )}
        </article>

        <footer className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Secure Legal Document</p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} Elite Inventory</p>
        </footer>
      </div>
    </div>
  );
};

export default Legal;
