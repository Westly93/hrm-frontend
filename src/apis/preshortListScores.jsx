export const fetchPreshortListScore = async (id) => {
    const res = await fetch(`https://hrm.msu.ac.zw/api/v1/application-scores/${id}`)
    return res.json()
}   