import React from 'react';
import { actorTypes } from '../../content/DigitalIdentity1/actors/actorTypes';
import { ImageOrIconDefinition } from '../../model/common/ImageOrIconDefinition';
import { ImageOrIconSwitch } from '../components/elements/ImageOrIconSwitch';

export function ActorImage({ image }: { image: ImageOrIconDefinition }) {
    return (
        <ImageOrIconSwitch
            image={image}
            stylesPerType={{
                'fa-icon': { fontSize: '6rem' },
                image: { height: '6rem' },
            }}
        />
    );
}

export function ExamplesPage() {
    return (
        <div id="examples-page">
            <div>
                <h1>
                    <a className="back-btn" href="/">
                        <i className="fas fa-chevron-left"></i>
                    </a>
                    Identity Game - Voorbeelden
                </h1>
            </div>
            <div id="examples-list">
                <a className="example-scenario inverted" href="/tour/intro">
                    <div style={{ display: 'flex' }}>
                        <ActorImage image={actorTypes.person3.image} />
                        <ActorImage image={actorTypes.gov1.image} />
                        <ActorImage image={actorTypes.shop1.image} />
                    </div>
                    <span className="title">Alcoholverkoop (18+)</span>
                    <span className="subtitle">
                        {'Om de online verkoop van alcohol veilig te maken, dient worden gecontroleerd ' +
                            'dat de koper ten minste 18 jaar oud is. In dit scenario bewijst een koper dit ' +
                            'met behulp van Self-Sovereign Identity. Daartoe haalt hij een ' +
                            'bewijs van 18+ zijn op bij het gemeenteloket, welke hij vervolgens gebruikt ' +
                            'om online alcohol te kopen.'}
                    </span>
                </a>
                <a className="example-scenario inverted" href="/tour/build">
                    <div style={{ display: 'flex' }}>
                        <ActorImage image={actorTypes.person2.image} />
                        <ActorImage image={actorTypes.office1.image} />
                    </div>
                    <span className="title">Online Inloggen</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="example-scenario inverted" href="/examples">
                    <div style={{ display: 'flex', overflow: 'hidden' }}>
                        <ActorImage image={actorTypes.person1.image} />
                        <ActorImage image={actorTypes.person2.image} />
                        <ActorImage image={actorTypes.office1.image} />
                        <ActorImage image={actorTypes.office2.image} />
                        <ActorImage image={actorTypes.office3.image} />
                        <ActorImage image={actorTypes.gov1.image} />
                    </div>
                    <span className="title">Zakelijke autoverkoop</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="example-scenario inverted" href="/examples">
                    <span className="title">Schuldhulpverlening</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="example-scenario inverted" href="/examples">
                    <span className="title">Nog een casus 1</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="example-scenario inverted" href="/examples">
                    <span className="title">Nog een casus 2</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="example-scenario inverted" href="/examples">
                    <span className="title">Nog een casus 3</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="example-scenario inverted" href="/examples">
                    <span className="title">Nog een casus 4</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
            </div>
        </div>
    );
}
