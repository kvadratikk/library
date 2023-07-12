import { LibraryRules } from 'shared/ui/library-rules/library-rules';
import { Navbar } from 'shared/ui/navbar/navbar';

export const TermsPage = () => (
  <section className='terms-page'>
    <div className='container'>
      <Navbar />

      <div>
        <h3>Правила пользования</h3>
        <LibraryRules />
      </div>
    </div>
  </section>
);
