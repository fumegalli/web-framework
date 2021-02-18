import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({ name: 'NAME', age: 20 });

const root = document.getElementById('root');

if(!root) {
  throw new Error('Root element not found');
}

const userEdit = new UserEdit(root, user);

userEdit.render();

console.log(userEdit);
