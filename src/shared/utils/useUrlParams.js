import { useSearchParams } from 'react-router-dom';

const useUrlParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const changeUrlParams = (paramsObject) => {
        const newSearchParams = new URLSearchParams(searchParams);

        // 전달받은 paramsObject의 키-값 쌍을 URLSearchParams에 설정
        Object.entries(paramsObject).forEach(([key, value]) => {
            newSearchParams.set(key, value);
        });

        // 업데이트된 URLSearchParams를 설정하여 URL 업데이트
        setSearchParams(newSearchParams);
    };

    return { searchParams, changeUrlParams };
};

export default useUrlParams;