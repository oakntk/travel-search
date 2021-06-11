import {makeStyle} from '@material-ui/core/styles';

const useStyle = makeStyle ((theme) => ({
    container: {
        backgroundColor: theme.palette.background.Paper
        padding: theme.spacing(8,0,6)
    }
}));

export default useStyle;