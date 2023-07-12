import { LibraryRules } from 'shared/ui/library-rules/library-rules';
import { Navbar } from 'shared/ui/navbar/navbar';

export const AgreementPage = () => (
  <section className='agreement-page'>
    <div className='container'>
      <Navbar />

      <div>
        <h3>Договор оферты</h3>
        <LibraryRules />
      </div>
    </div>
  </section>
);
