// src/components/TermsForm.tsx
"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createTerm, updateTerm, Term } from "@/redux/features/terms.slice";
import { termSchema, TermFormValues } from "@/schemas/terms.schema";

type TermsFormProps = {
    term?: Term;
    onClose?: () => void;
};

export default function TermsForm({ term, onClose }: TermsFormProps) {
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TermFormValues>({
        resolver: zodResolver(termSchema),
        defaultValues: term
            ? {
                  name: term.name,
                  type: term.type,
                  userId: term.userId ?? undefined,
                  // meta defaults from term.meta
                  initialIdea: term.meta?.initialIdea ?? undefined,
                  initialAssumption: term.meta?.initialAssumption ?? undefined,
                  initialQuestion: term.meta?.initialQuestion ?? undefined,
                  theStory: term.meta?.theStory ?? undefined,
                  theCurves: term.meta?.theCurves ?? undefined,
                  mistakes: term.meta?.mistakes ?? undefined,
                  emotionalJourney: term.meta?.emotionalJourney ?? undefined,
                  steps: term.meta?.steps ?? undefined,
                  realizations: term.meta?.realizations ?? undefined,
                  narratives: term.meta?.narratives ?? undefined,
                  hiddenNarratives: term.meta?.hiddenNarratives ?? undefined,
                  hiddenFlows: term.meta?.hiddenFlows ?? undefined,
                  controlStructures: term.meta?.controlStructures ?? undefined,
                  acknowledgments: term.meta?.acknowledgments ?? undefined,
                  unacknowledgements:
                      term.meta?.unacknowledgements ?? undefined,
                  implicationFlowByAcknowledgments:
                      term.meta?.implicationFlowByAcknowledgments ?? undefined,
                  philosophicalTraps:
                      term.meta?.philosophicalTraps ?? undefined,
                  hormonalTraps: term.meta?.hormonalTraps ?? undefined,
                  cognitiveTraps: term.meta?.cognitiveTraps ?? undefined,
                  perspectiveTraps: term.meta?.perspectiveTraps ?? undefined,
                  deliveryOfPerspective:
                      term.meta?.deliveryOfPerspective ?? undefined,
                  recommendedFlows: term.meta?.recommendedFlows ?? undefined,
                  recommendedFlowsType:
                      term.meta?.recommendedFlowsType ?? undefined,
                  layer: term.meta?.layer ?? undefined,
              }
            : { type: "GENUINE" },
    });

    useEffect(() => {
        if (term) {
            reset({
                name: term.name,
                type: term.type,
                userId: term.userId ?? undefined,
                initialIdea: term.meta?.initialIdea ?? undefined,
                initialAssumption: term.meta?.initialAssumption ?? undefined,
                initialQuestion: term.meta?.initialQuestion ?? undefined,
                theStory: term.meta?.theStory ?? undefined,
                theCurves: term.meta?.theCurves ?? undefined,
                mistakes: term.meta?.mistakes ?? undefined,
                emotionalJourney: term.meta?.emotionalJourney ?? undefined,
                steps: term.meta?.steps ?? undefined,
                realizations: term.meta?.realizations ?? undefined,
                narratives: term.meta?.narratives ?? undefined,
                hiddenNarratives: term.meta?.hiddenNarratives ?? undefined,
                hiddenFlows: term.meta?.hiddenFlows ?? undefined,
                controlStructures: term.meta?.controlStructures ?? undefined,
                acknowledgments: term.meta?.acknowledgments ?? undefined,
                unacknowledgements: term.meta?.unacknowledgements ?? undefined,
                implicationFlowByAcknowledgments:
                    term.meta?.implicationFlowByAcknowledgments ?? undefined,
                philosophicalTraps: term.meta?.philosophicalTraps ?? undefined,
                hormonalTraps: term.meta?.hormonalTraps ?? undefined,
                cognitiveTraps: term.meta?.cognitiveTraps ?? undefined,
                perspectiveTraps: term.meta?.perspectiveTraps ?? undefined,
                deliveryOfPerspective:
                    term.meta?.deliveryOfPerspective ?? undefined,
                recommendedFlows: term.meta?.recommendedFlows ?? undefined,
                recommendedFlowsType:
                    term.meta?.recommendedFlowsType ?? undefined,
                layer: term.meta?.layer ?? undefined,
            });
        }
    }, [term, reset]);

    const onSubmit = async (data: TermFormValues) => {
        try {
            if (term) {
                await dispatch(updateTerm({ id: term.id, ...data })).unwrap();
            } else {
                await dispatch(createTerm(data)).unwrap();
            }
            reset();
            onClose?.();
        } catch (err) {
            console.error(err);
        }
    };

    const Input = ({
        name,
        label,
        textarea,
    }: {
        name: keyof TermFormValues;
        label: string;
        textarea?: boolean;
    }) => (
        <div>
            <label className="block text-sm font-medium text-white mb-1">
                {label}
            </label>
            {textarea ? (
                <textarea
                    {...register(name)}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-emerald-400 focus:ring focus:ring-emerald-400/30"
                />
            ) : (
                <input
                    type="text"
                    {...register(name)}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-emerald-400 focus:ring focus:ring-emerald-400/30"
                />
            )}
            {errors[name] && (
                <p className="text-red-400 text-sm mt-1">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl p-4 rounded-lg bg-gray-800"
        >
            {/* Core */}
            <Input name="name" label="Name" />
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Type
                </label>
                <select
                    {...register("type")}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-emerald-400 focus:ring focus:ring-emerald-400/30"
                >
                    <option value="GENUINE">GENUINE</option>
                    <option value="PERSPECTIVE">PERSPECTIVE</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="PERSONAL">PERSONAL</option>
                    <option value="UNDERSTANDING">UNDERSTANDING</option>
                    <option value="RESEARCH">RESEARCH</option>
                </select>
            </div>

            {/* Meta (full list as textareas for long text fields) */}
            <Input name="initialIdea" label="Initial Idea" textarea />
            <Input
                name="initialAssumption"
                label="Initial Assumption"
                textarea
            />
            <Input name="initialQuestion" label="Initial Question" textarea />
            <Input name="theStory" label="The Story" textarea />
            <Input name="theCurves" label="The Curves" textarea />
            <Input name="mistakes" label="Mistakes" textarea />
            <Input name="emotionalJourney" label="Emotional Journey" textarea />
            <Input name="steps" label="Steps" textarea />
            <Input name="realizations" label="Realizations" textarea />
            <Input name="narratives" label="Narratives" textarea />
            <Input name="hiddenNarratives" label="Hidden Narratives" textarea />
            <Input name="hiddenFlows" label="Hidden Flows" textarea />
            <Input
                name="controlStructures"
                label="Control Structures"
                textarea
            />
            <Input name="acknowledgments" label="Acknowledgments" textarea />
            <Input
                name="unacknowledgements"
                label="Unacknowledgements"
                textarea
            />
            <Input
                name="implicationFlowByAcknowledgments"
                label="Implication Flow By Acknowledgments"
                textarea
            />
            <Input
                name="philosophicalTraps"
                label="Philosophical Traps"
                textarea
            />
            <Input name="hormonalTraps" label="Hormonal Traps" textarea />
            <Input name="cognitiveTraps" label="Cognitive Traps" textarea />
            <Input name="perspectiveTraps" label="Perspective Traps" textarea />
            <Input
                name="deliveryOfPerspective"
                label="Delivery Of Perspective"
                textarea
            />
            <Input name="recommendedFlows" label="Recommended Flows" textarea />

            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Recommended Flows Type
                </label>
                <select
                    {...register("recommendedFlowsType")}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-emerald-400 focus:ring focus:ring-emerald-400/30"
                >
                    <option value="">—</option>
                    <option value="GOOD">GOOD</option>
                    <option value="BAD">BAD</option>
                    <option value="WEIRD">WEIRD</option>
                </select>
            </div>

            <Input name="layer" label="Layer" />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-white font-medium disabled:opacity-60"
            >
                {isSubmitting
                    ? term
                        ? "Updating..."
                        : "Creating..."
                    : term
                    ? "Update Term"
                    : "Create Term"}
            </button>
        </form>
    );
}
