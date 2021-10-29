import React from 'react';

export function LandingPage() {
    return (
        <div id="landing-page">
            <div id="landing-left">
                <div>
                    <h1>Identity Game</h1>
                    <p className="subtitle">Maak de wereld van digitale identiteit concreet en bespreekbaar.</p>
                    <p>
                        Op dagelijkse basis bewijzen mensen en organisaties, bewust of onbewust, aan elkaar <i>wie</i>{' '}
                        ze zijn, wat ze mogen en waar ze recht op hebben. Bijvoorbeeld, wanneer men inlogt bij social
                        media of betaalt met een pinpas. Hoe alledaags die processen ook zijn, en hoe simpel ze ook
                        mogen lijken, achter de schermen kan het erg complex zijn.
                    </p>
                    <p>
                        De Identity Game helpt beleidsmakers, juristen, IT-architecten en anderen deze processen in
                        beeld te brengen en er op toegankelijke wijze over te praten. Deze veelzijdige tool stelt ze in
                        staat om een breed scala aan scenario&quot;s uit te beelden en te bespreken.
                    </p>
                </div>
            </div>
            <div id="landing-right">
                <a className="landing-cta inverted" href="/tour/intro">
                    <span className="title">Volg de rondleiding</span>
                    <span className="subtitle">Leer de basisconcepten kennen.</span>
                </a>
                <a className="landing-cta" href="/tour/build">
                    <span className="title">Leer zelf te bouwen</span>
                    <span className="subtitle">Bouw eigen scenario&apos;s.</span>
                </a>
                <a className="landing-cta" href="/examples">
                    <span className="title">Bekijk voorbeelden</span>
                    <span className="subtitle">Laat je inspireren.</span>
                </a>
                <a className="landing-cta small" href="/app" style={{ marginBottom: '-4.2rem' }}>
                    Of ga direct naar de app
                </a>
            </div>
        </div>
    );
}
