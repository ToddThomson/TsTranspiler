﻿import * as ts from "typescript"
import { expect } from "chai"
import * as identity from "../../transforms/IdentityTransform"
import * as empty from "../../transforms/EmptyTransform"
import { TsCompiler, CompileTransformers, CompileStatus, CompileResult } from "../../../lib/TsCompiler"

describe( "Compile Module With Transforms", () => {

    function compilesModuleCorrectly( name: string, input: string, options: ts.CompilerOptions, transformers?: CompileTransformers ) {
        describe( name, () => {
            let moduleName: string;
            let compileResult: CompileResult;
            options = options || {};
            //transformers = transformers || {}; 

            moduleName = "compileModule/" + name.replace( /[^a-z0-9\-. ]/ig, "" ) + ( options.jsx ? ts.Extension.Tsx : ts.Extension.Ts );

            compileResult = TsCompiler.compileModule( input, moduleName, options, transformers );

            it( "Correct errors for " + moduleName, () => {
                expect( compileResult.getStatus() ).to.equal( CompileStatus.Success );
            } );
        } );
    }

    compilesModuleCorrectly( "With Identity transform. Generates no diagnostics with valid inputs", `var x = 0;`,
        {
            module: ts.ModuleKind.CommonJS,
        },
        () => ({
            before: [identity.getTransform()]
        } ) );

    compilesModuleCorrectly( "With Empty transform generates no diagnostics with valid inputs", `var x = 0;`,
        {
            module: ts.ModuleKind.CommonJS,
        },
        () => ({
            before: [empty.getTransform()]
        } ) );
} );