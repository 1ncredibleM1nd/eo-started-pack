import {withNaming, ClassNameList} from '@bem-react/classname';

const cn = withNaming({n: '', e: '__', m: '--'});

function mergeClassName(...classes: ClassNameList) {
    return classes.filter(className => className).join(' ');
}

function useClassName(blockClassName: string) {
    return {
        cn: cn(blockClassName),
        mergeClassName: mergeClassName
    };
}

export default useClassName;