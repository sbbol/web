import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../store/AppContext';
import AccountOperationsView from '../../components/AccountOperationsView/AccountOperationsView';

const AccountInfo = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { accounts } = useContext(AppContext);
  const account = accounts.find(a => a.id === id);

  if (!account) {
    return <h2>Счет не найден</h2>;
  }

  const openRequisites = searchParams.get('open') === 'requisites';

  return <AccountOperationsView account={account} initialRequisitesOpen={openRequisites} />;
};

export default AccountInfo;
