/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import api from '../../api';

import Button from '../../share-components/Button';
import download from '../../utils/icons/download.svg';
import add from '../../utils/icons/add.svg';

function TripItem() {
    const { id } = useParams();

    const [error, setError] = useState('');

    const [itineraries, setItineraries] = useState(null);

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const parseItysBufferToUrl = (itys) => {
        const result = new Map();

        // eslint-disable-next-line no-restricted-syntax
        for (const item of itys) {
            const { resumeFile } = item;
            const buffer = resumeFile.data.data;

            const base64String = arrayBufferToBase64(buffer);

            const { data, ...out } = resumeFile;
            out.b64String = `data:image/png;base64,${base64String}`;

            result.set(out.id, out);
        }

        return result;
    };

    const domToImgDll = async (y) => {
        try {
            const node = document.getElementById(y);
            const blob = await domtoimage.toBlob(node);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = y;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('oops, something went wrong!', err);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                sessionStorage.setItem('tripId', id);
                const res = await api.tripService.getItineraries();
                const arg = res.itineraries.filter((e) => e.resumeFile);
                const itys = parseItysBufferToUrl(arg);
                setItineraries(itys);
            } catch (err) {
                setItineraries(null);
                setError(err);
            }
        })();
    }, []);

    return (
        <>
            <div className="flex justify-center mx-6">
                <div className="w-3/12">
                    <Button
                        title="Add New Itinerary"
                        icon={add}
                        onClick={() => console.log('ok')}
                    />
                </div>
            </div>
            <div id="itinerary">
                {/* <p>{error}</p> */}
                {itineraries &&
                    [...itineraries].map(([key, value]) => (
                        <>
                            <img
                                key={key}
                                id={`ity-file-${key}`}
                                src={value.b64String}
                                alt=""
                            />

                            <div className="w-2/12">
                                <Button
                                    title="Download"
                                    icon={download}
                                    onClick={async () =>
                                        // eslint-disable-next-line no-return-await
                                        await domToImgDll(`ity-file-${key}`)
                                    }
                                />
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
}

export default TripItem;
