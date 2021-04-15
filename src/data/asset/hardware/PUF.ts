/**
 * A physically uncloneable function (PUF).
 *
 * "physical object that for a given input and conditions (challenge), provides a physically-defined "digital fingerprint" output (response) that serves as a unique identifier"
 * - https://en.wikipedia.org/wiki/Physical_unclonable_function
 */
export interface PUF {
    kind: 'hardware';
    type: 'puf';
    id: string;
    secret: string;
}
