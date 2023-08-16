import '@testing-library/jest-dom/vitest'
import {beforeEach, expect} from "vitest";
import {cleanup} from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";


beforeEach(cleanup)
expect.extend(matchers)