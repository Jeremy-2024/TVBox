let siteUrl = 'http://194.147.100.39';

const headers = {
    token2: 'enxerhSl0jk2TGhbZCygMdwoKqOmyxsk/Kw8tVy4dsRBE1o1xBhWhoFbh98=',
    token: 'RXQbgQKl3QkFZkIPGwGvH5kofvCokkkn/a893wC2IId7HQFmy0Eh24osz555X12xGVFxQLTaGuBqU/Y7KU4lStp4UjR7giPxdwoTOsU6R3oc4yZZTQc/yTKh1mH3ckZhx6VsQCEoFf6q',
    version: 'XPGBOX com.phoenix.tv1.3.3',
    user_id: 'XPGBOX',
    'User-Agent': 'AndroidXMedia3/1.5.1',
    screenx: '1280',
    screeny: '720',
    timestamp: '1736412598',
    hash: 'a764'
};

const request = async (url) => (await req(url, { method: 'GET', headers })).content;

const home = () => '{"class":[{"type_id":"2","type_name":"电视"},{"type_id":"1","type_name":"电影"},{"type_id":"3","type_name":"综艺"},{"type_id":"4","type_name":"动漫"}]}';

const category = async (tid, pg) => {
    return JSON.stringify({ list: await getVideos(`${siteUrl}/api.php/v2.vod/androidfilter10086?page=${pg}&type=${tid}`), page: pg });
};

const detail = async (id) => {
    const data = JSON.parse(await request(`${siteUrl}/api.php/v3.vod/androiddetail2?vod_id=${id}`)).data;
    return JSON.stringify({
        list: [{
            vod_name: data.name,
            vod_pic: data.pic,
            vod_play_from: '🍎Apple🍎',
            vod_play_url: data.urls.map(i => `${i.key}$${i.url}`).join('#'),
            vod_content: `🔥${data.content}🔥`,
            vod_year: data.year,
            vod_area: `🌏${data.area}🌏`
        }]
    });
};

const search = async (wd, pg) => JSON.stringify({
    list: await getVideos(`${siteUrl}/api.php/v2.vod/androidsearch10086?page=${pg}&wd=${wd}`)
});

const play = (flag, id) => JSON.stringify({
    parse: 0,
    url: `${siteUrl}/m3u8/${id}.m3u8`,
    header: headers
});

const getVideos = async (url) => 
    JSON.parse(await request(url)).data.map(n => ({
        vod_id: n.id,
        vod_name: n.name,
        vod_pic: n.pic,
        vod_remarks: `🍎更新至${n.updateInfo}🍎`
    }));

export const __jsEvalReturn = () => ({ home, category, detail, play, search });