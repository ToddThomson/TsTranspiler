﻿export interface CompileOptions
{
    /**
     * Sets verbose output. Defaults to false.
     */
    verbose?: boolean;

    /**
     * Sets type checking only with no output files emitted. Defaults to false.
     */
    typeCheckOnly?: boolean;

    /**
    * Sets emit output to disk. Defaults to true.
    */
    emitToDisk?: boolean;
}