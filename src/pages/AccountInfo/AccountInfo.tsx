import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../store/AppContext';
import AccountOperationsView from '../../components/AccountOperationsView/AccountOperationsView';

const AccountInfo = () => {
  const { id } = useParams();
  const { accounts } = useContext(AppContext);
  const account = accounts.find(a => a.id === id);

  if (!account) {
    return <h2>Счет не найден</h2>;
  }

  return <AccountOperationsView account={account} />;
};

export default AccountInfo;
