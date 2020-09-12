import './index.scss';
import Spinner from '../../assets/spinner.svg';

const Loading = () => `
    <div class="loading">
        <img src="${Spinner}" alt="spinner"/>
    </div>
`;

export default Loading;