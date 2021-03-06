import OperationsCollection from "../../../src/DataModel/Collections/OperationsCollection";
import { hydra } from "../../../src/namespaces";

describe("Given instance of the OperationsCollection", () => {
  beforeEach(() => {
    this.operation1 = { type: ["OperationType1"], expects: [{ iri: "ExpectedType1" }] };
    this.operation2 = { type: ["OperationType1"], expects: [{ iri: "ExpectedType2" }] };
    this.operation3 = { type: ["OperationType2"], expects: [{ iri: "ExpectedType2" }] };
    this.operation4 = { type: ["OperationType3", hydra.IriTemplate], expects: [{ iri: "ExpectedType3" }] };
    this.allOperations = [this.operation1, this.operation2, this.operation3, this.operation4];
    this.operations = new OperationsCollection(this.allOperations);
  });

  it("should provide all operations", () => {
    expect([...this.operations]).toEqual(this.allOperations);
  });

  describe("when narrowing filters with type", () => {
    beforeEach(() => {
      this.typeNorrowedOperations = this.operations.ofType("OperationType1");
    });

    it("should provide only type matching operations", () => {
      expect([...this.typeNorrowedOperations]).toEqual([this.operation1, this.operation2]);
    });

    describe("and narrowing filters with expected type", () => {
      beforeEach(() => {
        this.typeAndExpectationNarrowedOperations = this.typeNorrowedOperations.expecting("ExpectedType2");
      });

      it("should provide only type and expected type matching operations", () => {
        expect([...this.typeAndExpectationNarrowedOperations]).toEqual([this.operation2]);
      });
    });
  });

  describe("when narrowing filters with template", () => {
    beforeEach(() => {
      this.templateNorrowedOperations = this.operations.withTemplate();
    });

    it("should provide only type matching operations", () => {
      expect([...this.templateNorrowedOperations]).toEqual([this.operation4]);
    });
  });
});
