import React, { useEffect, useState } from 'react';

//contains map data that renders correct map given location data
const Map = (props) => {
    const [mapSrc, setMapSrc] = useState("");

    useEffect(() => {
        console.log(props.address);
        switch (props.address) {
            case "San Francisco, CA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555112995!2d-122.50764012532584!3d37.757814996503235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1652141542101!5m2!1sen!2sus");
                break;
            case "Palo Alto, CA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50695.71454650333!2d-122.17036949424246!3d37.425712997784714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb07b9dba1c39%3A0xe1ff55235f576cf!2sPalo%20Alto%2C%20CA!5e0!3m2!1sen!2sus!4v1652141603293!5m2!1sen!2sus");
                break;
            case "San Diego, CA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429154.7584868916!2d-117.3891684637157!3d32.824817514039395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1652141684466!5m2!1sen!2sus");
                break;
            case "Phoenix, AZ":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425342.1915392279!2d-112.4052406840812!3d33.605671053895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sus!4v1652141775772!5m2!1sen!2sus");
                break;
            case "Las Vegas, NV":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.72146929917!2d-115.31508498885827!3d36.125195781831636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1652141805260!5m2!1sen!2sus");
                break;
            case "Chicago, IL":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380510.6741687112!2d-88.0121497169982!3d41.83390417061057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1652141933624!5m2!1sen!2sus");
                break;
            case "Los Angeles, CA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.43555760017!2d-118.69192200577363!3d34.020730496362155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1652142025181!5m2!1sen!2sus");
                break;
            case "Seattle, WA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172139.4161662446!2d-122.48214752341369!3d47.61294318323425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1652137186026!5m2!1sen!2sus");
                break;
            case "Austin, TX":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220448.69730482646!2d-97.89348696337767!3d30.307982710340738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1652142096321!5m2!1sen!2sus");
                break;
            case "New York, NY":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2798884838!2d-74.25986735406258!3d40.697670068131195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1652142134020!5m2!1sen!2sus");
                break;
            case "Atlanta, GA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.0341016906!2d-84.56068918396844!3d33.76791919446863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1652142261964!5m2!1sen!2sus");
                break;
            case "Orlando, FL":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224444.05442142425!2d-81.48275092228421!3d28.4814032113306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8fecdbc77%3A0xac3b2063ca5bf9e!2sOrlando%2C%20FL!5e0!3m2!1sen!2sus!4v1652142306910!5m2!1sen!2sus");
                break;
            case "Tampa, FL":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450940.19866338134!2d-82.73449746804586!3d27.994804988488053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b782b3b9d1e1%3A0xa75f1389af96b463!2sTampa%2C%20FL!5e0!3m2!1sen!2sus!4v1652142370035!5m2!1sen!2sus");
                break;
            case "Alexandria, VA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193594.0606702473!2d-79.73681543991542!3d38.585738057989104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64d3e93a4abf1%3A0xd7f52686dbc1012c!2sAlexandria%2C%20VA!5e0!3m2!1sen!2sus!4v1652142417794!5m2!1sen!2sus");
                break;
            case "Washington, D.C.":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198740.08540591854!2d-77.1546662176417!3d38.89393804557167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1652142477353!5m2!1sen!2sus");
                break;
            case "Portland, OR":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357679.54783842916!2d-122.9346047918042!3d45.54285242824575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1652142509068!5m2!1sen!2sus");
                break;
            case "Houston, TX":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d886177.6787536186!2d-95.96185363630929!3d29.8171869849889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1652142534057!5m2!1sen!2sus");
                break;
            case "Boston, MA":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377640.0978936661!2d-71.2504905643966!3d42.31451671173209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2sBoston%2C%20MA!5e0!3m2!1sen!2sus!4v1652142570743!5m2!1sen!2sus");
                break;
            case "Denver, CO":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d392562.19428554724!2d-105.1353201577956!3d39.76452997883988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1652142595982!5m2!1sen!2sus");
                break;
            case "Boise, ID":
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184913.12755999953!2d-116.37398725894708!3d43.60096916668911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef172e947b49d%3A0x9a5b989b36679d9b!2sBoise%2C%20ID!5e0!3m2!1sen!2sus!4v1652142642790!5m2!1sen!2sus");
                break;
            default:
                setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55565170.29301636!2d-132.08532758867793!3d31.786060306224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1652140981354!5m2!1sen!2sus");
                break;
        }
    }, []);

    return (
        <iframe src={mapSrc} width="600" height="600" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">

        </iframe>
    );
}

export default Map;