/**
 * Load an environment variable in a typesafe way and throw an error if it is not set
 * This way, consuming code can rely on the variable being a string and not having to
 * implement its own `undefined` checks.
 *
 * NOTE: The reason we need to pass `process.env.ACTUAL_VAR_NAME` instead of just a string
 * 'ACTUAL_VAR_NAME' is because of how Next.js handles environment variables. It will only
 * inline the value of the environment variable if it is used directly in the code, but not
 * if being resolved dynamically in a helper function like this.
 *
 * Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
 */
export default function loadEnvVar(envVar: string | undefined): string {
  if (envVar == null) {
    throw new Error(`Environment variable ${name} is not set`);
  }

  return envVar;
}
